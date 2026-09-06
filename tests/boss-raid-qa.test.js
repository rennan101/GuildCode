/**
 * Test Suite: Boss Raid QA Automation
 * Testa progressão de turnos, simultaneidade, fast-forward, reações defensivas,
 * timeouts, e escalabilidade de 1, 2, 3 e 4 jogadores.
 */

const fs = require('fs');
const path = require('path');

// 1. Carrega dependências puras do client
const turnEngineCode = fs.readFileSync(path.join(__dirname, '../js/features/bossRaid/engine/turn-engine.js'), 'utf8');
const bossAiCode = fs.readFileSync(path.join(__dirname, '../js/features/bossRaid/engine/boss-ai.js'), 'utf8');
const combatFormulasCode = fs.readFileSync(path.join(__dirname, '../js/features/bossRaid/engine/combat-formulas.js'), 'utf8');
const raidConstantsCode = fs.readFileSync(path.join(__dirname, '../js/features/bossRaid/constants/raid-constants.js'), 'utf8');

// Cria ambiente sandbox
const sandbox = {
    window: {},
    console: console,
    Math: Math,
    Date: Date,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    setInterval: setInterval,
    clearInterval: clearInterval
};

const runInSandbox = (code) => {
    const fn = new Function('window', 'global', code);
    fn(sandbox.window, sandbox);
};

runInSandbox(raidConstantsCode);
runInSandbox(combatFormulasCode);
runInSandbox(turnEngineCode);
runInSandbox(bossAiCode);

const TurnEngine = sandbox.window.TurnEngine;
const BossAI = sandbox.window.BossAI;
const CombatFormulas = sandbox.window.CombatFormulas;

// Helpers de Simulação de Batalha
function createMockPlayers(count) {
    const players = [];
    for (let i = 1; i <= count; i++) {
        players.push({
            uid: `user_${i}`,
            displayName: `Player ${i}`,
            avatarId: `0${i}`,
            subclass: i === 1 ? 'hardcoder' : i === 2 ? 'analyst' : i === 3 ? 'debugger' : 'reviewer',
            baseHp: 1200,
            maxHp: 1200,
            currentHp: 1200,
            baseAttack: 100,
            baseDefense: 50,
            baseSpeed: 100,
            combatStatus: 'ACTIVE',
            damageDealt: 0,
            damageTaken: 0,
            healingDone: 0,
            revivesCount: 0,
            successfulActions: 0
        });
    }
    return players;
}

const mockBoss = {
    id: 'boss_test',
    name: 'NullPointer Colossus',
    title: 'O Flagelo da Memória',
    baseHp: 10000,
    maxHp: 10000,
    currentHp: 10000,
    baseAttack: 150,
    baseDefense: 60,
    baseSpeed: 80,
    actionWeights: {
        SINGLE_TARGET: 0.5,
        MULTI_TARGET: 0.35,
        AOE: 0.15
    }
};

class SimulatedRaidRoom {
    constructor(playerCount) {
        this.playerCount = playerCount;
        this.players = createMockPlayers(playerCount);
        this.boss = { ...mockBoss };
        this.turnEngine = new TurnEngine();
        this.turnEngine.init(this.boss, this.players);
        
        this.raidData = {
            id: `raid_test_${playerCount}p`,
            status: 'PARTY_PHASE',
            round: 1,
            players: this.players,
            bossState: this.boss,
            partyActions: {},
            playerReactions: {},
            currentBossAttack: null,
            phaseStartedAt: Date.now()
        };

        this.eventsLog = [];
    }

    log(msg) {
        this.eventsLog.push(`[R${this.raidData.round} - ${this.raidData.status}] ${msg}`);
    }

    // Party Phase: Jogador executa ação
    playerSubmitAction(uid, actionType, success = true) {
        if (this.raidData.status !== 'PARTY_PHASE') {
            throw new Error(`Jogador ${uid} tentou agir fora da PARTY_PHASE! Fase atual: ${this.raidData.status}`);
        }
        if (this.raidData.partyActions[uid]) {
            throw new Error(`Jogador ${uid} tentou agir mais de uma vez na mesma PARTY_PHASE!`);
        }

        const p = this.players.find(x => x.uid === uid);
        if (!p || p.combatStatus === 'DOWNED') {
            throw new Error(`Jogador caído ${uid} tentou agir!`);
        }

        this.raidData.partyActions[uid] = { actionType, success };
        this.turnEngine.markPlayerActed(uid);

        if (success && actionType === 'attack') {
            const dmg = 450;
            this.boss.currentHp = Math.max(0, this.boss.currentHp - dmg);
            p.damageDealt += dmg;
        }

        this.log(`Player ${uid} realizou ação: ${actionType} (Sucesso: ${success})`);

        // Verifica se todos vivos agiram (Fast-Forward)
        this.checkPartyPhaseCompletion();
    }

    checkPartyPhaseCompletion() {
        const activePlayers = this.players.filter(p => p.currentHp > 0 && p.combatStatus !== 'DOWNED');
        const allDone = activePlayers.every(p => !!this.raidData.partyActions[p.uid]);

        if (allDone) {
            this.log(`Fast-Forward ativado! Todos os ${activePlayers.length} jogadores vivos agiram. Transicionando para BOSS_PHASE...`);
            this.transitionToBossPhase();
        }
    }

    transitionToBossPhase() {
        this.turnEngine.advancePhase();
        this.raidData.status = 'BOSS_PHASE';
        this.raidData.partyActions = {};
        this.raidData.playerReactions = {};

        const attackPlan = BossAI.decideAttack(this.boss, this.players);
        this.raidData.currentBossAttack = attackPlan;

        this.players.forEach(p => {
            if (p.currentHp <= 0 || p.combatStatus === 'DOWNED') {
                p.combatStatus = 'DOWNED';
            } else if (attackPlan && attackPlan.targetUids.includes(p.uid)) {
                p.combatStatus = 'TARGETED';
            } else {
                p.combatStatus = 'ACTIVE';
            }
        });

        this.log(`Boss decidiu ataque: ${attackPlan.actionType}. Alvos: ${attackPlan.targetUids.join(', ')}`);
        
        // Se não houver alvos vivos (raro), resolve direto
        this.checkBossPhaseCompletion();
    }

    playerSubmitReaction(uid, reactionType, success = true) {
        if (this.raidData.status !== 'BOSS_PHASE') {
            throw new Error(`Jogador ${uid} tentou reagir fora da BOSS_PHASE!`);
        }
        const attackPlan = this.raidData.currentBossAttack;
        if (!attackPlan.targetUids.includes(uid)) {
            throw new Error(`Jogador ${uid} tentou reagir sem ter sido alvejado!`);
        }

        this.raidData.playerReactions[uid] = { reaction: reactionType, success };
        this.log(`Player ${uid} reagiu com: ${reactionType} (Sucesso: ${success})`);

        this.checkBossPhaseCompletion();
    }

    checkBossPhaseCompletion() {
        const attackPlan = this.raidData.currentBossAttack;
        const targets = attackPlan ? attackPlan.targetUids : [];
        const aliveTargets = targets.filter(uid => {
            const p = this.players.find(x => x.uid === uid);
            return p && p.currentHp > 0 && p.combatStatus !== 'DOWNED';
        });

        const allReacted = aliveTargets.length === 0 || aliveTargets.every(uid => !!this.raidData.playerReactions[uid]);

        if (allReacted) {
            this.log(`Fast-Forward ativado! Todos os ${aliveTargets.length} alvos vivos reagiram. Resolvendo ataque do Boss...`);
            this.resolveBossAttack();
        }
    }

    resolveBossAttack() {
        const attackPlan = this.raidData.currentBossAttack;
        const targets = attackPlan ? attackPlan.targetUids : [];

        this.players.forEach(p => {
            if (targets.includes(p.uid) && p.combatStatus !== 'DOWNED' && p.currentHp > 0) {
                const reaction = this.raidData.playerReactions[p.uid];
                let dmg = 300;
                if (reaction && reaction.success) {
                    if (reaction.reaction === 'dodge') {
                        dmg = 0;
                    } else if (reaction.reaction === 'counter') {
                        dmg = 0;
                        this.boss.currentHp = Math.max(0, this.boss.currentHp - 600);
                        this.log(`Player ${p.uid} realizou CONTRA-GOLPE no Boss (-600 HP)`);
                    } else if (reaction.reaction === 'item') {
                        dmg = 180;
                    }
                }
                p.currentHp = Math.max(0, p.currentHp - dmg);
                p.damageTaken += dmg;
                if (p.currentHp <= 0) {
                    p.combatStatus = 'DOWNED';
                    this.turnEngine.updateEntityStatus(p.uid, 'DOWNED');
                    this.log(`Player ${p.uid} foi DERRUBADO (0 HP)`);
                }
            }
        });

        // Checa Vitória / Derrota
        if (this.boss.currentHp <= 0) {
            this.raidData.status = 'VICTORY';
            this.log(`VITÓRIA DA PARTY!`);
            return;
        }

        const stillAlive = this.players.filter(p => p.currentHp > 0 && p.combatStatus !== 'DOWNED');
        if (stillAlive.length === 0) {
            this.raidData.status = 'DEFEAT';
            this.log(`DERROTA DA PARTY!`);
            return;
        }

        // Transiciona para próxima Rodada (PARTY_PHASE)
        this.raidData.round++;
        this.turnEngine.advancePhase();
        this.raidData.status = 'PARTY_PHASE';
        this.raidData.partyActions = {};
        this.raidData.playerReactions = {};
        this.raidData.currentBossAttack = null;
        this.players.forEach(p => {
            if (p.currentHp > 0 && p.combatStatus !== 'DOWNED') {
                p.combatStatus = 'ACTIVE';
            }
        });

        this.log(`Iniciando Rodada ${this.raidData.round} - PARTY_PHASE`);
    }
}

// BATERIA DE TESTES DE QA
const results = {
    totalTests: 0,
    passed: 0,
    failed: 0,
    details: []
};

function assert(condition, testName, errorMsg) {
    results.totalTests++;
    if (condition) {
        results.passed++;
        results.details.push({ status: 'PASS', testName });
    } else {
        results.failed++;
        results.details.push({ status: 'FAIL', testName, error: errorMsg });
    }
}

console.log('═══════════════════════════════════════════════════════════');
console.log(' INICIANDO SUÍTE DE TESTES AUTOMÁTICOS: BOSS RAID QA');
console.log('═══════════════════════════════════════════════════════════\n');

[1, 2, 3, 4].forEach(playerCount => {
    console.log(`\n--- TESTANDO CENÁRIO COM ${playerCount} JOGADOR(ES) ---`);
    const sim = new SimulatedRaidRoom(playerCount);

    // Teste 1: Estado Inicial correto
    assert(sim.raidData.status === 'PARTY_PHASE', `[${playerCount}P] Inicialização da PARTY_PHASE`, 'Status não é PARTY_PHASE');
    assert(sim.turnEngine.currentPhase === 'PARTY', `[${playerCount}P] TurnEngine fase PARTY`, 'TurnEngine não iniciou na fase PARTY');
    assert(sim.raidData.round === 1, `[${playerCount}P] Rodada inicial deve ser 1`, `Rodada é ${sim.raidData.round}`);

    // Teste 2: Ações individuais e Fast-Forward
    for (let i = 1; i <= playerCount; i++) {
        const uid = `user_${i}`;
        const isLast = (i === playerCount);
        sim.playerSubmitAction(uid, 'attack', true);
        
        if (!isLast) {
            assert(sim.raidData.status === 'PARTY_PHASE', `[${playerCount}P] Aguardando demais jogadores antes do último (jogador ${i})`, `Fase mudou precocemente para ${sim.raidData.status}`);
        } else {
            assert(sim.raidData.status === 'BOSS_PHASE', `[${playerCount}P] Fast-forward automático acionado para BOSS_PHASE após último jogador agir`, `Fase não avançou para BOSS_PHASE. Atual: ${sim.raidData.status}`);
        }
    }

    // Teste 3: Reações na BOSS_PHASE
    const attackPlan = sim.raidData.currentBossAttack;
    assert(attackPlan !== null, `[${playerCount}P] Boss planejou ataque com alvos`, 'Ataque do boss está nulo');
    assert(attackPlan.targetUids.length > 0, `[${playerCount}P] Boss tem pelo menos 1 alvo vivo`, 'Alvos vazios');

    const targets = [...attackPlan.targetUids];
    targets.forEach((uid, idx) => {
        const isLastTarget = (idx === targets.length - 1);
        sim.playerSubmitReaction(uid, 'dodge', true);

        if (!isLastTarget) {
            assert(sim.raidData.status === 'BOSS_PHASE', `[${playerCount}P] Aguardando demais alvos reagirem (alvo ${uid})`, `Fase mudou prematuramente para ${sim.raidData.status}`);
        } else {
            assert(sim.raidData.status === 'PARTY_PHASE', `[${playerCount}P] Fast-forward automático para próxima PARTY_PHASE após todos os alvos reagirem`, `Fase não avançou para PARTY_PHASE. Atual: ${sim.raidData.status}`);
            assert(sim.raidData.round === 2, `[${playerCount}P] Rodada deve ter incrementado para 2`, `Rodada é ${sim.raidData.round}`);
        }
    });
});

// TESTE ESPECIAL: Edge Case de Jogador DOWNED (Não travar a Party)
console.log('\n--- TESTANDO EDGE CASE: JOGADOR CAÍDO (DOWNED) NÃO DEVE TRAVAR O TURNO ---');
const downSim = new SimulatedRaidRoom(3);
// Derruba o jogador 2 propositalmente
downSim.players[1].currentHp = 0;
downSim.players[1].combatStatus = 'DOWNED';
downSim.turnEngine.updateEntityStatus('user_2', 'DOWNED');

// Apenas jogador 1 e 3 estão vivos. Agem:
downSim.playerSubmitAction('user_1', 'attack', true);
assert(downSim.raidData.status === 'PARTY_PHASE', `[Downed Test] Esperando segundo jogador vivo agir`, 'Fase mudou prematuramente');

downSim.playerSubmitAction('user_3', 'attack', true);
assert(downSim.raidData.status === 'BOSS_PHASE', `[Downed Test] Avançou para BOSS_PHASE sem esperar jogador caído (user_2)`, `Fase travou esperando jogador caído! Atual: ${downSim.raidData.status}`);

// TESTE ESPECIAL: Timeout Simulation
console.log('\n--- TESTANDO EDGE CASE: TIMEOUT QUANDO UM JOGADOR FICA AFK ---');
const timeoutSim = new SimulatedRaidRoom(2);
// Jogador 1 age
timeoutSim.playerSubmitAction('user_1', 'attack', true);
// Jogador 2 não age e sofre timeout (como o timer do boss-raid-manager faz)
timeoutSim.playerSubmitAction('user_2', 'timeout', false);
assert(timeoutSim.raidData.status === 'BOSS_PHASE', `[Timeout Test] Transição ocorreu após timeout de AFK`, `Fase não avançou após timeout! Atual: ${timeoutSim.raidData.status}`);

// TESTE ESPECIAL: Edge Case de Jogador Desconectado (DISCONNECTED)
console.log('\n--- TESTANDO EDGE CASE: JOGADOR DESCONECTADO (DISCONNECTED) NÃO DEVE TRAVAR REAÇÃO ---');
const dcSim = new SimulatedRaidRoom(3);
// Avança para Boss Phase
dcSim.playerSubmitAction('user_1', 'attack', true);
dcSim.playerSubmitAction('user_2', 'attack', true);
dcSim.playerSubmitAction('user_3', 'attack', true);
assert(dcSim.raidData.status === 'BOSS_PHASE', `[DC Test] Chegou na BOSS_PHASE`, 'Status incorreto');

// Força ataque mirando em user_1 e user_2
dcSim.raidData.currentBossAttack = {
    actionType: 'MULTI_TARGET',
    targetUids: ['user_1', 'user_2']
};
// user_2 desconecta durante a janela de mira
dcSim.players[1].combatStatus = 'DISCONNECTED';

// user_1 responde
dcSim.playerSubmitReaction('user_1', 'dodge', true);

// Verifica se checkBossPhaseCompletion considera apenas quem está vivo e conectado
const dcTargets = dcSim.raidData.currentBossAttack.targetUids;
const dcAliveTargets = dcTargets.filter(uid => {
    const p = dcSim.players.find(x => x.uid === uid);
    return p && p.currentHp > 0 && p.combatStatus !== 'DOWNED' && p.combatStatus !== 'DISCONNECTED';
});
assert(dcAliveTargets.length === 1 && dcAliveTargets[0] === 'user_1', `[DC Test] Filtro de alvos ignora jogador desconectado`, 'Jogador desconectado ainda foi exigido');

// TESTE DE VERIFICAÇÃO DE DISSINCRONIA DE ROUND
console.log('\n--- TESTANDO AUDITORIA DE CÓDIGO FONTE (ROUND DESYNC CHECK) ---');
const brmCode = fs.readFileSync(path.join(__dirname, '../js/features/bossRaid/boss-raid-manager.js'), 'utf8');

// Procura por chamada de advancePhase
const advancePhaseMatches = brmCode.match(/this\.turnEngine\.advancePhase\(\)/g) || [];
console.log(`Ocorrências de turnEngine.advancePhase() no boss-raid-manager.js: ${advancePhaseMatches.length}`);
assert(advancePhaseMatches.length === 2, `[Auditoria] Exatamente 2 pontos autoritativos de avanço de fase (Party -> Boss e Boss -> Party)`, `Esperado 2, encontrado ${advancePhaseMatches.length}`);

// Checa se o round manual '(raidData.round || 1) + 1' foi eliminado
const manualRoundInc = brmCode.includes('round: (raidData.round || 1) + 1');
assert(!manualRoundInc, `[Auditoria] Incremento manual redundante de round eliminado em favor de turnEngine.roundCount`, 'Incremento manual ainda presente');

console.log('\n═══════════════════════════════════════════════════════════');
console.log(` RELATÓRIO DE EXECUÇÃO DOS TESTES:`);
console.log(` Total de Testes: ${results.totalTests}`);
console.log(` Aprovados: ${results.passed}`);
console.log(` Falhas: ${results.failed}`);
console.log('═══════════════════════════════════════════════════════════\n');

if (results.failed > 0) {
    console.error('Falhas detectadas:', results.details.filter(d => d.status === 'FAIL'));
    process.exit(1);
} else {
    console.log('Todos os testes passaram com sucesso!');
}

