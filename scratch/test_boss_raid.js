const fs = require('fs');
const path = require('path');
const assert = require('assert');

// Mock browser globals
global.window = global;

// Load files
require('../js/features/bossRaid/constants/raid-constants.js');
require('../js/features/bossRaid/data/bosses.js');
require('../js/features/bossRaid/data/raid-challenges.js');
require('../js/features/bossRaid/engine/combat-formulas.js');
require('../js/features/bossRaid/engine/turn-engine.js');
require('../js/features/bossRaid/engine/boss-ai.js');
require('../js/features/bossRaid/engine/raid-challenge-engine.js');
require('../js/core/avatars-skills.js');

console.log('=== TEST 1: AVATARS SKILLS DATA (24 AVATARS) ===');
const avatars = Object.keys(AVATAR_SKILLS_DATA);
assert.strictEqual(avatars.length, 24, 'Deve conter exatamente 24 avatares');
avatars.forEach(id => {
    const av = AVATAR_SKILLS_DATA[id];
    assert(av.baseHp >= 500 && av.baseHp <= 1500, `Avatar ${id} baseHp inválido: ${av.baseHp}`);
    assert(av.baseAttack >= 90 && av.baseAttack <= 230, `Avatar ${id} baseAttack inválido: ${av.baseAttack}`);
    assert(av.baseDefense >= 60 && av.baseDefense <= 150, `Avatar ${id} baseDefense inválido: ${av.baseDefense}`);
    assert(av.baseSpeed >= 70 && av.baseSpeed <= 150, `Avatar ${id} baseSpeed inválido: ${av.baseSpeed}`);
});
console.log('✓ 24 Avatares verificados com sucesso com todos os atributos base.');

console.log('=== TEST 2: COMBAT FORMULAS (SEÇÕES 14 e 15) ===');
// Code Power multipliers
assert.strictEqual(CombatFormulas.getCodePowerHpMultiplier(1000), 1.0);
assert.strictEqual(CombatFormulas.getCodePowerCombatMultiplier(1000), 1.0);
assert(CombatFormulas.getCodePowerCombatMultiplier(5000) > 1.0);
assert(CombatFormulas.getCodePowerCombatMultiplier(50000) <= 1.50, 'Max CP bonus deve ser +50%');

// Player stats
const testPlayer = { level: 5, codePower: 1200, subclass: 'hardcoder' };
const testAvatar = AVATAR_SKILLS_DATA['02']; // Neon Coder
const stats = CombatFormulas.calculatePlayerStats(testPlayer, testAvatar);
assert(stats.maxHp > testAvatar.baseHp, 'HP deve escalar com nível');
assert(stats.attack > testAvatar.baseAttack, 'Ataque deve escalar com nível e bônus hardcoder');
assert(stats.speed > testAvatar.baseSpeed, 'Velocidade deve escalar com nível e bônus hardcoder');

// Damage and Defense Reduction
const attacker = { attack: 150 };
const defender = { defense: 100 };
// defenseReduction = 100 / (100 + 100) = 0.50 (50%)
const dmg = CombatFormulas.calculateDamage(attacker, defender, 1.0);
assert.strictEqual(dmg.defenseReduction, 0.5);
assert.strictEqual(dmg.finalDamage, 75);

// Contra-Golpe (Dano Crítico 2.0x)
const normalDmg = CombatFormulas.calculateDamage(attacker, defender, 1.0).finalDamage;
const counterDmg = CombatFormulas.calculateDamage(attacker, defender, RAID_ACTION_MULTIPLIERS.counter).finalDamage;
assert.strictEqual(counterDmg, normalDmg * 2, 'Contra-golpe deve causar exatamente o dobro de dano (crítico)');
console.log('✓ Fórmulas matemáticas de combate e Contra-Golpe (2.0x dano) validadas com sucesso.');

console.log('=== TEST 3: BOSS DATA & SCALING (CAPÍTULOS 0 a 15) ===');
const allBosses = BossDataManager.getAllBosses();
assert.strictEqual(allBosses.length, 16, 'Deve haver exatamente 16 bosses (0 a 15)');
for (let ch = 0; ch <= 15; ch++) {
    const b = BossDataManager.getBossByChapter(ch);
    assert(b, `Boss do capítulo ${ch} não encontrado`);
    assert.strictEqual(b.chapterId, ch);
    assert(fs.existsSync(path.join(__dirname, '..', b.spriteUrl)), `Sprite ${b.spriteUrl} não encontrado`);
    
    // Scaling test: 1 player vs 4 players
    const stats1 = BossDataManager.calculateBossStats(b, 1, b.recommendedLevel);
    const stats4 = BossDataManager.calculateBossStats(b, 4, b.recommendedLevel);
    assert(stats4.maxHp > stats1.maxHp, 'HP deve ser maior com 4 jogadores');
    // Multiplicador com 4 jogadores deve ser ~2.95x (1 + 3 * 0.65)
    assert(stats4.maxHp >= Math.round(b.baseHp * 2.9), 'Scaling de 4 jogadores deve ser ~2.95x');
}
console.log('✓ 16 Bosses verificados e testados com escalonamento de party de 1 a 4 jogadores.');

console.log('=== TEST 4: TURN ENGINE SIMULTANEOUS PHASES ===');
const te = new TurnEngine();
const boss = { id: 'boss', name: 'Boss', speed: 80 };
const pFast = { uid: 'p1', name: 'Flash', speed: 120 };
const pSlow = { uid: 'p2', name: 'Tank', speed: 60 };
const phaseState = te.init(boss, [pFast, pSlow]);
assert.strictEqual(phaseState.phase, 'PARTY', 'Fase inicial deve ser PARTY');
assert.strictEqual(phaseState.round, 1, 'Rodada inicial deve ser 1');
const timeline = te.previewTimeline(6);
assert.strictEqual(timeline.length, 6, 'Timeline deve prever 6 fases/turnos futuros');
console.log('✓ Motor de fases simultâneas validado com sucesso.');

console.log('=== TEST 5: BOSS AI TARGETING (SEÇÃO 10) ===');
const party = [
    { uid: 'p1', combatStatus: 'ACTIVE' },
    { uid: 'p2', combatStatus: 'ACTIVE' },
    { uid: 'p3', combatStatus: 'ACTIVE' }
];
const bossAtk = BossAI.decideAttack(allBosses[0], party);
assert(bossAtk.targets.length >= 1 && bossAtk.targets.length <= 3);
assert(bossAtk.multiplier > 0);
console.log('✓ IA de seleção de alvos e multiplicadores validada com sucesso.');

console.log('=== TEST 6: RAID CHALLENGES (SEÇÃO 9) ===');
const ce = new RaidChallengeEngine();
const ch1 = RAID_CHALLENGES[0].attack[0]; // ch0_atk_1
ce.currentChallenge = ch1;
const validResult = ce.validateSubmission('#include <stdio.h>\nint main() {\n    printf("DISPARO ARCANO\\n");\n    return 0;\n}');
assert.strictEqual(validResult.status, 'HIT');
const missResult = ce.validateSubmission('int main() { return 0; }');
assert.strictEqual(missResult.status, 'MISS');
console.log('✓ Motor de desafios de código em C validado com sucesso.');

console.log('\n========================================');
console.log('TODOS OS 6 TESTES DE SANIDADE PASSARAM COM 100% DE SUCESSO!');
console.log('========================================\n');
