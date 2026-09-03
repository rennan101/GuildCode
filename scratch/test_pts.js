/* ═══════════════════════════════════════════════════════════════
   TESTE UNITÁRIO E DE INTEGRAÇÃO — PROCEDURAL TRAINING SYSTEM (PTS)
   ═══════════════════════════════════════════════════════════════ */

const assert = require('assert');

const SeededRandom = require('../js/features/proceduralTraining/core/SeededRandom.js');
const { CurriculumGraph, CURRICULUM_FLOORS } = require('../js/features/proceduralTraining/content/CurriculumGraph.js');
const { DifficultyEngine } = require('../js/features/proceduralTraining/core/DifficultyEngine.js');
const { LearningEvents } = require('../js/features/proceduralTraining/learning/LearningEvents.js');
const { MasteryEngine } = require('../js/features/proceduralTraining/learning/MasteryEngine.js');
const PlayerLearningProfile = require('../js/features/proceduralTraining/learning/PlayerLearningProfile.js');
const { TopicSelector } = require('../js/features/proceduralTraining/core/TopicSelector.js');
const ActivityValidator = require('../js/features/proceduralTraining/core/ActivityValidator.js');
const { ActivityGenerator } = require('../js/features/proceduralTraining/core/ActivityGenerator.js');
const { TrainingOrchestrator } = require('../js/features/proceduralTraining/core/TrainingOrchestrator.js');
const { BossDifficultyConfig, BossTrainingManager } = require('../js/features/proceduralTraining/boss/BossTrainingManager.js');
const PTSFacade = require('../js/features/proceduralTraining/PTSFacade.js');

console.log('─── INICIANDO BATERIA DE TESTES DO PTS ───');

// 1. Teste de Determinismo com SeededRandom
console.log('1. Testando Determinismo do SeededRandom...');
const rng1 = new SeededRandom(12345);
const rng2 = new SeededRandom(12345);
const seq1 = [rng1.next(), rng1.nextInt(1, 100), rng1.choice(['A', 'B', 'C', 'D'])];
const seq2 = [rng2.next(), rng2.nextInt(1, 100), rng2.choice(['A', 'B', 'C', 'D'])];
assert.deepStrictEqual(seq1, seq2, 'A mesma seed deve produzir exatamente a mesma sequência');
console.log('✓ Determinismo validado com sucesso!');

// 2. Teste do Grafo Curricular e Pré-requisitos
console.log('2. Testando Grafo Curricular e Pré-requisitos...');
const graph = new CurriculumGraph();
assert.strictEqual(graph.isUnlocked(0), true, 'Piso 00 deve estar desbloqueado sem pré-requisitos');
assert.strictEqual(graph.isUnlocked(1, []), false, 'Piso 01 requer Piso 00');
assert.strictEqual(graph.isUnlocked(1, ['estrutura_basica_io']), true, 'Piso 01 desbloqueia com Piso 00');
console.log('✓ Grafo Curricular validado com sucesso!');

// 3. Teste de Geração e Validação de Atividades
console.log('3. Testando Geração e Validação de Atividades...');
const generator = new ActivityGenerator(graph);
const validator = new ActivityValidator(graph);
const diffEngine = new DifficultyEngine({ bossDifficulty: 'medium' });
const topicSelector = new TopicSelector(graph);
const masteryEngine = new MasteryEngine();

const orchestrator = new TrainingOrchestrator({
    curriculumGraph: graph,
    generator,
    validator,
    difficultyEngine: diffEngine,
    topicSelector,
    masteryEngine
});

const profile = new PlayerLearningProfile('player_test_01');
const act1 = orchestrator.generateActivity({
    playerProfile: profile,
    seed: 998877,
    targetFloor: 0,
    stage: 1
});

assert.ok(act1.id, 'Atividade deve conter ID');
assert.ok(act1.starterCode, 'Atividade deve conter starterCode');
assert.ok(act1.tests.length > 0, 'Atividade deve conter ao menos um teste');
assert.strictEqual(act1.seed, 998877, 'Seed deve ser preservada');

// Validação estrutural e pedagógica
const structRes = validator.validateStructure(act1);
assert.strictEqual(structRes.valid, true, 'Estrutura deve ser válida');
const pedRes = validator.validatePedagogy(act1);
assert.strictEqual(pedRes.valid, true, 'Pedagogia deve ser válida');
console.log('✓ Atividade gerada e validada com sucesso:', act1.title);

// 4. Teste de Submissão, Evento de Aprendizado e Mastery Score
console.log('4. Testando Learning Events e Mastery Score...');
const submissionRes = orchestrator.processSubmission({
    sessionId: 'test_session',
    playerProfile: profile,
    activity: act1,
    code: act1.referenceSolutionCode,
    execResult: { errors: [] },
    validatorResult: { pass: true },
    attempts: 1,
    timeMs: 25000,
    hintsUsed: 0
});

assert.strictEqual(submissionRes.isCorrect, true);
assert.ok(submissionRes.event.eventId, 'Evento gerado com ID único');
assert.strictEqual(profile.totalCorrect, 1);
const conceptData = profile.getConceptData(act1.concepts[0]);
assert.ok(conceptData.mastery > 0, 'Mastery Score deve aumentar após acerto');
console.log(`✓ Mastery Score atualizado para o conceito "${act1.concepts[0]}": ${conceptData.mastery}`);

// 5. Teste do Gerenciador de Boss Battle e Fases Pedagógicas
console.log('5. Testando BossTrainingManager (Fases 1 a 5)...');
const bossConfig = new BossDifficultyConfig({ bossDifficulty: 'hard' });
const bossManager = new BossTrainingManager({ orchestrator, difficultyConfig: bossConfig });

const session = bossManager.startBossSession({ playerId: 'player_test_01', chapterId: 0 });
assert.strictEqual(session.currentStage, 1);
assert.strictEqual(session.totalStages, 5);

const stage1Act = bossManager.getNextStageActivity(session.sessionId, profile);
assert.strictEqual(stage1Act.stageInfo.stageNumber, 1);
assert.strictEqual(stage1Act.stageInfo.stageName, 'Aquecimento');

bossManager.advanceStage(session.sessionId, true);
assert.strictEqual(session.currentStage, 2);
console.log('✓ Boss Battle e progressão de fases validados!');

// 6. Teste do Facade Geral PTS
console.log('6. Testando Facade Global PTS...');
const pts = new PTSFacade();
const generated = pts.generateChallenge(0);
assert.ok(generated.id);
console.log(`✓ PTSFacade gerou com sucesso: "${generated.title}"`);

console.log('\n========================================');
console.log('TODOS OS 6 TESTES DO PTS PASSARAM COM SUCESSO!');
console.log('========================================\n');
