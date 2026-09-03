/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — PROCEDURAL TRAINING SYSTEM (PTS)
   TrainingOrchestrator: Pipeline Principal de 20 Passos e Geração Segura
   ═══════════════════════════════════════════════════════════════ */

if (typeof require !== 'undefined') {
    if (typeof SeededRandom === 'undefined') {
        SeededRandom = require('./SeededRandom.js');
    }
    if (typeof LearningEvents === 'undefined') {
        LearningEvents = require('../learning/LearningEvents.js').LearningEvents || require('../learning/LearningEvents.js');
    }
}

const MAX_GENERATION_ATTEMPTS = 5;

class TrainingOrchestrator {
    constructor({
        curriculumGraph,
        generator,
        validator,
        difficultyEngine,
        topicSelector,
        masteryEngine
    }) {
        this.graph = curriculumGraph;
        this.generator = generator;
        this.validator = validator;
        this.difficultyEngine = difficultyEngine;
        this.topicSelector = topicSelector;
        this.masteryEngine = masteryEngine;

        // Métricas internas de observabilidade (Seção 43)
        this.metrics = {
            totalGenerations: 0,
            generationSuccesses: 0,
            generationRetries: 0,
            validationFailures: 0,
            cacheHits: 0
        };

        this.cache = new Map();
    }

    /**
     * Pipeline de geração de atividade segura (Seções 3, 23, 24, 25, 26)
     * @param {Object} options
     * @param {PlayerLearningProfile} options.playerProfile
     * @param {Array<string>} options.completedTopics
     * @param {number|string} options.seed
     * @param {number} options.targetFloor
     * @param {number} options.stage
     */
    generateActivity({
        playerProfile,
        completedTopics = [],
        seed = null,
        targetFloor = null,
        stage = 1
    }) {
        this.metrics.totalGenerations++;
        const initialSeed = seed !== null && seed !== undefined ? seed : Math.floor(Math.random() * 1000000);
        let currentSeed = initialSeed;

        for (let attempt = 1; attempt <= MAX_GENERATION_ATTEMPTS; attempt++) {
            const rng = new SeededRandom(currentSeed);

            // 1. Identificar conceitos e tópicos alvo
            const { concept, topic } = this.topicSelector.selectTargetConcept(
                playerProfile,
                completedTopics,
                rng,
                targetFloor
            );

            // 2. Resolver dificuldade permitida
            const conceptData = playerProfile.getConceptData(concept);
            const resolvedDifficulty = this.difficultyEngine.resolveActivityDifficulty(
                conceptData.mastery,
                stage
            );

            // 3. Verificar Cache
            const cacheKey = `${this.generator.generatorVersion}_${topic}_${resolvedDifficulty}_${currentSeed}`;
            if (this.cache.has(cacheKey)) {
                this.metrics.cacheHits++;
                return this.cache.get(cacheKey);
            }

            // 4. Gerar Atividade com o Template e Parâmetros
            const activity = this.generator.generate({
                topic,
                concept,
                difficulty: resolvedDifficulty,
                seed: currentSeed,
                playerProfile
            });

            // 5. Validação Estrutural
            const structCheck = this.validator.validateStructure(activity);
            if (!structCheck.valid) {
                this.metrics.validationFailures++;
                this.metrics.generationRetries++;
                currentSeed = rng.nextInt(1, 9999999);
                continue;
            }

            // 6. Validação Pedagógica
            const allowedConcepts = this.graph.getAllowedConcepts(completedTopics);
            const pedCheck = this.validator.validatePedagogy(activity, allowedConcepts);
            if (!pedCheck.valid) {
                this.metrics.validationFailures++;
                this.metrics.generationRetries++;
                currentSeed = rng.nextInt(1, 9999999);
                continue;
            }

            // 7. Validação Executável
            const execCheck = this.validator.validateExecutable(activity, activity.referenceSolutionCode);
            if (!execCheck.valid) {
                this.metrics.validationFailures++;
                this.metrics.generationRetries++;
                currentSeed = rng.nextInt(1, 9999999);
                continue;
            }

            // 8. Validação Anti-repetição
            if (playerProfile.isTooSimilar(activity.templateId, activity.paramHash)) {
                this.metrics.generationRetries++;
                currentSeed = rng.nextInt(1, 9999999);
                continue;
            }

            // Atividade Aprovada!
            this.metrics.generationSuccesses++;
            playerProfile.recordTemplateUse(activity.templateId, activity.paramHash);
            this.cache.set(cacheKey, activity);

            return activity;
        }

        // Se exceder MAX_GENERATION_ATTEMPTS sem sucesso, encerra com erro controlado (Seção 3.3)
        throw new Error(`[PTS] Falha na geração: Limite de ${MAX_GENERATION_ATTEMPTS} tentativas atingido sem gerar atividade válida para o piso ${targetFloor}.`);
    }

    /**
     * Processa a submissão do jogador e atualiza o estado de aprendizado
     */
    processSubmission({
        sessionId,
        playerProfile,
        activity,
        code,
        execResult,
        validatorResult,
        attempts = 1,
        timeMs = 0,
        hintsUsed = 0
    }) {
        const isCorrect = (validatorResult && validatorResult.pass) || false;
        const errorType = isCorrect ? null : LearningEvents.classifyError(execResult, validatorResult, code);

        const event = LearningEvents.createEvent({
            sessionId,
            playerId: playerProfile.playerId,
            activityId: activity.id,
            generatorVersion: activity.generatorVersion,
            seed: activity.seed,
            topic: activity.topic,
            concepts: activity.concepts,
            difficulty: activity.difficulty,
            result: isCorrect,
            attempts,
            timeMs,
            hintsUsed,
            errorType,
            compilerErrors: execResult?.errors || [],
            runtimeErrors: execResult?.runtimeErrors || []
        });

        // Atualiza o perfil pedagógico com o Learning Event
        playerProfile.recordAttempt(event, this.masteryEngine);

        return {
            event,
            isCorrect,
            playerMastery: playerProfile.getConceptData(activity.concepts[0])?.mastery || 0
        };
    }
}

if (typeof module !== 'undefined') {
    module.exports = {
        MAX_GENERATION_ATTEMPTS,
        TrainingOrchestrator
    };
}
if (typeof window !== 'undefined') {
    window.MAX_GENERATION_ATTEMPTS = MAX_GENERATION_ATTEMPTS;
    window.TrainingOrchestrator = TrainingOrchestrator;
}
