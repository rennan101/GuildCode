class GuildCodeApp {
    constructor() {
        this.engine = new GameEngine();
        window.engine = this.engine;
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
        this.loadLowPowerMode();
        if (window.soundFX) window.soundFX.init();
        this.bindAudioSliderDragging();
        this.updateAudioSettingsUI();
        this.ui.showScreen('loading');

        // Inicializa o gerenciador de missões e configurações do mapa/cristais de forma resiliente
        // com limite de tempo (timeout de 2s) para nunca travar a inicialização do jogo ou da autenticação
        const safeTimeout = (p, ms = 2000) => Promise.race([
            p,
            new Promise(resolve => setTimeout(resolve, ms))
        ]);

        try {
            await Promise.allSettled([
                typeof missionsManager !== 'undefined' ? safeTimeout(missionsManager.init()) : Promise.resolve(),
                safeTimeout(this.loadCustomMapPositions()),
                safeTimeout(this.loadCrystalRewards())
            ]);
        } catch (e) {
            console.warn('[App] Aviso durante inicialização prévia:', e);
        }

        // Os listeners em tempo real do Firestore para map_positions e crystal_rewards
        // são registrados apenas quando o usuário está autenticado (em onAuthStateChanged)
        // para evitar warnings de 'permission-denied' na landing page pública.

        // Watchdog de segurança: garante que o jogo NUNCA fique preso na tela de 'Inicializando sistema'
        // se o Firebase Auth demorar, falhar na conexão ou não disparar o evento onAuthStateChanged.
        this._authInitWatchdog = setTimeout(() => {
            const current = document.querySelector('.screen.active');
            if (!current || current.id === 'screen-loading') {
                console.warn('[App] Watchdog ativado: transição forçada para tela de Landing devido a demora no Auth.');
                this.ui.showScreen('landing');
                if (window.landingController) {
                    try { window.landingController.init(); } catch (err) { console.warn(err); }
                }
            }
        }, 2500);

        authManager.onAuthChange = (user) => {
            if (this._authInitWatchdog) {
                clearTimeout(this._authInitWatchdog);
                this._authInitWatchdog = null;
            }
            this.onAuthStateChanged(user);
        };
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
                // Inicia listeners protegidos de configurações globais após autenticação confirmada
                this.listenToCustomMapPositions();
                this.listenToCrystalRewards();

                // Carrega imediatamente o cache local do usuário logado para renderização instantânea
                this.engine.load();
                this.loadTheme();

                updateLoadingText('Entrando na Guilda', true);
                
                // Busca no Firestore com espera robusta (progresso do usuário e configurações do mapa/servidor)
                await Promise.allSettled([
                    this.engine.loadFromCloud(),
                    this.loadCustomMapPositions(),
                    this.loadCrystalRewards()
                ]);
                
                // Configuração e garantia de progresso para a conta combogounicap@gmail.com (Nível 5 + 6 Capítulos Desbloqueados)
                const userEmail = (user.email || '').toLowerCase().trim();
                if (userEmail === 'combogounicap@gmail.com') {
                    let needsSync = false;
                    if (!this.engine.state.level || this.engine.state.level < 5) {
                        this.engine.state.level = 5;
                        this.engine.state.xp = Math.max(this.engine.state.xp || 0, 1000);
                        needsSync = true;
                    }
                    if (!this.engine.state.chapters) this.engine.state.chapters = {};
                    if (!this.engine.state.chapterUnlocks) this.engine.state.chapterUnlocks = [0];

                    // Desbloqueia e conclui os 6 primeiros capítulos (0 a 5)
                    for (let chId = 0; chId <= 5; chId++) {
                        if (!this.engine.state.chapterUnlocks.includes(chId)) {
                            this.engine.state.chapterUnlocks.push(chId);
                            needsSync = true;
                        }
                        if (!this.engine.state.chapters[chId] || !this.engine.state.chapters[chId].completed) {
                            this.engine.state.chapters[chId] = {
                                story: true, concept: true, example: true, experiment: true, tutorial: true,
                                act1: true, act2: true, act3: true, completed: true
                            };
                            if (this.engine.unlockSystem) this.engine.unlockSystem(chId);
                            needsSync = true;
                        }
                    }

                    // Garante que o Capítulo 6 esteja disponível/desbloqueado no mapa
                    if (!this.engine.state.chapterUnlocks.includes(6)) {
                        this.engine.state.chapterUnlocks.push(6);
                        needsSync = true;
                    }

                    this.engine.state.introCompleted = true;
                    this.engine.state.onboardingCompleted = true;
                    this.engine.state.initialized = true;

                    if (needsSync) {
                        this.engine.save();
                        this.engine.saveToCloud(true);
                    }
                }

                // Restauração de progresso mínimo para a conta do professor rennan.raffaele@unicap.br
                // (Capítulos 0-5 completos, level 5 mínimo, cap 6 desbloqueado, currentChapter 5)
                if (userEmail === 'rennan.raffaele@unicap.br') {
                    let needsSync = false;
                    if (!this.engine.state.level || this.engine.state.level < 5) {
                        this.engine.state.level = 5;
                        this.engine.state.xp = Math.max(this.engine.state.xp || 0, 1000);
                        needsSync = true;
                    }
                    if (!this.engine.state.chapters) this.engine.state.chapters = {};
                    if (!this.engine.state.chapterUnlocks) this.engine.state.chapterUnlocks = [0];

                    // Garante capítulos 0 a 5 completos
                    for (let chId = 0; chId <= 5; chId++) {
                        if (!this.engine.state.chapterUnlocks.includes(chId)) {
                            this.engine.state.chapterUnlocks.push(chId);
                            needsSync = true;
                        }
                        if (!this.engine.state.chapters[chId] || !this.engine.state.chapters[chId].completed) {
                            this.engine.state.chapters[chId] = {
                                story: true, concept: true, example: true, experiment: true, tutorial: true,
                                act1: true, act2: true, act3: true, completed: true
                            };
                            if (this.engine.unlockSystem) this.engine.unlockSystem(chId);
                            needsSync = true;
                        }
                    }

                    // Capítulo 6 desbloqueado (para acesso imediato)
                    if (!this.engine.state.chapterUnlocks.includes(6)) {
                        this.engine.state.chapterUnlocks.push(6);
                        needsSync = true;
                    }

                    if ((this.engine.state.currentChapter || 0) < 5) {
                        this.engine.state.currentChapter = 5;
                        needsSync = true;
                    }

                    this.engine.state.introCompleted = true;
                    this.engine.state.onboardingCompleted = true;
                    this.engine.state.initialized = true;

                    if (needsSync) {
                        this.engine.save();
                        this.engine.saveToCloud(true);
                    }
                }

                // Restauração de conta / Recuperação de progresso: rennancr93@gmail.com
                // (Mundo C# Unity, Nível 50, 99999 Tokens, Todos os 38 Capítulos Concluídos, Todos os Avatares 01 a 24 Desbloqueados)
                if (userEmail === 'rennancr93@gmail.com') {
                    let needsSync = false;

                    // 1. Dimensão C# Unity & Papel Mestre
                    if (this.engine.state.worldId !== 'csharp_unity') {
                        this.engine.state.worldId = 'csharp_unity';
                        needsSync = true;
                    }

                    // 2. Nível 50 & 99999 Tokens
                    if (!this.engine.state.level || this.engine.state.level < 50) {
                        this.engine.state.level = 50;
                        this.engine.state.xp = Math.max(this.engine.state.xp || 0, 150000);
                        needsSync = true;
                    }
                    if (!this.engine.state.tokens || this.engine.state.tokens < 99999) {
                        this.engine.state.tokens = 99999;
                        needsSync = true;
                    }

                    // 3. Todos os 38 Capítulos do Mundo C# (0 a 37) desbloqueados e concluídos
                    if (!this.engine.state.chapters) this.engine.state.chapters = {};
                    if (!this.engine.state.chapterUnlocks) this.engine.state.chapterUnlocks = [0];

                    const csharpCapIds = Array.from({ length: 38 }, (_, i) => i);
                    for (let chId = 0; chId < 38; chId++) {
                        if (!this.engine.state.chapterUnlocks.includes(chId)) {
                            this.engine.state.chapterUnlocks.push(chId);
                            needsSync = true;
                        }
                        const existingCh = this.engine.state.chapters[chId];
                        if (!existingCh || !existingCh.completed) {
                            this.engine.state.chapters[chId] = {
                                story: true, concept: true, example: true, experiment: true, tutorial: true,
                                act1: true, act2: true, act3: true, act4: true, act5: true, completed: true
                            };
                            if (this.engine.unlockSystem) this.engine.unlockSystem(chId);
                            needsSync = true;
                        }
                    }

                    this.engine.state.chapterUnlocks = Array.from(new Set(this.engine.state.chapterUnlocks)).sort((a, b) => a - b);
                    this.engine.state.currentChapter = 37;

                    // 4. Todos os Avatares do jogo desbloqueados ('01' a '24')
                    const allAvatarIds = Array.from({ length: 24 }, (_, i) => String(i + 1).padStart(2, '0'));
                    if (!Array.isArray(this.engine.state.unlockedAvatars)) {
                        this.engine.state.unlockedAvatars = allAvatarIds;
                        needsSync = true;
                    } else {
                        for (const avId of allAvatarIds) {
                            if (!this.engine.state.unlockedAvatars.includes(avId)) {
                                this.engine.state.unlockedAvatars.push(avId);
                                needsSync = true;
                            }
                        }
                    }

                    // 5. Pontos de status e habilidades para o Nível 50
                    const ptsPerLevel = 3; // C# Unity
                    this.engine.state.statPoints = Math.max(this.engine.state.statPoints || 0, (50 - 1) * ptsPerLevel);
                    this.engine.state.skillPoints = Math.max(this.engine.state.skillPoints || 0, 50 - 4);

                    this.engine.state.introCompleted = true;
                    this.engine.state.onboardingCompleted = true;
                    this.engine.state.initialized = true;

                    if (needsSync) {
                        this.engine.save();
                        this.engine.saveToCloud(true);
                    }
                }

                // Restauração de conta / Recuperação de progresso: emvidyagamedev@gmail.com
                // (Level 18, 4000 Tokens, Missão/Capítulo 29 com 0-28 concluídos, Abismo até o 17 completo)
                if (userEmail === 'emvidyagamedev@gmail.com') {
                    let needsSync = false;

                    // 1. Nível 18 e XP correspondente
                    if (!this.engine.state.level || this.engine.state.level < 18) {
                        this.engine.state.level = 18;
                        this.engine.state.xp = Math.max(this.engine.state.xp || 0, 0);
                        needsSync = true;
                    }

                    // 2. 4000 Tokens garantidos
                    if (!this.engine.state.tokens || this.engine.state.tokens < 4000) {
                        this.engine.state.tokens = 4000;
                        needsSync = true;
                    }

                    // 3. Capítulos e Desbloqueios: estar na missão/capítulo 29 com o resto (0 a 28) concluído
                    if (!this.engine.state.chapters) this.engine.state.chapters = {};
                    if (!this.engine.state.chapterUnlocks) this.engine.state.chapterUnlocks = [0];

                    for (let chId = 0; chId <= 28; chId++) {
                        if (!this.engine.state.chapterUnlocks.includes(chId)) {
                            this.engine.state.chapterUnlocks.push(chId);
                            needsSync = true;
                        }
                        if (!this.engine.state.chapters[chId] || !this.engine.state.chapters[chId].completed) {
                            this.engine.state.chapters[chId] = {
                                story: true, concept: true, example: true, experiment: true, tutorial: true,
                                act1: true, act2: true, act3: true, completed: true
                            };
                            if (this.engine.unlockSystem) this.engine.unlockSystem(chId);
                            needsSync = true;
                        }
                    }

                    // Desbloqueia e posiciona na missão 29
                    if (!this.engine.state.chapterUnlocks.includes(29)) {
                        this.engine.state.chapterUnlocks.push(29);
                        needsSync = true;
                    }
                    if ((this.engine.state.currentChapter || 0) < 29) {
                        this.engine.state.currentChapter = 29;
                        needsSync = true;
                    }

                    // 4. Abismo até o Andar 17 completo (Andares 0 a 17, 5 câmaras por andar)
                    if (!this.engine.state.abyss) {
                        this.engine.state.abyss = { completedChambers: {}, claimedRewards: {}, seasonCycle: 1 };
                        needsSync = true;
                    }
                    if (!this.engine.state.abyss.completedChambers) {
                        this.engine.state.abyss.completedChambers = {};
                        needsSync = true;
                    }
                    if (!this.engine.state.abyss.claimedRewards) {
                        this.engine.state.abyss.claimedRewards = {};
                        needsSync = true;
                    }

                    for (let f = 0; f <= 17; f++) {
                        // Marca as 5 câmaras de cada andar como concluídas
                        for (let c = 1; c <= 5; c++) {
                            const chamberKey = `sq${f}_${c}`;
                            if (!this.engine.state.abyss.completedChambers[chamberKey]) {
                                this.engine.state.abyss.completedChambers[chamberKey] = true;
                                needsSync = true;
                            }
                        }
                        // Marca recompensa do andar como resgatada
                        if (!this.engine.state.abyss.claimedRewards[f] && !this.engine.state.abyss.claimedRewards[String(f)]) {
                            this.engine.state.abyss.claimedRewards[f] = true;
                            this.engine.state.abyss.claimedRewards[String(f)] = true;
                            needsSync = true;
                        }
                    }

                    // 5. Pontos de status e flags de onboarding
                    if ((this.engine.state.statPoints === undefined || this.engine.state.statPoints === null || this.engine.state.statPoints === 0)) {
                        const isCSharp = this.engine.state.worldId === 'csharp_unity';
                        const ptsPerLevel = isCSharp ? 3 : 5;
                        this.engine.state.statPoints = Math.max(this.engine.state.statPoints || 0, (18 - 1) * ptsPerLevel);
                        needsSync = true;
                    }

                    if ((this.engine.state.skillPoints || 0) < (18 - 4)) {
                        this.engine.state.skillPoints = Math.max(this.engine.state.skillPoints || 0, 18 - 4);
                        needsSync = true;
                    }

                    this.engine.state.introCompleted = true;
                    this.engine.state.onboardingCompleted = true;
                    this.engine.state.initialized = true;

                    if (needsSync) {
                        this.engine.save();
                        this.engine.saveToCloud(true);
                    }
                }

                // Restauração de conta / Recuperação de progresso: liviappires94@gmail.com
                // (Mundo C, Nível 5, Capítulo 03 de Funções, Avatar Otaku Chan [19], 850 Tokens)
                if (userEmail === 'liviappires94@gmail.com') {
                    let needsSync = false;

                    // 1. Dimensão Mundo C
                    if (this.engine.state.worldId !== 'c_lang') {
                        this.engine.state.worldId = 'c_lang';
                        needsSync = true;
                    }

                    // 2. Nível 5
                    if (!this.engine.state.level || this.engine.state.level < 5) {
                        this.engine.state.level = 5;
                        this.engine.state.xp = Math.max(this.engine.state.xp || 0, 0);
                        needsSync = true;
                    }

                    // 3. 850 Tokens
                    if (!this.engine.state.tokens || this.engine.state.tokens < 850) {
                        this.engine.state.tokens = 850;
                        needsSync = true;
                    }

                    // 4. Capítulo 03 de Funções (Capítulos 0 a 2 concluídos, 3 desbloqueado e ativo)
                    if (!this.engine.state.chapters) this.engine.state.chapters = {};
                    if (!this.engine.state.chapterUnlocks) this.engine.state.chapterUnlocks = [0];

                    for (let chId = 0; chId <= 2; chId++) {
                        if (!this.engine.state.chapterUnlocks.includes(chId)) {
                            this.engine.state.chapterUnlocks.push(chId);
                            needsSync = true;
                        }
                        if (!this.engine.state.chapters[chId] || !this.engine.state.chapters[chId].completed) {
                            this.engine.state.chapters[chId] = {
                                story: true, concept: true, example: true, experiment: true, tutorial: true,
                                act1: true, act2: true, act3: true, completed: true
                            };
                            if (this.engine.unlockSystem) this.engine.unlockSystem(chId);
                            needsSync = true;
                        }
                    }

                    // Desbloqueia e define o Capítulo 3 como atual
                    if (!this.engine.state.chapterUnlocks.includes(3)) {
                        this.engine.state.chapterUnlocks.push(3);
                        needsSync = true;
                    }
                    this.engine.state.chapterUnlocks = Array.from(new Set(this.engine.state.chapterUnlocks)).sort((a, b) => a - b);
                    if ((this.engine.state.currentChapter === undefined || this.engine.state.currentChapter < 3)) {
                        this.engine.state.currentChapter = 3;
                        needsSync = true;
                    }

                    // 5. Avatar Otaku Chan ('19')
                    if (!Array.isArray(this.engine.state.unlockedAvatars)) {
                        this.engine.state.unlockedAvatars = ['02', '19'];
                        needsSync = true;
                    } else if (!this.engine.state.unlockedAvatars.includes('19')) {
                        this.engine.state.unlockedAvatars.push('19');
                        needsSync = true;
                    }
                    if (this.engine.state.currentAvatarId !== '19' || this.engine.state.avatarId !== '19') {
                        this.engine.state.currentAvatarId = '19';
                        this.engine.state.avatarId = '19';
                        needsSync = true;
                    }

                    // 6. Pontos de status (20 pts para Lv.5 no Mundo C) e Skill Points
                    const ptsPerLevel = 5; // C
                    const requiredStatPoints = (5 - 1) * ptsPerLevel;
                    if ((this.engine.state.statPoints === undefined || this.engine.state.statPoints < requiredStatPoints)) {
                        this.engine.state.statPoints = Math.max(this.engine.state.statPoints || 0, requiredStatPoints);
                        needsSync = true;
                    }
                    if ((this.engine.state.skillPoints === undefined || this.engine.state.skillPoints < 1)) {
                        this.engine.state.skillPoints = Math.max(this.engine.state.skillPoints || 0, 1);
                        needsSync = true;
                    }

                    this.engine.state.introCompleted = true;
                    this.engine.state.onboardingCompleted = true;
                    this.engine.state.initialized = true;

                    if (needsSync) {
                        this.engine.save();
                        this.engine.saveToCloud(true);
                    }
                }

                if (typeof authManager !== 'undefined' && authManager.isTeacher()) {
                    if (this.engine.state.tokens === undefined || this.engine.state.tokens === null) {
                        this.engine.state.tokens = 9999;
                    }
                    const classCode = authManager.getClassCode();
                    if (classCode) {
                        fbDB.collection('classes').doc(classCode).get().then(classDoc => {
                            if (classDoc && classDoc.exists && classDoc.data().chapterUnlocks) {
                                const classUnlocks = classDoc.data().chapterUnlocks || [];
                                const currentUnlocks = this.engine.state.chapterUnlocks || [0];
                                // Mescla sem regredir os desbloqueios já conquistados pelo professor
                                const mergedUnlocks = Array.from(new Set([...currentUnlocks, ...classUnlocks])).sort((a, b) => a - b);
                                this.engine.setChapterUnlocks(mergedUnlocks);
                                if (this.ui.currentScreen === 'dashboard') this.ui.renderDashboard();
                            }
                        }).catch(() => {});
                    }
                }

                updateLoadingText('Sistema pronto.');

                const isMaster = (typeof authManager !== 'undefined' && (authManager.isTeacher() || authManager.isAdmin()));
                const authDisplayName = typeof authManager !== 'undefined' ? authManager.getDisplayName() : '';
                const engineName = this.engine.getPlayerName();
                const validName = (engineName && engineName !== 'Aventureiro') ? engineName : authDisplayName;
                
                if (validName) {
                    this.engine.setPlayerName(validName);
                }

                // Se o jogador já tem nível > 1, XP > 0 ou capítulos concluídos, considera a intro como realizada
                const hasExistingProgress = this.engine.getLevel() > 1 || 
                                            this.engine.getXP() > 0 || 
                                            Object.keys(this.engine.state.chapters || {}).length > 0;

                if (hasExistingProgress && !this.engine.isIntroCompleted()) {
                    this.engine.completeIntro();
                    this.engine.save();
                }

                const isIntroDone = this.engine.isIntroCompleted() || hasExistingProgress;
                const isOnboardingDone = this.engine.isOnboardingCompleted();

                // Fecha o modal de autenticação da landing se estiver aberto
                this.closeAuthModal();

                // Configuração e garantia de mundo C# Unity para a conta rennancr93@gmail.com
                if (userEmail === 'rennancr93@gmail.com') {
                    if (this.engine.state.worldId !== 'csharp_unity') {
                        this.engine.state.worldId = 'csharp_unity';
                        this.engine.save();
                    }
                    if (authManager.userData) {
                        authManager.userData.worldId = 'csharp_unity';
                        authManager.userData.role = 'teacher';
                    }
                    if (authManager.currentUser && typeof fbDB !== 'undefined') {
                        fbDB.collection('users').doc(authManager.currentUser.uid).set({ 
                            worldId: 'csharp_unity',
                            role: 'teacher'
                        }, { merge: true }).catch(() => {});
                    }
                }

                // Sincroniza worldId do Firestore no Engine
                let userWorldId = (authManager.userData && authManager.userData.worldId) || this.engine.state.worldId;

                // Se o jogador já tem progresso ou conta existente prévia sem worldId, fixa no Mundo C
                if (!userWorldId && (hasExistingProgress || isIntroDone || isMaster)) {
                    userWorldId = 'c_lang';
                    this.engine.state.worldId = 'c_lang';
                    if (authManager.userData) authManager.userData.worldId = 'c_lang';
                    if (authManager.currentUser && typeof fbDB !== 'undefined') {
                        fbDB.collection('users').doc(authManager.currentUser.uid).set({ worldId: 'c_lang' }, { merge: true }).catch(() => {});
                    }
                } else if (userWorldId) {
                    this.engine.state.worldId = userWorldId;
                    if (authManager.userData) authManager.userData.worldId = userWorldId;
                }

                // Apenas novos usuários (sem progresso prévio e sem worldId) recebem a mensagem/modal para escolher a Dimensão
                if (!isMaster && !userWorldId) {
                    this.openWorldSelectionModal();
                    return;
                }

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

                // Inicializa o agendador de backup diário automático (00:00 com timestamp)
                this.initDailyProgressBackupScheduler();
            } catch (err) {
                console.error('[App] onAuthStateChanged error:', err);
                this.ui.showScreen('dashboard');
                this.ui.renderDashboard();
                if (typeof chatUI !== 'undefined') {
                    chatUI.init();
                }
            }
        } else {
            // Desconecta listeners de configurações globais ao sair da conta
            if (this._mapPositionsUnsubscribe) {
                try { this._mapPositionsUnsubscribe(); } catch (_) {}
                this._mapPositionsUnsubscribe = null;
            }
            if (this._crystalRewardsUnsubscribe) {
                try { this._crystalRewardsUnsubscribe(); } catch (_) {}
                this._crystalRewardsUnsubscribe = null;
            }

            this.setLoginLoading(false);
            updateLoadingText('Aguardando autenticação...');
            this.ui.showScreen('landing');
            if (window.landingController) {
                try {
                    window.landingController.init();
                } catch (landingErr) {
                    console.warn('[App] Erro na inicialização da Landing Page:', landingErr);
                }
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

    // ─── SELEÇÃO DE SERVIDOR / MUNDO (CARD A: DIMENSÃO C & CARD B: DIMENSÃO C# UNITY) ───
    openWorldSelectionModal() {
        this.selectedWorldChoice = 'c_lang'; // Padrão selecionado
        this.closeAuthModal();
        const landingScreen = document.getElementById('screen-landing');
        if (landingScreen) {
            landingScreen.classList.remove('active');
        }
        const modal = document.getElementById('modal-world-selection');
        if (modal) {
            modal.classList.remove('hidden');
            this.selectWorldCard('c_lang');
        }
    }

    closeWorldSelectionModal() {
        const modal = document.getElementById('modal-world-selection');
        if (modal) modal.classList.add('hidden');
    }

    selectWorldCard(worldId) {
        this.selectedWorldChoice = worldId;
        const cardC = document.getElementById('card-world-c');
        const cardCS = document.getElementById('card-world-csharp');

        if (cardC && cardCS) {
            const badgeC = cardC.querySelector('.world-selected-badge');
            const badgeCS = cardCS.querySelector('.world-selected-badge');

            if (worldId === 'c_lang') {
                cardC.style.borderColor = 'var(--purple-bright)';
                cardC.style.boxShadow = '0 0 25px rgba(168, 85, 247, 0.3)';
                if (badgeC) badgeC.style.display = 'inline-block';

                cardCS.style.borderColor = 'rgba(56, 189, 248, 0.2)';
                cardCS.style.boxShadow = 'none';
                if (badgeCS) badgeCS.style.display = 'none';
            } else {
                cardCS.style.borderColor = 'var(--cyan)';
                cardCS.style.boxShadow = '0 0 25px rgba(56, 189, 248, 0.3)';
                if (badgeCS) badgeCS.style.display = 'inline-block';

                cardC.style.borderColor = 'rgba(168, 85, 247, 0.2)';
                cardC.style.boxShadow = 'none';
                if (badgeC) badgeC.style.display = 'none';
            }
        }
    }

    async confirmWorldSelection() {
        const chosenWorld = this.selectedWorldChoice || 'c_lang';
        const user = authManager.currentUser;
        
        try {
            // 1. Grava no estado local do engine
            this.engine.state.worldId = chosenWorld;
            this.engine.save();

            // 2. Grava de forma permanente no perfil do Firestore se o usuário estiver autenticado
            if (user && typeof fbDB !== 'undefined') {
                await fbDB.collection('users').doc(user.uid).set({
                    worldId: chosenWorld,
                    worldChosenAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
                if (authManager.userData) {
                    authManager.userData.worldId = chosenWorld;
                }
            }

            this.closeWorldSelectionModal();

            const worldLabel = chosenWorld === 'csharp_unity' ? 'Dimensão C# Unity' : 'Dimensão C';
            this.ui.showToast(`Bem-vindo à ${worldLabel}! Servidor vinculado com sucesso.`, 'success');

            const isIntroDone = this.engine.isIntroCompleted();
            if (!isIntroDone) {
                this.startIntro();
            } else {
                this.ui.showScreen('dashboard');
                this.ui.renderDashboard();
            }
        } catch (e) {
            console.error('[App] Erro ao vincular mundo:', e);
            this.ui.showToast('Erro ao salvar seleção de mundo. Tente novamente.', 'error');
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
                
                // Pré-validação com o validador anti-fake do AuthManager
                if (typeof authManager !== 'undefined' && typeof authManager.validateEmailDomain === 'function') {
                    const check = authManager.validateEmailDomain(email);
                    if (!check.valid) {
                        if (emailEl) { emailEl.classList.add('input-error'); emailEl.focus(); }
                        this.showLoginError(check.reason, 'register');
                        return;
                    }
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
                    } else if (e.code === 'auth/invalid-email-domain' || e.code === 'auth/invalid-email') {
                        if (emailEl) emailEl.classList.add('input-error');
                        this.showLoginError(e.message || 'Email ou domínio inválido para cadastro.', 'register');
                    } else {
                        this.showLoginError(this.translateAuthError(e.code) || e.message, 'register');
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
        if (this._dailyBackupTimer) {
            clearTimeout(this._dailyBackupTimer);
            this._dailyBackupTimer = null;
        }
        if (this._dailyBackupCheckInterval) {
            clearInterval(this._dailyBackupCheckInterval);
            this._dailyBackupCheckInterval = null;
        }
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

    // ─── AGENDADOR DE PONTO DIÁRIO AUTOMÁTICO (00:00 COM TIMESTAMP) ───
    initDailyProgressBackupScheduler() {
        if (this._dailyBackupTimer) clearTimeout(this._dailyBackupTimer);
        if (this._dailyBackupCheckInterval) clearInterval(this._dailyBackupCheckInterval);

        // Verifica imediatamente se o ponto do dia atual já foi criado
        this.checkDailyProgressSnapshot();

        // Agenda timeout preciso para a próxima meia-noite (00:00:00 local)
        const scheduleNextMidnight = () => {
            const now = new Date();
            const tomorrowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 500);
            const msUntilMidnight = tomorrowMidnight.getTime() - now.getTime();

            this._dailyBackupTimer = setTimeout(() => {
                this.checkDailyProgressSnapshot();
                scheduleNextMidnight();
            }, msUntilMidnight);
        };

        scheduleNextMidnight();

        // Intervalo periódico de contingência a cada 15 minutos para caso de hibernação/aba em segundo plano
        this._dailyBackupCheckInterval = setInterval(() => {
            this.checkDailyProgressSnapshot();
        }, 15 * 60 * 1000);
    }

    async checkDailyProgressSnapshot() {
        if (typeof authManager === 'undefined' || !authManager.isSignedIn() || !authManager.currentUser) return;
        const uid = authManager.currentUser.uid;
        if (!uid) return;

        const todayKey = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        const storageKey = `gc_last_daily_backup_${uid}`;
        const lastBackupDate = localStorage.getItem(storageKey);

        if (lastBackupDate !== todayKey) {
            try {
                const currentState = (this.engine && this.engine.state) ? this.engine.state : null;
                const snapId = await authManager.createProgressSnapshot('daily_midnight_auto', currentState);
                if (snapId) {
                    localStorage.setItem(storageKey, todayKey);
                    console.log(`[App] Ponto de restauração diário automático criado com sucesso (${todayKey}):`, snapId);
                }
            } catch (e) {
                console.warn('[App] Erro ao registrar ponto diário automático:', e);
            }
        }
    }

}

if (typeof module !== "undefined") { module.exports = { GuildCodeApp }; }
if (typeof window !== "undefined") { window.GuildCodeApp = GuildCodeApp; }
