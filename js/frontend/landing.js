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
            const topicText = typeof BossDataManager !== 'undefined' && BossDataManager.getSubjectForBoss 
                ? BossDataManager.getSubjectForBoss(boss, boss.chapterId) 
                : (boss.subject || 'Lógica de Combate');

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
                                        <span class="inv-avatar-skill-label" style="color: #f87171;">Tópico: ${topicText}</span>
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
}

window.landingController = new LandingPageController();

// Inicializa automaticamente no carregamento do DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.landingController.init());
} else {
    window.landingController.init();
}
