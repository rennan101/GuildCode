/* ═══════════════════════════════════════════════════════════════
   GUILDCODE / CODE LEVELER — Landing Page Interactive Controller
   Gerencia os eventos, carrossel de personagens e abertura de modais
   ═══════════════════════════════════════════════════════════════ */

class LandingPageController {
    constructor() {
        this.currentCharacter = 'arkan';
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
        this.renderGachaCodemancers('all');
    }

    renderGachaCodemancers(filter = 'all') {
        const grid = document.getElementById('landing-gacha-grid');
        if (!grid) return;

        const skillsData = (typeof AVATAR_SKILLS_DATA !== 'undefined' && AVATAR_SKILLS_DATA) 
            ? AVATAR_SKILLS_DATA 
            : (window.AVATAR_SKILLS_DATA || {});

        const raritiesData = (typeof AVATAR_RARITIES !== 'undefined' && AVATAR_RARITIES)
            ? AVATAR_RARITIES
            : (window.AVATAR_RARITIES || {});

        const avatars = Object.values(skillsData).filter(av => !av.teacherOnly && av.id !== '01');
        const filtered = filter === 'all' ? avatars : avatars.filter(a => a.rarity === filter);

        if (filtered.length === 0) return;

        grid.innerHTML = filtered.map(av => {
            const rInfo = raritiesData[av.rarity] || { label: 'Comum', stars: 3, color: '#94a3b8' };
            const starText = '★'.repeat(rInfo.stars);
            const labelText = rInfo.label || rInfo.name || 'COMUM';
            return `
                <div class="landing-gacha-card" style="--card-tier-color:${rInfo.color}">
                    <div class="landing-gacha-card-glow"></div>
                    <div class="landing-gacha-avatar-box">
                        <img src="assets/avatars/avatar_${av.id}.png" alt="${av.name}" loading="lazy" />
                        <span class="landing-gacha-rarity-badge" style="color:${rInfo.color};border-color:${rInfo.color}">
                            ${starText} ${labelText.toUpperCase()}
                        </span>
                    </div>
                    <div class="landing-gacha-card-body">
                        <div class="landing-gacha-hero-head">
                            <h4 class="landing-gacha-hero-name">${av.name}</h4>
                            <span class="landing-gacha-hero-title">${av.title}</span>
                        </div>
                        <div class="landing-gacha-skill-box">
                            <div class="landing-gacha-skill-header">
                                <span class="landing-gacha-skill-icon" style="color:${rInfo.color}">✦</span>
                                <span class="landing-gacha-skill-title" style="color:${rInfo.color}">${av.skillName}</span>
                            </div>
                            <p class="landing-gacha-skill-desc">${av.skillDesc}</p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    bindEvents() {
        // Filtros de raridade dos Codemancers do Gacha
        const filterBtns = document.querySelectorAll('.gacha-filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter') || 'all';
                this.renderGachaCodemancers(filter);
            });
        });

        // Seleção de personagens na Landing
        const navItems = document.querySelectorAll('.char-nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const charKey = item.getAttribute('data-char');
                if (charKey) {
                    this.selectCharacter(charKey);
                }
            });
        });
    }

    selectCharacter(charKey) {
        const char = this.charactersData[charKey];
        if (!char) return;

        this.currentCharacter = charKey;

        // Atualizar lista ativa
        document.querySelectorAll('.char-nav-item').forEach(item => {
            if (item.getAttribute('data-char') === charKey) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Atualizar painel de exibição
        const imgEl = document.getElementById('landing-char-img');
        const nameEl = document.getElementById('landing-char-name');
        const fullnameEl = document.getElementById('landing-char-fullname');
        const roleEl = document.getElementById('landing-char-role');
        const quoteEl = document.getElementById('landing-char-quote');
        const bioEl = document.getElementById('landing-char-bio');

        if (imgEl) {
            imgEl.style.opacity = '0';
            imgEl.style.transform = 'scale(0.95)';
            setTimeout(() => {
                imgEl.src = char.image;
                imgEl.alt = char.fullName;
                imgEl.style.opacity = '1';
                imgEl.style.transform = 'scale(1)';
            }, 150);
        }

        if (nameEl) nameEl.textContent = char.name;
        if (fullnameEl) fullnameEl.textContent = char.fullName;
        if (roleEl) roleEl.textContent = char.role;
        if (quoteEl) quoteEl.textContent = char.quote;
        if (bioEl) bioEl.textContent = char.bio;
    }
}

window.landingController = new LandingPageController();

// Inicializa automaticamente no carregamento do DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.landingController.init();
    });
} else {
    window.landingController.init();
}

