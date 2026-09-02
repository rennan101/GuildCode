/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — BOSS BATTLE RAIDS: AUDIO MANAGER
   Síntese sonora imersiva em tempo real com Web Audio API
   (Seção 20 de CODE_LEVELER_BOSS_BATTLE_RAIDS.md)
   ═══════════════════════════════════════════════════════════════ */

class RaidAudioManager {
    constructor() {
        this.ctx = null;
        this.enabled = true;
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
}

window.raidAudio = new RaidAudioManager();
