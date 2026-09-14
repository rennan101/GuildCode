/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — UI: Map & Atmosphere
   ═══════════════════════════════════════════════════════════════ */

(function() {
    class _Extension {

    startMapAtmosphericEffects() {
        if (this._mapAtmosphereInitialized) return;
        this._mapAtmosphereInitialized = true;

        const scheduleNextThunder = () => {
            // Intervalo pseudo-aleatório entre trovoadas (10 a 22 segundos)
            const nextDelay = 10000 + Math.random() * 12000;
            this._thunderTimer = setTimeout(() => {
                // Apenas dispara se o dashboard do mapa estiver visível na tela, na aba ativa e NÃO estiver em modo baixo consumo
                const dashboardScreen = document.getElementById('screen-dashboard');
                const isDashboardVisible = dashboardScreen && dashboardScreen.classList.contains('active');
                const isLowPower = document.body.classList.contains('perf-low-power');
                if (isDashboardVisible && !document.hidden && !isLowPower) {
                    this.triggerThunderLightningEvent();
                }
                scheduleNextThunder();
            }, nextDelay);
        };

        scheduleNextThunder();
    }

    triggerThunderLightningEvent() {
        const flashEl = document.getElementById('map-thunder-flash');
        const canvas = document.getElementById('map-lightning-canvas');
        if (!flashEl || !canvas) return;

        // 1. Aciona o clarão (flash) estocástico
        flashEl.classList.remove('flash-trigger');
        void flashEl.offsetWidth; // Força reflow
        flashEl.classList.add('flash-trigger');

        // 2. Desenha o raio ramificado no céu
        this.renderProceduralLightning(canvas);
    }

    renderProceduralLightning(canvas) {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Ponto de origem no topo do céu (área de 2400px de largura)
        const startX = 300 + Math.random() * 1800;
        const startY = 0;
        const targetY = 320 + Math.random() * 260;
        const targetX = startX + (Math.random() - 0.5) * 500;

        const branches = [];

        const createBolt = (x1, y1, x2, y2, depth = 0) => {
            branches.push({ x1, y1, x2, y2, depth });
            if (depth >= 4) return;

            const dx = x2 - x1;
            const dy = y2 - y1;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 35) {
                const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * 45;
                const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * 20;

                createBolt(x1, y1, midX, midY, depth);
                createBolt(midX, midY, x2, y2, depth);

                // Ramificação secundária probabilística
                if (Math.random() < 0.65 && depth < 3) {
                    const branchX = midX + (Math.random() - 0.5) * 120;
                    const branchY = midY + 40 + Math.random() * 90;
                    createBolt(midX, midY, branchX, branchY, depth + 1);
                }
            }
        };

        createBolt(startX, startY, targetX, targetY, 0);

        // Renderiza os traços do raio
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Glow externo do raio
        ctx.shadowColor = 'rgba(165, 215, 255, 0.95)';
        ctx.shadowBlur = 18;
        ctx.strokeStyle = 'rgba(190, 230, 255, 0.85)';
        ctx.lineWidth = 3.5;

        ctx.beginPath();
        branches.forEach(b => {
            ctx.moveTo(b.x1, b.y1);
            ctx.lineTo(b.x2, b.y2);
        });
        ctx.stroke();

        // Núcleo branco intenso central
        ctx.shadowBlur = 6;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        branches.forEach(b => {
            if (b.depth < 2) {
                ctx.moveTo(b.x1, b.y1);
                ctx.lineTo(b.x2, b.y2);
            }
        });
        ctx.stroke();
        ctx.restore();

        canvas.classList.add('active');

        // Remove o traço do raio após curto intervalo dinâmico
        setTimeout(() => {
            canvas.classList.remove('active');
            setTimeout(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }, 120);
        }, 220);
    }

    initInteractiveMap() {
        if (this.mapInitialized) {
            this.updateMapPanTransform();
            return;
        }
        this.mapInitialized = true;

        const initialScale = this.calculateMapScale();
        this.mapState = {
            width: 2400,
            height: 1400,
            x: 0,
            y: 0,
            scale: initialScale,
            isDragging: false,
            startX: 0,
            startY: 0,
            selectedChapterId: null
        };

        // Encontra capítulo ativo ou primeiro capítulo para centrar o mapa inicialmente
        const chapters = this.getMapChapterData();
        const currentChapterId = (this.engine && this.engine.state && this.engine.state.currentChapter) || 0;
        const targetChap = (chapters && chapters.find(c => c.id === currentChapterId)) || (chapters && chapters[0]);
        if (targetChap) {
            const viewport = document.getElementById('map-viewport');
            const vw = (viewport && viewport.clientWidth) || Math.max(window.innerWidth - 64, 400);
            const vh = (viewport && viewport.clientHeight) || Math.max(window.innerHeight - 56, 400);
            this.mapState.x = vw / 2 - targetChap.x * initialScale;
            this.mapState.y = vh / 2 - targetChap.y * initialScale;
        }
        const clamped = this.clampMapCoordinates(this.mapState.x, this.mapState.y, this.mapState.scale);
        this.mapState.x = clamped.x;
        this.mapState.y = clamped.y;

        const viewport = document.getElementById('map-viewport');
        if (!viewport) return;

        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let rafId = null;

        const onDragStart = (clientX, clientY) => {
            isDragging = true;
            this.mapState.isDragging = true;
            startX = clientX - this.mapState.x;
            startY = clientY - this.mapState.y;
        };

        const onDragMove = (clientX, clientY) => {
            if (!isDragging) return;
            this.mapState.x = clientX - startX;
            this.mapState.y = clientY - startY;

            if (!rafId) {
                rafId = requestAnimationFrame(() => {
                    this.updateMapPanTransform();
                    rafId = null;
                });
            }
        };

        const onDragEnd = () => {
            if (isDragging) {
                isDragging = false;
                if (this.mapState) this.mapState.isDragging = false;
                if (rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
                this.updateMapPanTransform();
            }
        };

        viewport.addEventListener('mousedown', (e) => {
            if (e.target.closest('.map-node') || e.target.closest('.boss-map-node-wrapper')) return;
            onDragStart(e.clientX, e.clientY);
        });

        window.addEventListener('mousemove', (e) => {
            onDragMove(e.clientX, e.clientY);
        }, { passive: true });

        window.addEventListener('mouseup', onDragEnd);

        // Touch support para mobile/tablets
        viewport.addEventListener('touchstart', (e) => {
            if (e.target.closest('.map-node') || e.target.closest('.boss-map-node-wrapper')) return;
            if (e.touches.length === 1) {
                onDragStart(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (isDragging && e.touches.length === 1) {
                onDragMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        window.addEventListener('touchend', onDragEnd);
        window.addEventListener('touchcancel', onDragEnd);

        window.addEventListener('resize', () => {
            this.updateMapPanTransform();
        });
    }

    calculateMapScale() {
        const viewport = document.getElementById('map-viewport');
        const vw = (viewport && viewport.clientWidth) ? viewport.clientWidth : Math.max(window.innerWidth - 64, 400);
        const vh = (viewport && viewport.clientHeight) ? viewport.clientHeight : Math.max(window.innerHeight - 56, 400);
        // Garante que o mapa cubra sempre a área visível sem deixar faixas pretas nas bordas
        return Math.max(vw / 2400, vh / 1400, 0.65);
    }

    clampMapCoordinates(x, y, scale) {
        const viewport = document.getElementById('map-viewport');
        const vw = (viewport && viewport.clientWidth) ? viewport.clientWidth : Math.max(window.innerWidth - 64, 400);
        const vh = (viewport && viewport.clientHeight) ? viewport.clientHeight : Math.max(window.innerHeight - 56, 400);
        
        const scaledWidth = 2400 * scale;
        const scaledHeight = 1400 * scale;

        let minX = vw - scaledWidth;
        let maxX = 0;
        if (scaledWidth <= vw) {
            x = (vw - scaledWidth) / 2;
        } else {
            x = Math.min(maxX, Math.max(minX, x));
        }

        let minY = vh - scaledHeight;
        let maxY = 0;
        if (scaledHeight <= vh) {
            y = (vh - scaledHeight) / 2;
        } else {
            y = Math.min(maxY, Math.max(minY, y));
        }

        return { x, y };
    }

    updateMapPanTransform() {
        if (!this.mapState) return;
        const panContainer = document.getElementById('map-pan-container');
        if (!panContainer) return;

        this.mapState.scale = this.calculateMapScale();
        const clamped = this.clampMapCoordinates(this.mapState.x, this.mapState.y, this.mapState.scale);
        this.mapState.x = clamped.x;
        this.mapState.y = clamped.y;

        panContainer.style.transform = `translate(${this.mapState.x}px, ${this.mapState.y}px) scale(${this.mapState.scale})`;
    }

    centerOnMapNode(chap) {
        const viewport = document.getElementById('map-viewport');
        if (!chap || !this.mapState) return;
        const vw = (viewport && viewport.clientWidth) ? viewport.clientWidth : Math.max(window.innerWidth - 64, 400);
        const vh = (viewport && viewport.clientHeight) ? viewport.clientHeight : Math.max(window.innerHeight - 56, 400);
        this.mapState.scale = this.calculateMapScale();
        this.mapState.x = vw / 2 - chap.x * this.mapState.scale;
        this.mapState.y = vh / 2 - chap.y * this.mapState.scale;
        this.updateMapPanTransform();
    }

    getMapChapterData() {
        const isCSharp = (this.engine && this.engine.state && this.engine.state.worldId === 'csharp_unity') ||
                         (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');

        // Coordenadas e dados ricos mapeados para os 16 Capítulos Oficiais (Dimensão C)
        const cChapterPositions = [
            { id: 0, x: 410, y: 390, img: "assets/map/ch00_awakening_sanctuary_1787969712672.jpg", char: "Arkan Velor", xp: 70, gp: 10, item: "Grimório I/O" },
            { id: 1, x: 1120, y: 520, img: "assets/map/ch01_crystal_spire_1787969758611.jpg", char: "Lyra Nex", xp: 80, gp: 15, item: "Frasco de Mana" },
            { id: 2, x: 820, y: 510, img: "assets/map/ch02_mana_tree_1787969808602.jpg", char: "Arkan Velor", xp: 150, gp: 20, item: "Selo do Fluxo" },
            { id: 3, x: 1390, y: 520, img: "assets/map/chapter_palace_card_1787956680762.jpg", char: "Elion Raven", xp: 110, gp: 25, item: "Pena do Escriba" },
            { id: 4, x: 290, y: 780, img: "assets/map/chapter_dungeon_card_1787956703908.jpg", char: "Lyra Nex", xp: 120, gp: 30, item: "Bolsa Dimensional" },
            { id: 5, x: 1290, y: 1050, img: "assets/map/chapter_dungeon_card_1787956703908.jpg", char: "Mira Solenn", xp: 130, gp: 35, item: "Amuleto do Infinito" },
            { id: 6, x: 2060, y: 1200, img: "assets/map/chapter_dungeon_card_1787956703908.jpg", char: "Lyra Nex", xp: 140, gp: 35, item: "Lente Arcana" },
            { id: 7, x: 650, y: 950, img: "assets/map/ch07_royal_armory_1787969863538.jpg", char: "Arkan Velor", xp: 150, gp: 40, item: "Espada Rúnica" },
            { id: 8, x: 1750, y: 530, img: "assets/map/chapter_library_card_1787956731554.jpg", char: "Lyra Nex", xp: 160, gp: 45, item: "Tomo Celestial" },
            { id: 9, x: 2130, y: 360, img: "assets/map/ch09_dimensional_portal_1787969922534.jpg", char: "Arkan Velor", xp: 170, gp: 50, item: "Bússola Dimensional" },
            { id: 10, x: 1960, y: 680, img: "assets/map/chapter_library_card_1787956731554.jpg", char: "Elion Raven", xp: 180, gp: 55, item: "Pena Encantada" },
            { id: 11, x: 1580, y: 920, img: "assets/map/ch01_crystal_spire_1787969758611.jpg", char: "Orin Vale", xp: 190, gp: 60, item: "Orbe de Teletransporte" },
            { id: 12, x: 950, y: 920, img: "assets/map/chapter_palace_card_1787956680762.jpg", char: "Elion Raven", xp: 200, gp: 65, item: "Contrato de Herói" },
            { id: 13, x: 820, y: 1180, img: "assets/map/chapter_library_card_1787956731554.jpg", char: "Elion Raven", xp: 210, gp: 70, item: "Grande Tomo da Guilda" },
            { id: 14, x: 1680, y: 1220, img: "assets/map/ch14_arcane_colosseum_1787969986816.jpg", char: "Kael Draven", xp: 230, gp: 80, item: "Troféu do Campeão" },
            { id: 15, x: 2200, y: 920, img: "assets/map/ch15_eternal_book_1787970055553.jpg", char: "Arkan Velor", xp: 250, gp: 100, item: "Selo do Mestre Supremo" }
        ];

        // 38 Nós Distribuídos Coerentemente sobre estradas, fortalezas, florestas e lagos no Mapa C# Unity (2400x1400)
        const csPositions = [
            // Módulo 1 (0..7): Trilha Inicial - Santuário do Sudoeste às Ruínas e Torre Antiga
            { id: 0, x: 230, y: 1100, img: "assets/map/ch00_awakening_sanctuary_1787969712672.jpg", char: "Arkan Velor", xp: 70, gp: 10, item: "Núcleo C#" },
            { id: 1, x: 380, y: 1140, img: "assets/map/ch01_crystal_spire_1787969758611.jpg", char: "Lyra Nex", xp: 80, gp: 15, item: "Prisma Lógico" },
            { id: 2, x: 520, y: 1200, img: "assets/map/ch02_mana_tree_1787969808602.jpg", char: "Arkan Velor", xp: 90, gp: 20, item: "Bússola de Fluxo" },
            { id: 3, x: 670, y: 1160, img: "assets/map/chapter_palace_card_1787956680762.jpg", char: "Elion Raven", xp: 100, gp: 20, item: "Anel do Laço" },
            { id: 4, x: 590, y: 1010, img: "assets/map/chapter_library_card_1787956731554.jpg", char: "Lyra Nex", xp: 110, gp: 25, item: "Pergaminho de Métodos" },
            { id: 5, x: 440, y: 940, img: "assets/map/chapter_dungeon_card_1787956703908.jpg", char: "Kael Draven", xp: 120, gp: 25, item: "Vetor de Armazenamento" },
            { id: 6, x: 270, y: 830, img: "assets/map/ch07_royal_armory_1787969863538.jpg", char: "Mira Solenn", xp: 130, gp: 30, item: "Orbe Objeto" },
            { id: 7, x: 290, y: 690, img: "assets/map/ch14_arcane_colosseum_1787969986816.jpg", char: "Arkan Velor", xp: 140, gp: 30, item: "Selo Polimórfico" },

            // Módulo 2 & 3 (8..12): Da Cidadela Superior à Grande Floresta Rúnica
            { id: 8, x: 410, y: 530, img: "assets/map/ch09_dimensional_portal_1787969922534.jpg", char: "Orin Vale", xp: 150, gp: 35, item: "GameObject Rúnico" },
            { id: 9, x: 420, y: 390, img: "assets/map/ch01_crystal_spire_1787969758611.jpg", char: "Lyra Nex", xp: 160, gp: 35, item: "Giz Espacial Transform" },
            { id: 10, x: 570, y: 470, img: "assets/map/ch02_mana_tree_1787969808602.jpg", char: "Arkan Velor", xp: 170, gp: 40, item: "Ampulheta Update" },
            { id: 11, x: 700, y: 560, img: "assets/map/chapter_library_card_1787956731554.jpg", char: "Elion Raven", xp: 180, gp: 40, item: "Manopla Input" },
            { id: 12, x: 830, y: 510, img: "assets/map/chapter_palace_card_1787956680762.jpg", char: "Mira Solenn", xp: 190, gp: 45, item: "Mapa de Ações" },

            // Módulo 4 & 5 (13..17): Rumo ao Pináculo Central e Fortaleza Imperial
            { id: 13, x: 970, y: 530, img: "assets/map/ch00_awakening_sanctuary_1787969712672.jpg", char: "Orin Vale", xp: 200, gp: 45, item: "Eixo Tridimensional" },
            { id: 14, x: 1120, y: 540, img: "assets/map/ch14_arcane_colosseum_1787969986816.jpg", char: "Kael Draven", xp: 210, gp: 50, item: "Vetor Direcional" },
            { id: 15, x: 1260, y: 490, img: "assets/map/chapter_dungeon_card_1787956703908.jpg", char: "Mira Solenn", xp: 220, gp: 50, item: "Prisma Raycast" },
            { id: 16, x: 1390, y: 480, img: "assets/map/ch07_royal_armory_1787969863538.jpg", char: "Kael Draven", xp: 230, gp: 55, item: "Massa Gravitacional" },
            { id: 17, x: 1540, y: 510, img: "assets/map/ch01_crystal_spire_1787969758611.jpg", char: "Arkan Velor", xp: 240, gp: 55, item: "Gatilho de Impacto" },

            // Módulo 6 & 7 (18..22): Catedral Arcana e Portal Dimensional do Nordeste
            { id: 18, x: 1690, y: 490, img: "assets/map/ch09_dimensional_portal_1787969922534.jpg", char: "Lyra Nex", xp: 250, gp: 60, item: "Lente Cinemachine" },
            { id: 19, x: 1830, y: 460, img: "assets/map/chapter_palace_card_1787956680762.jpg", char: "Elion Raven", xp: 260, gp: 60, item: "Visor em 1ª Pessoa" },
            { id: 20, x: 1980, y: 420, img: "assets/map/ch15_eternal_book_1787970055553.jpg", char: "Orin Vale", xp: 270, gp: 65, item: "Malha Poligonal" },
            { id: 21, x: 2130, y: 390, img: "assets/map/ch02_mana_tree_1787969808602.jpg", char: "Mira Solenn", xp: 280, gp: 65, item: "Semente do Terreno" },
            { id: 22, x: 2080, y: 550, img: "assets/map/ch00_awakening_sanctuary_1787969712672.jpg", char: "Lyra Nex", xp: 290, gp: 70, item: "Luz Razoável APV" },

            // Módulo 8 (23..27): Fortaleza das Rochas e Descida pelo Leste
            { id: 23, x: 1960, y: 640, img: "assets/map/chapter_library_card_1787956731554.jpg", char: "Elion Raven", xp: 300, gp: 70, item: "Painel TextMeshPro" },
            { id: 24, x: 1810, y: 690, img: "assets/map/ch01_crystal_spire_1787969758611.jpg", char: "Mira Solenn", xp: 310, gp: 75, item: "Faísca VFX" },
            { id: 25, x: 1650, y: 730, img: "assets/map/ch07_royal_armory_1787969863538.jpg", char: "Kael Draven", xp: 320, gp: 75, item: "Sino Tridimensional" },
            { id: 26, x: 1470, y: 720, img: "assets/map/ch09_dimensional_portal_1787969922534.jpg", char: "Orin Vale", xp: 330, gp: 80, item: "Bússola NavMesh" },
            { id: 27, x: 1310, y: 760, img: "assets/map/ch14_arcane_colosseum_1787969986816.jpg", char: "Arkan Velor", xp: 340, gp: 80, item: "Shader Rúnico" },

            // Módulo 9 (28..37): Vale Central, Floresta Sul, Lagos, Labirinto e Bastião Portuário
            { id: 28, x: 1140, y: 780, img: "assets/map/ch00_awakening_sanctuary_1787969712672.jpg", char: "Orin Vale", xp: 350, gp: 85, item: "Gerador Instantiate" },
            { id: 29, x: 960, y: 820, img: "assets/map/chapter_dungeon_card_1787956703908.jpg", char: "Lyra Nex", xp: 360, gp: 85, item: "Reservatório Pool" },
            { id: 30, x: 880, y: 940, img: "assets/map/chapter_library_card_1787956731554.jpg", char: "Elion Raven", xp: 370, gp: 90, item: "Scriptable Cristal" },
            { id: 31, x: 1040, y: 990, img: "assets/map/ch02_mana_tree_1787969808602.jpg", char: "Mira Solenn", xp: 380, gp: 90, item: "Memória PlayerPrefs" },
            { id: 32, x: 1210, y: 980, img: "assets/map/chapter_palace_card_1787956680762.jpg", char: "Lyra Nex", xp: 390, gp: 95, item: "Registro JSON" },
            { id: 33, x: 1370, y: 1020, img: "assets/map/ch01_crystal_spire_1787969758611.jpg", char: "Orin Vale", xp: 400, gp: 95, item: "Fita Coroutine" },
            { id: 34, x: 1550, y: 1020, img: "assets/map/ch07_royal_armory_1787969863538.jpg", char: "Elion Raven", xp: 410, gp: 100, item: "Arauto de Eventos" },
            { id: 35, x: 1720, y: 1010, img: "assets/map/ch14_arcane_colosseum_1787969986816.jpg", char: "Kael Draven", xp: 420, gp: 100, item: "Pacto de Interfaces" },
            { id: 36, x: 1890, y: 1060, img: "assets/map/ch09_dimensional_portal_1787969922534.jpg", char: "Mira Solenn", xp: 430, gp: 110, item: "Escudo TryCatch" },
            { id: 37, x: 2060, y: 1140, img: "assets/map/ch15_eternal_book_1787970055553.jpg", char: "Arkan Velor", xp: 450, gp: 120, item: "Códice Supremo da Engine" }
        ];

        const defaultPositions = isCSharp ? csPositions : cChapterPositions;
        const worldKey = isCSharp ? 'csharp_unity' : 'c_lang';
        const savedCustom = (this.customMapPositions && this.customMapPositions[worldKey]) || null;
        const activeSource = (this.isMapEditing && this.editedMapPositions && this.editedMapPositions[worldKey]) 
                             ? this.editedMapPositions[worldKey] 
                             : (savedCustom || defaultPositions);

        const chapterPositions = defaultPositions.map(def => {
            const override = activeSource.find(p => p.id === def.id);
            return override ? { ...def, x: override.x, y: override.y } : def;
        });
        const activeChapters = (isCSharp && typeof CSHARP_CHAPTERS !== 'undefined') ? CSHARP_CHAPTERS : CHAPTERS;

        return activeChapters.map(ch => {
            const extra = chapterPositions.find(p => p.id === ch.id) || { x: 500, y: 500, img: "assets/map/chapter_palace_card_1787956680762.jpg", char: "Arkan Velor", xp: 100, gp: 20, item: "Relíquia da Guilda" };
            const unlocked = this.engine.isChapterUnlocked(ch.id);
            const completed = this.engine.isChapterCompleted(ch.id);
            
            const totalActs = ch.activities ? ch.activities.length : 3;
            let doneActs = 0;
            if (this.engine.state.chapters && this.engine.state.chapters[ch.id]) {
                for (let a = 1; a <= totalActs; a++) {
                    if (this.engine.state.chapters[ch.id]['act' + a]) doneActs++;
                }
            }
            if (completed) doneActs = totalActs;

            return {
                id: ch.id,
                numStr: `CAPÍTULO ${String(ch.id).padStart(2, '0')}`,
                title: ch.title,
                theme: ch.theme,
                status: completed ? 'completed' : unlocked ? 'unlocked' : 'locked',
                x: extra.x,
                y: extra.y,
                image: extra.img,
                character: extra.char,
                narrative: (ch.story && ch.story[0] && ch.story[0].text) || `A Guilda necessita que você domine ${ch.theme} para restaurar o sistema.`,
                summary: (ch.concept && ch.concept.title) || `Complete os desafios e compile o código sagrado.`,
                systems: (ch.concept && ch.concept.points) || [`Fundamentos e regras de ${ch.theme}`],
                missionsCount: totalActs,
                missionsDone: doneActs,
                rewards: { xp: extra.xp, gp: extra.gp, item: extra.item },
                artifactReward: ch.artifactReward || (ch.activities && ch.activities[totalActs - 1] && ch.activities[totalActs - 1].artifactReward) || null
            };
        });
    }

    renderMapConnections() {
        const svgLayer = document.getElementById('map-svg-layer');
        if (!svgLayer) return;
        svgLayer.innerHTML = '';

        const isCSharp = (this.engine && this.engine.state && this.engine.state.worldId === 'csharp_unity') ||
                         (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');

        let connections = [];
        if (isCSharp) {
            // Trilha sequencial de progressão para os 38 capítulos do Unity
            for (let i = 0; i < 37; i++) {
                connections.push({ from: i, to: i + 1, active: true });
            }
        } else {
            // Trilha sequencial de progressão para os 16 capítulos da Dimensão C (0 a 15)
            for (let i = 0; i < 15; i++) {
                connections.push({ from: i, to: i + 1, active: true });
            }
        }

        const allChapters = this.getMapChapterData();

        connections.forEach(conn => {
            const nodeA = allChapters.find(c => c.id === conn.from);
            const nodeB = allChapters.find(c => c.id === conn.to);
            if (!nodeA || !nodeB) return;

            const midX = (nodeA.x + nodeB.x) / 2;
            const midY = (nodeA.y + nodeB.y) / 2 + (nodeA.x < nodeB.x ? 25 : -25);

            const isPathActive = nodeA.status !== 'locked' && nodeB.status !== 'locked';

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', `M ${nodeA.x} ${nodeA.y} Q ${midX} ${midY}, ${nodeB.x} ${nodeB.y}`);
            path.setAttribute('class', `path-line ${isPathActive ? 'active-path' : ''}`);
            svgLayer.appendChild(path);
        });
    }

    async fetchGuildMembersForMap() {
        if (this._fetchingGuildMembers) return;
        if (typeof authManager === 'undefined' || !authManager.isSignedIn()) return;
        
        this._fetchingGuildMembers = true;
        try {
            const members = await authManager.getGuildMembers();
            this.cachedGuildMembers = members || [];
            this.renderMapSpotlightsAndNodes();
        } catch (e) {
            console.warn('[UI] fetchGuildMembersForMap notice:', e);
        } finally {
            this._fetchingGuildMembers = false;
        }
    }

    renderMapSpotlightsAndNodes() {
        const spotlightsContainer = document.getElementById('spotlights-container');
        const nodesContainer = document.getElementById('nodes-container');
        if (!spotlightsContainer || !nodesContainer) return;

        // Se ainda não buscou os membros da guilda, dispara a busca
        if (!this.cachedGuildMembers && !this._fetchingGuildMembers) {
            this.fetchGuildMembersForMap();
        }

        spotlightsContainer.innerHTML = '';
        nodesContainer.innerHTML = '';

        const allChapters = this.getMapChapterData();
        const selectedId = this.mapState ? this.mapState.selectedChapterId : null;

        // Mapeia membros por capítulo atual (maior capítulo desbloqueado)
        const membersByChapter = {};
        const currentUserId = (typeof authManager !== 'undefined' && authManager.getCurrentUser()?.uid) || '';

        const isCSharp = this.isCSharpWorld();
        const activeWorld = isCSharp ? 'csharp_unity' : 'c_lang';

        if (this.cachedGuildMembers && Array.isArray(this.cachedGuildMembers)) {
            this.cachedGuildMembers.forEach(mem => {
                const isMe = currentUserId && mem.uid === currentUserId;
                const memberWorld = isMe ? activeWorld : (mem.worldId || (mem.gameProgress && mem.gameProgress.worldId) || 'c_lang');
                if (memberWorld !== activeWorld) return;

                const prog = mem.gameProgress;
                let lastChapterId = 0;

                if (isMe && this.engine && this.engine.state) {
                    // Para o jogador logado, usa o progresso em tempo real do engine
                    // Prioriza capítulos completados: se completou os caps 0 e 1, está no cap 2!
                    const chapters = this.engine.state.chapters || {};
                    const doneIds = Object.keys(chapters).filter(id => chapters[id] && chapters[id].completed).map(Number).filter(n => !isNaN(n));
                    const unlocks = Array.isArray(this.engine.state.chapterUnlocks) ? this.engine.state.chapterUnlocks : [];
                    
                    if (doneIds.length > 0) {
                        lastChapterId = Math.max(...doneIds) + 1;
                    } else if (unlocks.length > 0) {
                        lastChapterId = Math.max(...unlocks);
                    }
                } else if (prog) {
                    const chapters = prog.chapters || {};
                    const doneIds = Object.keys(chapters).filter(id => chapters[id] && chapters[id].completed).map(Number).filter(n => !isNaN(n));
                    const unlocks = Array.isArray(prog.chapterUnlocks) ? prog.chapterUnlocks : [];

                    if (doneIds.length > 0) {
                        lastChapterId = Math.max(...doneIds) + 1;
                    } else if (unlocks.length > 0) {
                        lastChapterId = Math.max(...unlocks);
                    }
                }

                // Limita ao range de capítulos existentes (0 a 37 para C#, 0 a 15 para C)
                const maxChapId = isCSharp ? 37 : 15;
                lastChapterId = Math.max(0, Math.min(maxChapId, lastChapterId));

                if (!membersByChapter[lastChapterId]) {
                    membersByChapter[lastChapterId] = [];
                }
                membersByChapter[lastChapterId].push(mem);
            });
        }

        // Se o jogador atual estiver autenticado mas ainda não foi inserido no mapa (ex: guild cache vazia ou membro novo)
        if (currentUserId) {
            let alreadyInMap = false;
            for (const chId in membersByChapter) {
                if (membersByChapter[chId].some(m => m.uid === currentUserId)) {
                    alreadyInMap = true;
                    break;
                }
            }
            if (!alreadyInMap) {
                let myLastChapterId = 0;
                if (this.engine && this.engine.state) {
                    const chapters = this.engine.state.chapters || {};
                    const doneIds = Object.keys(chapters).filter(id => chapters[id] && chapters[id].completed).map(Number).filter(n => !isNaN(n));
                    const unlocks = Array.isArray(this.engine.state.chapterUnlocks) ? this.engine.state.chapterUnlocks : [];

                    if (doneIds.length > 0) {
                        myLastChapterId = Math.max(...doneIds) + 1;
                    } else if (unlocks.length > 0) {
                        myLastChapterId = Math.max(...unlocks);
                    }
                }
                const maxChapId = isCSharp ? 37 : 15;
                myLastChapterId = Math.max(0, Math.min(maxChapId, myLastChapterId));
                if (!membersByChapter[myLastChapterId]) {
                    membersByChapter[myLastChapterId] = [];
                }
                membersByChapter[myLastChapterId].push({
                    uid: currentUserId,
                    displayName: (typeof authManager !== 'undefined' && authManager.getCurrentUser()?.displayName) || (this.engine && this.engine.state && this.engine.state.playerName) || 'Aprendiz',
                    photoURL: (typeof authManager !== 'undefined' && authManager.getPhotoURL()) || (this.engine && this.engine.state && this.engine.state.photoURL) || 'assets/avatars/avatar_02.png',
                    worldId: activeWorld,
                    role: (typeof authManager !== 'undefined' && authManager.isTeacher()) ? 'teacher' : 'student',
                    gameProgress: {
                        level: (this.engine && this.engine.state && this.engine.state.level) || 1,
                        worldId: activeWorld
                    }
                });
            }
        }

        allChapters.forEach(chap => {
            // O spotlight só deve ser ativado nos locais em que o jogador desbloqueou (nos 2 mundos: C e C#)
            if (chap.status !== 'locked') {
                const spot = document.createElement('div');
                spot.className = 'scenery-spotlight';
                spot.dataset.chapterId = chap.id;
                spot.style.left = `${chap.x}px`;
                spot.style.top = `${chap.y - 70}px`;
                spot.style.width = '240px';
                spot.style.height = '240px';
                spotlightsContainer.appendChild(spot);
            }

            const hasPending = chap.status === 'unlocked' && chap.missionsDone < chap.missionsCount;

            let symbolHTML = `<span class="node-symbol-inner symbol-new">!</span>`;
            if (chap.status === 'completed') {
                symbolHTML = `<div class="node-symbol-inner symbol-check"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div>`;
            } else if (chap.status === 'locked') {
                symbolHTML = `<div class="node-symbol-inner symbol-lock"><svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg></div>`;
            }

            // Renderiza avatares dos membros presentes neste capítulo
            const presentMembers = membersByChapter[chap.id] || [];
            let explorersHTML = '';
            if (presentMembers.length > 0) {
                const maxVisible = 3;
                const visibleMembers = presentMembers.slice(0, maxVisible);
                const extraCount = presentMembers.length - maxVisible;

                explorersHTML = `
                    <div class="node-guild-explorers" title="${presentMembers.length} membro(s) da guilda explorando este capítulo">
                        ${visibleMembers.map(m => {
                            const isMe = m.uid === currentUserId;
                            const avatarSrc = (isMe && typeof authManager !== 'undefined' && authManager.getPhotoURL()) ||
                                              (isMe && this.engine && this.engine.state && this.engine.state.photoURL) ||
                                              m.photoURL || 'assets/avatars/avatar_02.png';
                            const memberName = m.displayName || 'Aprendiz';
                            const memberRole = m.role === 'teacher' ? 'Mestre' : 'Aprendiz';
                            const memberLvl = (m.gameProgress && m.gameProgress.level) ? `Lv.${m.gameProgress.level}` : '';
                            return `
                                <div class="map-explorer-pin ${isMe ? 'is-self' : ''}" 
                                     onclick="event.stopPropagation(); app.openPlayerProfile('${m.uid}')" 
                                     title="${memberName} (${memberRole} ${memberLvl})">
                                    <img src="${avatarSrc}" alt="${memberName}" />
                                    ${isMe ? '<span class="self-marker-dot"></span>' : ''}
                                </div>
                            `;
                        }).join('')}
                        ${extraCount > 0 ? `
                            <div class="map-explorer-pin extra-counter" title="+${extraCount} outros colegas da guilda">
                                +${extraCount}
                            </div>
                        ` : ''}
                    </div>
                `;
            }

            // Classificação visual de nós para efeitos animados (Cristais vs Construções com tochas/luzes)
            let nodeAnimClass = '';
            const imgStr = (chap.image || '').toLowerCase();
            const titleStr = (chap.title || '').toLowerCase();
            const themeStr = (chap.theme || '').toLowerCase();
            const isCrystal = imgStr.includes('crystal') || titleStr.includes('cristal') || themeStr.includes('cristal') || titleStr.includes('prisma') || [1, 9, 11, 17, 24, 30, 33].includes(chap.id);
            const isBuilding = imgStr.includes('armory') || imgStr.includes('colosseum') || imgStr.includes('palace') || imgStr.includes('sanctuary') || imgStr.includes('dungeon') || imgStr.includes('library') || [0, 3, 4, 5, 6, 7, 8, 10, 12, 13, 14, 15, 16, 18, 19, 23, 25, 27, 34, 35].includes(chap.id);

            if (isCrystal) {
                nodeAnimClass = 'node-crystal-spire';
            } else if (isBuilding) {
                nodeAnimClass = 'node-building-torch';
            }

            const node = document.createElement('div');
            node.className = `map-node ${chap.status} ${chap.id === selectedId ? 'selected' : ''} ${hasPending ? 'pending-activities' : ''} ${nodeAnimClass}`;
            node.dataset.chapterId = chap.id;
            node.style.left = `${chap.x}px`;
            node.style.top = `${chap.y}px`;
            node.setAttribute('tabindex', '0');

            const isEditing = this.isMapEditing;
            const coordPreviewHTML = isEditing ? `<div class="node-coord-preview">X: ${chap.x}, Y: ${chap.y}</div>` : '';
            const worldKey = activeWorld;
            const activeAssignments = typeof BossDataManager !== 'undefined' ? BossDataManager.getActiveAssignments(worldKey) : {};
            const assignedBossIndex = activeAssignments && activeAssignments[chap.id] !== undefined ? activeAssignments[chap.id] : null;

            // A edição dos bosses funciona em ambos os mundos (C e C#)
            let bossConfigButtonHTML = '';
            if (isEditing) {
                const hasAssignedBoss = assignedBossIndex !== null && assignedBossIndex !== undefined;
                bossConfigButtonHTML = `
                    <div class="node-boss-edit-actions" onmousedown="event.stopPropagation()">
                        <button class="node-boss-assign-btn ${hasAssignedBoss ? 'has-boss' : 'no-boss'}" 
                                onclick="app.ui.openBossAssignmentModal(${chap.id})" 
                                title="${hasAssignedBoss ? `Boss ${assignedBossIndex} Alocado (Clique para Alterar)` : 'Atribuir Boss a este Capítulo'}">
                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 2l3 5h6l-4.5 4.5L18 18l-6-3.5L6 18l1.5-6.5L3 7h6z"/>
                            </svg>
                            <span>${hasAssignedBoss ? `BOSS ${assignedBossIndex}` : '+ BOSS'}</span>
                        </button>
                    </div>
                `;
            }

            node.innerHTML = `
                ${explorersHTML}
                <div class="node-icon-wrapper">
                    ${symbolHTML}
                </div>
                ${bossConfigButtonHTML}
                ${coordPreviewHTML}
                <div class="node-info-tag">
                    <div class="node-id-prefix">${chap.numStr}</div>
                    <div class="node-title">${chap.title}</div>
                    <div class="node-subtitle">${chap.theme}</div>
                    ${presentMembers.length > 0 ? `<div class="node-explorers-count">
                        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:-1px;margin-right:2px;"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        ${presentMembers.length} explorando
                    </div>` : ''}
                </div>
            `;

            if (this.isMapEditing) {
                node.addEventListener('mousedown', (e) => {
                    e.stopPropagation();
                    this.startNodeDrag(chap.id, e);
                });
            } else {
                node.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.selectMapChapter(chap.id);
                });
            }

            nodesContainer.appendChild(node);

            // ─── INDICADOR DE BOSS BATTLE RAID NO MAPA (SEÇÃO 2) ───
            // Somente renderiza se houver um Boss efetivamente alocado a este capítulo
            const isBossAssignedHere = assignedBossIndex !== null && assignedBossIndex !== undefined;
            const isChapterDone = chap.status === 'completed' || (this.engine && this.engine.isChapterCompleted(chap.id));

            if (isBossAssignedHere && isChapterDone) {
                const bossId = `boss_ch${assignedBossIndex}`;
                const isDefeated = this.engine && this.engine.state.bossesDefeated && this.engine.state.bossesDefeated[bossId];

                // Consulta a validação completa de requisitos via BossRaidManager
                const accessCheck = (window.bossRaidManager && typeof window.bossRaidManager.checkBossAccess === 'function')
                    ? window.bossRaidManager.checkBossAccess(chap.id, this.engine ? this.engine.state : null, this.engine)
                    : { allowed: true, reason: null };

                const isUnlocked = accessCheck.allowed;

                let bossStateClass = 'available';
                let stateLabel = `BOSS ${assignedBossIndex}`;
                let tooltipText = `Boss Battle Raid: Boss ${assignedBossIndex} (Cap. ${chap.id})`;

                if (isDefeated) {
                    bossStateClass = 'completed';
                    stateLabel = 'DERROTADO';
                    tooltipText = `Boss Battle Raid: Boss ${assignedBossIndex} (Derrotado - Clique para Jogar Novamente)`;
                } else if (!isUnlocked) {
                    bossStateClass = 'locked';
                    if (accessCheck.reason === 'prev_boss_not_defeated') {
                        stateLabel = 'CHEFE ANT.';
                        tooltipText = accessCheck.message || 'Requer derrotar o Boss anterior primeiro!';
                    } else if (accessCheck.reason === 'chapter_not_completed') {
                        stateLabel = 'BLOQUEADO';
                        tooltipText = `Requer conclusão do Capítulo ${chap.id} no modo História!`;
                    } else {
                        stateLabel = 'NV 5+ REQ';
                        tooltipText = 'Requer Nível 5+ e Subclasse Despertada!';
                    }
                }

                const bossNode = document.createElement('div');
                bossNode.className = 'boss-map-node-wrapper';
                bossNode.dataset.chapterId = chap.id;
                bossNode.style.left = `${chap.x}px`;
                bossNode.style.top = `${chap.y + 46}px`;
                bossNode.innerHTML = `
                    <div class="boss-diamond-btn ${bossStateClass}" title="${tooltipText}">
                        <svg viewBox="0 0 1049 869" fill="currentColor">
                            <path d="M524.195 182.468C537.341 175.946 596.606 151.705 607.821 154.982C639.72 164.3 684.075 201.796 712.045 221.497C723.432 229.515 736.472 234.69 748.271 241.795C750.573 243.181 762.857 244.723 766.659 245.597C769.055 249.355 773.341 256.431 774.914 261.151C785.18 291.886 796.288 325.66 797.496 358.199C797.569 360.164 795.744 368.857 795.306 371.378L789.971 401.603C788.518 409.688 788.292 417.071 786.773 425.196C810.277 428.256 835.633 434.007 859.157 438.16C869.828 440.044 881.328 443.737 892.324 445.978C864.559 471.687 835.779 505.437 812.805 535.805C805.141 546.522 798.512 558.015 791.099 568.892C786.521 575.614 780.223 581.732 775.657 588.514C773.68 591.454 769.878 595.635 768.384 598.614C759.552 616.206 748.795 632.358 738.636 649.154C729.604 664.091 721.276 679.851 712.901 695.041C712.417 695.917 711.906 695.652 711.096 695.625C704.109 686.534 699.192 661.257 694.925 649.605C692.124 641.954 688.879 634.906 685.588 627.454C684.062 648.994 682.004 668.298 683.119 690.031C683.909 705.459 683.511 731.147 680.691 746.317C668.115 758.222 654.087 768.003 640.789 778.972C622.553 794.003 604.775 808.648 585.724 822.65C580.368 793.074 576.466 765.886 566.672 737.431C564.124 746.443 561.874 781.381 560.925 792.616C559.505 810.725 558.423 828.012 555.51 845.956C545.171 853.262 534.561 861.271 524.242 868.757C513.744 861.331 503.38 853.706 493.165 845.896C491.196 838.258 489.892 820.991 489.224 812.763L485.212 763.564C484.509 755.375 483.927 745.255 481.908 737.425C471.848 766.172 468.517 792.762 462.734 822.498C445.243 810.798 425.976 793.671 409.413 780.379C397.664 770.943 377.285 756.165 367.394 745.693C366.479 733.987 364.231 714.564 365.036 703.217C366.935 676.441 364.744 654.077 362.907 627.5C359.46 635.105 356.016 643.121 353.125 650.952C350.546 657.933 342.085 694.384 336.529 695.778C335.188 694.922 285.511 607.686 280.386 598.767C275.947 591.043 262.196 576.404 257.965 569.675C230.273 525.639 194.692 481.014 156.033 446.012C168.036 443.892 179.536 439.954 191.003 437.86C213.863 433.685 238.778 428.65 261.67 425.293C260.369 418.249 260.146 410.435 258.874 403.227L253.859 375.141C253.185 371.463 250.849 360.071 251.029 356.646C252.751 323.983 263.677 289.563 274.493 258.772C275.832 254.963 279.669 248.801 281.671 245.59C286.412 244.25 296.407 243.628 300.074 241.751C312.014 235.638 324.821 228.442 336.356 221.52C340.724 218.898 348.113 212.104 352.438 209.136C371.62 195.975 420.923 157.813 441.451 154.558C472.845 159.539 495.362 169.39 524.195 182.468ZM316.939 448.92C319.44 453.732 326.834 469.118 329.235 472.667C339.468 487.785 357.954 508.219 371.802 520.16C387.708 534.046 406.591 547.75 424.275 559.575C419.063 509.428 410.47 459.354 410.929 408.853C411.215 377.497 415.854 346.888 416.987 315.659C417.462 302.557 417.788 289.695 419.051 276.637C419.396 273.074 420.798 263.185 420.42 260.444C403.66 280.074 392.139 298.225 378.814 320.357C370.03 334.947 361.394 348.415 353.615 363.772C347.382 376.077 341.339 388.228 335.266 400.66C329.81 411.832 322.451 423.211 318.409 435.095C317.249 438.503 317.118 445.179 316.939 448.92ZM540.174 541.087C542.696 561.28 543.698 581.095 542.437 601.454C541.535 616.053 542.218 630.088 543.194 644.654C551.747 642.046 558.191 637.262 564.674 631.197C569.153 626.857 574.741 621.044 579.917 617.839C570.182 598.634 561.283 579.058 551.004 560.146C548.456 555.454 543.247 545.009 540.174 541.087ZM505.555 644.88C505.698 635.663 506.799 623.353 506.59 614.945C506.198 599.178 505.204 584.752 505.629 568.806C505.78 563.145 508.382 544.637 507.975 541.107C500.637 554.206 493.575 567.458 486.792 580.856C480.887 592.741 474.825 606.325 468.545 617.772C474.149 621.468 478.335 626.518 483.49 631.011C491.356 638.012 495.611 641.363 505.555 644.88ZM731.489 448.822C731.349 445.354 731.316 437.683 729.929 434.611C717.215 406.536 702.377 378.633 688.136 351.291C680.233 336.119 670.564 322.428 661.924 307.759C653.695 295.115 638.678 269.739 627.623 260.3C630.848 280.678 630.496 301.118 631.657 321.566C633.675 357.053 638.877 392.086 637.583 427.796C635.984 472.004 628.485 515.733 624.298 559.681C640.443 547.896 664.213 532.281 678.202 518.454C691.626 507.088 709.013 487.359 719.006 472.786C722.63 467.496 728.098 454.983 731.489 448.822Z"/>
                            <path d="M262.749 0.696387C271.653 -0.633434 302.716 2.8285 312.49 4.31959C262.639 15.1468 224.359 39.9367 188.322 75.5597C169.98 94.0136 153.158 113.919 138.022 135.083C134.305 140.185 127.461 148.951 123.935 155.894C116.997 169.551 101.891 213.006 114.798 225.982C126.662 233.215 142.626 232.09 156.087 234.6C192.017 241.3 230.535 247.804 267.113 247.14C256.048 263.117 242.518 308.369 238.192 328.323C227.977 322.536 221.634 317.185 210.118 312.208C205.472 310.744 200.588 310.158 195.576 309.149C173.628 304.732 137.216 298.56 115.49 300.084C88.0788 302.008 69.4583 321.1 39.0956 308.077C22.2264 300.841 21.9039 298.845 13.2367 282.526C9.09518 275.279 3.90656 268.159 0 260.149C2.9218 242.522 6.71225 221.55 8.68245 203.967C9.98972 191.2 11.2247 178.426 12.388 165.645C15.1392 135.868 15.0974 135.891 34.7199 113.17C50.0091 95.745 66.7012 79.6024 84.6281 64.9051C121.44 34.7773 146.524 20.2804 194.282 8.95151C203.56 6.75037 213.226 3.95732 222.754 2.652C235.943 0.845022 249.442 1.67653 262.749 0.696387Z"/>
                            <path d="M770.859 0.708586C771.171 0.626953 771.483 0.52543 771.802 0.465043C778.65 -0.840225 787.098 1.00122 794.112 1.14854C803.94 1.35426 813.947 1.19036 823.715 2.36693C832.866 3.46916 841.831 5.882 850.776 8.06919C884.122 16.2274 914.282 27.7196 942.372 47.8981C965.02 64.1654 1024.54 116.176 1033.19 141.47C1035.37 147.869 1035.23 156.341 1035.87 163.107C1037.13 176.609 1038.27 190.145 1039.77 203.622C1041.87 222.572 1045.43 241.516 1048.55 260.326C1042.48 272.115 1034.51 282.548 1028.63 294.522C1023.27 305.443 1006.14 309.384 995.227 311.61C972.28 316.288 953.673 300.723 931.29 299.994C913.346 299.84 893.604 303.094 875.614 304.582C868.501 305.17 860.279 307.562 853.397 309.473C835.812 310.537 824.717 319.11 810.396 328.503C805.871 306.704 793.03 265.883 781.43 247.166C820.151 248.038 854.406 241.07 891.985 234.745C931.735 228.055 947.017 235.596 934.834 183.695C932.445 173.535 928.198 162.438 923.088 153.311C876.145 83.9346 820.662 24.1156 736.386 4.21504C747.793 2.57794 759.326 1.99596 770.859 0.708586Z"/>
                        </svg>
                    </div>
                    <div class="boss-node-label">${stateLabel}</div>
                `;

                bossNode.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (this.isMapEditing) return;
                    if (window.bossRaidManager) {
                        window.bossRaidManager.openLobby(chap.id);
                    }
                });

                nodesContainer.appendChild(bossNode);
            }
        });
    }

    // ─── MODO DE EDIÇÃO DO MAPA (PROFESSOR) ───
    enterMapEditMode() {
        this.isMapEditing = true;
        const viewport = document.getElementById('map-viewport');
        if (viewport) viewport.classList.add('is-editing-map');

        const isCSharp = this.isCSharpWorld();
        const worldKey = isCSharp ? 'csharp_unity' : 'c_lang';
        const currentChapters = this.getMapChapterData();

        // Cria uma cópia de edição isolada para as posições
        if (!this.editedMapPositions) this.editedMapPositions = {};
        this.editedMapPositions[worldKey] = currentChapters.map(c => ({ id: c.id, x: c.x, y: c.y }));

        // Cria uma cópia de edição isolada para a atribuição de bosses
        if (!this.editedBossAssignments) this.editedBossAssignments = {};
        const activeAssignments = typeof BossDataManager !== 'undefined' ? BossDataManager.getActiveAssignments(worldKey) : {};
        this.editedBossAssignments[worldKey] = { ...activeAssignments };

        // Remove welcome HUD temporariamente se estiver visível
        const welcomeHud = document.getElementById('map-welcome-hud');
        if (welcomeHud) welcomeHud.style.display = 'none';

        // Renderiza barra flutuante de edição se não existir (SEM NENHUM EMOJI, COM SVGS PROFISSIONAIS)
        let bar = document.getElementById('map-editor-bar');
        if (!bar && viewport) {
            bar = document.createElement('div');
            bar.id = 'map-editor-bar';
            bar.className = 'map-editor-bar';
            bar.innerHTML = `
                <div class="map-editor-badge">
                    <span class="pulse-dot"></span>
                    <span>MODO EDIÇÃO: ${isCSharp ? 'C# UNITY' : 'DIMENSÃO C'}</span>
                </div>
                <button class="map-editor-btn save" onclick="app.saveCustomMapPositions()" title="Salvar posições e alocação de bosses no servidor">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                        <polyline points="17 21 17 13 7 13 7 21"/>
                        <polyline points="7 3 7 8 15 8"/>
                    </svg>
                    <span>Salvar Alterações</span>
                </button>
                <button class="map-editor-btn reset" onclick="app.resetDefaultMapPositions()" title="Restaurar posições e bosses de fábrica">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="1 4 1 10 7 10"/>
                        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                    </svg>
                    <span>Padrão</span>
                </button>
                ${isCSharp ? `
                    <button class="map-editor-btn" onclick="app.openCrystalConfigModal()" title="Configurar Cristais de Ascensão do Mundo C#" style="background:linear-gradient(135deg,rgba(147,51,234,0.3),rgba(79,70,229,0.4));border-color:var(--purple-bright);">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                        <span>Cristais</span>
                    </button>
                ` : ''}
                <button class="map-editor-btn cancel" onclick="app.cancelMapEditMode()" title="Descartar alterações">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    <span>Sair</span>
                </button>
            `;
            viewport.appendChild(bar);
        }

        this.closeChapterDrawer();
        this.renderMapConnections();
        this.renderMapSpotlightsAndNodes();
        this.showToast('Modo de Edição Ativado: Arraste nós e configure os Bosses.', 'info');
    }

    exitMapEditMode() {
        this.isMapEditing = false;
        this.editedMapPositions = null;
        this.editedBossAssignments = null;
        this.draggedNodeId = null;

        const viewport = document.getElementById('map-viewport');
        if (viewport) viewport.classList.remove('is-editing-map');

        const bar = document.getElementById('map-editor-bar');
        if (bar) bar.remove();

        const welcomeHud = document.getElementById('map-welcome-hud');
        if (welcomeHud) welcomeHud.style.display = '';

        if (this._nodeDragMouseMoveHandler) {
            window.removeEventListener('mousemove', this._nodeDragMouseMoveHandler);
            this._nodeDragMouseMoveHandler = null;
        }
        if (this._nodeDragMouseUpHandler) {
            window.removeEventListener('mouseup', this._nodeDragMouseUpHandler);
            this._nodeDragMouseUpHandler = null;
        }

        this.renderMapConnections();
        this.renderMapSpotlightsAndNodes();
    }

    startNodeDrag(chapterId, e) {
        if (!this.isMapEditing) return;
        this.draggedNodeId = chapterId;

        const panContainer = document.getElementById('map-pan-container');
        if (!panContainer) return;

        const nodeEl = document.querySelector(`.map-node[data-chapter-id="${chapterId}"]`);
        if (nodeEl) nodeEl.classList.add('is-node-dragging');

        // Impede que o map pan interfira no arrasto do nó
        if (this.mapState) this.mapState.isDragging = false;

        this._nodeDragMouseMoveHandler = (moveEvt) => this.onNodeDragMove(moveEvt);
        this._nodeDragMouseUpHandler = (upEvt) => this.onNodeDragEnd(upEvt);

        window.addEventListener('mousemove', this._nodeDragMouseMoveHandler);
        window.addEventListener('mouseup', this._nodeDragMouseUpHandler);
    }

    onNodeDragMove(e) {
        if (!this.isMapEditing || this.draggedNodeId === null) return;
        const panContainer = document.getElementById('map-pan-container');
        if (!panContainer || !this.mapState) return;

        const rect = panContainer.getBoundingClientRect();
        const scale = this.mapState.scale || 1;

        let x = Math.round((e.clientX - rect.left) / scale);
        let y = Math.round((e.clientY - rect.top) / scale);

        // Clamp para manter sempre dentro dos limites do mapa 2400x1400
        x = Math.max(60, Math.min(2340, x));
        y = Math.max(60, Math.min(1340, y));

        const isCSharp = this.isCSharpWorld();
        const worldKey = isCSharp ? 'csharp_unity' : 'c_lang';

        if (this.editedMapPositions && this.editedMapPositions[worldKey]) {
            const nodePos = this.editedMapPositions[worldKey].find(p => p.id === this.draggedNodeId);
            if (nodePos) {
                nodePos.x = x;
                nodePos.y = y;
            }
        }

        this.updateSingleNodePosition(this.draggedNodeId, x, y);
        this.renderMapConnections();
    }

    onNodeDragEnd(e) {
        if (this.draggedNodeId !== null) {
            const nodeEl = document.querySelector(`.map-node[data-chapter-id="${this.draggedNodeId}"]`);
            if (nodeEl) nodeEl.classList.remove('is-node-dragging');
            this.draggedNodeId = null;
        }

        if (this._nodeDragMouseMoveHandler) {
            window.removeEventListener('mousemove', this._nodeDragMouseMoveHandler);
            this._nodeDragMouseMoveHandler = null;
        }
        if (this._nodeDragMouseUpHandler) {
            window.removeEventListener('mouseup', this._nodeDragMouseUpHandler);
            this._nodeDragMouseUpHandler = null;
        }
    }

    updateSingleNodePosition(chapterId, x, y) {
        // 1. Nó do Capítulo
        const nodeEl = document.querySelector(`.map-node[data-chapter-id="${chapterId}"]`);
        if (nodeEl) {
            nodeEl.style.left = `${x}px`;
            nodeEl.style.top = `${y}px`;
            const previewEl = nodeEl.querySelector('.node-coord-preview');
            if (previewEl) previewEl.textContent = `X: ${x}, Y: ${y}`;
        }

        // 2. Nó do Boss Battle Raid
        const bossEl = document.querySelector(`.boss-map-node-wrapper[data-chapter-id="${chapterId}"]`);
        if (bossEl) {
            bossEl.style.left = `${x}px`;
            bossEl.style.top = `${y + 46}px`;
        }

        // 3. Spotlight de Cenário
        const spotEl = document.querySelector(`.scenery-spotlight[data-chapter-id="${chapterId}"]`);
        if (spotEl) {
            spotEl.style.left = `${x}px`;
            spotEl.style.top = `${y - 70}px`;
        }
    }

    // ─── MODAL DE CONFIGURAÇÃO DE BOSS DO PROFESSOR (SEM EMOJIS, SVGS PROFISSIONAIS) ───
    openBossAssignmentModal(chapterId) {
        const isCSharp = this.isCSharpWorld();
        const worldKey = isCSharp ? 'csharp_unity' : 'c_lang';

        const modalId = 'boss-assignment-modal-overlay';
        const existing = document.getElementById(modalId);
        if (existing) existing.remove();

        const activeAssignments = typeof BossDataManager !== 'undefined' ? BossDataManager.getActiveAssignments(worldKey) : {};
        const currentAssignedIndex = (this.editedBossAssignments && this.editedBossAssignments[worldKey] && this.editedBossAssignments[worldKey][chapterId] !== undefined)
            ? this.editedBossAssignments[worldKey][chapterId]
            : (activeAssignments[chapterId] !== undefined ? activeAssignments[chapterId] : null);

        const allBosses = (typeof BOSS_DEFINITIONS !== 'undefined') ? BOSS_DEFINITIONS : [];

        // Monta a lista dos 16 bosses
        let bossCardsHTML = '';
        allBosses.forEach((boss, idx) => {
            const isAssignedToThis = currentAssignedIndex === idx;
            
            // Verifica se este boss já está alocado em algum outro capítulo
            let assignedOtherChapter = null;
            const currentMap = (this.editedBossAssignments && this.editedBossAssignments[worldKey]) || activeAssignments;
            for (const ch in currentMap) {
                if (Number(ch) !== Number(chapterId) && Number(currentMap[ch]) === idx) {
                    assignedOtherChapter = Number(ch);
                    break;
                }
            }

            bossCardsHTML += `
                <div class="boss-pick-card ${isAssignedToThis ? 'is-selected' : ''} ${assignedOtherChapter !== null ? 'is-allocated-elsewhere' : ''}">
                    <div class="boss-pick-sprite-box">
                        <img src="${boss.spriteUrl}" alt="${boss.name}" class="boss-pick-sprite" />
                        <span class="boss-pick-index-badge">B${idx}</span>
                    </div>
                    <div class="boss-pick-details">
                        <div class="boss-pick-name">${boss.name}</div>
                        <div class="boss-pick-title">${boss.title}</div>
                        <div class="boss-pick-subject">
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-1px;margin-right:3px;">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                            </svg>
                            ${boss.subject}
                        </div>
                        ${assignedOtherChapter !== null ? `
                            <div class="boss-pick-warning">
                                <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                Alocado no Cap. ${assignedOtherChapter}
                            </div>
                        ` : ''}
                    </div>
                    <div class="boss-pick-action">
                        ${isAssignedToThis ? `
                            <button class="boss-pick-btn active" disabled>
                                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                <span>Alocado</span>
                            </button>
                        ` : `
                            <button class="boss-pick-btn assign" onclick="app.ui.setChapterBossAssignment(${chapterId}, ${idx})">
                                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${assignedOtherChapter !== null ? 'Mover para cá' : 'Alocar Boss'}</span>
                            </button>
                        `}
                    </div>
                </div>
            `;
        });

        const overlay = document.createElement('div');
        overlay.id = modalId;
        overlay.className = 'boss-assign-modal-overlay';
        overlay.innerHTML = `
            <div class="boss-assign-modal-container" onclick="event.stopPropagation()">
                <div class="boss-assign-header">
                    <div class="boss-assign-header-left">
                        <div class="boss-assign-header-badge">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                            <span>MODO EDIÇÃO • CAPÍTULO ${chapterId}</span>
                        </div>
                        <h3 class="boss-assign-title">Configurar Boss Battle Raid</h3>
                        <p class="boss-assign-desc">Selecione qual dos 16 Bosses guardará este capítulo. As questões da batalha cobrirão os assuntos acumulados desde o boss anterior até este nó.</p>
                    </div>
                    <button class="boss-assign-close-btn" onclick="document.getElementById('${modalId}').remove()" title="Fechar">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>

                <div class="boss-assign-body">
                    ${currentAssignedIndex !== null ? `
                        <div class="boss-assign-current-bar">
                            <div class="boss-assign-current-info">
                                <span class="current-label">BOSS ATIVO ATUALMENTE:</span>
                                <span class="current-name">Boss ${currentAssignedIndex} — ${allBosses[currentAssignedIndex]?.name || 'Chefe'}</span>
                            </div>
                            <button class="boss-assign-remove-btn" onclick="app.ui.removeChapterBossAssignment(${chapterId})" title="Remover Boss deste Capítulo">
                                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                </svg>
                                <span>Remover Boss deste Capítulo</span>
                            </button>
                        </div>
                    ` : ''}

                    <div class="boss-assign-grid">
                        ${bossCardsHTML}
                    </div>
                </div>
            </div>
        `;

        overlay.addEventListener('click', () => overlay.remove());
        document.body.appendChild(overlay);
    }

    setChapterBossAssignment(chapterId, bossIndex) {
        const isCSharp = this.isCSharpWorld();
        const worldKey = isCSharp ? 'csharp_unity' : 'c_lang';

        if (!this.editedBossAssignments) {
            this.editedBossAssignments = {};
        }
        if (!this.editedBossAssignments[worldKey]) {
            const active = typeof BossDataManager !== 'undefined' ? BossDataManager.getActiveAssignments(worldKey) : {};
            this.editedBossAssignments[worldKey] = { ...active };
        }

        // Se o bossIndex já estiver associado a outro capítulo, remove do anterior para não duplicar o mesmo boss
        for (const ch in this.editedBossAssignments[worldKey]) {
            if (Number(this.editedBossAssignments[worldKey][ch]) === Number(bossIndex)) {
                delete this.editedBossAssignments[worldKey][ch];
            }
        }

        // Atribui ao capítulo alvo
        this.editedBossAssignments[worldKey][chapterId] = Number(bossIndex);

        // Fecha o modal
        const modal = document.getElementById('boss-assignment-modal-overlay');
        if (modal) modal.remove();

        // Atualiza a renderização dos nós do mapa
        this.renderMapSpotlightsAndNodes();
        this.showToast(`Boss ${bossIndex} alocado no Capítulo ${chapterId}! Clique em "Salvar Alterações" para sincronizar.`, 'success');
    }

    removeChapterBossAssignment(chapterId) {
        const isCSharp = this.isCSharpWorld();
        const worldKey = isCSharp ? 'csharp_unity' : 'c_lang';

        if (!this.editedBossAssignments) {
            this.editedBossAssignments = {};
        }
        if (!this.editedBossAssignments[worldKey]) {
            const active = typeof BossDataManager !== 'undefined' ? BossDataManager.getActiveAssignments(worldKey) : {};
            this.editedBossAssignments[worldKey] = { ...active };
        }

        delete this.editedBossAssignments[worldKey][chapterId];

        // Fecha o modal
        const modal = document.getElementById('boss-assignment-modal-overlay');
        if (modal) modal.remove();

        // Atualiza a renderização dos nós do mapa
        this.renderMapSpotlightsAndNodes();
        this.showToast(`Boss removido do Capítulo ${chapterId}.`, 'info');
    }

    selectMapChapter(id) {
        if (!this.mapState) return;
        this.mapState.selectedChapterId = id;

        // Feedback sonoro mágico: nota pentatônica interativa baseada no nó
        if (window.soundFX && typeof window.soundFX.playMapNodeTune === 'function') {
            window.soundFX.playMapNodeTune(id);
        } else if (window.soundFX) {
            window.soundFX.playClick();
        }

        this.renderMapSpotlightsAndNodes();
        this.renderChapterDrawer(id);
        this.openChapterDrawer();

        const allChapters = this.getMapChapterData();
        const chap = allChapters.find(c => c.id === id);
        setTimeout(() => {
            this.centerOnMapNode(chap);
        }, 50);
    }

    openChapterDrawer() {
        const streakPopover = document.getElementById('streak-popover');
        if (streakPopover && !streakPopover.classList.contains('hidden')) {
            streakPopover.classList.add('hidden');
        }

        const drawer = document.getElementById('chapter-drawer-right');
        if (drawer) {
            drawer.classList.add('open');
            setTimeout(() => this.updateMapPanTransform(), 360);
        }
    }

    closeChapterDrawer() {
        const drawer = document.getElementById('chapter-drawer-right');
        if (drawer) {
            drawer.classList.remove('open');
            if (this.mapState) this.mapState.selectedChapterId = null;
            this.renderMapSpotlightsAndNodes();
            setTimeout(() => this.updateMapPanTransform(), 360);
        }
    }

    renderChapterDrawer(id) {
        const allChapters = this.getMapChapterData();
        const chap = allChapters.find(c => c.id === id);
        const drawerBody = document.getElementById('drawer-content-body');
        if (!chap || !drawerBody) return;

        const isTeacherOrAdmin = (typeof authManager !== 'undefined') && (
            (typeof authManager.isTeacher === 'function' && authManager.isTeacher()) ||
            (typeof authManager.isAdmin === 'function' && authManager.isAdmin()) ||
            (typeof authManager.isAdminEmail === 'function' && authManager.isAdminEmail(authManager.currentUser?.email || authManager.userData?.email))
        );

        const progressPercent = Math.round((chap.missionsDone / chap.missionsCount) * 100);

        // Artefato que pode ser dropado na última missão deste capítulo
        const artifactRewardCfg = chap.artifactReward || null;
        let artifactData = null;
        let artifactStarsRange = '';
        if (artifactRewardCfg && typeof ARTIFACTS_CATALOG !== 'undefined') {
            const artId = artifactRewardCfg.artifactId;
            if (artId && artId !== 'random' && ARTIFACTS_CATALOG[artId]) {
                artifactData = ARTIFACTS_CATALOG[artId];
            } else {
                artifactData = {
                    name: 'Artefato Místico',
                    asset: 'assets/artifacts/Crown_Cristal.svg',
                    slotLabel: 'Aleatório'
                };
            }
            const minS = artifactRewardCfg.minStars || 3;
            const maxS = artifactRewardCfg.maxStars || 6;
            artifactStarsRange = minS === maxS ? `${minS}★` : `${minS}★-${maxS}★`;
        }

        let buttonActionText = "INICIAR CAPÍTULO";
        let buttonClass = "btn-start-chapter";
        let buttonIcon = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;

        if (chap.status === 'locked') {
            if (isTeacherOrAdmin) {
                buttonActionText = "ACESSAR (MODO MESTRE)";
                buttonClass = "btn-start-chapter teacher-bypass-btn";
                buttonIcon = `<svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>`;
            } else {
                buttonActionText = "CAPÍTULO BLOQUEADO";
                buttonClass = "btn-start-chapter locked-btn";
                buttonIcon = `<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`;
            }
        } else if (chap.status === 'completed') {
            buttonActionText = "REVISAR CAPÍTULO";
        }

        drawerBody.innerHTML = `
            <div class="drawer-header">
                <div class="chapter-number-tag">${chap.numStr}</div>
                <div class="chapter-main-title">${chap.title}</div>
                <div class="chapter-theme-sub">${chap.theme}</div>
            </div>

            <div class="chapter-image-banner">
                <img src="${chap.image}" alt="${chap.title}">
                <div class="chapter-image-overlay"></div>
                <div class="chapter-character-badge">
                    <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    <span>${chap.character}</span>
                </div>
            </div>

            <div class="chapter-story-text">
                <span class="chapter-story-narrative">${chap.narrative}</span>
                <span class="chapter-story-summary">${chap.summary}</span>
            </div>

            <div class="drawer-section-title">Sistemas Abordados</div>
            <div class="systems-list">
                ${chap.systems.map(s => `
                    <div class="system-item-chip">
                        <svg viewBox="0 0 24 24"><path d="M7.5 5.6L5 7l1.4-2.5L5 2l2.5 1.4L10 2 8.6 4.5 10 7 7.5 5.6zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14l-2.5 1.4zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5L22 2zM14.37 7.29c-.39-.39-1.02-.39-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41l-2.33-2.35zm-1.06 3.18l-1.41-1.41 1.41-1.41 1.41 1.41-1.41 1.41z"/></svg>
                        <span>${s}</span>
                    </div>
                `).join('')}
            </div>

            <div class="progress-box">
                <div class="progress-header">
                    <span>PROGRESSO DAS MISSÕES</span>
                    <span style="color: var(--cyan);">${chap.missionsDone}/${chap.missionsCount} (${progressPercent}%)</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill-drawer" style="width: ${progressPercent}%;"></div>
                </div>
            </div>

            <div class="drawer-section-title">Recompensas</div>
            <div class="rewards-grid">
                <div class="reward-card">
                    <div class="reward-icon-svg"><svg viewBox="0 0 24 24"><path d="M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15L11 21z"/></svg></div>
                    <div class="reward-amount">+${chap.rewards.xp} XP</div>
                    <div class="reward-label">Experiência</div>
                </div>
                <div class="reward-card">
                    <div class="reward-icon-svg"><svg viewBox="0 0 24 24"><path d="M19 3H5L2 9l10 12L22 9l-3-6zM15.5 8h-7l1.5-3h4l1.5 3z"/></svg></div>
                    <div class="reward-amount">+${chap.rewards.gp} GP</div>
                    <div class="reward-label">Guild Points</div>
                </div>
            </div>

            ${artifactData ? `
            <div class="drawer-section-title" style="color:var(--gold);">Artefato Dropável</div>
            <div class="drawer-artifact-featured-card">
                <div class="drawer-artifact-visual">
                    <div class="drawer-artifact-glow"></div>
                    <img src="${artifactData.asset}" alt="${artifactData.name}" class="drawer-artifact-large-img" />
                    <span class="drawer-artifact-slot-badge">${artifactData.slotLabel || 'Artefato'}</span>
                </div>
                <div class="drawer-artifact-meta">
                    <div class="drawer-artifact-title-row">
                        <span class="drawer-artifact-name">${artifactData.name}</span>
                        <span class="drawer-artifact-stars-badge">${artifactStarsRange}</span>
                    </div>
                    <div class="drawer-artifact-stat-pill">
                        <svg viewBox="0 0 24 24" class="stat-icon-svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <span>Drop da Missão Final</span>
                        ${artifactData.statName ? `<strong style="color:var(--text-primary);margin-left:auto;">+${artifactData.statName} ${artifactData.isPercent ? '(%)' : ''}</strong>` : ''}
                    </div>
                    ${artifactData.lore ? `<div class="drawer-artifact-lore">${artifactData.lore}</div>` : ''}
                </div>
            </div>
            ` : ''}

            <button class="${buttonClass}" onclick="app.ui.handleChapterStartClick(${chap.id})">
                ${buttonIcon}
                <span>${buttonActionText}</span>
            </button>
            ${(() => {
                const isChapCompleted = (chap.status === 'completed' || (this.engine && this.engine.isChapterCompleted(chap.id)));
                if (!isChapCompleted) return '';

                const worldKey = this.isCSharpWorld && this.isCSharpWorld() ? 'csharp_unity' : 'c_lang';
                const activeAssignments = typeof BossDataManager !== 'undefined' ? BossDataManager.getActiveAssignments(worldKey) : {};
                const hasAssignedBoss = activeAssignments && activeAssignments[chap.id] !== undefined && activeAssignments[chap.id] !== null;
                if (!hasAssignedBoss) return '';

                const accessCheck = (window.bossRaidManager && typeof window.bossRaidManager.checkBossAccess === 'function')
                    ? window.bossRaidManager.checkBossAccess(chap.id, this.engine ? this.engine.state : null, this.engine)
                    : { allowed: true, reason: null };

                const bossIdx = activeAssignments[chap.id];
                const bossId = `boss_ch${bossIdx}`;
                const isDefeated = this.engine && this.engine.state.bossesDefeated && this.engine.state.bossesDefeated[bossId];

                let buttonTitle = `ENFRENTAR BOSS RAID (BOSS ${bossIdx})`;
                let buttonStyle = 'margin-top:0.5rem;background:linear-gradient(135deg, rgba(220,38,38,0.9), rgba(185,28,28,0.95));border:1px solid #ef4444;box-shadow:0 0 15px rgba(239,68,68,0.4);';

                if (isDefeated) {
                    buttonTitle = `REPETIR BOSS RAID (BOSS ${bossIdx})`;
                    buttonStyle = 'margin-top:0.5rem;background:linear-gradient(135deg, rgba(37,99,235,0.85), rgba(30,64,175,0.9));border:1px solid #3b82f6;box-shadow:0 0 15px rgba(59,130,246,0.3);';
                } else if (!accessCheck.allowed) {
                    let lockedLabel = 'BLOQUEADO';
                    if (accessCheck.reason === 'prev_boss_not_defeated') {
                        lockedLabel = 'CHEFE ANT. REQUERIDO';
                    } else if (accessCheck.reason === 'level_subclass') {
                        lockedLabel = 'NV 5+ REQUERIDO';
                    }
                    buttonTitle = `BOSS RAID (${lockedLabel})`;
                    buttonStyle = 'margin-top:0.5rem;background:linear-gradient(135deg, rgba(75,85,99,0.8), rgba(55,65,81,0.9));border:1px solid #6b7280;opacity:0.85;cursor:pointer;';
                }

                return `
                    <button class="btn-start-chapter" style="${buttonStyle}" onclick="app.ui.closeChapterDrawer(); if(window.bossRaidManager) window.bossRaidManager.openLobby(${chap.id});">
                        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 3.84 2.16 7.18 5.34 8.86.36.19.78.29 1.18.29.35 0 .69-.07 1-.22.68-.32 1.09-1.02 1.03-1.78l-.13-1.65c.98.33 2.03.5 3.12.5s2.14-.17 3.12-.5l-.13 1.65c-.06.76.35 1.46 1.03 1.78.31.15.65.22 1 .22.4 0 .82-.1 1.18-.29C19.84 19.18 22 15.84 22 12c0-5.52-4.48-10-10-10zm-3 12c-.83 0-1.5-.67-1.5-1.5S8.17 11 9 11s1.5.67 1.5 1.5S9.83 14 9 14zm6 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                        <span>${buttonTitle}</span>
                    </button>
                `;
            })()}
        `;
    }

    handleChapterStartClick(id) {
        const allChapters = this.getMapChapterData();
        const chap = allChapters.find(c => c.id === id);
        if (!chap) return;

        const isTeacherOrAdmin = (typeof authManager !== 'undefined') && (
            (typeof authManager.isTeacher === 'function' && authManager.isTeacher()) ||
            (typeof authManager.isAdmin === 'function' && authManager.isAdmin()) ||
            (typeof authManager.isAdminEmail === 'function' && authManager.isAdminEmail(authManager.currentUser?.email || authManager.userData?.email))
        );

        if (chap.status === 'locked' && !isTeacherOrAdmin) {
            this.showToast(`[ SISTEMA ] O ${chap.numStr} ainda está selado.`);
        } else {
            if (chap.status === 'locked' && isTeacherOrAdmin) {
                this.showToast(`[ MESTRE ] Acessando ${chap.numStr} (Permissão de Professor)...`, 'info');
            } else {
                this.showToast(`[ SISTEMA ] Entrando no ${chap.numStr}...`);
            }
            this.closeChapterDrawer();
            app.openChapter(id);
        }
    }
    
    }

    if (typeof UIRenderer !== "undefined") {
        const descriptors = Object.getOwnPropertyDescriptors(_Extension.prototype);
        delete descriptors.constructor;
        Object.defineProperties(UIRenderer.prototype, descriptors);
    }
})();
