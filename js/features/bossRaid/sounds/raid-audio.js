/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — BOSS BATTLE RAIDS: AUDIO MANAGER
   Síntese sonora imersiva em tempo real com Web Audio API
   (Seção 20 de CODE_LEVELER_BOSS_BATTLE_RAIDS.md)
   ═══════════════════════════════════════════════════════════════ */

class RaidAudioManager {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.bgMusicPlaying = false;
        this._bgMusicTimer = null;
        this._step = 0;
        this._tempo = 148; // BPM acelerado típico de Pokemon Gym / Elite 4
        this._bgGain = null;
        this._userGestureAttached = false;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }
        if (!this._userGestureAttached) {
            this._userGestureAttached = true;
            const unlock = () => {
                if (this.ctx && this.ctx.state === 'suspended') {
                    this.ctx.resume().catch(() => {});
                }
                if (this.bgMusicPlaying && this._bgMusicTimer === null) {
                    this._scheduleLoop();
                }
            };
            ['click', 'keydown', 'touchstart', 'pointerdown'].forEach(evt => {
                window.addEventListener(evt, unlock, { passive: true });
            });
        }
    }

    playTone(freq, duration = 0.1, type = 'sine', vol = 0.12) {
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

    playEvent(eventName) {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;

            switch (eventName) {
                case 'attack': {
                    // Efeito de corte veloz e impacto
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(580, now);
                    osc.frequency.exponentialRampToValueAtTime(140, now + 0.18);
                    gain.gain.setValueAtTime(0.18, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.18);
                    break;
                }
                case 'damage': {
                    // Impacto pesado e soco
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(160, now);
                    osc.frequency.exponentialRampToValueAtTime(45, now + 0.22);
                    gain.gain.setValueAtTime(0.25, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.22);
                    break;
                }
                case 'counter': {
                    // Tinir metálico de contra-golpe (Parry)
                    this.playTone(880, 0.08, 'triangle', 0.20);
                    setTimeout(() => this.playTone(1320, 0.15, 'sine', 0.22), 40);
                    setTimeout(() => this.playTone(1760, 0.25, 'sine', 0.15), 90);
                    break;
                }
                case 'dodge': {
                    // Sopro de vento e teletransporte rápido
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(300, now);
                    osc.frequency.exponentialRampToValueAtTime(900, now + 0.15);
                    gain.gain.setValueAtTime(0.14, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.15);
                    break;
                }
                case 'item': {
                    // Arpejo mágico de cura
                    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
                        setTimeout(() => this.playTone(freq, 0.18, 'sine', 0.14), i * 65);
                    });
                    break;
                }
                case 'revive': {
                    // Ressonância de ressurreição celestial
                    [440, 554.37, 659.25, 880, 1108.73].forEach((freq, i) => {
                        setTimeout(() => this.playTone(freq, 0.35, 'triangle', 0.18), i * 90);
                    });
                    break;
                }
                case 'playerDown': {
                    // Queda sombria
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(220, now);
                    osc.frequency.exponentialRampToValueAtTime(55, now + 0.45);
                    gain.gain.setValueAtTime(0.22, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.45);
                    break;
                }
                case 'bossDefeat': {
                    // Colapso massivo do chefe
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(180, now);
                    osc.frequency.exponentialRampToValueAtTime(30, now + 0.85);
                    gain.gain.setValueAtTime(0.30, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
                    osc.connect(gain);
                    gain.connect(this.ctx.destination);
                    osc.start(now);
                    osc.stop(now + 0.85);
                    break;
                }
                case 'victory': {
                    // Fanfarra triunfal
                    const notes = [
                        { f: 523.25, d: 150 },
                        { f: 659.25, d: 150 },
                        { f: 783.99, d: 150 },
                        { f: 1046.50, d: 450 }
                    ];
                    notes.forEach((n, idx) => {
                        setTimeout(() => this.playTone(n.f, n.d / 1000, 'triangle', 0.22), idx * 170);
                    });
                    break;
                }
                case 'miss': {
                    // Som oco de erro
                    this.playTone(180, 0.12, 'sawtooth', 0.12);
                    setTimeout(() => this.playTone(130, 0.18, 'sawtooth', 0.12), 100);
                    break;
                }
            }
        } catch (e) {}
    }

    /* ═══════════════════════════════════════════════════════════════
       BGM: TEMA GÓTICO & DRAMÁTICO DE BATALHA DE BOSS
       (Estilo Castlevania / Dark Souls / Órgão Arcano Sombrio)
       Sons:
       - Órgão de Tubos Gótico Polifônico (Sawtooth + Triangle com filtro ressonante)
       - Baixo Dramático Profundo (Sub-grave cavernoso)
       - Sino Gótico de Catedral (Frequências inarmônicas ressonantes)
       - Tímpanos / Bumbo de Marcha Imperial (Heavy war drums)
       ═══════════════════════════════════════════════════════════════ */

    startBattleMusic() {
        if (!this.enabled) return;
        this.init();
        if (this.bgMusicPlaying) return;
        this.bgMusicPlaying = true;
        this._step = 0;
        this._tempo = 126; // Andamento dramático, solene e imponente

        // Recria o _bgGain sempre para evitar nó desconectado de batalhas anteriores
        if (this.ctx) {
            if (this._bgGain) {
                try { this._bgGain.disconnect(); } catch (e) {}
            }
            this._bgGain = this.ctx.createGain();
            this._bgGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
            this._bgGain.connect(this.ctx.destination);
        }

        // Se o ctx estiver suspenso (política de autoplay), agenda para depois do desbloqueio
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().then(() => {
                if (this.bgMusicPlaying) this._scheduleLoop();
            }).catch(() => {});
        } else {
            this._scheduleLoop();
        }
    }

    stopBattleMusic() {
        this.bgMusicPlaying = false;
        if (this._bgMusicTimer) {
            clearTimeout(this._bgMusicTimer);
            this._bgMusicTimer = null;
        }
        if (this._bgGain && this.ctx) {
            try {
                this._bgGain.gain.setValueAtTime(this._bgGain.gain.value, this.ctx.currentTime);
                this._bgGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);
            } catch (e) {}
        }
    }

    /**
     * Toca uma nota de Órgão de Tubos Gótico (duas vozes ligeiramente desafinadas para calor e atmosfera sombria)
     */
    _playGothicOrgan(freq, dur, vol = 0.075, timeOffset = 0) {
        if (!this.ctx || !this.bgMusicPlaying || !freq) return;
        try {
            const start = this.ctx.currentTime + timeOffset;

            // Voz 1: Principal (sawtooth rica em harmônicos)
            const osc1 = this.ctx.createOscillator();
            const gain1 = this.ctx.createGain();
            const filter1 = this.ctx.createBiquadFilter();

            filter1.type = 'lowpass';
            filter1.frequency.setValueAtTime(1600, start);
            filter1.Q.setValueAtTime(3.5, start); // Ressonância mística

            osc1.type = 'sawtooth';
            osc1.frequency.setValueAtTime(freq, start);

            gain1.gain.setValueAtTime(0.001, start);
            gain1.gain.linearRampToValueAtTime(vol, start + 0.03); // Ataque de fole
            gain1.gain.exponentialRampToValueAtTime(0.0001, start + dur * 0.96);

            osc1.connect(filter1);
            filter1.connect(gain1);

            // Voz 2: Sub-oitava / ressonância mística (triangle com leve detune)
            const osc2 = this.ctx.createOscillator();
            const gain2 = this.ctx.createGain();
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(freq * 0.5, start); // Oitava abaixo para peso catedral
            gain2.gain.setValueAtTime(vol * 0.5, start);
            gain2.gain.exponentialRampToValueAtTime(0.0001, start + dur * 0.94);

            osc2.connect(gain2);

            if (this._bgGain) {
                gain1.connect(this._bgGain);
                gain2.connect(this._bgGain);
            } else {
                gain1.connect(this.ctx.destination);
                gain2.connect(this.ctx.destination);
            }

            osc1.start(start);
            osc1.stop(start + dur);
            osc2.start(start);
            osc2.stop(start + dur);
        } catch (e) {}
    }

    /**
     * Baixo orquestral cavernoso (violoncelos e contrabaixos góticos)
     */
    _playGothicBass(freq, dur, vol = 0.12, timeOffset = 0) {
        if (!this.ctx || !this.bgMusicPlaying || !freq) return;
        try {
            const start = this.ctx.currentTime + timeOffset;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(450, start);

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, start);

            gain.gain.setValueAtTime(vol, start);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + dur * 0.98);

            osc.connect(filter);
            filter.connect(gain);

            if (this._bgGain) gain.connect(this._bgGain);
            else gain.connect(this.ctx.destination);

            osc.start(start);
            osc.stop(start + dur);
        } catch (e) {}
    }

    /**
     * Sino de Catedral Gótico (Toque sombrio da meia-noite)
     */
    _playCathedralBell(freq = 440, timeOffset = 0) {
        if (!this.ctx || !this.bgMusicPlaying) return;
        try {
            const start = this.ctx.currentTime + timeOffset;
            // Parcial harmônico metálico inarmônico típico de sino de bronze pesado
            const harmonics = [1, 2.76, 5.4, 8.93];
            harmonics.forEach((h, i) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq * h, start);

                const dur = 1.6 / (i + 1);
                gain.gain.setValueAtTime(0.05 / (i + 1), start);
                gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);

                osc.connect(gain);
                if (this._bgGain) gain.connect(this._bgGain);
                else gain.connect(this.ctx.destination);

                osc.start(start);
                osc.stop(start + dur);
            });
        } catch (e) {}
    }

    /**
     * Tímpano / Bumbo Orquestral de Batalha Épica
     */
    _playTimpani(timeOffset = 0) {
        if (!this.ctx || !this.bgMusicPlaying) return;
        try {
            const start = this.ctx.currentTime + timeOffset;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(120, start);
            osc.frequency.exponentialRampToValueAtTime(40, start + 0.18);

            gain.gain.setValueAtTime(0.24, start);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);

            osc.connect(gain);
            if (this._bgGain) gain.connect(this._bgGain);
            else gain.connect(this.ctx.destination);

            osc.start(start);
            osc.stop(start + 0.23);
        } catch (e) {}
    }

    _scheduleLoop() {
        if (!this.bgMusicPlaying) return;
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }

        const stepDuration = 60 / (this._tempo * 2); // 1/8 note (~0.238s)

        // Escala Menor Harmônica Gótica em Ré (D Minor Harmonic)
        // D3, E3, F3, G3, A3, Bb3, C#4, D4, etc. (Tensão gótica clássica de órgão sacro)
        const D2 = 73.42, F2 = 87.31, G2 = 98.00, A2 = 110.00, Bb2 = 116.54, Cs3 = 138.59;
        const D3 = 146.83, E3 = 164.81, F3 = 174.61, G3 = 196.00, A3 = 220.00, Bb3 = 233.08, Cs4 = 277.18;
        const D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, Bb4 = 466.16, Cs5 = 554.37, D5 = 587.33;

        // Linha Baixa Dramática (Ostinato fúnebre / marcha de batalha gótica)
        const gothicBass = [
            D2, D2, D2, F2, D2, D2, A2, G2,
            D2, D2, D2, F2, D2, Cs3, D2, A2,
            Bb2, Bb2, Bb2, D3, Bb2, A2, A2, Cs3,
            D2, D2, F2, G2, A2, Cs3, D2, 0
        ];

        // Melodia de Órgão Gótico de Catedral (Harmônica Menor / Toccata)
        const organMelody = [
            D4,  0,   F4,  A4,  D5,  Cs5, D5,  A4,
            Bb4, A4,  G4,  F4,  E4,  F4,  Cs4, D4,
            F4,  0,   A4,  D5,  F5,  E5,  D5,  Cs5,
            D5,  A4,  F4,  D4,  Cs4, E4,  D4,  0
        ];

        const totalSteps = 32;
        const currentIdx = this._step % totalSteps;
        const bFreq = gothicBass[currentIdx];
        const mFreq = organMelody[currentIdx];

        // Toca Órgão de Tubos
        if (mFreq) {
            this._playGothicOrgan(mFreq, stepDuration * 1.15, 0.08);
        }

        // Toca Baixo Cavernoso
        if (bFreq) {
            this._playGothicBass(bFreq, stepDuration * 0.95, 0.12);
        }

        // Tímpano nos tempos fortes da marcha gótica
        if (currentIdx % 4 === 0) {
            this._playTimpani(0);
        } else if (currentIdx % 8 === 6) {
            this._playTimpani(stepDuration * 0.4);
        }

        // Sino de Catedral no primeiro compasso e na virada dramática
        if (currentIdx === 0) {
            this._playCathedralBell(D3, 0);
        } else if (currentIdx === 16) {
            this._playCathedralBell(A3, 0);
        }

        this._step++;

        this._bgMusicTimer = setTimeout(() => {
            this._scheduleLoop();
        }, stepDuration * 1000);
    }
}

window.raidAudio = new RaidAudioManager();
