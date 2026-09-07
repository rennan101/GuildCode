/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Artifacts System Core & Procedural Generator
   Catálogo de 8 artefatos, balanceamento de atributos (3★ a 6★),
   gerador procedural de drops e limites de inventário.
   ═══════════════════════════════════════════════════════════════ */

const ARTIFACTS_CATALOG = {
    'Crown_Cristal': {
        baseId: 'Crown_Cristal',
        name: 'Diadema do Bastião Cristalino',
        type: 'crown',
        slotLabel: 'Coroa',
        asset: 'assets/artifacts/Crown_Cristal.svg',
        statType: 'def',
        statName: 'Defesa',
        isPercent: false,
        lore: 'Forjado nos cristais profundos de Aethergard, consolida a blindagem física do aprendiz.'
    },
    'Crown_Hollow': {
        baseId: 'Crown_Hollow',
        name: 'Coroa Oca',
        type: 'crown',
        slotLabel: 'Coroa',
        asset: 'assets/artifacts/Crown_Hollow.svg',
        statType: 'def',
        statName: 'Defesa',
        isPercent: true,
        lore: 'Um diadema espectral que dissipa impactos proporcionais à robustez do usuário.'
    },
    'Chalice_Seiva': {
        baseId: 'Chalice_Seiva',
        name: 'Ânfora da Seiva Primordial',
        type: 'chalice',
        slotLabel: 'Cálice',
        asset: 'assets/artifacts/Chalice_Seiva.svg',
        statType: 'hp',
        statName: 'Pontos de Vida',
        isPercent: false,
        lore: 'Contém a essência vital dos nós de memória originais, expandindo a vitalidade base.'
    },
    'Chalice_Vulcano': {
        baseId: 'Chalice_Vulcano',
        name: 'Cálice da Fonte Vulcânica',
        type: 'chalice',
        slotLabel: 'Cálice',
        asset: 'assets/artifacts/Chalice_Vulcano.svg',
        statType: 'hp',
        statName: 'Pontos de Vida',
        isPercent: true,
        lore: 'Calor incandescente que multiplica o fôlego e a capacidade máxima de sobrevivência.'
    },
    'Ring_Draco': {
        baseId: 'Ring_Draco',
        name: 'Anel Dracônico Carmesim',
        type: 'ring',
        slotLabel: 'Anel',
        asset: 'assets/artifacts/Ring_Draco.svg',
        statType: 'atk',
        statName: 'Ataque',
        isPercent: false,
        lore: 'Lapidado com as escamas dos dragões de dados, adiciona poder ofensivo absoluto aos ataques.'
    },
    'Ring_Oroborus': {
        baseId: 'Ring_Oroborus',
        name: 'Anel do Ouroboros',
        type: 'ring',
        slotLabel: 'Anel',
        asset: 'assets/artifacts/Ring_Oroborus.svg',
        statType: 'atk',
        statName: 'Ataque',
        isPercent: true,
        lore: 'O ciclo infinito de execução do código amplia a potência de qualquer investida ofensiva.'
    },
    'Anklet_Wind': {
        baseId: 'Anklet_Wind',
        name: 'Grilhão do Vento Vetorial',
        type: 'anklet',
        slotLabel: 'Tornozeleira',
        asset: 'assets/artifacts/Anklet_Wind.svg',
        statType: 'spd',
        statName: 'Velocidade',
        isPercent: false,
        lore: 'Permite desvios instantâneos e agilidade tática superior nos combates da Guilda.'
    },
    'Anklet_Lightning': {
        baseId: 'Anklet_Lightning',
        name: 'Elo da Corrente Fulgurante',
        type: 'anklet',
        slotLabel: 'Tornozeleira',
        asset: 'assets/artifacts/Anklet_Lightning.svg',
        statType: 'spd',
        statName: 'Velocidade',
        isPercent: true,
        lore: 'Impulsos elétricos de clock que multiplicam o tempo de resposta e aceleração.'
    }
};

const ARTIFACT_RARITY_TIERS = {
    3: { stars: 3, rarity: 'COMMON', label: 'Comum', color: '#94a3b8' },
    4: { stars: 4, rarity: 'RARE', label: 'Raro', color: '#38bdf8' },
    5: { stars: 5, rarity: 'EPIC', label: 'Épico', color: '#c084fc' },
    6: { stars: 6, rarity: 'LEGENDARY', label: 'Lendário', color: '#fbbf24' }
};

const ARTIFACT_STAT_RANGES = {
    3: {
        hp_flat:  { min: 150, max: 280, step: 5 },
        hp_pct:   { min: 4.0, max: 7.0, step: 0.1 },
        atk_flat: { min: 15,  max: 28,  step: 1 },
        atk_pct:  { min: 3.5, max: 6.0, step: 0.1 },
        def_flat: { min: 12,  max: 24,  step: 1 },
        def_pct:  { min: 3.0, max: 5.5, step: 0.1 },
        spd_flat: { min: 5,   max: 10,  step: 1 },
        spd_pct:  { min: 2.5, max: 4.5, step: 0.1 }
    },
    4: {
        hp_flat:  { min: 300, max: 550, step: 5 },
        hp_pct:   { min: 7.5, max: 12.0, step: 0.1 },
        atk_flat: { min: 30,  max: 55,  step: 1 },
        atk_pct:  { min: 6.5, max: 10.5, step: 0.1 },
        def_flat: { min: 26,  max: 48,  step: 1 },
        def_pct:  { min: 6.0, max: 9.5, step: 0.1 },
        spd_flat: { min: 11,  max: 18,  step: 1 },
        spd_pct:  { min: 5.0, max: 7.5, step: 0.1 }
    },
    5: {
        hp_flat:  { min: 600, max: 980, step: 10 },
        hp_pct:   { min: 13.0, max: 19.5, step: 0.1 },
        atk_flat: { min: 60,  max: 95,  step: 1 },
        atk_pct:  { min: 11.0, max: 16.5, step: 0.1 },
        def_flat: { min: 52,  max: 82,  step: 1 },
        def_pct:  { min: 10.0, max: 15.0, step: 0.1 },
        spd_flat: { min: 20,  max: 30,  step: 1 },
        spd_pct:  { min: 8.0, max: 12.0, step: 0.1 }
    },
    6: {
        hp_flat:  { min: 1050, max: 1600, step: 15 },
        hp_pct:   { min: 21.0, max: 30.0, step: 0.1 },
        atk_flat: { min: 105,  max: 160,  step: 1 },
        atk_pct:  { min: 17.5, max: 25.0, step: 0.1 },
        def_flat: { min: 90,   max: 140,  step: 1 },
        def_pct:  { min: 16.0, max: 23.0, step: 0.1 },
        spd_flat: { min: 34,   max: 50,   step: 1 },
        spd_pct:  { min: 13.0, max: 18.0, step: 0.1 }
    }
};

const MAX_ARTIFACTS_PER_TYPE = 24; // 24 slots por aba no grid 4x6
const MAX_TOTAL_ARTIFACTS = 96;

class ArtifactsManager {
    /**
     * Retorna a lista de todos os artefatos base do catálogo
     */
    static getCatalog() {
        return Object.values(ARTIFACTS_CATALOG);
    }

    /**
     * Retorna os dados base de um artefato pelo ID de catálogo
     */
    static getBaseArtifact(baseId) {
        return ARTIFACTS_CATALOG[baseId] || null;
    }

    /**
     * Gera um artefato procedural com roll aleatório balanceado
     * @param {Object} options Configurações de drop
     * @param {string} [options.baseId] BaseId específico ou 'random'
     * @param {number} [options.minStars=3] Mínimo de estrelas (3 a 6)
     * @param {number} [options.maxStars=6] Máximo de estrelas (3 a 6)
     * @param {number|string} [options.chapterId] ID do capítulo de origem
     */
    static generateDrop(options = {}) {
        let baseId = options.baseId;
        const catalogKeys = Object.keys(ARTIFACTS_CATALOG);

        if (!baseId || baseId === 'random' || !ARTIFACTS_CATALOG[baseId]) {
            baseId = catalogKeys[Math.floor(Math.random() * catalogKeys.length)];
        }

        const template = ARTIFACTS_CATALOG[baseId];
        const minS = Math.max(3, Math.min(6, Number(options.minStars) || 3));
        const maxS = Math.max(minS, Math.min(6, Number(options.maxStars) || 6));

        // Sorteio ponderado das estrelas (estrelas mais altas são mais raras)
        const possibleStars = [];
        for (let s = minS; s <= maxS; s++) {
            // Peso: 3★ = 45, 4★ = 30, 5★ = 18, 6★ = 7
            const weights = { 3: 45, 4: 30, 5: 18, 6: 7 };
            const weight = weights[s] || 10;
            for (let w = 0; w < weight; w++) {
                possibleStars.push(s);
            }
        }
        const selectedStars = possibleStars[Math.floor(Math.random() * possibleStars.length)] || minS;
        const tierInfo = ARTIFACT_RARITY_TIERS[selectedStars] || ARTIFACT_RARITY_TIERS[3];

        // Determina chave de stat range (ex: hp_flat, atk_pct)
        const rangeKey = `${template.statType}_${template.isPercent ? 'pct' : 'flat'}`;
        const ranges = ARTIFACT_STAT_RANGES[selectedStars][rangeKey] || { min: 10, max: 20, step: 1 };

        // Sorteia valor dentro do min e max
        const steps = Math.floor((ranges.max - ranges.min) / ranges.step);
        const randomSteps = Math.floor(Math.random() * (steps + 1));
        let rolledValue = ranges.min + (randomSteps * ranges.step);
        rolledValue = template.isPercent ? Number(rolledValue.toFixed(1)) : Math.round(rolledValue);

        const statLabel = template.statType.toUpperCase();
        const displayValue = template.isPercent ? `+${rolledValue}% ${statLabel}` : `+${rolledValue} ${statLabel}`;

        const uniqueId = `art_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        return {
            id: uniqueId,
            baseId: template.baseId,
            name: template.name,
            type: template.type,
            slotLabel: template.slotLabel,
            asset: template.asset,
            stars: selectedStars,
            rarity: tierInfo.rarity,
            rarityLabel: tierInfo.label,
            rarityColor: tierInfo.color,
            statType: template.statType,
            statName: template.statName,
            isPercent: template.isPercent,
            value: rolledValue,
            displayValue: displayValue,
            lore: template.lore,
            sourceChapterId: options.chapterId !== undefined ? options.chapterId : null,
            obtainedAt: Date.now()
        };
    }

    /**
     * Retorna o SVG de estrela preenchida ou vazia (sem emojis, padrão profissional)
     */
    static getStarSvg(isFilled = true) {
        return isFilled
            ? `<svg class="star-filled" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
            : `<svg class="star-empty" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
    }

    /**
     * Retorna a string HTML com 6 estrelas
     */
    static renderStarsHtml(count = 3, maxStars = 6) {
        return Array.from({ length: maxStars }, (_, i) => this.getStarSvg(i < count)).join('');
    }
}

if (typeof window !== 'undefined') {
    window.ARTIFACTS_CATALOG = ARTIFACTS_CATALOG;
    window.ARTIFACT_RARITY_TIERS = ARTIFACT_RARITY_TIERS;
    window.ARTIFACT_STAT_RANGES = ARTIFACT_STAT_RANGES;
    window.MAX_ARTIFACTS_PER_TYPE = MAX_ARTIFACTS_PER_TYPE;
    window.MAX_TOTAL_ARTIFACTS = MAX_TOTAL_ARTIFACTS;
    window.ArtifactsManager = ArtifactsManager;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ARTIFACTS_CATALOG,
        ARTIFACT_RARITY_TIERS,
        ARTIFACT_STAT_RANGES,
        MAX_ARTIFACTS_PER_TYPE,
        MAX_TOTAL_ARTIFACTS,
        ArtifactsManager
    };
}
