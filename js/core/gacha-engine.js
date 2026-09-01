/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — GACHA ENGINE (CONVOCAÇÃO ARCANA)
   ═══════════════════════════════════════════════════════════════ */

class GachaEngine {
    constructor() {
        this.SINGLE_PULL_COST = 80;  // 80 Tokens por 1 invocação (acessível)
        this.MULTI_PULL_COUNT = 5;   // 5 invocações no multi-pull
        this.MULTI_PULL_COST = 350;  // 350 Tokens (com super desconto de 50 tokens)
    }

    /**
     * Retorna a lista de avatares sorteáveis (02 ao 24)
     */
    getPool() {
        return Object.values(AVATAR_SKILLS_DATA).filter(av => !av.teacherOnly);
    }

    /**
     * Realiza 1 invocação calculando probabilidade e pity counter
     * @param {Object} userGachaState { pityCounter: number, totalPulls: number }
     */
    pullSingle(userGachaState = { pityCounter: 0, totalPulls: 0 }) {
        const pool = this.getPool();
        userGachaState.pityCounter = (userGachaState.pityCounter || 0) + 1;
        userGachaState.totalPulls = (userGachaState.totalPulls || 0) + 1;

        let guaranteedRarity = null;
        // Pity: a cada 15 pulls garante RARO ou superior; a cada 30 garante ÉPICO ou LENDÁRIO
        if (userGachaState.pityCounter >= 30) {
            guaranteedRarity = Math.random() < 0.3 ? 'LEGENDARY' : 'EPIC';
            userGachaState.pityCounter = 0;
        } else if (userGachaState.pityCounter % 10 === 0) {
            guaranteedRarity = 'RARE';
        }

        let selectedRarity = guaranteedRarity;
        if (!selectedRarity) {
            const rand = Math.random() * 100;
            if (rand < AVATAR_RARITIES.LEGENDARY.weight) {
                selectedRarity = 'LEGENDARY';
                userGachaState.pityCounter = 0; // Reset pity no drop lendário
            } else if (rand < (AVATAR_RARITIES.LEGENDARY.weight + AVATAR_RARITIES.EPIC.weight)) {
                selectedRarity = 'EPIC';
            } else if (rand < (AVATAR_RARITIES.LEGENDARY.weight + AVATAR_RARITIES.EPIC.weight + AVATAR_RARITIES.RARE.weight)) {
                selectedRarity = 'RARE';
            } else {
                selectedRarity = 'COMMON';
            }
        }

        // Filtra os avatares pertencentes à raridade selecionada
        const availableInRarity = pool.filter(av => av.rarity === selectedRarity);
        const pickedAvatar = availableInRarity[Math.floor(Math.random() * availableInRarity.length)];

        return {
            avatar: pickedAvatar,
            rarityInfo: AVATAR_RARITIES[selectedRarity],
            pityCounter: userGachaState.pityCounter,
            totalPulls: userGachaState.totalPulls
        };
    }

    /**
     * Executa a invocação múltipla de 5 avatares
     */
    pullMulti(userGachaState = { pityCounter: 0, totalPulls: 0 }) {
        const results = [];
        for (let i = 0; i < this.MULTI_PULL_COUNT; i++) {
            results.push(this.pullSingle(userGachaState));
        }
        return {
            results,
            userGachaState
        };
    }

    /**
     * Aplica o resultado da invocação no inventário e perfil do usuário
     * @param {Array} pullsArray Array de objetos retornados por pullSingle
     * @param {Array} currentUnlockedAvatars Lista de IDs já desbloqueados (ex: ['01', '02'])
     */
    processPulls(pullsArray, currentUnlockedAvatars = ['02']) {
        let totalXpGained = 0;
        const newUnlocks = [];
        const processedResults = [];

        pullsArray.forEach(item => {
            const avId = item.avatar.id;
            const isDuplicate = currentUnlockedAvatars.includes(avId) || newUnlocks.includes(avId);

            if (isDuplicate) {
                const xpGain = item.rarityInfo.duplicateXp || 150;
                const tokenCashback = item.avatar.rarity === 'LEGENDARY' ? 80 : (item.avatar.rarity === 'EPIC' ? 40 : (item.avatar.rarity === 'RARE' ? 25 : 15));
                totalXpGained += xpGain;
                
                // Cashback direto em Tokens na duplicata
                if (window.app && window.app.engine && typeof window.app.engine.addTokens === 'function') {
                    window.app.engine.addTokens(tokenCashback);
                }

                processedResults.push({
                    ...item,
                    isDuplicate: true,
                    duplicateXp: xpGain,
                    duplicateTokens: tokenCashback
                });
            } else {
                newUnlocks.push(avId);
                processedResults.push({
                    ...item,
                    isDuplicate: false,
                    duplicateXp: 0
                });
            }
        });

        return {
            processedResults,
            newUnlocks,
            totalXpGained
        };
    }
}

window.gachaEngine = new GachaEngine();
