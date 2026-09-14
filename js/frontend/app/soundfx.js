/* ═══════════════════════════════════════════════════════════════
   GUILDCODE / CODE LEVELER — Sound Synthesis Engine
   Web Audio API: clicks, sci-fi magic, code execution, validation
   ═══════════════════════════════════════════════════════════════ */
class SoundEffects {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.sfxGain = null;
        this._userGestureAttached = false;
        this._hasInteracted = false;
        
        // Configurações de áudio com persistência
        const savedAudio = this._loadAudioSettings();
        this.sfxVolume = savedAudio.sfxVolume !== undefined ? savedAudio.sfxVolume : 0.8;
        this.sfxMuted = savedAudio.sfxMuted !== undefined ? savedAudio.sfxMuted : false;
        this.bgmVolume = savedAudio.bgmVolume !== undefined ? savedAudio.bgmVolume : 0.7;
        this.bgmMuted = savedAudio.bgmMuted !== undefined ? savedAudio.bgmMuted : false;

        // Anexa listeners de desbloqueio imediatamente na criação
        this.setupAudioAutoUnlock();
    }

    _loadAudioSettings() {
        try {
            const raw = localStorage.getItem('gc_audio_settings');
            return raw ? JSON.parse(raw) : {};
        } catch (e) {
            return {};
        }
    }

    _saveAudioSettings() {
        try {
            localStorage.setItem('gc_audio_settings', JSON.stringify({
                sfxVolume: this.sfxVolume,
                sfxMuted: this.sfxMuted,
                bgmVolume: this.bgmVolume,
                bgmMuted: this.bgmMuted
            }));
        } catch (e) {}
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && !this.sfxGain) {
            this.sfxGain = this.ctx.createGain();
            const targetVal = this.sfxMuted ? 0 : this.sfxVolume;
            this.sfxGain.gain.setValueAtTime(targetVal, this.ctx.currentTime);
            this.sfxGain.connect(this.ctx.destination);
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }
        this.setupAudioAutoUnlock();
    }

    setupAudioAutoUnlock() {
        if (this._userGestureAttached) return;
        this._userGestureAttached = true;
        const unlock = () => {
            this._hasInteracted = true;
            if (!this.ctx) {
                this.init();
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume().then(() => {
                    if (this.sfxGain) {
                        const targetVal = this.sfxMuted ? 0 : this.sfxVolume;
                        this.sfxGain.gain.setValueAtTime(targetVal, this.ctx.currentTime);
                    }
                }).catch(() => {});
            }
            if (window.raidAudio && window.raidAudio.ctx && window.raidAudio.ctx.state === 'suspended') {
                window.raidAudio.ctx.resume().catch(() => {});
            }
        };

        ['click', 'keydown', 'touchstart', 'touchend', 'pointerdown', 'mousedown'].forEach(evt => {
            window.addEventListener(evt, unlock, { passive: true });
            document.addEventListener(evt, unlock, { passive: true });
        });
    }

    /**
     * Retorna o nó de destino de áudio atual (sfxGain) garantindo inicialização
     */
    getDestinationNode() {
        this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }
        return this.sfxGain || (this.ctx ? this.ctx.destination : null);
    }

    setSfxVolume(val) {
        this.sfxVolume = Math.max(0, Math.min(1, Math.round(val * 100) / 100));
        this.init();
        if (this.ctx && this.sfxGain) {
            const targetVal = this.sfxMuted ? 0 : this.sfxVolume;
            this.sfxGain.gain.setValueAtTime(targetVal, this.ctx.currentTime);
        }
        this._saveAudioSettings();
    }

    toggleSfxMute() {
        this.sfxMuted = !this.sfxMuted;
        this.init();
        if (this.ctx && this.sfxGain) {
            const targetVal = this.sfxMuted ? 0 : this.sfxVolume;
            this.sfxGain.gain.setValueAtTime(targetVal, this.ctx.currentTime);
        }
        this._saveAudioSettings();
        return this.sfxMuted;
    }

    setBgmVolume(val) {
        this.bgmVolume = Math.max(0, Math.min(1, Math.round(val * 100) / 100));
        this._saveAudioSettings();
        if (window.raidAudio && typeof window.raidAudio.applyVolumeSettings === 'function') {
            window.raidAudio.applyVolumeSettings();
        }
    }

    toggleBgmMute() {
        this.bgmMuted = !this.bgmMuted;
        this._saveAudioSettings();
        if (window.raidAudio && typeof window.raidAudio.applyVolumeSettings === 'function') {
            window.raidAudio.applyVolumeSettings();
        }
        return this.bgmMuted;
    }

    getEffectiveBgmVolume() {
        return this.bgmMuted ? 0 : this.bgmVolume;
    }

    playTone(freq, duration = 0.08, type = 'sine', vol = 0.08) {
        if (!this.enabled || this.sfxMuted) return;
        try {
            const dest = this.getDestinationNode();
            if (!this.ctx || !dest) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(vol, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(dest);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {}
    }
    playTypewriter(charType = 'character') {
        if (!this.enabled || this.sfxMuted) return;
        try {
            const dest = this.getDestinationNode();
            if (!this.ctx || !dest) return;
            const now = this.ctx.currentTime;
            
            // Frequências base distintas por arquétipo/personagem para voz única
            let baseFreq = 520;
            let oscType = 'sine';
            let vol = 0.025;

            if (charType === 'arkan' || charType === 'kael') {
                baseFreq = 340; // Voz mais grave/marcial
                oscType = 'triangle';
                vol = 0.03;
            } else if (charType === 'lyra' || charType === 'mira') {
                baseFreq = 680; // Voz mais suave/aguda
                oscType = 'sine';
                vol = 0.022;
            } else if (charType === 'gm' || charType === 'system') {
                baseFreq = 820; // Tom cyber/etéreo
                oscType = 'triangle';
                vol = 0.02;
            }

            // Micro-variação natural por letra (jitter de pitch)
            const jitter = (Math.random() - 0.5) * 45;
            const finalFreq = Math.max(120, baseFreq + jitter);

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = oscType;
            osc.frequency.setValueAtTime(finalFreq, now);
            osc.frequency.exponentialRampToValueAtTime(finalFreq * 0.85, now + 0.035);

            gain.gain.setValueAtTime(vol, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

            osc.connect(gain);
            gain.connect(dest);
            osc.start(now);
            osc.stop(now + 0.042);
        } catch (e) {}
    }
    playClick() {
        if (!this.enabled || this.sfxMuted) return;
        try {
            const dest = this.getDestinationNode();
            if (!this.ctx || !dest) return;
            const now = this.ctx.currentTime;
            
            // ── Camada 1: Cristal Mágico (Dual Harmônico com Decaimento Rápido) ──
            const osc1 = this.ctx.createOscillator();
            const gain1 = this.ctx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(2200, now);
            osc1.frequency.exponentialRampToValueAtTime(1100, now + 0.05);
            gain1.gain.setValueAtTime(0.09, now);
            gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
            osc1.connect(gain1);
            gain1.connect(dest);
            osc1.start(now);
            osc1.stop(now + 0.065);

            // ── Camada 2: Cyber Resonant Pulse (Ataque tecnológico afiado) ──
            const osc2 = this.ctx.createOscillator();
            const gain2 = this.ctx.createGain();
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(750, now);
            osc2.frequency.exponentialRampToValueAtTime(320, now + 0.035);
            gain2.gain.setValueAtTime(0.12, now);
            gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
            osc2.connect(gain2);
            gain2.connect(dest);
            osc2.start(now);
            osc2.stop(now + 0.045);

            // ── Camada 3: Shimmer de Mana (Micro ressonância aguda) ──
            const osc3 = this.ctx.createOscillator();
            const gain3 = this.ctx.createGain();
            osc3.type = 'sine';
            osc3.frequency.setValueAtTime(3500, now);
            osc3.frequency.exponentialRampToValueAtTime(4400, now + 0.03);
            gain3.gain.setValueAtTime(0.04, now);
            gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
            osc3.connect(gain3);
            gain3.connect(dest);
            osc3.start(now);
            osc3.stop(now + 0.045);
        } catch (e) {}
    }
    playRunCode() {
        if (!this.enabled || this.sfxMuted) return;
        try {
            const dest = this.getDestinationNode();
            if (!this.ctx || !dest) return;
            // Cyber spell casting / Code execution sound
            const now = this.ctx.currentTime;
            [440, 660, 880].forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sawtooth';
                const startTime = now + (idx * 0.04);
                osc.frequency.setValueAtTime(freq, startTime);
                osc.frequency.exponentialRampToValueAtTime(freq * 1.5, startTime + 0.08);
                gain.gain.setValueAtTime(0.04, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);
                osc.connect(gain);
                gain.connect(dest);
                osc.start(startTime);
                osc.stop(startTime + 0.085);
            });
        } catch (e) {}
    }
    playCheckCodeSuccess() {
        if (!this.enabled || this.sfxMuted) return;
        try {
            const dest = this.getDestinationNode();
            if (!this.ctx || !dest) return;
            // Victory / Code verified chord
            const now = this.ctx.currentTime;
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                const startTime = now + (idx * 0.05);
                osc.frequency.setValueAtTime(freq, startTime);
                gain.gain.setValueAtTime(0.08, startTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.35);
                osc.connect(gain);
                gain.connect(dest);
                osc.start(startTime);
                osc.stop(startTime + 0.36);
            });
        } catch (e) {}
    }
    playCheckCodeFail() {
        if (!this.enabled || this.sfxMuted) return;
        try {
            const dest = this.getDestinationNode();
            if (!this.ctx || !dest) return;
            const now = this.ctx.currentTime;
            [300, 220].forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sawtooth';
                const startTime = now + (idx * 0.08);
                osc.frequency.setValueAtTime(freq, startTime);
                gain.gain.setValueAtTime(0.08, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);
                osc.connect(gain);
                gain.connect(dest);
                osc.start(startTime);
                osc.stop(startTime + 0.16);
            });
        } catch (e) {}
    }
    playDanger() {
        if (!this.enabled || this.sfxMuted) return;
        try {
            const dest = this.getDestinationNode();
            if (!this.ctx || !dest) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.linearRampToValueAtTime(80, now + 0.6);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
            osc.connect(gain);
            gain.connect(dest);
            osc.start(now);
            osc.stop(now + 0.6);
        } catch (e) {}
    }
    playMagic() {
        if (!this.enabled || this.sfxMuted) return;
        try {
            const dest = this.getDestinationNode();
            if (!this.ctx || !dest) return;
            const now = this.ctx.currentTime;
            [587.33, 739.99, 880, 1174.66, 1479.98].forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                const startTime = now + (idx * 0.06);
                osc.frequency.setValueAtTime(freq, startTime);
                gain.gain.setValueAtTime(0.08, startTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.5);
                osc.connect(gain);
                gain.connect(dest);
                osc.start(startTime);
                osc.stop(startTime + 0.52);
            });
        } catch (e) {}
    }

    // ─── DRAMATIC CINEMATIC SOUND EFFECTS (ISEKAI ACCIDENT) ───
    playTireScreech() {
        if (!this.enabled || this.sfxMuted) return;
        try {
            const dest = this.getDestinationNode();
            if (!this.ctx || !dest) return;
            const now = this.ctx.currentTime;
            
            // 1. Motor acelerando/ronco de aproximação de van pesada (Low Sawtooth)
            const engineOsc = this.ctx.createOscillator();
            const engineGain = this.ctx.createGain();
            engineOsc.type = 'sawtooth';
            engineOsc.frequency.setValueAtTime(85, now);
            engineOsc.frequency.exponentialRampToValueAtTime(210, now + 0.6);
            engineGain.gain.setValueAtTime(0.01, now);
            engineGain.gain.linearRampToValueAtTime(0.22, now + 0.35);
            engineGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
            engineOsc.connect(engineGain);
            engineGain.connect(dest);
            engineOsc.start(now);
            engineOsc.stop(now + 1.22);

            // 2. Fricção encorpada de pneus pesados no asfalto (Ruído filtrado em Lowpass)
            const bufferSize = this.ctx.sampleRate * 1.3;
            const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const output = noiseBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }
            const whiteNoise = this.ctx.createBufferSource();
            whiteNoise.buffer = noiseBuffer;

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(950, now);
            filter.frequency.linearRampToValueAtTime(1400, now + 0.4);
            filter.frequency.linearRampToValueAtTime(650, now + 1.1);
            filter.Q.setValueAtTime(3.5, now);

            const noiseGain = this.ctx.createGain();
            noiseGain.gain.setValueAtTime(0.01, now);
            noiseGain.gain.linearRampToValueAtTime(0.3, now + 0.35);
            noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.25);

            whiteNoise.connect(filter);
            filter.connect(noiseGain);
            noiseGain.connect(dest);
            whiteNoise.start(now);
            whiteNoise.stop(now + 1.26);

            // 3. Cantar de derrapagem realista (frequência média aveludada, sem agudo estridente)
            const skidOsc = this.ctx.createOscillator();
            const skidGain = this.ctx.createGain();
            skidOsc.type = 'sine';
            skidOsc.frequency.setValueAtTime(800, now + 0.15);
            skidOsc.frequency.linearRampToValueAtTime(1150, now + 0.5);
            skidOsc.frequency.exponentialRampToValueAtTime(420, now + 1.1);
            skidGain.gain.setValueAtTime(0.001, now);
            skidGain.gain.setValueAtTime(0.01, now + 0.15);
            skidGain.gain.linearRampToValueAtTime(0.14, now + 0.45);
            skidGain.gain.exponentialRampToValueAtTime(0.001, now + 1.15);
            skidOsc.connect(skidGain);
            skidGain.connect(dest);
            skidOsc.start(now + 0.15);
            skidOsc.stop(now + 1.16);
        } catch (e) {}
    }

    playCrashImpact() {
        if (!this.enabled || this.sfxMuted) return;
        try {
            const dest = this.getDestinationNode();
            if (!this.ctx || !dest) return;
            const now = this.ctx.currentTime;

            // Camada 1: Impacto Sub-Grave Ensurdecedor (Explosão de Metal)
            const osc1 = this.ctx.createOscillator();
            const gain1 = this.ctx.createGain();
            osc1.type = 'sawtooth';
            osc1.frequency.setValueAtTime(160, now);
            osc1.frequency.exponentialRampToValueAtTime(25, now + 0.8);
            gain1.gain.setValueAtTime(0.4, now);
            gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
            osc1.connect(gain1);
            gain1.connect(dest);
            osc1.start(now);
            osc1.stop(now + 0.86);

            // Camada 2: Metal contorcendo e estilhaço (Ruído metálico cortante)
            const osc2 = this.ctx.createOscillator();
            const gain2 = this.ctx.createGain();
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(450, now);
            osc2.frequency.linearRampToValueAtTime(110, now + 0.35);
            gain2.gain.setValueAtTime(0.35, now);
            gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
            osc2.connect(gain2);
            gain2.connect(dest);
            osc2.start(now);
            osc2.stop(now + 0.52);

            // Camada 3: Sub-bass boom
            const osc3 = this.ctx.createOscillator();
            const gain3 = this.ctx.createGain();
            osc3.type = 'sine';
            osc3.frequency.setValueAtTime(90, now);
            osc3.frequency.linearRampToValueAtTime(30, now + 1.2);
            gain3.gain.setValueAtTime(0.45, now);
            gain3.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
            osc3.connect(gain3);
            gain3.connect(dest);
            osc3.start(now);
            osc3.stop(now + 1.25);
        } catch (e) {}
    }

    playCosmicPulse() {
        if (!this.enabled || this.sfxMuted) return;
        try {
            const dest = this.getDestinationNode();
            if (!this.ctx || !dest) return;
            const now = this.ctx.currentTime;
            
            // Ressonância transcendental do Sistema (Convite Cósmico)
            [261.63, 329.63, 392.00, 523.25, 659.25, 1046.50].forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                const startTime = now + (idx * 0.1);
                osc.frequency.setValueAtTime(freq, startTime);
                osc.frequency.exponentialRampToValueAtTime(freq * 1.05, startTime + 1.2);
                gain.gain.setValueAtTime(0.08, startTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.4);
                osc.connect(gain);
                gain.connect(dest);
                osc.start(startTime);
                osc.stop(startTime + 1.45);
            });
        } catch (e) {}
    }

    playMapNodeTune(nodeIndex = 0) {
        if (!this.enabled || this.sfxMuted) return;
        try {
            const dest = this.getDestinationNode();
            if (!this.ctx || !dest) return;
            const now = this.ctx.currentTime;

            // Escala pentatônica mágica etérea (C4, D4, E4, G4, A4, C5, D5, E5...)
            const pentatonicScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
            const baseFreq = pentatonicScale[Math.abs(Number(nodeIndex) || 0) % pentatonicScale.length];

            // 1. Cristal de Tom Primário
            const osc1 = this.ctx.createOscillator();
            const gain1 = this.ctx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(baseFreq, now);
            gain1.gain.setValueAtTime(0.065, now);
            gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
            osc1.connect(gain1);
            gain1.connect(dest);
            osc1.start(now);
            osc1.stop(now + 0.39);

            // 2. Harmônico Superior Shimmer (+1 oitava)
            const osc2 = this.ctx.createOscillator();
            const gain2 = this.ctx.createGain();
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(baseFreq * 2, now + 0.02);
            gain2.gain.setValueAtTime(0.035, now + 0.02);
            gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
            osc2.connect(gain2);
            gain2.connect(dest);
            osc2.start(now + 0.02);
            osc2.stop(now + 0.29);
        } catch (e) {}
    }

    playMechanicalClick() {
        if (!this.enabled || this.sfxMuted) return;
        try {
            const dest = this.getDestinationNode();
            if (!this.ctx || !dest) return;
            const now = this.ctx.currentTime;

            // Simulação de switch mecânico tátil suave (Mechanical Cherry Blue / Keyboard tactile)
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            const freq = 1800 + Math.random() * 400;
            osc.frequency.setValueAtTime(freq, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.015);
            gain.gain.setValueAtTime(0.022, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);
            osc.connect(gain);
            gain.connect(dest);
            osc.start(now);
            osc.stop(now + 0.025);
        } catch (e) {}
    }

    playChatMessageSent() {
        if (!this.enabled || this.sfxMuted) return;
        try {
            const dest = this.getDestinationNode();
            if (!this.ctx || !dest) return;
            const now = this.ctx.currentTime;
            
            // Pop sutil e satisfatório de envio (bip duplo ascendente agudo e limpo)
            const osc1 = this.ctx.createOscillator();
            const gain1 = this.ctx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(780, now);
            osc1.frequency.exponentialRampToValueAtTime(1040, now + 0.04);
            gain1.gain.setValueAtTime(0.06, now);
            gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
            osc1.connect(gain1);
            gain1.connect(dest);
            osc1.start(now);
            osc1.stop(now + 0.055);

            const osc2 = this.ctx.createOscillator();
            const gain2 = this.ctx.createGain();
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(1320, now + 0.04);
            osc2.frequency.exponentialRampToValueAtTime(1760, now + 0.09);
            gain2.gain.setValueAtTime(0.07, now + 0.04);
            gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);
            osc2.connect(gain2);
            gain2.connect(dest);
            osc2.start(now + 0.04);
            osc2.stop(now + 0.115);
        } catch (e) {}
    }

    playChatMessageReceived() {
        if (!this.enabled || this.sfxMuted) return;
        try {
            const dest = this.getDestinationNode();
            if (!this.ctx || !dest) return;
            const now = this.ctx.currentTime;
            
            // Notificação suave de mensagem recebida (acorde de sino cristalino: F5 -> A5 -> C6)
            [698.46, 880.00, 1046.50].forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                const startTime = now + (idx * 0.035);
                osc.frequency.setValueAtTime(freq, startTime);
                gain.gain.setValueAtTime(0.065, startTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.28);
                osc.connect(gain);
                gain.connect(dest);
                osc.start(startTime);
                osc.stop(startTime + 0.29);
            });
        } catch (e) {}
    }
}

if (typeof window !== "undefined") {
    window.SoundEffects = SoundEffects;
    window.SoundFX = SoundEffects; // Alias de compatibilidade
    if (!window.soundFX) {
        window.soundFX = new SoundEffects();
    }
}

if (typeof module !== "undefined") {
    module.exports = { SoundEffects, SoundFX: SoundEffects };
}
