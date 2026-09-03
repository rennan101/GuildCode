/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — PROCEDURAL TRAINING SYSTEM (PTS)
   SeededRandom: Gerador Determinístico Pseudo-Aleatório
   ═══════════════════════════════════════════════════════════════ */

class SeededRandom {
    /**
     * @param {number|string} seed - Semente numérica ou string
     */
    constructor(seed) {
        this.initialSeed = seed !== undefined && seed !== null ? seed : Date.now();
        this.state = this._hashSeed(this.initialSeed);
    }

    /**
     * Gera um hash inteiro de 32 bits a partir de qualquer entrada
     */
    _hashSeed(seed) {
        if (typeof seed === 'number') {
            return (Math.floor(seed) >>> 0) || 123456789;
        }
        const str = String(seed);
        let hash = 2166136261;
        for (let i = 0; i < str.length; i++) {
            hash ^= str.charCodeAt(i);
            hash = Math.imul(hash, 16777619);
        }
        return (hash >>> 0) || 123456789;
    }

    /**
     * Algoritmo Mulberry32 para geração determinística com alta qualidade
     * Retorna um número float no intervalo [0, 1)
     */
    next() {
        let t = (this.state += 0x6D2B79F5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }

    /**
     * Retorna um inteiro no intervalo [min, max] (inclusive)
     */
    nextInt(min, max) {
        const lo = Math.min(min, max);
        const hi = Math.max(min, max);
        return Math.floor(this.next() * (hi - lo + 1)) + lo;
    }

    /**
     * Retorna um valor com base em min, max e step
     */
    range(min, max, step = 1) {
        if (step <= 0) step = 1;
        const count = Math.floor((max - min) / step);
        const index = this.nextInt(0, count);
        return min + index * step;
    }

    /**
     * Escolhe um elemento aleatório de uma lista
     */
    choice(array) {
        if (!array || array.length === 0) return null;
        const index = Math.floor(this.next() * array.length);
        return array[index];
    }

    /**
     * Embaralha um array (retorna novo array sem mutar o original)
     */
    shuffle(array) {
        if (!array) return [];
        const copy = [...array];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(this.next() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    /**
     * Seleciona n elementos distintos de um array
     */
    sample(array, n) {
        if (!array || array.length === 0) return [];
        const count = Math.min(n, array.length);
        const shuffled = this.shuffle(array);
        return shuffled.slice(0, count);
    }
}

if (typeof module !== 'undefined') {
    module.exports = SeededRandom;
}
if (typeof window !== 'undefined') {
    window.SeededRandom = SeededRandom;
}
