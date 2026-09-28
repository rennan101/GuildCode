/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Dopamine Mode: Visual Explosions, Floating Glyphs &
   Mechanical Synthesized Sound for World C and C# Editors
   (Ridiculous Coding / Power Mode Inspired)
   ═══════════════════════════════════════════════════════════════ */

class DopamineEditorEffects {
    constructor() {
        this.enabled = this._loadSettings();
        this.canvasMap = new Map(); // textarea -> canvas
        this.particles = [];
        this.floatingGlyphs = [];
        this.animFrameId = null;
        this.shakeTimeout = null;
        this.lastKeystrokeTime = 0;
        this.comboCount = 0;
        this.boundEditors = new WeakSet();

        // Cores vibrantes neon estilo Ridiculous Coding / Arcade
        this.palette = [
            '#00f0ff', // Vivid Neon Cyan
            '#a855f7', // Arcane Purple
            '#ff007f', // Hyper Pink
            '#38bdf8', // Sky Blue
            '#10b981', // Emerald Laser
            '#fbbf24', // Electric Gold
            '#ff5500', // Fiery Orange
            '#ffffff'  // Pure Spark White
        ];

        // Frases clássicas de feedback cômico estilo Ridiculous Coding / Doge Mode
        this.memePhrases = [
            'wow',
            'very code',
            'much code',
            'nice code',
            'hackerman',
            'so clean',
            'amaze',
            'such logic',
            '10x dev',
            'big brain'
        ];

        this._initLoop();
        this._observeDomForEditors();
    }

    _loadSettings() {
        try {
            const val = localStorage.getItem('gc_dopamine_mode');
            return val === null ? true : val === 'true';
        } catch (e) {
            return true;
        }
    }

    setEnabled(val) {
        this.enabled = !!val;
        try {
            localStorage.setItem('gc_dopamine_mode', this.enabled ? 'true' : 'false');
        } catch (e) {}

        if (!this.enabled) {
            this.particles = [];
            this.floatingGlyphs = [];
            this._clearAllCanvases();
        }
    }

    _observeDomForEditors() {
        this.bindAllCurrentEditors();
        const observer = new MutationObserver(() => {
            this.bindAllCurrentEditors();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    bindAllCurrentEditors() {
        const editorIds = ['code-editor', 'activity-editor', 'raid-code-editor', 'tournament-code-editor'];
        editorIds.forEach(id => {
            const el = document.getElementById(id);
            if (el && !this.boundEditors.has(el)) {
                this.bindEditor(el);
            }
        });
    }

    bindEditor(textarea) {
        if (!textarea || this.boundEditors.has(textarea)) return;
        this.boundEditors.add(textarea);

        this._ensureCanvasFor(textarea);

        // Suporte tanto a keydown quanto input para capturar qualquer inserção
        textarea.addEventListener('keydown', (e) => this._onKeyDown(e, textarea));
        textarea.addEventListener('input', () => this._syncCanvasSize(textarea));
        textarea.addEventListener('scroll', () => this._syncCanvasSize(textarea));
        window.addEventListener('resize', () => this._syncCanvasSize(textarea));
    }

    _ensureCanvasFor(textarea) {
        let canvas = this.canvasMap.get(textarea);
        if (!canvas) {
            const container = textarea.parentElement;
            if (!container) return null;

            canvas = document.createElement('canvas');
            canvas.className = 'dopamine-effects-canvas';
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '999'; // Acima do textarea e do highlight
            
            if (getComputedStyle(container).position === 'static') {
                container.style.position = 'relative';
            }

            container.appendChild(canvas);
            this.canvasMap.set(textarea, canvas);
            this._syncCanvasSize(textarea);
        }
        return canvas;
    }

    _syncCanvasSize(textarea) {
        const canvas = this.canvasMap.get(textarea);
        if (!canvas) return;
        
        const w = textarea.offsetWidth || textarea.clientWidth || 600;
        const h = textarea.offsetHeight || textarea.clientHeight || 400;
        
        const dpr = window.devicePixelRatio || 1;
        if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            const ctx = canvas.getContext('2d');
            if (ctx) ctx.scale(dpr, dpr);
        }
    }

    _onKeyDown(e, textarea) {
        if (!this.enabled) return;

        // Ignora modificadores puros
        if (['Control', 'Shift', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Escape'].includes(e.key)) {
            return;
        }

        const now = performance.now();
        if (now - this.lastKeystrokeTime < 450) {
            this.comboCount++;
        } else {
            this.comboCount = 1;
        }
        this.lastKeystrokeTime = now;

        // Sons táteis
        let keyType = 'char';
        if (e.key === 'Enter') keyType = 'enter';
        else if (e.key === 'Backspace' || e.key === 'Delete') keyType = 'backspace';
        else if ([';', '{', '}', '(', ')', '[', ']', '=', '+', '-', '*', '/'].includes(e.key)) keyType = 'delimiter';
        else if (e.key === ' ') keyType = 'space';

        if (window.soundFX && typeof window.soundFX.playKeystroke === 'function') {
            window.soundFX.playKeystroke(keyType);
        }

        // Calcula posição com auxílio de medição de texto precisa
        this._syncCanvasSize(textarea);
        const pos = this._getCursorCoordinates(textarea, e.key);

        // Define o glifo visual exatamente como no Ridiculous Coding
        let displayGlyph = e.key;
        if (e.key === 'Enter') displayGlyph = 'enter';
        else if (e.key === 'Backspace') displayGlyph = 'backspace';
        else if (e.key === 'Delete') displayGlyph = 'delete';
        else if (e.key === ' ') displayGlyph = 'space';
        else if (e.key.length > 1) displayGlyph = e.key.toLowerCase();

        const color = this.palette[Math.floor(Math.random() * (this.palette.length - 1))];

        // 1. Spawna Glifo Flutuante estilizado estilo Ridiculous Coding
        this._spawnFloatingGlyph(textarea, pos.x, pos.y, displayGlyph, color, keyType);

        // 1.1 Se abriu/fechou chaves ou digitou ponto e vírgula, spawna uma frase cômica aleatória estilo Ridiculous Coding
        if (['{', '}', ';'].includes(e.key)) {
            const memeText = this.memePhrases[Math.floor(Math.random() * this.memePhrases.length)];
            const memeColor = this.palette[Math.floor(Math.random() * (this.palette.length - 1))];
            // Dispara a frase um pouco deslocada para cima e para o lado com destaque
            this._spawnFloatingGlyph(textarea, pos.x + (Math.random() * 20 - 10), pos.y - 12, memeText, memeColor, 'meme');
        }

        // 2. Spawna Partículas QUADRADAS explosivas (Voxel Shards / Pixel Burst)
        const particleCount = keyType === 'enter' ? 18 : (keyType === 'delimiter' ? 14 : 9);
        this._spawnSquareParticles(textarea, pos.x, pos.y, particleCount, color);

        // 3. Screen shake no container
        this._triggerEditorShake(textarea, keyType);
    }

    _getCursorCoordinates(textarea, key) {
        const text = textarea.value || '';
        const selStart = textarea.selectionStart !== undefined ? textarea.selectionStart : text.length;
        
        const textBefore = text.substring(0, selStart);
        const lines = textBefore.split('\n');
        const lineIndex = lines.length - 1;
        const currentLineText = lines[lineIndex] || '';

        // Estilos calculados
        const computed = getComputedStyle(textarea);
        const fontSize = parseFloat(computed.fontSize) || 14;
        const lineHeight = parseFloat(computed.lineHeight) || (fontSize * 1.6);
        
        // Medição precisa da largura da linha via canvas auxiliar
        let textWidth = currentLineText.length * (fontSize * 0.602);
        if (!this._measureCtx) {
            const mCanvas = document.createElement('canvas');
            this._measureCtx = mCanvas.getContext('2d');
        }
        if (this._measureCtx) {
            this._measureCtx.font = `${computed.fontWeight || '400'} ${fontSize}px ${computed.fontFamily || 'monospace'}`;
            textWidth = this._measureCtx.measureText(currentLineText).width;
        }

        const padLeft = parseFloat(computed.paddingLeft) || 16;
        const padTop = parseFloat(computed.paddingTop) || 12;

        let x = padLeft + textWidth - textarea.scrollLeft;
        let y = padTop + (lineIndex * lineHeight) + (lineHeight * 0.5) - textarea.scrollTop;

        // Se deu Enter, posiciona um pouco abaixo
        if (key === 'Enter') {
            y += lineHeight * 0.6;
            x = padLeft;
        }

        // Limita dentro da área visível do editor
        const minX = 20;
        const maxX = (textarea.clientWidth || 500) - 20;
        const minY = 20;
        const maxY = (textarea.clientHeight || 400) - 20;

        return {
            x: Math.max(minX, Math.min(x, maxX)),
            y: Math.max(minY, Math.min(y, maxY))
        };
    }

    _spawnFloatingGlyph(textarea, x, y, char, color, keyType) {
        const isMeme = keyType === 'meme';
        const isAction = char.length > 1;
        const baseSize = isMeme ? 16 : (isAction ? 14 : (20 + Math.min(10, Math.floor(this.comboCount / 4))));
        
        this.floatingGlyphs.push({
            textarea,
            x: x + (Math.random() * 8 - 4),
            y: y - 6,
            char,
            color,
            vx: (Math.random() - 0.5) * (isMeme ? 2.0 : 1.5),
            vy: (isMeme ? -2.8 : -2.4) - Math.random() * 1.4, // Sobe com trajetória vertical viva
            size: baseSize,
            scale: isMeme ? 1.35 : 1.25,
            rotation: (Math.random() - 0.5) * (isMeme ? 0.35 : 0.25),
            vRot: (Math.random() - 0.5) * 0.02,
            alpha: 1.0,
            decay: isMeme ? 0.018 : 0.024 // Frases meme duram um pouco mais (~55 frames)
        });
    }

    _spawnSquareParticles(textarea, x, y, count, baseColor) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2.0 + Math.random() * 4.5;
            const size = 4 + Math.random() * 6; // Partículas quadradas nítidas (4px a 10px)
            const color = Math.random() > 0.25 ? baseColor : this.palette[Math.floor(Math.random() * this.palette.length)];
            
            this.particles.push({
                textarea,
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1.2, // Impulso explosivo inicial para cima
                size: size,
                rotation: Math.random() * Math.PI * 2,
                vRot: (Math.random() - 0.5) * 0.25,
                color: color,
                alpha: 1.0,
                decay: 0.024 + Math.random() * 0.02
            });
        }
    }

    _triggerEditorShake(textarea, keyType) {
        const wrapper = textarea.closest('.editor-wrapper') || textarea.parentElement;
        if (!wrapper) return;

        let intensity = 1.8;
        if (keyType === 'enter') intensity = 4.0;
        else if (keyType === 'delimiter') intensity = 2.8;
        else if (this.comboCount > 10) intensity = 2.6;

        const rx = (Math.random() - 0.5) * intensity;
        const ry = (Math.random() - 0.5) * intensity;

        wrapper.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
        
        if (this.shakeTimeout) clearTimeout(this.shakeTimeout);
        this.shakeTimeout = setTimeout(() => {
            wrapper.style.transform = 'translate3d(0, 0, 0)';
        }, 55);
    }

    _clearAllCanvases() {
        this.canvasMap.forEach((canvas) => {
            const ctx = canvas.getContext('2d');
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    }

    _initLoop() {
        const render = () => {
            if (this.enabled && (this.particles.length > 0 || this.floatingGlyphs.length > 0)) {
                this._renderFrame();
            }
            this.animFrameId = requestAnimationFrame(render);
        };
        this.animFrameId = requestAnimationFrame(render);
    }

    _renderFrame() {
        const perCanvasParticles = new Map();
        const perCanvasGlyphs = new Map();

        // 1. Atualiza partículas QUADRADAS
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.12; // Gravidade suave
            p.vx *= 0.98; // Atrito do ar
            p.rotation += p.vRot;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            if (!perCanvasParticles.has(p.textarea)) perCanvasParticles.set(p.textarea, []);
            perCanvasParticles.get(p.textarea).push(p);
        }

        // 2. Atualiza Floating Glyphs (Textos Flutuantes)
        for (let i = this.floatingGlyphs.length - 1; i >= 0; i--) {
            const g = this.floatingGlyphs[i];
            g.x += g.vx;
            g.y += g.vy;
            g.rotation += g.vRot;
            g.alpha -= g.decay;
            g.scale = Math.max(0.9, g.scale - 0.010);

            if (g.alpha <= 0) {
                this.floatingGlyphs.splice(i, 1);
                continue;
            }

            if (!perCanvasGlyphs.has(g.textarea)) perCanvasGlyphs.set(g.textarea, []);
            perCanvasGlyphs.get(g.textarea).push(g);
        }

        // 3. Desenha no canvas correspondente com efeito neon glow
        this.canvasMap.forEach((canvas, textarea) => {
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            
            const w = textarea.offsetWidth || textarea.clientWidth || 600;
            const h = textarea.offsetHeight || textarea.clientHeight || 400;
            ctx.clearRect(0, 0, w, h);

            // Partículas QUADRADAS (Pixel Shards)
            const pList = perCanvasParticles.get(textarea);
            if (pList && pList.length > 0) {
                for (let j = 0; j < pList.length; j++) {
                    const p = pList[j];
                    ctx.save();
                    ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
                    ctx.fillStyle = p.color;
                    ctx.shadowColor = p.color;
                    ctx.shadowBlur = 6;
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation);
                    
                    // Desenha QUADRADO com borda sutil
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = 0.6;
                    ctx.strokeRect(-p.size / 2, -p.size / 2, p.size, p.size);
                    ctx.restore();
                }
            }

            // Textos Flutuantes (Floating Glyphs)
            const gList = perCanvasGlyphs.get(textarea);
            if (gList && gList.length > 0) {
                for (let k = 0; k < gList.length; k++) {
                    const g = gList[k];
                    ctx.save();
                    ctx.globalAlpha = Math.max(0, Math.min(1, g.alpha));
                    ctx.fillStyle = g.color;
                    ctx.shadowColor = g.color;
                    ctx.shadowBlur = 12;
                    ctx.translate(g.x, g.y);
                    ctx.rotate(g.rotation);
                    ctx.font = `900 ${Math.round(g.size * g.scale)}px 'JetBrains Mono', Consolas, monospace`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(g.char, 0, 0);
                    
                    // Contorno branco/glow sutil
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
                    ctx.lineWidth = 0.8;
                    ctx.strokeText(g.char, 0, 0);
                    ctx.restore();
                }
            }
        });
    }
}

// Instancia singleton global
if (typeof window !== 'undefined') {
    window.dopamineEffects = new DopamineEditorEffects();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DopamineEditorEffects };
}
