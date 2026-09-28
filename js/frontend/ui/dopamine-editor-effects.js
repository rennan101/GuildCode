/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Dopamine Mode: Visual Explosions, Floating Glyphs &
   Mechanical Synthesized Sound for World C and C# Editors
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

        // Cores vibrantes estilo arcade / synthwave / neon
        this.palette = [
            '#06b6d4', // Cyan
            '#a855f7', // Purple
            '#ec4899', // Pink
            '#3b82f6', // Blue
            '#10b981', // Emerald
            '#eab308', // Gold / Yellow
            '#f97316'  // Orange
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
        // Vincula imediatamente aos editores existentes
        this.bindAllCurrentEditors();

        // Observa adições no DOM para telas dinâmicas (ex: boss raid, abismo, etc.)
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

        // Cria e anexa overlay canvas no container do editor
        this._ensureCanvasFor(textarea);

        // Listener de teclas
        textarea.addEventListener('keydown', (e) => this._onKeyDown(e, textarea));
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
            canvas.style.zIndex = '5';
            
            // Assegura posicionamento relativo no container
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
        const rect = textarea.getBoundingClientRect();
        if (canvas.width !== rect.width || canvas.height !== rect.height) {
            canvas.width = rect.width;
            canvas.height = rect.height;
        }
    }

    _onKeyDown(e, textarea) {
        if (!this.enabled) return;

        // Ignora teclas modificadoras isoladas
        if (['Control', 'Shift', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(e.key)) {
            return;
        }

        const now = performance.now();
        if (now - this.lastKeystrokeTime < 400) {
            this.comboCount++;
        } else {
            this.comboCount = 1;
        }
        this.lastKeystrokeTime = now;

        // Áudio dinâmico e satisfatório
        let keyType = 'char';
        if (e.key === 'Enter') keyType = 'enter';
        else if (e.key === 'Backspace' || e.key === 'Delete') keyType = 'backspace';
        else if ([';', '{', '}', '(', ')', '[', ']', '='].includes(e.key)) keyType = 'delimiter';
        else if (e.key === ' ') keyType = 'space';

        if (window.soundFX && typeof window.soundFX.playKeystroke === 'function') {
            window.soundFX.playKeystroke(keyType);
        }

        // Calcula coordenadas do cursor no textarea
        const pos = this._getCursorCoordinates(textarea);
        if (!pos) return;

        // Efeito Visual: Caractere flutuante (Floating Glyph)
        let displayGlyph = e.key;
        if (e.key === 'Enter') displayGlyph = '⏎';
        else if (e.key === 'Backspace') displayGlyph = '⌫';
        else if (e.key === ' ') displayGlyph = '␣';
        else if (e.key.length > 1) displayGlyph = '⚡';

        const color = this.palette[Math.floor(Math.random() * this.palette.length)];
        this._spawnFloatingGlyph(textarea, pos.x, pos.y, displayGlyph, color);

        // Efeito Visual: Partículas QUADRADAS explosivas (Square Pixels / Voxel Sparks)
        const particleCount = keyType === 'enter' ? 14 : (keyType === 'delimiter' ? 10 : 6);
        this._spawnSquareParticles(textarea, pos.x, pos.y, particleCount, color);

        // Micro Screen Shake no container do editor
        this._triggerEditorShake(textarea, keyType);
    }

    _getCursorCoordinates(textarea) {
        const text = textarea.value;
        const selStart = textarea.selectionStart || 0;
        const textBefore = text.substring(0, selStart);
        const lines = textBefore.split('\n');
        const lineIndex = lines.length - 1;
        const colIndex = lines[lines.length - 1].length;

        const computed = getComputedStyle(textarea);
        const fontSize = parseFloat(computed.fontSize) || 14;
        const lineHeight = parseFloat(computed.lineHeight) || (fontSize * 1.6);
        const charWidth = fontSize * 0.602; // JetBrains Mono / monospace aprox

        const padLeft = parseFloat(computed.paddingLeft) || 16;
        const padTop = parseFloat(computed.paddingTop) || 12;

        const x = padLeft + (colIndex * charWidth) - textarea.scrollLeft;
        const y = padTop + (lineIndex * lineHeight) + (lineHeight * 0.5) - textarea.scrollTop;

        return { x: Math.max(10, Math.min(x, textarea.clientWidth - 10)), y: Math.max(10, Math.min(y, textarea.clientHeight - 10)) };
    }

    _spawnFloatingGlyph(textarea, x, y, char, color) {
        this.floatingGlyphs.push({
            textarea,
            x: x + (Math.random() * 8 - 4),
            y: y,
            char,
            color,
            vx: (Math.random() - 0.5) * 1.2,
            vy: -1.6 - Math.random() * 1.2,
            size: 14 + Math.min(10, Math.floor(this.comboCount / 5)),
            alpha: 1.0,
            scale: 1.2,
            life: 1.0,
            decay: 0.038
        });
    }

    _spawnSquareParticles(textarea, x, y, count, baseColor) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.5 + Math.random() * 3.5;
            const size = 3 + Math.random() * 4; // Partículas quadradas (3px a 7px)
            const color = Math.random() > 0.3 ? baseColor : this.palette[Math.floor(Math.random() * this.palette.length)];
            
            this.particles.push({
                textarea,
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 0.8, // leve impulso para cima
                size: size,
                rotation: Math.random() * Math.PI,
                vRot: (Math.random() - 0.5) * 0.2,
                color: color,
                alpha: 1.0,
                decay: 0.035 + Math.random() * 0.02
            });
        }
    }

    _triggerEditorShake(textarea, keyType) {
        const wrapper = textarea.closest('.editor-wrapper') || textarea.parentElement;
        if (!wrapper) return;

        let intensity = 1.5;
        if (keyType === 'enter') intensity = 3.2;
        else if (keyType === 'delimiter') intensity = 2.2;
        else if (this.comboCount > 15) intensity = 2.5;

        const rx = (Math.random() - 0.5) * intensity;
        const ry = (Math.random() - 0.5) * intensity;

        wrapper.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
        
        if (this.shakeTimeout) clearTimeout(this.shakeTimeout);
        this.shakeTimeout = setTimeout(() => {
            wrapper.style.transform = 'translate3d(0, 0, 0)';
        }, 50);
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
        // Agrupa por canvas para renderização eficiente
        const perCanvasParticles = new Map();
        const perCanvasGlyphs = new Map();

        // 1. Atualiza partículas QUADRADAS
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.10; // Gravidade suave
            p.rotation += p.vRot;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            if (!perCanvasParticles.has(p.textarea)) perCanvasParticles.set(p.textarea, []);
            perCanvasParticles.get(p.textarea).push(p);
        }

        // 2. Atualiza Floating Glyphs
        for (let i = this.floatingGlyphs.length - 1; i >= 0; i--) {
            const g = this.floatingGlyphs[i];
            g.x += g.vx;
            g.y += g.vy;
            g.alpha -= g.decay;
            g.scale = Math.max(0.8, g.scale - 0.012);

            if (g.alpha <= 0) {
                this.floatingGlyphs.splice(i, 1);
                continue;
            }

            if (!perCanvasGlyphs.has(g.textarea)) perCanvasGlyphs.set(g.textarea, []);
            perCanvasGlyphs.get(g.textarea).push(g);
        }

        // 3. Desenha nos respectivos canvases
        this.canvasMap.forEach((canvas, textarea) => {
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const pList = perCanvasParticles.get(textarea);
            if (pList && pList.length > 0) {
                for (let j = 0; j < pList.length; j++) {
                    const p = pList[j];
                    ctx.save();
                    ctx.globalAlpha = Math.max(0, p.alpha);
                    ctx.fillStyle = p.color;
                    ctx.shadowColor = p.color;
                    ctx.shadowBlur = 4;
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation);
                    // Desenha QUADRADO PERFEITO
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                    ctx.restore();
                }
            }

            const gList = perCanvasGlyphs.get(textarea);
            if (gList && gList.length > 0) {
                for (let k = 0; k < gList.length; k++) {
                    const g = gList[k];
                    ctx.save();
                    ctx.globalAlpha = Math.max(0, g.alpha);
                    ctx.fillStyle = g.color;
                    ctx.shadowColor = g.color;
                    ctx.shadowBlur = 8;
                    ctx.font = `bold ${Math.round(g.size * g.scale)}px 'JetBrains Mono', monospace`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(g.char, g.x, g.y);
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
