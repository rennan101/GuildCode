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
       BGM: THEMA DE BATALHA DE BOSS (POKEMON GYM / ELITE FOUR STYLE)
       Síntese Chiptune de 3 canais: Lead (Sawtooth/Square), Bass (Square/Triangle), Percussão (Noise/Kick)
       ═══════════════════════════════════════════════════════════════ */

    startBattleMusic() {
        if (!this.enabled) return;
        this.init();
        if (this.bgMusicPlaying) return;
        this.bgMusicPlaying = true;
        this._step = 0;

        if (!this._bgGain && this.ctx) {
            this._bgGain = this.ctx.createGain();
            this._bgGain.gain.setValueAtTime(0.16, this.ctx.currentTime);
            this._bgGain.connect(this.ctx.destination);
        }

        this._scheduleLoop();
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
                this._bgGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
            } catch (e) {}
        }
    }

    _playBGMNote(freq, dur, type = 'square', vol = 0.08, timeOffset = 0) {
        if (!this.ctx || !this.bgMusicPlaying || !freq) return;
        try {
            const start = this.ctx.currentTime + timeOffset;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(vol, start);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + dur * 0.95);
            osc.connect(gain);
            if (this._bgGain) {
                gain.connect(this._bgGain);
            } else {
                gain.connect(this.ctx.destination);
            }
            osc.start(start);
            osc.stop(start + dur);
        } catch (e) {}
    }

    _playKick(timeOffset = 0) {
        if (!this.ctx || !this.bgMusicPlaying) return;
        try {
            const start = this.ctx.currentTime + timeOffset;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(160, start);
            osc.frequency.exponentialRampToValueAtTime(35, start + 0.09);
            gain.gain.setValueAtTime(0.18, start);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.09);
            osc.connect(gain);
            if (this._bgGain) gain.connect(this._bgGain);
            else gain.connect(this.ctx.destination);
            osc.start(start);
            osc.stop(start + 0.095);
        } catch (e) {}
    }

    _playSnare(timeOffset = 0) {
        if (!this.ctx || !this.bgMusicPlaying) return;
        try {
            const start = this.ctx.currentTime + timeOffset;
            // Ruído branco para batida nítida estilo Game Boy / GBA
            const bufferSize = Math.floor(this.ctx.sampleRate * 0.07);
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.setValueAtTime(1000, start);
            const gain = this.ctx.createGain();
            gain.gain.setValueAtTime(0.12, start);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.065);
            noise.connect(filter);
            filter.connect(gain);
            if (this._bgGain) gain.connect(this._bgGain);
            else gain.connect(this.ctx.destination);
            noise.start(start);
        } catch (e) {}
    }

    _scheduleLoop() {
        if (!this.bgMusicPlaying) return;
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }

        const stepDuration = 60 / (this._tempo * 2); // duração de 1/8 note (~0.20s)

        // Frequências para tema dramático em Dó Menor / Ré Menor (padrão Gym Leader / Elite Four)
        const C3 = 130.81, D3 = 146.83, Eb3 = 155.56, F3 = 174.61, G3 = 196.00, Ab3 = 207.65, Bb3 = 233.08;
        const C4 = 261.63, D4 = 293.66, Eb4 = 311.13, F4 = 349.23, G4 = 392.00, Ab4 = 415.30, Bb4 = 466.16;
        const C5 = 523.25, D5 = 587.33, Eb5 = 622.25, F5 = 698.46, G5 = 783.99, Ab5 = 830.61;

        // Linha de Baixo Rápida e Marcada (Estilo RPG Batalha Intensa de Ginásio)
        const bassNotes = [
            C3, C3, Eb3, C3, G3, C3, Bb3, G3,
            C3, C3, Eb3, C3, F3, Eb3, D3, Bb3,
            Ab3, Ab3, C4, Ab3, Bb3, Bb3, D4, Bb3,
            G3, G3, Bb3, G3, C4, Bb3, G3, F3
        ];

        // Melodia Triunfante / Arpejos Heroicos de Ginásio
        const leadNotes = [
            C5, 0,  G4, C5, Eb5, D5, C5, Bb4,
            C5, G4, Eb5, D5, C5, 0,  D5, Eb5,
            F5, 0,  D5, F5, G5,  F5, Eb5, D5,
            Eb5, D5, C5, Bb4, C5, 0, G5, 0
        ];

        const totalSteps = 32;
        const currentIdx = this._step % totalSteps;
        const bNote = bassNotes[currentIdx];
        const lNote = leadNotes[currentIdx];

        // Executa Baixo
        if (bNote) {
            this._playBGMNote(bNote, stepDuration * 0.9, 'sawtooth', 0.11);
        }

        // Executa Melodia Lead
        if (lNote) {
            this._playBGMNote(lNote, stepDuration * 0.85, 'square', 0.09);
        }

        // Percussão: Kick no tempo 0 e 2, Snare no tempo 1 e 3 (padrão driving beat 148 BPM)
        if (currentIdx % 4 === 0) {
            this._playKick(0);
        } else if (currentIdx % 4 === 2) {
            this._playSnare(0);
        } else if (currentIdx % 8 === 7) {
            // Fill curto no final do compasso
            this._playSnare(stepDuration * 0.5);
        }

        this._step++;

        this._bgMusicTimer = setTimeout(() => {
            this._scheduleLoop();
        }, stepDuration * 1000);
    }
}

window.raidAudio = new RaidAudioManager();
