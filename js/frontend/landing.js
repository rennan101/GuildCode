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
        try { this.bindEvents(); } catch (e) { console.warn('[Landing] bindEvents err:', e); }
        try { this.selectCharacter('arkan'); } catch (e) { console.warn('[Landing] selectCharacter err:', e); }
        try { this.renderGachaCodemancers(); } catch (e) { console.warn('[Landing] renderGachaCodemancers err:', e); }
        try { this.renderRaidBossesCarousel(); } catch (e) { console.warn('[Landing] renderRaidBossesCarousel err:', e); }
        try { this.loadHeroStats(); } catch (e) { console.warn('[Landing] loadHeroStats err:', e); }
        // Pré-carrega o conteúdo da enciclopédia de features
        try { this.switchFeaturesTab('characters'); } catch (e) { console.warn('[Landing] switchFeaturesTab err:', e); }
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
            // Garante re-renderização caso o container tenha acabado de se tornar ativo ou sofrido transição
            setTimeout(() => {
                this.switchFeaturesTab(this._currentFeaturesTab || 'characters');
            }, 100);
            setTimeout(() => {
                this.switchFeaturesTab(this._currentFeaturesTab || 'characters');
            }, 250);
        } else if (pageName === 'faq') {
            this.initFaq();
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
        const CACHE_KEY = 'guildcode_landing_ranking_cache_v6';
        const now = new Date();
        const todayDateKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

        const statusEl = document.getElementById('ranking-sync-status');
        const tbody = document.getElementById('ranking-table-body');

        // Limpa caches antigos se houver
        try {
            localStorage.removeItem('guildcode_landing_ranking_cache');
            localStorage.removeItem('guildcode_landing_ranking_cache_v2');
            localStorage.removeItem('guildcode_landing_ranking_cache_v3');
            localStorage.removeItem('guildcode_landing_ranking_cache_v4');
            localStorage.removeItem('guildcode_landing_ranking_cache_v5');
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

        const updateLoadingProgress = (pct, label = 'SINCRONIZANDO JOGADORES DO NEXUS...') => {
            if (!tbody) return;
            tbody.innerHTML = `
                <tr>
                    <td colspan="14" style="text-align:center;padding:3rem 1rem;">
                        <div class="ranking-loading-container">
                            <div class="spinner" style="margin:0 auto;"></div>
                            <div class="ranking-loading-bar-wrap">
                                <div class="ranking-loading-bar-fill" style="width: ${pct}%;"></div>
                            </div>
                            <div class="ranking-loading-text">
                                <span>${label}</span>
                                <span class="ranking-loading-pct">${pct}%</span>
                            </div>
                        </div>
                    </td>
                </tr>
            `;
        };

        updateLoadingProgress(15, 'CONECTANDO AO BANCO DE DADOS DA GUILDA...');

        try {
            if (typeof fbDB === 'undefined') {
                this._rankingPlayersRaw = [];
                this.renderRankingTable();
                if (statusEl) {
                    statusEl.innerHTML = `<span>Aguardando conexão com o banco de dados da Guilda...</span>`;
                }
                return;
            }

            updateLoadingProgress(35, 'RECUPERANDO REGISTROS DE CODEMANCERS...');
            const usersSnap = await fbDB.collection('users').get();
            const totalDocs = usersSnap.size || 1;
            const players = [];
            let processed = 0;

            updateLoadingProgress(50, 'ANALISANDO PROGRESSOS E CONQUISTAS...');

            usersSnap.forEach(doc => {
                const u = doc.data() || {};
                const gp = u.gameProgress || {};
                const stats = u.stats || gp.stats || {};

                // Subclasse com suporte a múltiplos campos e formatos
                let subclassLabel = 'Sem Subclasse';
                const sc = u.subclass || gp.subclass || u.roleClass || gp.roleClass;
                if (sc && typeof SUBCLASSES_DATA !== 'undefined' && SUBCLASSES_DATA[sc]) {
                    subclassLabel = SUBCLASSES_DATA[sc].name;
                } else if (sc) {
                    subclassLabel = String(sc).charAt(0).toUpperCase() + String(sc).slice(1);
                }

                // Helper para extrair o último capítulo concluído
                const getLastCompletedChapter = (chaptersObj, completedArr, unlocksArr, currentCh) => {
                    const completedIds = [];

                    // 1. Verifica no objeto chapters: { "0": { completed: true }, "1": { completed: true }, "csharp_ch0": { completed: true } }
                    if (chaptersObj && typeof chaptersObj === 'object') {
                        Object.keys(chaptersObj).forEach(k => {
                            const ch = chaptersObj[k];
                            if (ch && (ch.completed === true || ch.completed === 1)) {
                                const cleanKey = String(k).replace(/^csharp_ch/i, '');
                                const num = Number(cleanKey);
                                if (!isNaN(num)) completedIds.push(num);
                            }
                        });
                    }

                    // 2. Verifica no array/objeto completedChapters
                    if (Array.isArray(completedArr)) {
                        completedArr.forEach(val => {
                            const cleanKey = String(val).replace(/^csharp_ch/i, '');
                            const num = Number(cleanKey);
                            if (!isNaN(num)) completedIds.push(num);
                        });
                    } else if (completedArr && typeof completedArr === 'object') {
                        Object.keys(completedArr).forEach(k => {
                            if (completedArr[k]) {
                                const cleanKey = String(k).replace(/^csharp_ch/i, '');
                                const num = Number(cleanKey);
                                if (!isNaN(num)) completedIds.push(num);
                            }
                        });
                    }

                    // 3. Verifica chapterUnlocks (se desbloqueou cap N, concluiu até N-1)
                    if (Array.isArray(unlocksArr) && unlocksArr.length > 0) {
                        unlocksArr.forEach(val => {
                            const cleanKey = String(val).replace(/^csharp_ch/i, '');
                            const num = Number(cleanKey);
                            if (!isNaN(num) && num > 0) {
                                for (let i = 0; i < num; i++) completedIds.push(i);
                            }
                        });
                    }

                    // 4. Verifica currentChapter (se está no cap N > 0, concluiu os anteriores)
                    if (currentCh !== undefined && currentCh !== null) {
                        const cleanCurr = String(currentCh).replace(/^csharp_ch/i, '');
                        const currNum = Number(cleanCurr);
                        if (!isNaN(currNum) && currNum > 0) {
                            for (let i = 0; i < currNum; i++) completedIds.push(i);
                        }
                    }

                    if (completedIds.length === 0) return -1;
                    return Math.max(...completedIds);
                };

                // Identificação do Mundo (Dimensão vinculada ou inferida pelo progresso)
                const rawWorld = u.worldId || gp.worldId;
                const isUserExplicitCSharp = (rawWorld === 'csharp_unity' || rawWorld === 'csharp');

                // Último capítulo concluído no Mundo C
                const rawLastChapterC = getLastCompletedChapter(
                    gp.chapters || u.chapters,
                    gp.completedChapters || u.completedChapters,
                    gp.chapterUnlocks || u.chapterUnlocks,
                    gp.currentChapter !== undefined ? gp.currentChapter : u.currentChapter
                );

                // Último capítulo concluído no Mundo C#
                // Se for explicitamente C#, também considera gp.chapters/completedChapters/etc. como C#
                const rawLastChapterCSharpDedicated = getLastCompletedChapter(
                    gp.csharpChapters || u.csharpChapters,
                    gp.csharpCompletedChapters || u.csharpCompletedChapters,
                    gp.csharpChapterUnlocks || u.csharpChapterUnlocks,
                    gp.csharpCurrentChapter !== undefined ? gp.csharpCurrentChapter : u.csharpCurrentChapter
                );

                const lastChapterCSharp = isUserExplicitCSharp
                    ? Math.max(rawLastChapterCSharpDedicated, rawLastChapterC)
                    : rawLastChapterCSharpDedicated;

                const lastChapterC = isUserExplicitCSharp
                    ? rawLastChapterC
                    : Math.max(rawLastChapterC, -1);

                // Formatação do label exibido na tabela (ex: "Cap. 05", "Cap. 12" ou "---")
                const formatChapterLabel = (num) => {
                    if (num < 0) return '---';
                    return `Cap. ${String(num).padStart(2, '0')}`;
                };

                const lastChapterCLabel = formatChapterLabel(lastChapterC);
                const lastChapterCSharpLabel = formatChapterLabel(lastChapterCSharp);

                // Helper para extrair quantidade de Bosses Derrotados
                const extractBossCount = (source) => {
                    if (!source) return 0;
                    if (typeof source === 'number') return isNaN(source) ? 0 : source;
                    if (Array.isArray(source)) return source.length;
                    if (typeof source === 'object') {
                        let count = 0;
                        Object.keys(source).forEach(k => {
                            const val = source[k];
                            if (val === true || (val && typeof val === 'object' && (val.completedAt || val.timesDefeated || val.tokensClaimed))) {
                                count++;
                            } else if (val) {
                                count++;
                            }
                        });
                        return count;
                    }
                    const parsed = Number(source);
                    return isNaN(parsed) ? 0 : parsed;
                };

                // Bosses derrotados C / C#
                const bossesC = Math.max(
                    extractBossCount(gp.bossesDefeated),
                    extractBossCount(u.bossesDefeated),
                    extractBossCount(gp.defeatedBosses),
                    extractBossCount(gp.raidBossesKilled),
                    extractBossCount(stats.bossesDefeated),
                    0
                );

                const bossesCSharpDedicated = Math.max(
                    extractBossCount(gp.csharpBossesDefeated),
                    extractBossCount(u.csharpBossesDefeated),
                    extractBossCount(gp.csharpDefeatedBosses),
                    0
                );

                const bossesCSharp = isUserExplicitCSharp
                    ? Math.max(bossesCSharpDedicated, bossesC)
                    : bossesCSharpDedicated;

                // Tokens
                const tokens = Number(gp.tokens !== undefined ? gp.tokens : (u.tokens !== undefined ? u.tokens : 0));

                // Level com fallback para XP se level estiver ausente
                let playerLevel = Number(gp.level || u.level || 1);
                const totalXp = Number(gp.xp || u.xp || 0);
                if (playerLevel <= 1 && totalXp > 0) {
                    playerLevel = Math.max(1, Math.floor(Math.sqrt(totalXp / 100)) + 1);
                }

                // Elo / Renome
                const renome = Number(gp.renome !== undefined ? gp.renome : (u.renome !== undefined ? u.renome : 100));
                let eloTier = { name: 'Scriptling', color: '#94a3b8' };
                if (typeof rankedManager !== 'undefined' && rankedManager.getTierForRenome) {
                    eloTier = rankedManager.getTierForRenome(renome) || eloTier;
                } else {
                    if (renome >= 2000) eloTier = { name: 'Grão-Mestre', color: '#fbbf24' };
                    else if (renome >= 1500) eloTier = { name: 'Diamante', color: '#38bdf8' };
                    else if (renome >= 1000) eloTier = { name: 'Ouro', color: '#eab308' };
                    else if (renome >= 500) eloTier = { name: 'Prata', color: '#cbd5e1' };
                    else if (renome >= 200) eloTier = { name: 'Bronze', color: '#f97316' };
                }

                // Streak diário
                const streakObj = gp.streak || u.streak || {};
                const streak = Number(typeof streakObj === 'number' ? streakObj : (streakObj.current || streakObj.count || 0));

                // MMR (Code Power)
                let mmr = Number(gp.codePower || u.codePower || 0);
                if (mmr === 0) {
                    // Se não tiver mmr computado, calcula baseado em Level e Renome
                    mmr = 1000 + (playerLevel * 50) + Math.max(0, renome - 100);
                }

                // Pontos Extras alocados
                const allocated = gp.allocatedPoints || u.allocatedPoints || {};
                const extraPoints = (Number(allocated.hp || 0) + Number(allocated.atk || 0) + Number(allocated.def || 0) + Number(allocated.spd || 0));

                // Erros e Acertos
                const errors = Number(
                    stats.errorsFixed !== undefined ? stats.errorsFixed : (
                        stats.errors !== undefined ? stats.errors : (
                            stats.wrongSubmissions !== undefined ? stats.wrongSubmissions : (
                                gp.totalErrors !== undefined ? gp.totalErrors : (
                                    u.totalErrors !== undefined ? u.totalErrors : 0
                                )
                            )
                        )
                    )
                );

                const successes = Number(
                    stats.activitiesCompleted !== undefined ? stats.activitiesCompleted : (
                        stats.successes !== undefined ? stats.successes : (
                            stats.correctSubmissions !== undefined ? stats.correctSubmissions : (
                                stats.executions !== undefined ? stats.executions : (
                                    gp.totalSuccesses !== undefined ? gp.totalSuccesses : (
                                        u.totalSuccesses !== undefined ? u.totalSuccesses : 0
                                    )
                                )
                            )
                        )
                    )
                );

                // Helper para extrair andar do Abismo a partir de completedChambers ou propriedades de andar
                const extractAbyssFloor = (abyssObj, directFloor) => {
                    const candidateFloor = Number(directFloor);
                    let maxFloorFromChambers = 0;

                    const chambers = (abyssObj && typeof abyssObj === 'object' && abyssObj.completedChambers) 
                        ? abyssObj.completedChambers 
                        : ((abyssObj && typeof abyssObj === 'object' && !abyssObj.completedChambers) ? abyssObj : null);

                    if (chambers && typeof chambers === 'object') {
                        Object.keys(chambers).forEach(chId => {
                            if (chambers[chId]) {
                                // Padrão sq0_1, sq15_3, csharp_sq5_2
                                const m = String(chId).match(/(?:sq|floor|ch)(\d+)[_-]\d+/i) || String(chId).match(/(\d+)/);
                                if (m && m[1] !== undefined) {
                                    const flNum = Number(m[1]);
                                    if (!isNaN(flNum)) {
                                        // Se completou câmaras no andar N, o jogador alcançou ao menos o andar N + 1
                                        maxFloorFromChambers = Math.max(maxFloorFromChambers, flNum + 1);
                                    }
                                }
                            }
                        });
                    }

                    const directVal = (!isNaN(candidateFloor) && candidateFloor > 0) ? candidateFloor : 0;
                    return Math.max(directVal, maxFloorFromChambers, 1);
                };

                const abyssFloorC = extractAbyssFloor(
                    gp.abyss || u.abyss,
                    gp.abyssCurrentFloor || gp.abyssFloor || (gp.abyssProgress ? gp.abyssProgress.currentFloor : 0) || u.abyssFloor
                );

                const abyssFloorCSharpDedicated = extractAbyssFloor(
                    gp.csharpAbyss || u.csharpAbyss,
                    gp.csharpAbyssCurrentFloor || gp.csharpAbyssFloor || (gp.csharpAbyssProgress ? gp.csharpAbyssProgress.currentFloor : 0) || u.csharpAbyssFloor
                );

                const abyssFloorCSharp = isUserExplicitCSharp 
                    ? Math.max(abyssFloorCSharpDedicated, abyssFloorC)
                    : abyssFloorCSharpDedicated;

                const abyssFloor = isUserExplicitCSharp ? abyssFloorCSharp : abyssFloorC;
                const abyssProgressLabel = `Andar ${abyssFloor}`;

                // Nome do jogador limpo e legível
                let playerName = u.displayName || u.name;
                if (!playerName && u.email) {
                    playerName = u.email.split('@')[0];
                }
                if (!playerName) playerName = 'Codemancer';

                let userWorld = 'c';
                if (isUserExplicitCSharp) {
                    userWorld = 'csharp';
                } else if (lastChapterCSharp >= 0 && lastChapterC < 0) {
                    userWorld = 'csharp';
                }

                players.push({
                    uid: doc.id,
                    name: playerName,
                    photoURL: u.photoURL || 'assets/avatars/avatar_02.png',
                    worldId: userWorld,
                    level: playerLevel,
                    subclass: subclassLabel,
                    lastChapterC,
                    lastChapterCLabel,
                    lastChapterCSharp,
                    lastChapterCSharpLabel,
                    bossesDefeated: userWorld === 'csharp' ? bossesCSharp : bossesC,
                    bossesDefeatedC: bossesC,
                    bossesDefeatedCSharp: bossesCSharp,
                    tokens,
                    elo: eloTier.name,
                    eloColor: eloTier.color,
                    streak,
                    mmr,
                    extraPoints,
                    errors,
                    successes,
                    abyss: abyssProgressLabel,
                    abyssFloor,
                    abyssFloorC,
                    abyssFloorCSharp
                });

                processed++;
            });

            updateLoadingProgress(85, 'FINALIZANDO TABELA DE CLASSIFICAÇÃO...');

            this._rankingPlayersRaw = players;
            try {
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    dateKey: todayDateKey,
                    timestamp: Date.now(),
                    players
                }));
            } catch (_) {}

            setTimeout(() => {
                updateLoadingProgress(100, 'PRONTO!');
                setTimeout(() => {
                    this.processRankingData();
                    this.renderRankingTable();
                }, 150);
            }, 100);

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

        // Mapeia capítulo, boss e abismo correspondentes ao mundo ativo
        list.forEach(p => {
            p.lastChapter = (targetWorld === 'csharp') ? p.lastChapterCSharp : p.lastChapterC;
            p.lastChapterLabel = (targetWorld === 'csharp') ? p.lastChapterCSharpLabel : p.lastChapterCLabel;
            p.bossesDefeated = (targetWorld === 'csharp') ? (p.bossesDefeatedCSharp || 0) : (p.bossesDefeatedC || 0);
            p.abyssFloor = (targetWorld === 'csharp') ? (p.abyssFloorCSharp || 1) : (p.abyssFloorC || 1);
            p.abyss = `Andar ${p.abyssFloor}`;
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
                    Equipar qualquer um dos 24 guardiões ativa sua habilidade passiva única em tempo de execução e projeta seu retrato na Guilda e no mapa. Clique no cabeçalho para ordenar.
                </p>
            </div>
            <table class="features-data-table">
                <thead>
                    <tr>
                        <th style="width:65px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 0)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">ID</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th style="width:220px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 1)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Personagem</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th style="width:130px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 2)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Raridade</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th style="width:190px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 3)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Habilidade Passiva</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th class="sortable-th" onclick="landingController.sortFeaturesTable(this, 4)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Efeito em Combate / Plataforma</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th style="width:200px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 5)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Status Base</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
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
                                <td>
                                    <div class="avatar-stats-grid">
                                        <div class="avatar-stat-pill stat-hp" title="Pontos de Vida Base">
                                            <span class="avatar-stat-lbl">HP</span>
                                            <span>${av.baseHp || 0}</span>
                                        </div>
                                        <div class="avatar-stat-pill stat-atk" title="Poder de Ataque Base">
                                            <span class="avatar-stat-lbl">ATK</span>
                                            <span>${av.baseAttack || 0}</span>
                                        </div>
                                        <div class="avatar-stat-pill stat-def" title="Defesa Física Base">
                                            <span class="avatar-stat-lbl">DEF</span>
                                            <span>${av.baseDefense || 0}</span>
                                        </div>
                                        <div class="avatar-stat-pill stat-spd" title="Velocidade de Ação Base">
                                            <span class="avatar-stat-lbl">SPD</span>
                                            <span>${av.baseSpeed || 0}</span>
                                        </div>
                                    </div>
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
                <h3 style="font-family:var(--font-display);font-size:1.1rem;color:#fff;margin:0 0 0.35rem;">TABELA DE ARTEFATOS ARCANOS, ESCALONAMENTO & PROBABILIDADES</h3>
                <p style="font-size:0.82rem;color:var(--text-dim);margin:0;">
                    Cada Codemancer possui 4 slots: Coroa (Defesa), Cálice (Vida / HP), Anel (Ataque) e Tornozeleira (Velocidade). Clique nos cabeçalhos para ordenar.
                </p>
            </div>
            <table class="features-data-table">
                <thead>
                    <tr>
                        <th style="width:220px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 0)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Artefato</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th style="width:130px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 1)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Slot</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th style="width:140px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 2)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Atributo Principal</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th style="width:170px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 3)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Variação Principal (Min - Max)</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th class="sortable-th" onclick="landingController.sortFeaturesTable(this, 4)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Substatus Possíveis & Escala por Estrela</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th style="width:140px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 5)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Nível / Raras</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    ${items.map(item => {
                        let mainRange = '';
                        if (item.statType === 'hp') {
                            mainRange = item.isPercent ? '+4.0% a +30.0%' : '+150 a +1600';
                        } else if (item.statType === 'atk') {
                            mainRange = item.isPercent ? '+3.5% a +25.0%' : '+15 a +160';
                        } else if (item.statType === 'def') {
                            mainRange = item.isPercent ? '+3.0% a +23.0%' : '+12 a +140';
                        } else if (item.statType === 'spd') {
                            mainRange = item.isPercent ? '+2.5% a +18.0%' : '+5 a +50';
                        }

                        return `
                            <tr>
                                <td>
                                    <div style="display:flex;align-items:center;gap:0.75rem;">
                                        <div style="width:36px;height:36px;border-radius:6px;background:rgba(0,0,0,0.4);border:1px solid rgba(139,92,246,0.3);display:flex;align-items:center;justify-content:center;">
                                            <img src="${item.asset}" alt="${item.name}" style="width:28px;height:28px;object-fit:contain;" onerror="this.src='assets/icons/WhiteLogo.svg'">
                                        </div>
                                        <div>
                                            <strong style="color:#fff;display:block;">${item.name}</strong>
                                            <span style="font-size:0.68rem;color:var(--text-dim);line-height:1.2;display:block;max-width:200px;">${item.lore}</span>
                                        </div>
                                    </div>
                                </td>
                                <td><span class="rank-pill-badge" style="background:rgba(255,255,255,0.06);color:#e2e8f0;">${item.slotLabel.toUpperCase()}</span></td>
                                <td>
                                    <strong style="color:#38bdf8;font-family:var(--font-code);display:block;">${item.statName.toUpperCase()}</strong>
                                    <span style="font-size:0.68rem;color:${item.isPercent ? '#c084fc' : '#34d399'};">${item.isPercent ? 'Percentual (%)' : 'Fixo (+Plano)'}</span>
                                </td>
                                <td>
                                    <div style="font-family:var(--font-code);font-size:0.75rem;font-weight:700;color:${item.isPercent ? '#c084fc' : '#34d399'};">
                                        ${mainRange}
                                    </div>
                                    <span style="font-size:0.65rem;color:var(--text-dim);font-family:var(--font-code);">3★ a 6★ (+20)</span>
                                </td>
                                <td>
                                    <div style="display:flex;flex-direction:column;gap:0.25rem;font-family:var(--font-code);font-size:0.72rem;">
                                        <div style="color:#cbd5e1;">
                                            <span style="color:#4ade80;">HP:</span> +35 a +380 | +1.0% a +7.2%
                                            &bull; <span style="color:#f87171;">ATK:</span> +4 a +40 | +0.8% a +6.0%
                                        </div>
                                        <div style="color:#cbd5e1;">
                                            <span style="color:#38bdf8;">DEF:</span> +3 a +35 | +0.7% a +5.5%
                                            &bull; <span style="color:#fbbf24;">SPD:</span> +1 a +12 | +0.6% a +4.5%
                                        </div>
                                        <div style="font-size:0.65rem;color:var(--text-dim);">
                                            Chances de Substats: 3★ (1 sub) &bull; 4★ (2 subs) &bull; 5★/6★ (3 subs) &bull; 50% Plano / 50% %
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <strong style="color:var(--gold);font-family:var(--font-code);display:block;">+20 (6★)</strong>
                                    <span style="font-size:0.68rem;color:#c084fc;">Épico / Lendário</span>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        `;
    }

    // 3. Tabela de Capítulos e Conteúdos (Mundo C & Mundo C#)
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
                <h3 style="font-family:var(--font-display);font-size:1.1rem;color:#fff;margin:0 0 0.35rem;">GUIA CURRICULAR DE CAPÍTULOS, MÓDULOS & CONTEÚDOS</h3>
                <p style="font-size:0.82rem;color:var(--text-dim);margin:0;">
                    Grade didática completa dos dois universos: Mundo C (16 Distritos fundamentais) e Mundo C# Unity 6.5 (38 Capítulos práticos de Game Dev).
                </p>
            </div>
            
            <h4 style="font-family:var(--font-display);color:var(--purple-bright);font-size:0.95rem;margin:1.5rem 0 0.6rem;">MUNDO C — FUNDAMENTOS DE PROGRAMAÇÃO & BAIXO NÍVEL (16 CAPÍTULOS)</h4>
            <table class="features-data-table" style="margin-bottom:2.5rem;">
                <thead>
                    <tr>
                        <th style="width:80px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 0)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Distrito</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th style="width:250px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 1)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Nome do Capítulo</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th class="sortable-th" onclick="landingController.sortFeaturesTable(this, 2)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Conteúdo / Tópico Didático</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th style="width:220px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 3)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Desbloqueio no Sistema</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
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

            <h4 style="font-family:var(--font-display);color:#38bdf8;font-size:0.95rem;margin:1.5rem 0 0.6rem;">MUNDO C# — GAME DEVELOPMENT NO UNITY 6.5 (38 CAPÍTULOS / 9 MÓDULOS)</h4>
            <table class="features-data-table">
                <thead>
                    <tr>
                        <th style="width:80px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 0)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Capítulo</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th style="width:260px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 1)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Título do Capítulo</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th class="sortable-th" onclick="landingController.sortFeaturesTable(this, 2)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Módulo / Conteúdo Game Dev</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th style="width:220px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 3)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Desbloqueio no Sistema</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    ${csChapters.map(ch => `
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
                <h3 style="font-family:var(--font-display);font-size:1.1rem;color:#fff;margin:0 0 0.35rem;">GUIA DA ESPIRAL DO ABISMO — ANDARES, RESTRIÇÕES & TESOUROS</h3>
                <p style="font-size:0.82rem;color:var(--text-dim);margin:0;">
                    A Espiral do Abismo desafia os Codemancers com câmaras de tempo limitado sob restrições estritas de complexidade algorítmica. Ao superar os desafios, bônus de XP, Tokens e Renome PVP são conquistados.
                </p>
            </div>
            <table class="features-data-table">
                <thead>
                    <tr>
                        <th style="width:120px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 0)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Andar</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th style="width:220px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 1)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Zona Dimensional</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th style="width:130px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 2)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Tempo Limite</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th class="sortable-th" onclick="landingController.sortFeaturesTable(this, 3)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Desafio de Algoritmos & Restrições</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th style="width:260px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 4)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Recompensa Garantida</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="font-family:var(--font-code);font-weight:700;color:#38bdf8;">Andar 01 - 03</td>
                        <td><strong style="color:#fff;">Câmaras de Entrada & Fluxo</strong></td>
                        <td style="font-family:var(--font-code);color:#fb923c;">180s / câmara</td>
                        <td style="font-size:0.78rem;color:#94a3b8;">Fundamentos de I/O, condicionais básicas, conversão de tipos primitivos sem alocação dinâmica.</td>
                        <td><span class="rank-pill-badge" style="border:1px solid #38bdf8;color:#38bdf8;background:rgba(56,189,248,0.1);">Bônus: +100 XP • +50 Tokens • +10 Renome PVP</span></td>
                    </tr>
                    <tr>
                        <td style="font-family:var(--font-code);font-weight:700;color:#38bdf8;">Andar 04 - 06</td>
                        <td><strong style="color:#fff;">Salão dos Laços Infinitos</strong></td>
                        <td style="font-family:var(--font-code);color:#fb923c;">150s / câmara</td>
                        <td style="font-size:0.78rem;color:#94a3b8;">Laços aninhados (for/while), vetores unidimensionais e filtragem com penalidade de tempo por iterações excedentes.</td>
                        <td><span class="rank-pill-badge" style="border:1px solid #38bdf8;color:#38bdf8;background:rgba(56,189,248,0.1);">Bônus: +100 XP • +50 Tokens • +10 Renome PVP</span></td>
                    </tr>
                    <tr>
                        <td style="font-family:var(--font-code);font-weight:700;color:#38bdf8;">Andar 07 - 09</td>
                        <td><strong style="color:#fff;">Void dos Ponteiros Corrompidos</strong></td>
                        <td style="font-family:var(--font-code);color:#fb923c;">120s / câmara</td>
                        <td style="font-size:0.78rem;color:#94a3b8;">Aritmética direta de memória, strings de char e referências. Tolerância zero a vazamentos (Memory Leaks).</td>
                        <td><span class="rank-pill-badge" style="border:1px solid #38bdf8;color:#38bdf8;background:rgba(56,189,248,0.1);">Bônus: +100 XP • +50 Tokens • +10 Renome PVP</span></td>
                    </tr>
                    <tr>
                        <td style="font-family:var(--font-code);font-weight:700;color:#38bdf8;">Andar 10 - 12</td>
                        <td><strong style="color:#fff;">Cidadela das Estruturas</strong></td>
                        <td style="font-family:var(--font-code);color:#fb923c;">100s / câmara</td>
                        <td style="font-size:0.78rem;color:#94a3b8;">Structs dinâmicas, arrays de ponteiros, alocação heap e algoritmos de busca e ordenação in-place em alta velocidade.</td>
                        <td><span class="rank-pill-badge" style="border:1px solid #38bdf8;color:#38bdf8;background:rgba(56,189,248,0.1);">Bônus: +100 XP • +50 Tokens • +10 Renome PVP</span></td>
                    </tr>
                    <tr>
                        <td style="font-family:var(--font-code);font-weight:700;color:#38bdf8;">Andar 13 - 15</td>
                        <td><strong style="color:#fff;">Ápice Fractal do Abismo</strong></td>
                        <td style="font-family:var(--font-code);color:#ef4444;font-weight:700;">80s / câmara</td>
                        <td style="font-size:0.78rem;color:#94a3b8;">Recursão profunda, travessia de grafos, listas duplamente encadeadas e backtracking sob estresse de tempo.</td>
                        <td><span class="rank-pill-badge" style="border:1px solid #38bdf8;color:#38bdf8;background:rgba(56,189,248,0.1);">Bônus: +100 XP • +50 Tokens • +10 Renome PVP</span></td>
                    </tr>
                    <tr>
                        <td style="font-family:var(--font-code);font-weight:700;color:#eab308;">Andar 16 (Último Andar C)</td>
                        <td><strong style="color:#fff;">Câmara Final do Mundo C</strong></td>
                        <td style="font-family:var(--font-code);color:#ef4444;font-weight:700;">80s / câmara</td>
                        <td style="font-size:0.78rem;color:#94a3b8;">Prova final de maestria em C: síntese completa de estruturas de dados e ponteiros de função.</td>
                        <td><span class="rank-pill-badge" style="border:1px solid #fbbf24;color:#fbbf24;background:rgba(251,191,36,0.15);font-weight:700;">Bônus: +100 XP • +50 Tokens • +10 Renome PVP + Cristal de Ascensão</span></td>
                    </tr>
                    <tr>
                        <td style="font-family:var(--font-code);font-weight:700;color:#c084fc;">Andar 17 - 37</td>
                        <td><strong style="color:#fff;">Dimensão Unity & C# Engine</strong></td>
                        <td style="font-family:var(--font-code);color:#c084fc;">60s - 120s</td>
                        <td style="font-size:0.78rem;color:#94a3b8;">Vetores espaciais Vector3, física Raycast, pooling de GameObjects, Corrotinas assíncronas e state machines.</td>
                        <td><span class="rank-pill-badge" style="border:1px solid #38bdf8;color:#38bdf8;background:rgba(56,189,248,0.1);">Bônus: +100 XP • +50 Tokens • +10 Renome PVP</span></td>
                    </tr>
                    <tr>
                        <td style="font-family:var(--font-code);font-weight:700;color:#fbbf24;">Andar 38 (Último Andar C#)</td>
                        <td><strong style="color:#fff;">Vórtice Supremo da Engine Unity</strong></td>
                        <td style="font-family:var(--font-code);color:#fbbf24;font-weight:700;">60s</td>
                        <td style="font-size:0.78rem;color:#94a3b8;">Desafio ápice de arquitetura e lógica avançada de jogos interativos em Unity 6.5.</td>
                        <td><span class="rank-pill-badge" style="border:1px solid #fbbf24;color:#fbbf24;background:rgba(251,191,36,0.15);font-weight:700;">Bônus: +100 XP • +50 Tokens • +10 Renome PVP + Cristal de Ascensão</span></td>
                    </tr>
                </tbody>
            </table>
        `;
    }

    renderFeaturesSubclasses(container) {
        const subclasses = (typeof SUBCLASSES_DATA !== 'undefined') ? Object.values(SUBCLASSES_DATA).filter(sc => sc.id !== 'cheatcode') : [];

        container.innerHTML = `
            <div style="margin-bottom:1.5rem;">
                <h3 style="font-family:var(--font-display);font-size:1.1rem;color:#fff;margin:0 0 0.35rem;">AS 4 SUBCLASSES DO SISTEMA & ÁRVORES DE SKILLS</h3>
                <p style="font-size:0.82rem;color:var(--text-dim);margin:0;line-height:1.5;">
                    Ao atingir o Nível 5, o aprendiz desperta uma das 4 classes de elite. Cada subclasse possui habilidades ativas, passivas e ultimates que moldam o ganho de XP, tolerância a erros e desempenho em duelos e Raids cooperativas.
                </p>
            </div>
            <div style="display:flex;flex-direction:column;gap:1.5rem;">
                ${subclasses.map(sc => `
                    <div style="background:rgba(255,255,255,0.02);border:1px solid ${sc.color}40;border-radius:10px;padding:1.4rem;">
                        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75rem;flex-wrap:wrap;gap:0.75rem;">
                            <div>
                                <h4 style="font-family:var(--font-display);font-size:1.05rem;color:${sc.color};margin:0;">${sc.name} — <span style="color:#fff;font-size:0.9rem;">${sc.title}</span></h4>
                                <span style="font-family:var(--font-code);font-size:0.72rem;color:var(--text-dim);">${sc.tagline}</span>
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
        const bosses = (typeof BOSS_DEFINITIONS !== 'undefined' && Array.isArray(BOSS_DEFINITIONS))
            ? BOSS_DEFINITIONS
            : (window.BOSS_DEFINITIONS || []);

        container.innerHTML = `
            <div style="margin-bottom:1.5rem;">
                <h3 style="font-family:var(--font-display);font-size:1.15rem;color:#fff;margin:0 0 0.4rem;">GUIA DOS 16 CHEFES DE BOSS RAIDS MULTIPLAYER</h3>
                <p style="font-size:0.84rem;color:var(--text-dim);margin:0;line-height:1.6;">
                    Grandes anomalias de código e arquitetura invadiram Aethelgard. Batalhas cooperativas em tempo real com mecânicas de Enrage (Fúria), Stun e sinergia de esquadrões de 4 Codemancers.
                </p>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:1rem;margin-bottom:2rem;">
                <div class="feature-info-card" style="background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.25);border-radius:8px;padding:1rem;">
                    <h4 style="font-family:var(--font-display);color:#ef4444;margin:0 0 0.4rem;font-size:0.86rem;">BARRA DE FÚRIA (ENRAGE)</h4>
                    <p style="font-size:0.75rem;color:#94a3b8;line-height:1.45;margin:0;">Ao prolongar o combate, o chefe acumula energia destrutiva. O esquadrão deve acertar os testes antes que o Enrage atinja o ápice.</p>
                </div>
                <div class="feature-info-card" style="background:rgba(234,179,8,0.06);border:1px solid rgba(234,179,8,0.25);border-radius:8px;padding:1rem;">
                    <h4 style="font-family:var(--font-display);color:#eab308;margin:0 0 0.4rem;font-size:0.86rem;">MECÂNICA DE ATORDOAMENTO (STUN)</h4>
                    <p style="font-size:0.75rem;color:#94a3b8;line-height:1.45;margin:0;">Acertos consecutivos em combo atordoam o chefe, interrompendo ataques fatais e multiplicando o dano de toda a equipe.</p>
                </div>
                <div class="feature-info-card" style="background:rgba(168,85,247,0.06);border:1px solid rgba(168,85,247,0.25);border-radius:8px;padding:1rem;">
                    <h4 style="font-family:var(--font-display);color:#c084fc;margin:0 0 0.4rem;font-size:0.86rem;">ESPÓLIOS DA GUILDA</h4>
                    <p style="font-size:0.75rem;color:#94a3b8;line-height:1.45;margin:0;">Vencer os chefes concede títulos de honra, Tokens de ascensão e desbloqueios para convocações na Câmara.</p>
                </div>
            </div>

            <table class="features-data-table">
                <thead>
                    <tr>
                        <th style="width:70px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 0)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Chefe</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th style="width:220px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 1)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Nome & Epíteto</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th style="width:190px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 2)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Tópico / Fraqueza</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th style="width:130px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 3)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">HP / ATK Base</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th class="sortable-th" onclick="landingController.sortFeaturesTable(this, 4)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Lore do Chefe</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th style="width:170px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 5)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Título Despertado</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                        <th style="width:220px;" class="sortable-th" onclick="landingController.sortFeaturesTable(this, 6)">
                            <div class="features-sort-wrap">
                                <span class="features-th-title">Buff Passivo</span>
                                <span class="features-sort-indicator">⇅</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    ${bosses.map((b, idx) => {
                        const skillData = (typeof BOSS_SKILLS_DATA !== 'undefined' && BOSS_SKILLS_DATA[b.id]) ? BOSS_SKILLS_DATA[b.id] : null;
                        const buffDesc = skillData ? skillData.shortDesc : 'Buff passivo permanente em combate.';
                        const skillTitle = skillData ? skillData.title : (b.rewards && b.rewards.title ? b.rewards.title : 'Veterano');
                        const catLabel = skillData ? skillData.categoryLabel : 'Boss Raid';

                        return `
                        <tr>
                            <td>
                                <div style="width:40px;height:40px;border-radius:6px;background:radial-gradient(circle, rgba(239,68,68,0.25), rgba(0,0,0,0.6));border:1px solid rgba(239,68,68,0.4);display:flex;align-items:center;justify-content:center;overflow:hidden;">
                                    <img src="${b.spriteUrl}" alt="${b.name}" style="width:34px;height:34px;object-fit:contain;" onerror="this.src='assets/icons/WhiteLogo.svg'">
                                </div>
                            </td>
                            <td>
                                <strong style="color:#fff;display:block;">${b.name}</strong>
                                <span style="font-family:var(--font-code);font-size:0.7rem;color:#f87171;">${b.title}</span>
                            </td>
                            <td style="font-size:0.78rem;color:#38bdf8;">${b.subject}</td>
                            <td style="font-family:var(--font-code);font-size:0.74rem;color:#cbd5e1;">
                                <span style="color:#22c55e;">HP ${b.baseHp.toLocaleString()}</span><br>
                                <span style="color:#ef4444;">ATK ${b.baseAttack.toLocaleString()}</span>
                            </td>
                            <td style="font-size:0.76rem;color:#94a3b8;line-height:1.4;">${b.desc}</td>
                            <td>
                                <span class="rank-pill-badge" style="border:1px solid #fbbf24;color:#fbbf24;font-size:0.7rem;background:rgba(251,191,36,0.12);display:inline-block;white-space:normal;line-height:1.2;padding:0.25rem 0.5rem;">
                                    ${skillTitle}
                                </span>
                            </td>
                            <td>
                                <div style="font-size:0.75rem;color:#e2e8f0;line-height:1.35;">
                                    <span style="display:inline-block;font-size:0.62rem;font-family:var(--font-code);color:var(--purple-bright);background:rgba(168,85,247,0.15);padding:0.1rem 0.35rem;border-radius:3px;margin-bottom:0.25rem;border:1px solid rgba(168,85,247,0.3);">${catLabel.toUpperCase()}</span>
                                    <div style="font-weight:600;color:#c084fc;">${buffDesc}</div>
                                </div>
                            </td>
                        </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        `;
    }

    sortFeaturesTable(thEl, colIndex) {
        const table = thEl.closest('table');
        if (!table) return;
        const tbody = table.querySelector('tbody');
        if (!tbody) return;

        const currentAsc = thEl.getAttribute('data-sort-dir') === 'asc';
        const newAsc = !currentAsc;

        // Limpa indicadores em outros cabeçalhos da mesma tabela
        const allThs = table.querySelectorAll('th');
        allThs.forEach(th => {
            th.removeAttribute('data-sort-dir');
            th.classList.remove('sort-active');
            const ind = th.querySelector('.features-sort-indicator');
            if (ind) ind.textContent = '⇅';
        });

        thEl.setAttribute('data-sort-dir', newAsc ? 'asc' : 'desc');
        thEl.classList.add('sort-active');
        const indicator = thEl.querySelector('.features-sort-indicator');
        if (indicator) {
            indicator.textContent = newAsc ? '▲' : '▼';
        }

        const rows = Array.from(tbody.querySelectorAll('tr'));
        rows.sort((rowA, rowB) => {
            const cellA = rowA.children[colIndex];
            const cellB = rowB.children[colIndex];
            if (!cellA || !cellB) return 0;

            const textA = (cellA.innerText || cellA.textContent || '').trim();
            const textB = (cellB.innerText || cellB.textContent || '').trim();

            // Tenta comparar como número se ambos forem numéricos (ou se começarem com #, LV., D-, Cap., etc.)
            const cleanNum = (str) => {
                const match = str.replace(/[^0-9.-]/g, '');
                return match ? parseFloat(match) : NaN;
            };

            const numA = cleanNum(textA);
            const numB = cleanNum(textB);

            if (!isNaN(numA) && !isNaN(numB)) {
                return newAsc ? (numA - numB) : (numB - numA);
            }

            return newAsc ? textA.localeCompare(textB, undefined, { numeric: true, sensitivity: 'base' })
                          : textB.localeCompare(textA, undefined, { numeric: true, sensitivity: 'base' });
        });

        rows.forEach(row => tbody.appendChild(row));
    }

    // ═══════════════════════════════════════════════════════════════
    // FAQ — SISTEMA DE PERGUNTAS FREQUENTES & ACCORDION
    // ═══════════════════════════════════════════════════════════════

    getFaqData() {
        return [
            {
                id: 1,
                category: 'geral',
                categoryLabel: 'Geral & Conta',
                question: 'O que é o CODE LEVELER?',
                answer: `<p>O <strong>CODE LEVELER</strong> é uma plataforma educacional gamificada de ponta que transforma o aprendizado de programação em uma experiência imersiva de RPG.</p>
                <div class="faq-highlight-box">
                    Os alunos resolvem desafios algorítmicos em tempo real, ganham XP, sobem de nível, desbloqueiam guardiões, participam de Boss Raids cooperativas e evoluem seus conhecimentos técnicos através de uma jornada visual completa.
                </div>`
            },
            {
                id: 2,
                category: 'geral',
                categoryLabel: 'Geral & Conta',
                question: 'O jogo é Free-to-Play?',
                answer: `<p><strong>Sim, 100% gratuito.</strong> O CODE LEVELER foi concebido e desenvolvido como uma plataforma estritamente educacional, aberta para instituições de ensino, turmas e estudantes, sem qualquer barreira de pagamento para acessar a experiência integral de aprendizado.</p>`
            },
            {
                id: 3,
                category: 'geral',
                categoryLabel: 'Geral & Conta',
                question: 'Como criar uma conta na plataforma?',
                answer: `<p>Clique no botão <strong>Cadastre-se</strong> no canto superior direito, informe seu nome completo, e-mail e defina uma senha. Se você for aluno de uma turma parceira, insira o <strong>Código da Guilda</strong> fornecido pelo seu professor para entrar automaticamente no ambiente da sua classe. Você também pode efetuar login direto e seguro com sua conta Google.</p>`
            },
            {
                id: 4,
                category: 'academico',
                categoryLabel: 'Acadêmico & Guildas',
                question: 'Como acessar ou solicitar uma conta de Professor / Mestre?',
                answer: `<p>O acesso de professor disponibiliza o painel de <strong>Mestre da Guilda</strong>, permitindo criar e gerenciar turmas, cadastrar desafios customizados, acompanhar métricas de resolução e submissões em tempo real e atribuir pontuações acadêmicas.</p>
                <div class="faq-highlight-box">
                    Para solicitar credenciais de professor para sua instituição ou disciplina, envie um e-mail para o suporte: <strong>rennancrpt@gmail.com</strong>.
                </div>`
            },
            {
                id: 5,
                category: 'academico',
                categoryLabel: 'Acadêmico & Guildas',
                question: 'O que é uma Guilda e por que preciso de uma?',
                answer: `<p>A <strong>Guilda</strong> representa a turma, classe ou grupo acadêmico oficial de estudos. Para realizar atividades de código, executar compilações no terminal, salvar progresso e pontuar nos rankings, o aluno precisa estar vinculado a uma Guilda ativa criada pelo professor.</p>`
            },
            {
                id: 6,
                category: 'academico',
                categoryLabel: 'Acadêmico & Guildas',
                question: 'Como entrar na Guilda da minha turma após o cadastro?',
                answer: `<p>Se você não inseriu o código durante o cadastro, acesse as configurações da sua conta ou o menu de Perfil na Guilda e clique em <strong>Vincular Código da Guilda</strong>. Digite o código repassado pelo professor para sincronizar suas notas e turmas.</p>`
            },
            {
                id: 7,
                category: 'jogabilidade',
                categoryLabel: 'Jogabilidade & Modos',
                question: 'Como funcionam as atividades de programação e o compilador?',
                answer: `<p>O aluno programa diretamente no navegador através de um editor com syntax highlighting profissional. Ao clicar em <strong>Executar Código</strong>, a solução é processada pelo interpretador/compilador integrado, que roda uma bateria de testes unitários automatizados com entradas e saídas esperadas, fornecendo feedback imediato e dicas progressivas.</p>`
            },
            {
                id: 8,
                category: 'jogabilidade',
                categoryLabel: 'Jogabilidade & Modos',
                question: 'Quais linguagens e trilhas de aprendizado estão disponíveis?',
                answer: `<p>Atualmente o CODE LEVELER conta com duas dimensões de ensino:</p>
                <div class="faq-highlight-box">
                    <strong>Mundo C:</strong> 16 Distritos focados em fundamentos de ciência da computação, lógica pura, ponteiros, aritmética de memória, alocação dinâmica (malloc/free), structs e estruturas de dados.<br><br>
                    <strong>Mundo C# Unity 6.5:</strong> 38 Capítulos práticos e 9 módulos didáticos focados no ecossistema de desenvolvimento de jogos com C# e motor Unity.
                </div>`
            },
            {
                id: 9,
                category: 'jogabilidade',
                categoryLabel: 'Jogabilidade & Modos',
                question: 'Preciso instalar compiladores ou softwares na minha máquina?',
                answer: `<p><strong>Não.</strong> O ambiente do Mundo C opera com um motor de interpretação e terminal virtual embutido diretamente no navegador, eliminando qualquer necessidade de configuração local de GCC, Clang ou IDEs complexas.</p>`
            },
            {
                id: 10,
                category: 'economia',
                categoryLabel: 'Economia & Gacha',
                question: 'Como ganhar XP, Tokens e recompensas no jogo?',
                answer: `<p><strong>XP:</strong> Concedido ao concluir desafios de código, avançar nos andares da Espiral do Abismo e derrotar chefes de Boss Raid.<br>
                <strong>Tokens da Guilda:</strong> Moeda de mérito obtida através de acertos de código e streaks de estudo diário. Podem ser trocados na Loja da Guilda por invocações de guardiões, skins de terminal, títulos de honra e artefatos de combate.</p>`
            },
            {
                id: 11,
                category: 'economia',
                categoryLabel: 'Economia & Gacha',
                question: 'O jogo possui microtransações com dinheiro real? Como funciona o Gacha?',
                answer: `<p><strong>NÃO EXISTE NENHUMA MICROTRANSAÇÃO COM DINHEIRO REAL.</strong> O CODE LEVELER é um software educacional sem fins lucrativos e não aceita pagamentos reais de qualquer natureza.</p>
                <div class="faq-highlight-box">
                    <strong>Sistema de Invocação (Gacha):</strong> É 100% abastecido por <em>Tokens da Guilda</em> conquistados unicamente pelo esforço e resolução de exercícios de programação.<br><br>
                    <strong>Probabilidades Transparentes:</strong> Todas as taxas de drop (Comum: 60%, Raro: 28%, Épico: 9%, Lendário: 3%) e mecânicas de Pity (proteção de azar garantida) são visíveis e explicadas detalhadamente dentro do jogo no modal da Câmara de Convocação.
                </div>`
            },
            {
                id: 12,
                category: 'academico',
                categoryLabel: 'Acadêmico & Guildas',
                question: 'Como funcionam os Cristais de Ascensão e pontos na média acadêmica?',
                answer: `<p>Os <strong>Cristais de Ascensão</strong> são insígnias de excelência concedidas por grandes feitos, como vencer o 16º andar do Abismo, triunfar em Torneios eliminatórios ou derrotar Raids em equipe.</p>
                <div class="faq-highlight-box">
                    Em turmas ativas da dimensão C# Unity, cada cristal conquistado pode ser convertido em <strong>+0,5 ponto na média acadêmica bimestral/semestral</strong>, de acordo com os critérios pedagógicos estipulados pelo professor regente.
                </div>`
            },
            {
                id: 13,
                category: 'jogabilidade',
                categoryLabel: 'Jogabilidade & Modos',
                question: 'Como interagir com outros colegas e formar Parties?',
                answer: `<p>Você pode interagir em tempo real pelo chat global da Guilda, convidar colegas para esquadrões de até 4 Codemancers e combinar habilidades passivas para enfrentar chefes de Boss Raids simultaneamente.</p>`
            },
            {
                id: 14,
                category: 'jogabilidade',
                categoryLabel: 'Jogabilidade & Modos',
                question: 'Como iniciar uma Boss Raid cooperativa?',
                answer: `<p>No saguão da Guilda, abra a aba de <strong>Boss Raids</strong>, selecione um dos 16 chefes épicos disponíveis e crie uma sala de expedição. Seus companheiros de Guilda podem ingressar no lobby e enfrentar a batalha cooperativa em tempo real com mecânicas de Enrage e Stun.</p>`
            },
            {
                id: 15,
                category: 'jogabilidade',
                categoryLabel: 'Jogabilidade & Modos',
                question: 'O jogo possui modos competitivos (PvP e Torneios)?',
                answer: `<p>Sim. O <strong>Coliseu PvP</strong> permite duelos ranqueados de velocidade e precisão de código contra outros estudantes, computando pontos de <em>Renome</em> e <em>MMR</em> para os elos de Bronze até Legendary CodeMancer. Além disso, a plataforma suporta Torneios sazonais em formato de chaves eliminatórias.</p>`
            },
            {
                id: 16,
                category: 'privacidade',
                categoryLabel: 'Privacidade & LGPD',
                question: 'Meus dados e progresso ficam salvos? Há risco de perda de conta?',
                answer: `<p>O progresso de nível, capítulos concluídos, tokens e inventário é sincronizado de forma segura em nuvem através do Google Firebase Firestore com gravação em transações atômicas.</p>
                <div class="faq-highlight-box">
                    A plataforma também conta com a funcionalidade de <strong>Pontos de Restauração em Nuvem</strong> e geração de <strong>Código de Backup</strong>, permitindo que você exporte e recupere seu estado a qualquer momento sem riscos de regressão.
                </div>`
            },
            {
                id: 17,
                category: 'privacidade',
                categoryLabel: 'Privacidade & LGPD',
                question: 'LGPD — Quais informações pessoais a plataforma coleta e armazena?',
                answer: `<p>Em estrita conformidade com a <strong>LGPD (Lei Geral de Proteção de Dados)</strong>, coletamos apenas os dados essenciais para identificação e acompanhamento pedagógico: nome, endereço de e-mail e métricas de desempenho didático (acertos, erros, submissões e tempo de execução). Seus dados jamais são comercializados ou compartilhados com terceiros.</p>`
            },
            {
                id: 18,
                category: 'privacidade',
                categoryLabel: 'Privacidade & LGPD',
                question: 'Posso solicitar a exclusão total da minha conta e dados?',
                answer: `<p>Sim. Na área de configurações da sua conta, há o recurso permanente de <strong>Deletar Conta</strong>. A exclusão apaga definitivamente seus registros, progresso, conquistas e histórico de submissões dos servidores do sistema.</p>`
            }
        ];
    }

    initFaq() {
        this._faqFilterCat = 'all';
        this._faqSearchTerm = '';
        this.renderFaqAccordion();
    }

    filterFaqCategory(category) {
        this._faqFilterCat = category;
        const pills = document.querySelectorAll('.faq-cat-pill');
        pills.forEach(p => {
            p.classList.toggle('active', p.getAttribute('data-faq-cat') === category);
        });
        this.renderFaqAccordion();
    }

    filterFaqSearch(term) {
        this._faqSearchTerm = (term || '').trim().toLowerCase();
        this.renderFaqAccordion();
    }

    toggleFaqItem(itemEl) {
        const isOpen = itemEl.classList.contains('is-open');
        // Fecha outros itens se desejar comportamento exclusivo (ou mantém múltiplos abertos)
        // Mantemos estilo acordeão fluido:
        itemEl.classList.toggle('is-open', !isOpen);
    }

    renderFaqAccordion() {
        const container = document.getElementById('faq-accordion-container');
        if (!container) return;

        let faqs = this.getFaqData();

        if (this._faqFilterCat && this._faqFilterCat !== 'all') {
            faqs = faqs.filter(f => f.category === this._faqFilterCat);
        }

        if (this._faqSearchTerm) {
            faqs = faqs.filter(f =>
                f.question.toLowerCase().includes(this._faqSearchTerm) ||
                f.answer.toLowerCase().includes(this._faqSearchTerm) ||
                f.categoryLabel.toLowerCase().includes(this._faqSearchTerm)
            );
        }

        if (faqs.length === 0) {
            container.innerHTML = `
                <div style="text-align:center;padding:3.5rem 1rem;color:var(--text-dim);font-family:var(--font-code);">
                    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto 1rem;color:rgba(139,92,246,0.4);"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <div>Nenhuma pergunta encontrada com o critério pesquisado.</div>
                    <div style="font-size:0.75rem;margin-top:0.4rem;color:rgba(255,255,255,0.4);">Tente buscar por palavras-chave como "Gacha", "Tokens", "Guilda", "Compilador" ou "LGPD".</div>
                </div>
            `;
            return;
        }

        container.innerHTML = faqs.map(item => `
            <div class="faq-accordion-item" id="faq-item-${item.id}">
                <div class="faq-accordion-header" onclick="landingController.toggleFaqItem(this.closest('.faq-accordion-item'))">
                    <div class="faq-header-left">
                        <span class="faq-question-num">#${String(item.id).padStart(2, '0')}</span>
                        <span class="faq-question-text">${item.question}</span>
                    </div>
                    <div class="faq-header-right">
                        <span class="faq-category-tag">${item.categoryLabel}</span>
                        <div class="faq-chevron">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                    </div>
                </div>
                <div class="faq-accordion-body">
                    ${item.answer}
                </div>
            </div>
        `).join('');
    }
}

window.landingController = new LandingPageController();

// Inicializa automaticamente no carregamento do DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.landingController.init());
} else {
    window.landingController.init();
}
