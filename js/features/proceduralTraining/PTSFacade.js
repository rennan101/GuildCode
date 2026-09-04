/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — PROCEDURAL TRAINING SYSTEM (PTS)
   PTSFacade: Ponto de Entrada Global e Singleton
   ═══════════════════════════════════════════════════════════════ */

if (typeof require !== 'undefined') {
    if (typeof CurriculumGraph === 'undefined') CurriculumGraph = require('./content/CurriculumGraph.js').CurriculumGraph;
    if (typeof ActivityGenerator === 'undefined') ActivityGenerator = require('./core/ActivityGenerator.js').ActivityGenerator;
    if (typeof ActivityValidator === 'undefined') ActivityValidator = require('./core/ActivityValidator.js');
    if (typeof BossDifficultyConfig === 'undefined') BossDifficultyConfig = require('./boss/BossTrainingManager.js').BossDifficultyConfig;
    if (typeof DifficultyEngine === 'undefined') DifficultyEngine = require('./core/DifficultyEngine.js').DifficultyEngine;
    if (typeof TopicSelector === 'undefined') TopicSelector = require('./core/TopicSelector.js').TopicSelector;
    if (typeof MasteryEngine === 'undefined') MasteryEngine = require('./learning/MasteryEngine.js').MasteryEngine;
    if (typeof TrainingOrchestrator === 'undefined') TrainingOrchestrator = require('./core/TrainingOrchestrator.js').TrainingOrchestrator;
    if (typeof BossTrainingManager === 'undefined') BossTrainingManager = require('./boss/BossTrainingManager.js').BossTrainingManager;
    if (typeof PTSRepositories === 'undefined') PTSRepositories = require('./persistence/PTSRepositories.js');
    if (typeof PlayerLearningProfile === 'undefined') PlayerLearningProfile = require('./learning/PlayerLearningProfile.js');
}

class PTSFacade {
    constructor() {
        this.curriculumGraph = new CurriculumGraph();
        this.generator = new ActivityGenerator(this.curriculumGraph);
        this.validator = new ActivityValidator(this.curriculumGraph);
        this.difficultyConfig = new BossDifficultyConfig();
        this.difficultyEngine = new DifficultyEngine(this.difficultyConfig);
        this.topicSelector = new TopicSelector(this.curriculumGraph);
        this.masteryEngine = new MasteryEngine();

        this.orchestrator = new TrainingOrchestrator({
            curriculumGraph: this.curriculumGraph,
            generator: this.generator,
            validator: this.validator,
            difficultyEngine: this.difficultyEngine,
            topicSelector: this.topicSelector,
            masteryEngine: this.masteryEngine
        });

        this.bossTrainingManager = new BossTrainingManager({
            orchestrator: this.orchestrator,
            difficultyConfig: this.difficultyConfig
        });

        this.repositories = new PTSRepositories();
    }

    /**
     * Obtém uma atividade procedural para o Boss Raid ou Abismo
     */
    generateChallenge(chapterId, playerProfile = null) {
        const isCSharp = (typeof app !== 'undefined' && app.engine && app.engine.state && app.engine.state.worldId === 'csharp_unity') ||
                         (typeof authManager !== 'undefined' && authManager.userData && authManager.userData.worldId === 'csharp_unity');
        
        if (isCSharp && typeof CurriculumGraphCS !== 'undefined' && !(this.curriculumGraph instanceof CurriculumGraphCS)) {
            this.curriculumGraph = new CurriculumGraphCS();
            this.generator = new ActivityGenerator(this.curriculumGraph);
            this.validator = new ActivityValidator(this.curriculumGraph);
            this.topicSelector = new TopicSelector(this.curriculumGraph);
            this.orchestrator = new TrainingOrchestrator({
                curriculumGraph: this.curriculumGraph,
                generator: this.generator,
                validator: this.validator,
                difficultyEngine: this.difficultyEngine,
                topicSelector: this.topicSelector,
                masteryEngine: this.masteryEngine
            });
        }

        const profile = playerProfile || new PlayerLearningProfile('local_player');
        return this.orchestrator.generateActivity({
            playerProfile: profile,
            targetFloor: Number(chapterId) || 0,
            completedTopics: []
        });
    }
}

if (typeof window !== 'undefined') {
    window.PTS = new PTSFacade();
}
if (typeof module !== 'undefined') {
    module.exports = PTSFacade;
}
