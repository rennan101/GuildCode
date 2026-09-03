/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — PROCEDURAL TRAINING SYSTEM (PTS)
   TopicSelector: Seleção Adaptativa de Tópicos e Conceitos
   ═══════════════════════════════════════════════════════════════ */

const PTS_SELECTION_WEIGHTS = {
    weakConcepts: 0.40,        // 40% -> conceitos fracos (mastery < 0.50)
    developingConcepts: 0.30,  // 30% -> conceitos em desenvolvimento (0.50 a 0.69)
    masteredConcepts: 0.20,    // 20% -> conceitos dominados (0.70 a 0.84)
    spacedReview: 0.10          // 10% -> revisão espaçada / consolidada (0.85+)
};

class TopicSelector {
    constructor(curriculumGraph, weights = PTS_SELECTION_WEIGHTS) {
        this.graph = curriculumGraph;
        this.weights = { ...PTS_SELECTION_WEIGHTS, ...weights };
    }

    /**
     * Categoriza os conceitos disponíveis do jogador
     * @param {PlayerLearningProfile} playerProfile 
     * @param {Array<string>} completedTopics 
     */
    categorizeConcepts(playerProfile, completedTopics = []) {
        const allowedConcepts = this.graph.getAllowedConcepts(completedTopics);
        const categories = {
            weak: [],
            developing: [],
            mastered: [],
            review: []
        };

        allowedConcepts.forEach(c => {
            const data = playerProfile.getConceptData(c);
            const mastery = data.mastery || 0;

            if (mastery < 0.50) {
                categories.weak.push(c);
            } else if (mastery < 0.70) {
                categories.developing.push(c);
            } else if (mastery < 0.85) {
                categories.mastered.push(c);
            } else {
                categories.review.push(c);
            }
        });

        return categories;
    }

    /**
     * Seleciona o conceito e tópico alvo usando probabilidades adaptativas determinísticas
     * @param {PlayerLearningProfile} playerProfile 
     * @param {Array<string>} completedTopics 
     * @param {SeededRandom} rng 
     * @param {number} targetFloor - Andar opcional focado (ex: no Boss do andar)
     */
    selectTargetConcept(playerProfile, completedTopics = [], rng, targetFloor = null) {
        // Se um andar específico foi passado, filtra conceitos permitidos daquele andar
        let floorConcepts = null;
        if (targetFloor !== null && targetFloor !== undefined) {
            const floorData = this.graph.getFloor(targetFloor);
            if (floorData) {
                floorConcepts = floorData.concepts;
            }
        }

        const categories = this.categorizeConcepts(playerProfile, completedTopics);

        if (floorConcepts) {
            categories.weak = categories.weak.filter(c => floorConcepts.includes(c));
            categories.developing = categories.developing.filter(c => floorConcepts.includes(c));
            categories.mastered = categories.mastered.filter(c => floorConcepts.includes(c));
            categories.review = categories.review.filter(c => floorConcepts.includes(c));
        }

        const roll = rng ? rng.next() : Math.random();
        let chosenPool = [];

        if (roll < this.weights.weakConcepts && categories.weak.length > 0) {
            chosenPool = categories.weak;
        } else if (roll < (this.weights.weakConcepts + this.weights.developingConcepts) && categories.developing.length > 0) {
            chosenPool = categories.developing;
        } else if (roll < (this.weights.weakConcepts + this.weights.developingConcepts + this.weights.masteredConcepts) && categories.mastered.length > 0) {
            chosenPool = categories.mastered;
        } else if (categories.review.length > 0) {
            chosenPool = categories.review;
        }

        // Fallback para qualquer categoria não vazia
        if (chosenPool.length === 0) {
            chosenPool = [...categories.weak, ...categories.developing, ...categories.mastered, ...categories.review];
        }

        if (chosenPool.length === 0) {
            // Se ainda assim estiver vazio, pega o primeiro conceito do andar ou da base
            const defaultFloor = this.graph.getFloor(targetFloor || 0);
            return {
                concept: defaultFloor ? defaultFloor.concepts[0] : 'printf',
                topic: defaultFloor ? defaultFloor.id : 'estrutura_basica_io'
            };
        }

        const selectedConcept = rng ? rng.choice(chosenPool) : chosenPool[0];
        
        // Encontra o tópico correspondente ao conceito selecionado
        let chosenTopic = 'estrutura_basica_io';
        for (const fKey in this.graph.floors) {
            const floor = this.graph.floors[fKey];
            if (floor.concepts.includes(selectedConcept)) {
                chosenTopic = floor.id;
                break;
            }
        }

        return {
            concept: selectedConcept,
            topic: chosenTopic
        };
    }
}

if (typeof module !== 'undefined') {
    module.exports = {
        PTS_SELECTION_WEIGHTS,
        TopicSelector
    };
}
if (typeof window !== 'undefined') {
    window.PTS_SELECTION_WEIGHTS = PTS_SELECTION_WEIGHTS;
    window.TopicSelector = TopicSelector;
}
