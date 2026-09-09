/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Landing Page Interactive Controller
   Gerencia os eventos, carrossel de personagens e abertura de modais
   ═══════════════════════════════════════════════════════════════ */

class LandingPageController {
    constructor() {
        this.currentCharacter = 'arkan';
        this.currentWorldTab = 'c_lang';
        this._midnightTimer = null;
        this.charactersData = {
            arkan: {
                name: "ARKAN",
                fullName: "Arkan Velor",
                role: "Mestre da Guilda & Conjurador de Estruturas",
                quote: "\"Se não conseguirmos compilar nossa vontade com precisão, as sombras do Abismo destruirão este mundo.\"",
                bio: "Líder supremo dos Codemancers em Aethelgard. Especialista nas artes ancestrais de Entrada e Saída (I/O) e manipulação direta de variáveis primordiais.",
                image: "assets/characters/char_arkan.png",
                color: "#38bdf8"
            },
            lyra: {
                name: "LYRA",
                fullName: "Lyra Nex",
                role: "Arquivista & Guardiã das Decisões",
                quote: "\"Cada ramificação condicional traça um destino. Escolha seu caminho antes que o ciclo infinito o consuma.\"",
                bio: "Pesquisadora sênior da Cidadela, mestra na arte de controle de fluxo (if/else, loops) e alocação de vetores dimensionais.",
                image: "assets/characters/char_lyra.png",
                color: "#c084fc"
            },
            kael: {
                name: "KAEL",
                fullName: "Kael Thorn",
                role: "Ferreiro de Código & Mestre do Arsenal",
                quote: "\"Um algoritmo sem otimização é como uma espada de ferro bruto. Eu forjo desempenho em alta temperatura.\"",
                bio: "Responsável pelo Grande Arsenal e Forjas Magmáticas. Domina a inserção ordenada, ordenação em memória e algoritmos de alta eficiência.",
                image: "assets/characters/char_kael.png",
                color: "#fb923c"
            },
            mira: {
                name: "MIRA",
                fullName: "Mira Solis",
                role: "Cartógrafa Dimensional",
                quote: "\"O espaço é uma matriz bidimensional de infinitas possibilidades. Eu desenho as coordenadas da vitória.\"",
                bio: "Mapeadora dos 16 Distritos e das profundezas fractais. Canaliza matrizes espaciais e recursividade pura.",
                image: "assets/characters/char_mira.png",
                color: "#4ade80"
            },
            elion: {
                name: "ELION",
                fullName: "Elion Dusk",
                role: "Grande Bibliotecário & Mestre dos Registros",
                quote: "\"Palavras são ponteiros para a alma; tipos estruturados são contratos eternos com a realidade.\"",
                bio: "Guardião do Pavilhão dos Contratos e Scriptorium. Domina cadeias de caracteres (Strings), Registros (structs) e ponteiros sagrados.",
                image: "assets/characters/char_elion.png",
                color: "#a855f7"
            },
            orin: {
                name: "ORIN",
                fullName: "Orin Vega",
                role: "Mensageiro dos Três Planos",
                quote: "\"A velocidade da luz é lenta se comparada à passagem de parâmetros por referência.\"",
                bio: "Navegador veloz entre a Cidadela e o Plano Astral. Garante que os pacotes de dados cheguem intactos às fronteiras.",
                image: "assets/characters/char_orin.png",
                color: "#60a5fa"
            }
        };
    }

    init() {
        this.bindEvents();
        this.selectCharacter('arkan');
        this.renderGachaCodemancers();
        this.renderRaidBossesCarousel();
        this.loadHeroStats();
        // Pré-carrega o conteúdo da enciclopédia de features
        this.switchFeaturesTab('characters');
    }

    // ─── SELETOR DE MUNDO (WORLDBUILDING TABS) ───
    selectWorldTab(worldId) {
        this.currentWorldTab = worldId;

        // Atualiza botões
        document.querySelectorAll('.world-lore-tab').forEach(btn => {
            const isActive = btn.getAttribute('data-world-tab') === worldId;
            btn.classList.toggle('active', isActive);
        });

        // Mostra/oculta conteúdo com animação
        const cContent = document.getElementById('world-lore-c_lang');
        const csContent = document.getElementById('world-lore-csharp');

        if (worldId === 'c_lang') {
            if (csContent) csContent.classList.add('hidden');
            if (cContent) { cContent.classList.remove('hidden'); }
        } else {
            if (cContent) cContent.classList.add('hidden');
            if (csContent) { csContent.classList.remove('hidden'); }
        }
    }

    // ─── HERO STATS COM FIREBASE + SWR ───
    async loadHeroStats() {
        const SWR_KEY = 'landing_hero_stats';
        const SWR_TTL = 24 * 60 * 60 * 1000; // 24h — revalidado à meia-noite via timer

        const el = document.getElementById('stat-players');
        if (!el) return;

        const formatCount = (n) => {
            if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K+';
            return String(n) + '+';
        };

        const animateCount = (element, target) => {
            const numeric = parseInt(String(target).replace(/[^\d]/g, ''), 10);
            if (!numeric || isNaN(numeric)) { element.textContent = target; return; }
            const duration = 1200;
            const start = performance.now();
            const startVal = 0;
            const update = (now) => {
                const elapsed = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - elapsed, 3); // ease-out cubic
                const current = Math.round(startVal + (numeric - startVal) * eased);
                element.textContent = target.toString().includes('K') 
                    ? (current / 1000).toFixed(1).replace('.0','') + 'K+'
                    : current + (target.toString().includes('+') ? '+' : '');
                if (elapsed < 1) requestAnimationFrame(update);
                else element.textContent = target;
            };
            requestAnimationFrame(update);
        };

        const fetchAndRender = async () => {
            try {
                if (typeof fbDB === 'undefined') return;

                // Usa SWR cache se disponível e recente
                if (typeof swrCache !== 'undefined') {
                    const cached = swrCache.get(SWR_KEY);
                    if (cached && cached.count !== undefined) {
                        animateCount(el, formatCount(cached.count));
                    }
                }

                // Busca contagem real no Firestore (aggregate count)
                let count = 0;
                try {
                    // Tenta aggregate count (mais barato — 1 read)
                    const snap = await fbDB.collection('users').count().get();
                    count = snap.data().count;
                } catch (_) {
                    // Fallback: get() com size (compatível com Compat SDK sem aggregate)
                    const snap = await fbDB.collection('users').get();
                    count = snap.size;
                }

                const formatted = formatCount(count);
                animateCount(el, formatted);

                if (typeof swrCache !== 'undefined') {
                    swrCache.set(SWR_KEY, { count, updatedAt: Date.now() });
                }
            } catch (err) {
                console.warn('[LandingStats] Falha ao buscar jogadores:', err?.message || err);
                el.textContent = '---';
            }
        };

        await fetchAndRender();
        this._scheduleMidnightRefresh(fetchAndRender);
    }

    _scheduleMidnightRefresh(fn) {
        if (this._midnightTimer) clearTimeout(this._midnightTimer);
        const now = new Date();
        const midnight = new Date(now);
        midnight.setDate(midnight.getDate() + 1);
        midnight.setHours(0, 0, 0, 0);
        const msUntilMidnight = midnight.getTime() - now.getTime();
        this._midnightTimer = setTimeout(async () => {
            await fn();
            this._scheduleMidnightRefresh(fn); // reagenda para a próxima meia-noite
        }, msUntilMidnight);
    }

    // ─── GACHA CODEMANCERS (CARROSSEL DINÂMICO 3D INFINITO) ───
    renderGachaCodemancers() {
        const track = document.getElementById('landing-codemancers-track');
        if (!track) return;

        const skillsData = (typeof AVATAR_SKILLS_DATA !== 'undefined' && AVATAR_SKILLS_DATA)
            ? AVATAR_SKILLS_DATA
            : (window.AVATAR_SKILLS_DATA || {});

        const raritiesData = (typeof AVATAR_RARITIES !== 'undefined' && AVATAR_RARITIES)
            ? AVATAR_RARITIES
            : (window.AVATAR_RARITIES || {});

        // Todos os avatares jogáveis da temporada (exceto shadow coder restrito a professor)
        const avatars = Object.values(skillsData).filter(av => !av.teacherOnly && av.id !== '01');
        if (avatars.length === 0) return;

        const createCardHTML = (av, uniqueIndex) => {
            const rInfo = raritiesData[av.rarity] || { label: 'Comum', stars: 3, color: '#94a3b8' };
            const starSVG = `<svg class="star-filled" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
            const starsHtml = Array.from({ length: rInfo.stars || 3 }, () => starSVG).join('');
            const cardDomId = `landing-carousel-card-${uniqueIndex}`;

            return `
                <div class="landing-tcg-card-wrap">
                    <div class="inv-avatar-card tcg-card-3d" id="${cardDomId}" style="--rarity-color:${rInfo.color}" onclick="this.classList.toggle('is-flipped')" title="Clique para virar a carta">
                        <div class="tcg-card-inner">
                            <!-- FACE FRONTAL (FRENTE) -->
                            <div class="tcg-card-face tcg-card-front">
                                <div class="tcg-card-holo-frame"></div>
                                <div class="tcg-card-glare"></div>
                                <div class="tcg-card-holo-foil"></div>
                                <div class="inv-avatar-card-rarity-bar" style="background: linear-gradient(90deg, ${rInfo.color}, transparent);"></div>
                                <div class="inv-avatar-card-img-wrap">
                                    <div class="tcg-geo-pattern"></div>
                                    <div class="tcg-foil-sparkles"></div>
                                    <img class="inv-avatar-card-ghost-aura" src="assets/avatars/avatar_${av.id}.png" alt="" aria-hidden="true" onerror="this.style.display='none'">
                                    <img class="inv-avatar-card-img" src="assets/avatars/avatar_${av.id}.png" alt="${av.name}" onerror="this.style.opacity='0.3'">
                                </div>
                                <div class="inv-avatar-card-body">
                                    <div class="tcg-card-top-row">
                                        <div class="inv-avatar-stars">${starsHtml}</div>
                                    </div>
                                    <div class="tcg-card-identity">
                                        <div class="inv-avatar-name">${av.name}</div>
                                        <div class="inv-avatar-title">${av.title || 'Codemancer'}</div>
                                    </div>
                                    <div class="tcg-compact-stats">
                                        <div class="tcg-cstat-pill hp" title="Pontos de Vida"><span class="tcg-cstat-lbl">HP</span><span class="tcg-cstat-val">${av.baseHp || 100}</span></div>
                                        <div class="tcg-cstat-pill atk" title="Poder de Ataque"><span class="tcg-cstat-lbl">ATK</span><span class="tcg-cstat-val">${av.baseAttack || 30}</span></div>
                                        <div class="tcg-cstat-pill def" title="Defesa / Resistência"><span class="tcg-cstat-lbl">DEF</span><span class="tcg-cstat-val">${av.baseDefense || 25}</span></div>
                                        <div class="tcg-cstat-pill spd" title="Velocidade de Ação"><span class="tcg-cstat-lbl">SPD</span><span class="tcg-cstat-val">${av.baseSpeed || 20}</span></div>
                                    </div>
                                    <div class="inv-avatar-skill">
                                        <span class="inv-avatar-skill-label">Habilidade Passiva</span>
                                        <span class="inv-avatar-skill-name">${av.skillName}</span>
                                        <span class="inv-avatar-skill-desc">${av.skillDesc}</span>
                                    </div>
                                </div>
                                <div class="tcg-card-bottom-foil">
                                    <span class="tcg-serial">NO. ${(av.id || '01').padStart(3, '0')} / CODE LEVELER TCG</span>
                                    <span class="tcg-edition">1ST ED</span>
                                </div>
                            </div>
                            <!-- FACE TRASEIRA (VERSO / BACK CARD) -->
                            <div class="tcg-card-face tcg-card-back">
                                <div class="tcg-card-holo-frame"></div>
                                <div class="tcg-card-glare"></div>
                                <div class="tcg-card-back-img-wrap">
                                    <img class="tcg-card-back-img" src="assets/backCard_C.png" alt="Card Back" onerror="this.src='assets/backCard_C.png'">
                                </div>
                                <div class="tcg-card-back-footer">
                                    <span class="tcg-back-brand">GUILDCODE TCG</span>
                                    <span class="tcg-back-hint">Clique para desvirar</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        };

        // Duplica a lista de avatares para criar a transição perfeita e contínua em loop sem corte
        const combined = [...avatars, ...avatars];
        track.innerHTML = combined.map((av, idx) => createCardHTML(av, idx)).join('');

        // Inicializa física 3D LERP de cada card da trilha do carrossel
        setTimeout(() => {
            combined.forEach((_, idx) => {
                const card = document.getElementById(`landing-carousel-card-${idx}`);
                if (card && typeof UIRenderer !== 'undefined' && UIRenderer.setupUniversalCard3D) {
                    UIRenderer.setupUniversalCard3D(card);
                }
            });
        }, 120);
    }

    // ─── CARROSSEL RAID BOSS (SENTIDO ESQUERDA PARA DIREITA) ───
    renderRaidBossesCarousel() {
        const track = document.getElementById('landing-bosses-track');
        if (!track) return;

        const bosses = (typeof BOSS_DEFINITIONS !== 'undefined' && Array.isArray(BOSS_DEFINITIONS) && BOSS_DEFINITIONS.length > 0)
            ? BOSS_DEFINITIONS
            : (window.BOSS_DEFINITIONS || []);

        if (bosses.length === 0) return;

        const starSVG = `<svg class="star-filled" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
        const starsHtml = Array.from({ length: 6 }, () => starSVG).join('');

        const createBossCardHTML = (boss, uniqueIndex) => {
            const cardDomId = `landing-boss-card-${uniqueIndex}`;
            const chapterNum = String(boss.chapterId || '0').padStart(3, '0');

            return `
                <div class="landing-tcg-card-wrap">
                    <div class="inv-avatar-card tcg-card-3d" id="${cardDomId}" style="--rarity-color: #ef4444; --rarity-glow: rgba(239, 68, 68, 0.45);" onclick="this.classList.toggle('is-flipped')" title="Clique para virar a carta">
                        <div class="tcg-card-inner">
                            <!-- FACE FRONTAL (FRENTE) -->
                            <div class="tcg-card-face tcg-card-front">
                                <div class="tcg-card-holo-frame"></div>
                                <div class="tcg-card-glare"></div>
                                <div class="tcg-card-holo-foil"></div>
                                <div class="inv-avatar-card-rarity-bar" style="background: linear-gradient(90deg, #ef4444, transparent);"></div>
                                <div class="inv-avatar-card-img-wrap" style="background: radial-gradient(circle at 50% 60%, rgba(220, 38, 38, 0.3), transparent 70%);">
                                    <div class="tcg-geo-pattern"></div>
                                    <div class="tcg-foil-sparkles"></div>
                                    <img class="inv-avatar-card-ghost-aura" src="${boss.spriteUrl}" alt="" aria-hidden="true" style="filter: blur(26px) saturate(2.4) brightness(1.2); opacity: 0.6;" onerror="this.style.display='none'">
                                    <img class="inv-avatar-card-img boss-tcg-sprite" src="${boss.spriteUrl}" alt="${boss.name}" onerror="this.style.opacity='0.3'">
                                </div>
                                <div class="inv-avatar-card-body">
                                    <div class="tcg-card-top-row">
                                        <div class="inv-avatar-stars" style="color: #ef4444;">${starsHtml}</div>
                                    </div>
                                    <div class="tcg-card-identity">
                                        <div class="inv-avatar-name" style="color: #f8fafc;">${boss.name}</div>
                                        <div class="inv-avatar-title" style="color: #f87171;">${boss.title || 'Invasor do Sistema'} • CAP. ${boss.chapterId}</div>
                                    </div>
                                    <div class="tcg-compact-stats">
                                        <div class="tcg-cstat-pill hp" title="Pontos de Vida"><span class="tcg-cstat-lbl">HP</span><span class="tcg-cstat-val">${boss.baseHp || 6500}</span></div>
                                        <div class="tcg-cstat-pill atk" title="Poder de Ataque"><span class="tcg-cstat-lbl">ATK</span><span class="tcg-cstat-val">${boss.baseAttack || 380}</span></div>
                                        <div class="tcg-cstat-pill def" title="Defesa / Resistência"><span class="tcg-cstat-lbl">DEF</span><span class="tcg-cstat-val">${boss.baseDefense || 75}</span></div>
                                        <div class="tcg-cstat-pill spd" title="Velocidade de Ação"><span class="tcg-cstat-lbl">SPD</span><span class="tcg-cstat-val">${boss.baseSpeed || 85}</span></div>
                                    </div>
                                    <div class="inv-avatar-skill">
                                        <span class="inv-avatar-skill-name">${boss.name}</span>
                                        <span class="inv-avatar-skill-desc">${boss.desc || 'Anomalia dimensional corrompida.'}</span>
                                    </div>
                                </div>
                                <div class="tcg-card-bottom-foil">
                                    <span class="tcg-serial">NO. ${chapterNum} / CODE LEVELER TCG</span>
                                    <span class="tcg-edition">1ST ED</span>
                                </div>
                            </div>
                            <!-- FACE TRASEIRA (VERSO / BACK CARD) -->
                            <div class="tcg-card-face tcg-card-back">
                                <div class="tcg-card-holo-frame"></div>
                                <div class="tcg-card-glare"></div>
                                <div class="tcg-card-back-img-wrap">
                                    <img class="tcg-card-back-img" src="assets/backCard_C.png" alt="Card Back" onerror="this.src='assets/backCard_C.png'">
                                </div>
                                <div class="tcg-card-back-footer">
                                    <span class="tcg-back-brand" style="color: #ef4444;">BOSS RAID TCG</span>
                                    <span class="tcg-back-hint">Clique para desvirar</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        };

        // Duplica a lista de bosses para criar a transição contínua perfeita em loop infinito
        const combined = [...bosses, ...bosses];
        track.innerHTML = combined.map((boss, idx) => createBossCardHTML(boss, idx)).join('');

        // Inicializa física 3D LERP de cada card da trilha do carrossel
        setTimeout(() => {
            combined.forEach((_, idx) => {
                const card = document.getElementById(`landing-boss-card-${idx}`);
                if (card && typeof UIRenderer !== 'undefined' && UIRenderer.setupUniversalCard3D) {
                    UIRenderer.setupUniversalCard3D(card);
                }
            });
        }, 120);
    }

    // ─── EVENTOS ───
    bindEvents() {
        // Seleção de personagens na Landing
        const navItems = document.querySelectorAll('.char-nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const charKey = item.getAttribute('data-char');
                if (charKey) this.selectCharacter(charKey);
            });
        });

        // Inicializa física 3D LERP no Card do Shadow Coder (Hero) e no Card dos Mestres
        setTimeout(() => {
            const heroCard = document.getElementById('landing-hero-shadow-coder');
            if (heroCard && typeof UIRenderer !== 'undefined' && UIRenderer.setupUniversalCard3D) {
                UIRenderer.setupUniversalCard3D(heroCard);
            }
            const masterCard = document.getElementById('landing-master-card');
            if (masterCard && typeof UIRenderer !== 'undefined' && UIRenderer.setupUniversalCard3D) {
                UIRenderer.setupUniversalCard3D(masterCard);
            }
        }, 150);
    }

    // ─── PERSONAGENS ───
    selectCharacter(charKey) {
        const char = this.charactersData[charKey];
        if (!char) return;

        this.currentCharacter = charKey;

        document.querySelectorAll('.char-nav-item').forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-char') === charKey);
        });

        // Atualiza Card 3D TCG do Mestre Ativo
        const masterCard = document.getElementById('landing-master-card');
        const imgEl = document.getElementById('landing-master-img');
        const auraEl = document.getElementById('landing-master-ghost-aura');
        const rarityBar = document.getElementById('landing-master-rarity-bar');
        const cardName = document.getElementById('landing-master-card-name');
        const cardTitle = document.getElementById('landing-master-card-title');
        const cardSkill = document.getElementById('landing-master-card-skill');
        const cardDesc = document.getElementById('landing-master-card-desc');
        const serialEl = document.getElementById('landing-master-serial');

        const charIdxMap = { arkan: '002', lyra: '003', kael: '004', mira: '005', elion: '006', orin: '007' };
        const charSkillMap = {
            arkan: { skill: "Conjurador Primordial", desc: "Canaliza a essência das variáveis e compila estruturas supremas." },
            lyra: { skill: "Vórtex Lógico", desc: "Manipula ramificações condicionais e laços temporais infinitos." },
            kael: { skill: "Forja Térmica de Algoritmos", desc: "Otimiza a complexidade temporal em ciclos de alta temperatura." },
            mira: { skill: "Mapeamento Fractal", desc: "Calcula matrizes n-dimensionais e recursões cósmicas perfeitas." },
            elion: { skill: "Ponteiro Akáshico", desc: "Manipula registros sagrados e acessa referências eternas na memória." },
            orin: { skill: "Passagem por Referência", desc: "Transmite dados na velocidade da luz sem perda de pacotes." }
        };

        if (masterCard) {
            masterCard.style.setProperty('--rarity-color', char.color || '#38bdf8');
        }
        if (rarityBar) {
            rarityBar.style.background = `linear-gradient(90deg, ${char.color || '#38bdf8'}, transparent)`;
        }
        if (imgEl) {
            imgEl.style.opacity = '0';
            imgEl.style.transform = 'scale(0.95)';
            setTimeout(() => {
                imgEl.src = char.image;
                imgEl.alt = char.fullName;
                imgEl.style.opacity = '1';
                imgEl.style.transform = 'scale(1)';
            }, 120);
        }
        if (auraEl) {
            auraEl.src = char.image;
        }
        if (cardName) cardName.textContent = char.name;
        if (cardTitle) cardTitle.textContent = char.role.split('&')[0].trim();
        if (cardSkill && charSkillMap[charKey]) cardSkill.textContent = charSkillMap[charKey].skill;
        if (cardDesc && charSkillMap[charKey]) cardDesc.textContent = charSkillMap[charKey].desc;
        if (serialEl) serialEl.textContent = `NO. ${charIdxMap[charKey] || '002'} / CODE LEVELER TCG`;

        // Atualiza detalhes narrativos ao lado
        const nameEl = document.getElementById('landing-char-name');
        const fullnameEl = document.getElementById('landing-char-fullname');
        const roleEl = document.getElementById('landing-char-role');
        const quoteEl = document.getElementById('landing-char-quote');
        const bioEl = document.getElementById('landing-char-bio');

        if (nameEl) nameEl.textContent = char.name;
        if (fullnameEl) fullnameEl.textContent = char.fullName;
        if (roleEl) roleEl.textContent = char.role;
        if (quoteEl) quoteEl.textContent = char.quote;
        if (bioEl) bioEl.textContent = char.bio;

        // Reinicializa a física no card do mestre
        if (masterCard && typeof UIRenderer !== 'undefined' && UIRenderer.setupUniversalCard3D) {
            UIRenderer.setupUniversalCard3D(masterCard);
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // NAVEGAÇÃO DE PÁGINAS (LANDING, RANKING & FEATURES)
    // ═══════════════════════════════════════════════════════════════

    navigateTo(pageName) {
        if (typeof app !== 'undefined' && app.ui && app.ui.showScreen) {
            app.ui.showScreen(pageName);
        } else {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            const target = document.getElementById('screen-' + pageName);
            if (target) target.classList.add('active');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (pageName === 'ranking') {
            if (!this._rankingInitialized) {
                this._currentRankingWorld = 'c';
                this._rankingSortColumn = 'rank';
                this._rankingSortAsc = true;
                this._rankingSearchQuery = '';
                this._rankingInitialized = true;
                this.setupMidnightRankingTimer();
            }
            this.loadRankingData(false);
            // Re-renderiza após a fumaça/transição de tela se completar
            setTimeout(() => {
                this.renderRankingTable();
            }, 200);
        } else if (pageName === 'features') {
            if (!this._currentFeaturesTab) {
                this._currentFeaturesTab = 'characters';
            }
            this.switchFeaturesTab(this._currentFeaturesTab);
            // Garante re-renderização caso o container tenha acabado de se tornar ativo
            setTimeout(() => {
                this.switchFeaturesTab(this._currentFeaturesTab);
            }, 200);
        }
    }

    // Métodos de compatibilidade
    openRankingModal() { this.navigateTo('ranking'); }
    closeRankingModal() { this.navigateTo('landing'); }
    openFeaturesModal() { this.navigateTo('features'); }
    closeFeaturesModal() { this.navigateTo('landing'); }

    // ═══════════════════════════════════════════════════════════════
    // RANKING GLOBAL (MUNDO C & MUNDO C#) COM ATUALIZAÇÃO ÀS 00:00
    // ═══════════════════════════════════════════════════════════════

    switchRankingWorld(world) {
        this._currentRankingWorld = world;
        const tabC = document.getElementById('ranking-tab-c');
        const tabCSharp = document.getElementById('ranking-tab-csharp');
        if (tabC) tabC.classList.toggle('active', world === 'c');
        if (tabCSharp) tabCSharp.classList.toggle('active', world === 'csharp');

        this.renderRankingTable();
    }

    filterRanking(query) {
        this._rankingSearchQuery = (query || '').toLowerCase().trim();
        this.renderRankingTable();
    }

    sortRanking(column) {
        if (this._rankingSortColumn === column) {
            this._rankingSortAsc = !this._rankingSortAsc;
        } else {
            this._rankingSortColumn = column;
            this._rankingSortAsc = (column === 'name' || column === 'subclass' || column === 'rank');
        }

        // Atualiza indicadores de setas no thead
        const table = document.getElementById('ranking-table');
        if (table) {
            table.querySelectorAll('th.th-sortable').forEach(th => {
                const indicator = th.querySelector('.sort-indicator');
                if (indicator) indicator.textContent = '';
            });
            const activeTh = table.querySelector(`th[onclick*="'${column}'"]`);
            if (activeTh) {
                const indicator = activeTh.querySelector('.sort-indicator');
                if (indicator) indicator.textContent = this._rankingSortAsc ? '▲' : '▼';
            }
        }

        this.renderRankingTable();
    }

    setupMidnightRankingTimer() {
        if (this._midnightTimer) clearTimeout(this._midnightTimer);

        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1);
        const msUntilMidnight = tomorrow.getTime() - now.getTime();

        this._midnightTimer = setTimeout(() => {
            console.log('[Ranking] Meia-noite atingida (00:00). Atualizando ranking...');
            localStorage.removeItem('guildcode_landing_ranking_cache');
            this.loadRankingData(true);
            this.setupMidnightRankingTimer();
        }, msUntilMidnight);
    }

    async loadRankingData(forceRefresh = false) {
        const CACHE_KEY = 'guildcode_landing_ranking_cache_v4';
        const now = new Date();
        const todayDateKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

        const statusEl = document.getElementById('ranking-sync-status');
        const tbody = document.getElementById('ranking-table-body');

        // Limpa caches antigos se houver
        try {
            localStorage.removeItem('guildcode_landing_ranking_cache');
            localStorage.removeItem('guildcode_landing_ranking_cache_v2');
            localStorage.removeItem('guildcode_landing_ranking_cache_v3');
        } catch (_) {}

        if (!forceRefresh) {
            try {
                const cachedRaw = localStorage.getItem(CACHE_KEY);
                if (cachedRaw) {
                    const cached = JSON.parse(cachedRaw);
                    if (cached.dateKey === todayDateKey && Array.isArray(cached.players)) {
                        this._rankingPlayersRaw = cached.players;
                        this.processRankingData();
                        this.renderRankingTable();
                        if (statusEl) {
                            statusEl.innerHTML = `
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                <span>Ranking sincronizado hoje (${todayDateKey}) &bull; ${cached.players.length} Codemancers registrados &bull; Próxima atualização às 00:00</span>
                            `;
                        }
                        return;
                    }
                }
            } catch (_) {}
        }

        if (tbody) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="14" style="text-align:center;padding:3rem 1rem;">
                        <div class="spinner" style="margin:0 auto 0.75rem;"></div>
                        <div style="font-family:var(--font-code);color:var(--purple-bright);font-size:0.8rem;letter-spacing:0.1em;">
                            SINCRONIZANDO JOGADORES REAIS DO NEXUS...
                        </div>
                    </td>
                </tr>
            `;
        }

        try {
            if (typeof fbDB === 'undefined') {
                this._rankingPlayersRaw = [];
                this.renderRankingTable();
                if (statusEl) {
                    statusEl.innerHTML = `<span>Aguardando conexão com o banco de dados da Guilda...</span>`;
                }
                return;
            }

            const usersSnap = await fbDB.collection('users').get();
            const players = [];

            usersSnap.forEach(doc => {
                const u = doc.data() || {};
                const gp = u.gameProgress || {};
                const stats = u.stats || gp.stats || {};

                // Subclasse
                let subclassLabel = 'Sem Subclasse';
                const sc = u.subclass || gp.subclass;
                if (sc && typeof SUBCLASSES_DATA !== 'undefined' && SUBCLASSES_DATA[sc]) {
                    subclassLabel = SUBCLASSES_DATA[sc].name;
                } else if (sc) {
                    subclassLabel = String(sc).charAt(0).toUpperCase() + String(sc).slice(1);
                }

                // Helper para extrair o último capítulo concluído
                const getLastCompletedChapter = (chaptersObj, completedArr, unlocksArr, currentCh) => {
                    const completedIds = [];

                    // 1. Verifica no objeto chapters: { "0": { completed: true }, "1": { completed: true } }
                    if (chaptersObj && typeof chaptersObj === 'object') {
                        Object.keys(chaptersObj).forEach(k => {
                            const ch = chaptersObj[k];
                            if (ch && (ch.completed === true || ch.completed === 1)) {
                                const num = Number(k);
                                if (!isNaN(num)) completedIds.push(num);
                            }
                        });
                    }

                    // 2. Verifica no array/objeto completedChapters
                    if (Array.isArray(completedArr)) {
                        completedArr.forEach(val => {
                            const num = Number(val);
                            if (!isNaN(num)) completedIds.push(num);
                        });
                    } else if (completedArr && typeof completedArr === 'object') {
                        Object.keys(completedArr).forEach(k => {
                            if (completedArr[k]) {
                                const num = Number(k);
                                if (!isNaN(num)) completedIds.push(num);
                            }
                        });
                    }

                    // 3. Verifica chapterUnlocks (se desbloqueou cap N, concluiu até N-1)
                    if (Array.isArray(unlocksArr) && unlocksArr.length > 0) {
                        unlocksArr.forEach(val => {
                            const num = Number(val);
                            if (!isNaN(num) && num > 0) {
                                for (let i = 0; i < num; i++) completedIds.push(i);
                            }
                        });
                    }

                    // 4. Verifica currentChapter (se está no cap N > 0, concluiu os anteriores)
                    const currNum = Number(currentCh);
                    if (!isNaN(currNum) && currNum > 0) {
                        for (let i = 0; i < currNum; i++) completedIds.push(i);
                    }

                    if (completedIds.length === 0) return -1;
                    return Math.max(...completedIds);
                };

                // Último capítulo concluído no Mundo C
                const lastChapterC = getLastCompletedChapter(
                    gp.chapters,
                    gp.completedChapters,
                    gp.chapterUnlocks,
                    gp.currentChapter
                );

                // Último capítulo concluído no Mundo C#
                const lastChapterCSharp = getLastCompletedChapter(
                    gp.csharpChapters,
                    gp.csharpCompletedChapters,
                    gp.csharpChapterUnlocks,
                    gp.csharpCurrentChapter
                );

                // Formatação do label exibido na tabela (ex: "Cap. 05", "Cap. 12" ou "---")
                const formatChapterLabel = (num) => {
                    if (num < 0) return '---';
                    return `Cap. ${String(num).padStart(2, '0')}`;
                };

                const lastChapterCLabel = formatChapterLabel(lastChapterC);
                const lastChapterCSharpLabel = formatChapterLabel(lastChapterCSharp);

                // Bosses derrotados
                const bossesDefeated = Number(gp.bossesDefeated || gp.raidBossesKilled || 0);

                // Tokens
                const tokens = Number(gp.tokens || u.tokens || 0);

                // Elo / Renome
                const renome = Number(gp.renome !== undefined ? gp.renome : 100);
                const eloTier = (typeof rankedManager !== 'undefined' && rankedManager.getTierForRenome)
                    ? rankedManager.getTierForRenome(renome)
                    : { name: 'Scriptling', color: '#94a3b8' };

                // Streak
                const streakObj = gp.streak || {};
                const streak = Number(typeof streakObj === 'number' ? streakObj : (streakObj.current || 0));

                // MMR (Code Power)
                const mmr = Number(gp.codePower || 1000);

                // Pontos Extras alocados
                const allocated = gp.allocatedPoints || {};
                const extraPoints = (Number(allocated.hp || 0) + Number(allocated.atk || 0) + Number(allocated.def || 0) + Number(allocated.spd || 0));

                // Erros e Acertos
                const errors = Number(stats.errors || stats.wrongSubmissions || gp.totalErrors || 0);
                const successes = Number(stats.successes || stats.correctSubmissions || gp.totalSuccesses || 0);

                // Abismo
                const abyssFloor = Number(gp.abyssCurrentFloor || gp.abyssFloor || (gp.abyssProgress ? gp.abyssProgress.currentFloor : 0));
                const abyssProgressLabel = abyssFloor > 0 ? `Andar ${abyssFloor}` : 'Nível 1';

                // Nome do jogador limpo e legível
                let playerName = u.displayName || u.name;
                if (!playerName && u.email) {
                    playerName = u.email.split('@')[0];
                }
                if (!playerName) playerName = 'Codemancer';

                // Identificação do Mundo (Dimensão vinculada ou inferida pelo progresso)
                const rawWorld = u.worldId || gp.worldId;
                let userWorld = 'c';
                if (rawWorld === 'csharp_unity' || rawWorld === 'csharp') {
                    userWorld = 'csharp';
                } else if (lastChapterCSharp >= 0 && lastChapterC < 0) {
                    userWorld = 'csharp';
                }

                players.push({
                    uid: doc.id,
                    name: playerName,
                    photoURL: u.photoURL || 'assets/avatars/avatar_02.png',
                    worldId: userWorld,
                    level: Number(gp.level || u.level || 1),
                    subclass: subclassLabel,
                    lastChapterC,
                    lastChapterCLabel,
                    lastChapterCSharp,
                    lastChapterCSharpLabel,
                    bossesDefeated,
                    tokens,
                    elo: eloTier.name,
                    eloColor: eloTier.color,
                    streak,
                    mmr,
                    extraPoints,
                    errors,
                    successes,
                    abyss: abyssProgressLabel,
                    abyssFloor
                });
            });

            this._rankingPlayersRaw = players;
            try {
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    dateKey: todayDateKey,
                    timestamp: Date.now(),
                    players
                }));
            } catch (_) {}

            this.processRankingData();
            this.renderRankingTable();

            if (statusEl) {
                statusEl.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span>Ranking sincronizado com sucesso (${todayDateKey}) &bull; ${players.length} Codemancers registrados &bull; Atualização às 00:00</span>
                `;
            }
        } catch (e) {
            console.error('[Ranking] Falha ao carregar ranking do Firestore:', e);
            this._rankingPlayersRaw = [];
            this.renderRankingTable();
            if (statusEl) {
                statusEl.innerHTML = `<span style="color:#ef4444;">Erro ao carregar dados do Firestore. Tente recarregar a página.</span>`;
            }
        }
    }

    processRankingData() {
        if (!Array.isArray(this._rankingPlayersRaw)) {
            this._rankingPlayersRaw = [];
        }
    }

    renderRankingTable() {
        const tbody = document.getElementById('ranking-table-body');
        if (!tbody) return;

        let list = [...(this._rankingPlayersRaw || [])];

        // Filtra os jogadores ESTRITAMENTE pelo mundo da aba selecionada (Mundo C vs Mundo C#)
        const targetWorld = (this._currentRankingWorld === 'csharp') ? 'csharp' : 'c';
        list = list.filter(p => (p.worldId || 'c') === targetWorld);

        // Mapeia o último capítulo e label correspondente ao mundo ativo
        list.forEach(p => {
            p.lastChapter = (targetWorld === 'csharp') ? p.lastChapterCSharp : p.lastChapterC;
            p.lastChapterLabel = (targetWorld === 'csharp') ? p.lastChapterCSharpLabel : p.lastChapterCLabel;
        });

        // Filtro de pesquisa
        if (this._rankingSearchQuery) {
            list = list.filter(p => p.name.toLowerCase().includes(this._rankingSearchQuery));
        }

        // Ordenação inicial base para computar posição # (Rank)
        list.sort((a, b) => b.level - a.level || b.lastChapter - a.lastChapter || b.mmr - a.mmr);
        list.forEach((p, idx) => { p.rank = idx + 1; });

        // Ordenação selecionada pelo usuário
        const col = this._rankingSortColumn || 'rank';
        const asc = this._rankingSortAsc ? 1 : -1;

        list.sort((a, b) => {
            let valA = a[col];
            let valB = b[col];

            if (col === 'abyss') {
                valA = a.abyssFloor || 0;
                valB = b.abyssFloor || 0;
            } else if (col === 'lastChapter' || col === 'completedChapters') {
                valA = a.lastChapter !== undefined ? a.lastChapter : -1;
                valB = b.lastChapter !== undefined ? b.lastChapter : -1;
            }

            if (typeof valA === 'string') {
                return asc * valA.localeCompare(valB);
            }
            return asc * ((valA || 0) - (valB || 0));
        });

        if (list.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="14" style="text-align:center;padding:3rem 1rem;color:var(--text-dim);font-family:var(--font-code);">
                        Nenhum jogador encontrado para o termo pesquisado.
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = list.map(p => {
            let rankClass = 'rank-position-cell';
            if (p.rank === 1) rankClass += ' rank-top-1';
            else if (p.rank === 2) rankClass += ' rank-top-2';
            else if (p.rank === 3) rankClass += ' rank-top-3';

            return `
                <tr>
                    <td class="${rankClass}">#${p.rank}</td>
                    <td><strong style="color:var(--gold);font-family:var(--font-code);">LV. ${p.level}</strong></td>
                    <td>
                        <div class="rank-player-cell">
                            <img src="${p.photoURL}" alt="${p.name}" class="rank-player-avatar" onerror="this.src='assets/avatars/avatar_02.png'">
                            <span class="rank-player-name">${p.name}</span>
                        </div>
                    </td>
                    <td><span class="rank-pill-badge" style="background:rgba(139,92,246,0.12);color:#c084fc;border:1px solid rgba(139,92,246,0.25);">${p.subclass}</span></td>
                    <td style="font-family:var(--font-code);font-weight:700;color:#38bdf8;">${p.lastChapterLabel}</td>
                    <td style="font-family:var(--font-code);color:#f87171;">${p.bossesDefeated}</td>
                    <td style="font-family:var(--font-code);color:#fbbf24;font-weight:700;">${p.tokens}</td>
                    <td><span class="rank-pill-badge rank-elo-pill" style="border-color:${p.eloColor};color:${p.eloColor};">${p.elo}</span></td>
                    <td style="font-family:var(--font-code);color:#fb923c;">${p.streak} d</td>
                    <td style="font-family:var(--font-code);font-weight:700;color:#a78bfa;">${p.mmr}</td>
                    <td style="font-family:var(--font-code);color:#94a3b8;">+${p.extraPoints}</td>
                    <td style="font-family:var(--font-code);color:#ef4444;">${p.errors}</td>
                    <td style="font-family:var(--font-code);color:#22c55e;">${p.successes}</td>
                    <td><span class="rank-pill-badge" style="background:rgba(56,189,248,0.1);border:1px solid rgba(56,189,248,0.25);color:#38bdf8;">${p.abyss}</span></td>
                </tr>
            `;
        }).join('');
    }

    // ═══════════════════════════════════════════════════════════════
    // FEATURES & ENCICLOPÉDIA COMPLETA DA LANDING PAGE (TABELAS)
    // ═══════════════════════════════════════════════════════════════

    switchFeaturesTab(tabId) {
        this._currentFeaturesTab = tabId;

        document.querySelectorAll('.features-nav-tab').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-features-tab') === tabId);
        });

        const container = document.getElementById('features-content-area');
        if (!container) return;

        if (tabId === 'characters') this.renderFeaturesCharactersTable(container);
        else if (tabId === 'artifacts') this.renderFeaturesArtifactsTable(container);
        else if (tabId === 'chapters') this.renderFeaturesChaptersTable(container);
        else if (tabId === 'abyss') this.renderFeaturesAbyssTable(container);
        else if (tabId === 'subclasses') this.renderFeaturesSubclasses(container);
        else if (tabId === 'bosses') this.renderFeaturesBosses(container);
    }

    // 1. Tabela de Personagens e Habilidades
    renderFeaturesCharactersTable(container) {
        const skillsData = (typeof AVATAR_SKILLS_DATA !== 'undefined') ? AVATAR_SKILLS_DATA : {};
        const avatars = Object.values(skillsData);

        container.innerHTML = `
            <div style="margin-bottom:1.25rem;">
                <h3 style="font-family:var(--font-display);font-size:1.1rem;color:#fff;margin:0 0 0.35rem;">TABELA OFICIAL DE AVATARES & HABILIDADES PASSIVAS</h3>
                <p style="font-size:0.82rem;color:var(--text-dim);margin:0;">
                    Equipar qualquer um dos 24 guardiões ativa sua habilidade passiva única em tempo de execução e projeta seu retrato na Guilda e no mapa.
                </p>
            </div>
            <table class="features-data-table">
                <thead>
                    <tr>
                        <th style="width:60px;">ID</th>
                        <th style="width:240px;">Personagem</th>
                        <th style="width:130px;">Raridade</th>
                        <th style="width:200px;">Habilidade Passiva</th>
                        <th>Efeito em Combate / Plataforma</th>
                        <th style="width:160px;">Status Base</th>
                    </tr>
                </thead>
                <tbody>
                    ${avatars.map(av => {
                        const rarityInfo = (typeof AVATAR_RARITIES !== 'undefined' && AVATAR_RARITIES[av.rarity])
                            ? AVATAR_RARITIES[av.rarity]
                            : { label: av.rarity, color: '#38bdf8' };
                        return `
                            <tr>
                                <td style="font-family:var(--font-code);font-weight:700;color:var(--text-dim);">#${av.id}</td>
                                <td>
                                    <div style="display:flex;align-items:center;gap:0.75rem;">
                                        <img src="assets/avatars/avatar_${av.id}.png" alt="${av.name}" style="width:36px;height:36px;border-radius:6px;border:1px solid ${rarityInfo.color};background:#16162a;" onerror="this.src='assets/avatars/avatar_02.png'">
                                        <div>
                                            <strong style="color:#fff;display:block;">${av.name}</strong>
                                            <span style="font-size:0.7rem;color:var(--text-dim);font-family:var(--font-code);">${av.title || 'Guardião'}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="rank-pill-badge" style="border:1px solid ${rarityInfo.color};color:${rarityInfo.color};background:${rarityInfo.color}18;">
                                        ${rarityInfo.label.toUpperCase()}
                                    </span>
                                </td>
                                <td><strong style="color:var(--purple-bright);font-family:var(--font-display);font-size:0.8rem;">✦ ${av.skillName}</strong></td>
                                <td style="font-size:0.78rem;color:#cbd5e1;line-height:1.45;">${av.skillDesc}</td>
                                <td style="font-family:var(--font-code);font-size:0.72rem;color:#94a3b8;">
                                    HP ${av.baseHp || '---'} &bull; ATK ${av.baseAttack || '---'}<br>
                                    DEF ${av.baseDefense || '---'} &bull; SPD ${av.baseSpeed || '---'}
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        `;
    }

    // 2. Tabela de Artefatos & Slots
    renderFeaturesArtifactsTable(container) {
        const catalog = (typeof ARTIFACTS_CATALOG !== 'undefined') ? ARTIFACTS_CATALOG : {};
        const items = Object.values(catalog);

        container.innerHTML = `
            <div style="margin-bottom:1.25rem;">
                <h3 style="font-family:var(--font-display);font-size:1.1rem;color:#fff;margin:0 0 0.35rem;">TABELA DE ARTEFATOS ARCANOS & ESCALONAMENTO</h3>
                <p style="font-size:0.82rem;color:var(--text-dim);margin:0;">
                    Cada Codemancer possui 4 slots: Coroa (Defesa), Cálice (Vida / HP), Anel (Ataque) e Tornozeleira (Velocidade). Bônus podem ser fixos ou percentuais.
                </p>
            </div>
            <table class="features-data-table">
                <thead>
                    <tr>
                        <th style="width:240px;">Artefato</th>
                        <th style="width:140px;">Slot / Tipo</th>
                        <th style="width:140px;">Atributo Chave</th>
                        <th style="width:160px;">Tipo de Escala</th>
                        <th>Origem & Lore Arcano</th>
                        <th style="width:140px;">Nível Máximo</th>
                    </tr>
                </thead>
                <tbody>
                    ${items.map(item => `
                        <tr>
                            <td>
                                <div style="display:flex;align-items:center;gap:0.75rem;">
                                    <div style="width:36px;height:36px;border-radius:6px;background:rgba(0,0,0,0.4);border:1px solid rgba(139,92,246,0.3);display:flex;align-items:center;justify-content:center;">
                                        <img src="${item.asset}" alt="${item.name}" style="width:28px;height:28px;object-fit:contain;" onerror="this.src='assets/icons/WhiteLogo.svg'">
                                    </div>
                                    <strong style="color:#fff;">${item.name}</strong>
                                </div>
                            </td>
                            <td><span class="rank-pill-badge" style="background:rgba(255,255,255,0.06);color:#e2e8f0;">${item.slotLabel.toUpperCase()}</span></td>
                            <td><strong style="color:#38bdf8;font-family:var(--font-code);">${item.statName.toUpperCase()}</strong></td>
                            <td>
                                <span class="rank-pill-badge" style="border:1px solid ${item.isPercent ? '#c084fc' : '#34d399'};color:${item.isPercent ? '#c084fc' : '#34d399'};">
                                    ${item.isPercent ? 'Percentual (+%)' : 'Plano (+Fixo)'}
                                </span>
                            </td>
                            <td style="font-size:0.78rem;color:#94a3b8;line-height:1.45;">${item.lore}</td>
                            <td style="font-family:var(--font-code);font-weight:700;color:var(--gold);">+20 (6★)</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    // 3. Tabela de Capítulos e Conteúdos (Mundo C & Mundo C#)
    renderFeaturesChaptersTable(container) {
        let cChapters = [];
        let csChapters = [];

        if (typeof CSHARP_CHAPTERS !== 'undefined') {
            csChapters = CSHARP_CHAPTERS;
        }

        // Tenta buscar capítulos de C do engine se carregado
        if (typeof app !== 'undefined' && app.engine && app.engine.chapters) {
            cChapters = app.engine.chapters;
        } else {
            // Títulos dos 16 capítulos canônicos de C
            const cTitles = [
                { id: 0, title: "O Despertar da Lógica", theme: "Entrada, Saída e Fundamentos", unlock: "Núcleo de Comunicação" },
                { id: 1, title: "A Bifurcação das Sombras", theme: "Condicionais e Decisões (if/else)", unlock: "Portões da Decisão" },
                { id: 2, title: "O Salão dos Espelhos", theme: "Múltipla Escolha (switch/case)", unlock: "Câmara de Triagem" },
                { id: 3, title: "A Espiral do Tempo", theme: "Laços de Repetição (while/for)", unlock: "Relógio Dimensional" },
                { id: 4, title: "O Arquivo dos Elementos", theme: "Vetores e Arrays Unidimensionais", unlock: "Arsenal de Vetores" },
                { id: 5, title: "O Mapeamento Estelar", theme: "Matrizes e Coordenadas 2D", unlock: "Observatório Espacial" },
                { id: 6, title: "O Tomo dos Encantamentos", theme: "Funções e Procedimentos", unlock: "Grimório de Feitiços" },
                { id: 7, title: "A Bússola Etérea", theme: "Ponteiros e Memória Direta", unlock: "Bússola de Endereços" },
                { id: 8, title: "O Altar da Alocação", theme: "Alocação Dinâmica (malloc/free)", unlock: "Fonte de Mana Heap" },
                { id: 9, title: "A Tapeçaria de Runas", theme: "Strings e Vetores de Char", unlock: "Tear Rúnico" },
                { id: 10, title: "A Forja dos Autômatos", theme: "Structs e Estruturas de Dados", unlock: "Oficina Mecânica" },
                { id: 11, title: "O Cofre Imutável", theme: "Arquivos e Persistência em Disco", unlock: "Câmara Forte" },
                { id: 12, title: "A Corrente Ancestral", theme: "Listas Encadeadas e Nós", unlock: "Ponte dos Elos" },
                { id: 13, title: "O Abismo da Pilha", theme: "Pilhas e Recursão Profunda", unlock: "Torre Invertida" },
                { id: 14, title: "O Labirinto da Fila", theme: "Filas e Gerenciamento de Tarefas", unlock: "Pátio das Ordens" },
                { id: 15, title: "A Árvore Primordial", theme: "Árvores Binárias e Grafos", unlock: "Árvore do Mundo" }
            ];
            cChapters = cTitles;
        }

        container.innerHTML = `
            <div style="margin-bottom:1.25rem;">
                <h3 style="font-family:var(--font-display);font-size:1.1rem;color:#fff;margin:0 0 0.35rem;">TABELA DE CAPÍTULOS, MÓDULOS & CONTEÚDOS DIDÁTICOS</h3>
                <p style="font-size:0.82rem;color:var(--text-dim);margin:0;">
                    Grade curricular completa do Mundo C (16 Distritos) e do Mundo C# Unity (38 Capítulos / 9 Módulos práticos).
                </p>
            </div>
            
            <h4 style="font-family:var(--font-display);color:var(--purple-bright);font-size:0.95rem;margin:1.5rem 0 0.6rem;">MUNDO C — FUNDAMENTOS DE PROGRAMAÇÃO & BAIXO NÍVEL</h4>
            <table class="features-data-table" style="margin-bottom:2rem;">
                <thead>
                    <tr>
                        <th style="width:70px;">Distrito</th>
                        <th style="width:260px;">Nome do Capítulo</th>
                        <th>Conteúdo / Tópico Didático</th>
                        <th style="width:220px;">Desbloqueio no Sistema</th>
                    </tr>
                </thead>
                <tbody>
                    ${cChapters.map(ch => `
                        <tr>
                            <td style="font-family:var(--font-code);font-weight:700;color:var(--gold);">D-${String(ch.id).padStart(2, '0')}</td>
                            <td><strong style="color:#fff;">${ch.title}</strong></td>
                            <td style="color:#cbd5e1;font-size:0.8rem;">${ch.theme}</td>
                            <td><span class="rank-pill-badge" style="background:rgba(56,189,248,0.12);color:#38bdf8;border:1px solid rgba(56,189,248,0.3);">${ch.unlock || 'Desbloqueio de Área'}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <h4 style="font-family:var(--font-display);color:#38bdf8;font-size:0.95rem;margin:1.5rem 0 0.6rem;">MUNDO C# — GAME DEVELOPMENT NO UNITY 6.5</h4>
            <table class="features-data-table">
                <thead>
                    <tr>
                        <th style="width:70px;">Capítulo</th>
                        <th style="width:280px;">Título do Capítulo</th>
                        <th>Módulo / Conteúdo Game Dev</th>
                        <th style="width:220px;">Desbloqueio no Sistema</th>
                    </tr>
                </thead>
                <tbody>
                    ${csChapters.slice(0, 20).map(ch => `
                        <tr>
                            <td style="font-family:var(--font-code);font-weight:700;color:#38bdf8;">C#-${String(ch.id).padStart(2, '0')}</td>
                            <td><strong style="color:#fff;">${ch.title}</strong></td>
                            <td style="color:#cbd5e1;font-size:0.8rem;">${ch.theme}</td>
                            <td><span class="rank-pill-badge" style="background:rgba(192,132,252,0.12);color:#c084fc;border:1px solid rgba(192,132,252,0.3);">${ch.unlock || 'Módulo Unity'}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    // 4. Tabela de Abismo (Andares e Dificuldades)
    renderFeaturesAbyssTable(container) {
        container.innerHTML = `
            <div style="margin-bottom:1.25rem;">
                <h3 style="font-family:var(--font-display);font-size:1.1rem;color:#fff;margin:0 0 0.35rem;">TABELA DE MASMORRAS DA ESPIRAL DO ABISMO</h3>
                <p style="font-size:0.82rem;color:var(--text-dim);margin:0;">
                    Progressão por andares temporizados. A cada 3 andares superados, uma Câmara de Tesouro Cósmico é concedida.
                </p>
            </div>
            <table class="features-data-table">
                <thead>
                    <tr>
                        <th style="width:100px;">Andar</th>
                        <th style="width:220px;">Nome da Região</th>
                        <th style="width:140px;">Temporizador</th>
                        <th>Desafio de Algoritmos / Restrições</th>
                        <th style="width:200px;">Recompensa Especial</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="font-family:var(--font-code);font-weight:700;color:#38bdf8;">Andar 01 - 03</td>
                        <td><strong style="color:#fff;">Câmaras de Entrada & Fluxo</strong></td>
                        <td style="font-family:var(--font-code);color:#fb923c;">180s / câmara</td>
                        <td style="font-size:0.78rem;color:#94a3b8;">Verificação de limites de tipos, parsing e decisões rápidas sem alocação dinâmica.</td>
                        <td><span class="rank-pill-badge" style="border:1px solid #fbbf24;color:#fbbf24;">Baú Arcano 3★</span></td>
                    </tr>
                    <tr>
                        <td style="font-family:var(--font-code);font-weight:700;color:#38bdf8;">Andar 04 - 06</td>
                        <td><strong style="color:#fff;">Salão dos Laços Infinitos</strong></td>
                        <td style="font-family:var(--font-code);color:#fb923c;">150s / câmara</td>
                        <td style="font-size:0.78rem;color:#94a3b8;">Laços aninhados com penalidade de tempo por iterações excessivas (complexidade O(n²)).</td>
                        <td><span class="rank-pill-badge" style="border:1px solid #fbbf24;color:#fbbf24;">Baú Épico 4★</span></td>
                    </tr>
                    <tr>
                        <td style="font-family:var(--font-code);font-weight:700;color:#38bdf8;">Andar 07 - 09</td>
                        <td><strong style="color:#fff;">Void dos Ponteiros Corrompidos</strong></td>
                        <td style="font-family:var(--font-code);color:#fb923c;">120s / câmara</td>
                        <td style="font-size:0.78rem;color:#94a3b8;">Aritmética de ponteiros e manipulação de memória sem permitir vazamentos (Memory Leaks).</td>
                        <td><span class="rank-pill-badge" style="border:1px solid #c084fc;color:#c084fc;">Fragmento Gacha x10</span></td>
                    </tr>
                    <tr>
                        <td style="font-family:var(--font-code);font-weight:700;color:#38bdf8;">Andar 10 - 12</td>
                        <td><strong style="color:#fff;">Cidadela das Estruturas</strong></td>
                        <td style="font-family:var(--font-code);color:#fb923c;">100s / câmara</td>
                        <td style="font-size:0.78rem;color:#94a3b8;">Structs dinâmicas, arrays de ponteiros e ordenação in-place em alta velocidade.</td>
                        <td><span class="rank-pill-badge" style="border:1px solid #fbbf24;color:#fbbf24;">Artefato Lendário 5★</span></td>
                    </tr>
                    <tr>
                        <td style="font-family:var(--font-code);font-weight:700;color:#38bdf8;">Andar 13 - 16</td>
                        <td><strong style="color:#fff;">Ápice Fractal do Abismo</strong></td>
                        <td style="font-family:var(--font-code);color:#ef4444;font-weight:700;">80s / câmara</td>
                        <td style="font-size:0.78rem;color:#94a3b8;">Recursão profunda, backtracking e árvores de decisão sob pressão extrema de tempo.</td>
                        <td><span class="rank-pill-badge" style="border:1px solid #ef4444;color:#ef4444;background:#ef444415;">Coroa Cósmica 6★</span></td>
                    </tr>
                </tbody>
            </table>
        `;
    }

    renderFeaturesSubclasses(container) {
        const subclasses = (typeof SUBCLASSES_DATA !== 'undefined') ? Object.values(SUBCLASSES_DATA).filter(sc => sc.id !== 'cheatcode') : [];

        container.innerHTML = `
            <div style="margin-bottom:1.5rem;">
                <h3 style="font-family:var(--font-display);font-size:1.1rem;color:#fff;margin:0 0 0.35rem;">AS 4 SUBCLASSES DO SISTEMA & TALENTOS</h3>
                <p style="font-size:0.82rem;color:var(--text-dim);margin:0;line-height:1.5;">
                    Ao despertar no Nível 5, o aprendiz escolhe sua especialização de código. Cada classe desenvolve uma árvore de habilidades ativas, passivas e ultimates que potencializam o ganho de XP, tolerância do terminal e premiações.
                </p>
            </div>
            <div style="display:flex;flex-direction:column;gap:1.5rem;">
                ${subclasses.map(sc => `
                    <div style="background:rgba(255,255,255,0.02);border:1px solid ${sc.color}40;border-radius:10px;padding:1.4rem;">
                        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75rem;">
                            <div style="display:flex;align-items:center;gap:0.75rem;">
                                <div style="width:36px;height:36px;border-radius:6px;background:${sc.color}20;border:1px solid ${sc.color};display:flex;align-items:center;justify-content:center;color:${sc.color};">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                                </div>
                                <div>
                                    <h4 style="font-family:var(--font-display);font-size:1.05rem;color:${sc.color};margin:0;">${sc.name} — <span style="color:#fff;font-size:0.9rem;">${sc.title}</span></h4>
                                    <span style="font-family:var(--font-code);font-size:0.72rem;color:var(--text-dim);">${sc.tagline}</span>
                                </div>
                            </div>
                            <span style="font-family:var(--font-code);font-size:0.72rem;padding:0.25rem 0.6rem;background:${sc.color}15;border:1px solid ${sc.color}40;color:${sc.color};border-radius:4px;">NÍVEL REQUERIDO: 5+</span>
                        </div>
                        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:0.85rem;margin-top:1rem;">
                            ${sc.skills.map(sk => `
                                <div style="background:rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.06);border-radius:6px;padding:0.85rem;">
                                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.35rem;">
                                        <span style="font-family:var(--font-display);font-size:0.82rem;font-weight:700;color:#fff;">${sk.name}</span>
                                        <span style="font-family:var(--font-code);font-size:0.65rem;color:${sk.type === 'ultimate' ? '#fbbf24' : 'var(--purple-bright)'};">${sk.type.toUpperCase()}</span>
                                    </div>
                                    <p style="font-size:0.74rem;color:#94a3b8;margin:0;line-height:1.4;">${sk.description}</p>
                                    <span style="font-family:var(--font-code);font-size:0.65rem;color:var(--text-dim);margin-top:0.4rem;display:block;">Nv Mín: ${sk.minLevel} &bull; Custo: ${sk.cost} Pts</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderFeaturesBosses(container) {
        container.innerHTML = `
            <div style="max-width:880px;margin:0 auto;display:flex;flex-direction:column;gap:1.5rem;">
                <div>
                    <h3 style="font-family:var(--font-display);font-size:1.15rem;color:#fff;margin:0 0 0.4rem;">BOSS RAIDS MULTIPLAYER EM TEMPO REAL</h3>
                    <p style="font-family:var(--font-body);font-size:0.86rem;color:var(--text-dim);margin:0;line-height:1.6;">
                        Chefes colossais de código e arquitetura invadem Aethelgard. Batalhas cooperativas onde a velocidade de resolução em equipe, sinergia de subclasses e atributos de artefatos decidem o destino da guilda.
                    </p>
                </div>
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:1.25rem;">
                    <div class="feature-info-card">
                        <div style="width:36px;height:36px;border-radius:6px;background:rgba(239,68,68,0.15);border:1px solid #ef4444;display:flex;align-items:center;justify-content:center;color:#ef4444;margin-bottom:0.75rem;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                        </div>
                        <h4 class="feature-card-heading">Barra de Fúria (Enrage)</h4>
                        <p style="font-size:0.78rem;color:#94a3b8;line-height:1.5;margin-top:0.4rem;">Conforme a batalha avança, o chefe acumula energia destrutiva. A equipe precisa causar dano crítico massivo com testes unitários antes que o Enrage atinja o ápice.</p>
                    </div>
                    <div class="feature-info-card">
                        <div style="width:36px;height:36px;border-radius:6px;background:rgba(234,179,8,0.15);border:1px solid #eab308;display:flex;align-items:center;justify-content:center;color:#eab308;margin-bottom:0.75rem;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                        </div>
                        <h4 class="feature-card-heading">Mecânicas de Atordoamento (Stun)</h4>
                        <p style="font-size:0.78rem;color:#94a3b8;line-height:1.5;margin-top:0.4rem;">Acertos consecutivos rápidos atordoam o chefe, interrompendo ataques fatais e abrindo janelas de vulnerabilidade onde o dano causado é multiplicado.</p>
                    </div>
                    <div class="feature-info-card">
                        <div style="width:36px;height:36px;border-radius:6px;background:rgba(168,85,247,0.15);border:1px solid #a855f7;display:flex;align-items:center;justify-content:center;color:#a855f7;margin-bottom:0.75rem;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>
                        </div>
                        <h4 class="feature-card-heading">Espólios de Conquista da Guilda</h4>
                        <p style="font-size:0.78rem;color:#94a3b8;line-height:1.5;margin-top:0.4rem;">Derrubar os 16 chefes registrados garante prestígio no mural da guilda, títulos honorários e avatares exclusivos na Câmara de Convocação.</p>
                    </div>
                </div>
            </div>
        `;
    }
}

window.landingController = new LandingPageController();

// Inicializa automaticamente no carregamento do DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.landingController.init());
} else {
    window.landingController.init();
}
