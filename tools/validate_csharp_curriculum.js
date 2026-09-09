#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# CURRICULUM & INTEGRITY LINTER (CI/TESTS)
   Valida coerência de enunciados, saídas esperadas, regras de validação,
   cobertura teórica e alinhamento dos Bosses por faixa de capítulos.
   ═══════════════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');

function loadCurriculum() {
    const csharpChPath = path.join(ROOT, 'data/csharp_chapters_data.js');
    const csharpAbPath = path.join(ROOT, 'data/csharp_abyss_data.js');

    const csharpChContent = fs.readFileSync(csharpChPath, 'utf8');
    const csharpAbContent = fs.readFileSync(csharpAbPath, 'utf8');

    const sandbox = { window: {}, module: {} };
    vm.createContext(sandbox);
    vm.runInContext(csharpChContent, sandbox);
    vm.runInContext(csharpAbContent, sandbox);

    const chapters = sandbox.CSHARP_CHAPTERS || sandbox.window.CSHARP_CHAPTERS;
    const abyss = sandbox.CSHARP_SIDE_QUESTS || sandbox.window.CSHARP_SIDE_QUESTS;

    return { chapters, abyss };
}

function runAudit() {
    console.log('🏛️ INICIANDO AUDITORIA DE INTEGRIDADE CURRICULAR (C# & UNITY 6.5)...\n');
    const { chapters, abyss } = loadCurriculum();

    let totalErrors = 0;
    let totalWarnings = 0;

    // 1. Auditoria dos 38 Capítulos Oficiais
    console.log(`📘 1. Auditando ${chapters.length} Capítulos Oficiais (190 Atividades)...`);
    if (chapters.length !== 38) {
        console.error(`❌ Erro crítico: Esperava 38 capítulos oficiais, encontrado: ${chapters.length}`);
        totalErrors++;
    }

    chapters.forEach(ch => {
        const activities = ch.activities || [];
        if (activities.length !== 5) {
            console.error(`❌ Capítulo ${ch.id} (${ch.title}) possui ${activities.length} atividades (esperado: 5).`);
            totalErrors++;
        }

        const conceptText = ((ch.concept?.explanation || '') + ' ' + (ch.concept?.code || '') + ' ' + (ch.example?.code || ''));

        activities.forEach(act => {
            const exp = act.tests?.[0]?.expected;
            if (exp === undefined || exp === null || exp === '') {
                console.error(`❌ Atividade ${act.id} no Cap. ${ch.id} não possui saída esperada (tests[0].expected).`);
                totalErrors++;
            }

            const desc = act.description || '';
            const quotes = desc.match(/['"][^'"]+['"]/g) || [];
            quotes.forEach(q => {
                const inner = q.slice(1, -1);
                if (inner.includes(':') && !inner.startsWith('http') && !inner.includes('class=')) {
                    const label = inner.split(':')[0].trim();
                    if (label.length > 2 && !exp.includes(label)) {
                        console.warn(`⚠️ [Alerta Formato] ${act.id} (Cap. ${ch.id}): Enunciado cita "${inner}", mas a saída esperada é "${exp}".`);
                        totalWarnings++;
                    }
                }
            });

            const reqs = act.validationRules?.requiredPatterns || [];
            reqs.forEach(r => {
                if (typeof r === 'string') {
                    const keyword = r.split(' ')[0].replace(/[()\[\]{}]/g, '').trim();
                    const coreKeywords = ['foreach', 'List', 'Queue', 'Dictionary', 'IEnumerator', 'Coroutine', 'Action', 'Func', 'Rigidbody', 'Collider'];
                    if (coreKeywords.includes(keyword) && !conceptText.includes(keyword)) {
                        console.warn(`⚠️ [Alerta Pedagógico] ${act.id} (Cap. ${ch.id}) exige "${keyword}", porém não foi localizado no conceito.`);
                        totalWarnings++;
                    }
                }
            });
        });
    });

    // 2. Auditoria do Abismo Dimensional C#
    console.log(`\n🌌 2. Auditando o Abismo C# (Andares 0 a 37)...`);
    const floorKeys = Object.keys(abyss);
    if (floorKeys.length !== 38) {
        console.error(`❌ Erro crítico: O Abismo possui ${floorKeys.length} andares (esperado: 38).`);
        totalErrors++;
    }

    for (let i = 0; i < 38; i++) {
        const floorKey = `csharp_ch${i}`;
        const quests = abyss[floorKey];
        const ch = chapters.find(c => c.id === i);

        if (!quests) {
            console.error(`❌ Andar ${i} (${floorKey}) ausente no Abismo.`);
            totalErrors++;
            continue;
        }

        if (quests.length !== 5) {
            console.error(`❌ Andar ${i} possui ${quests.length} câmaras (esperado: 5).`);
            totalErrors++;
        }

        quests.forEach(q => {
            const exp = q.tests?.[0]?.expected;
            if (!exp) {
                console.error(`❌ Câmara ${q.id} no Andar ${i} sem tests[0].expected.`);
                totalErrors++;
            }
            if (!q.description) {
                console.error(`❌ Câmara ${q.id} no Andar ${i} sem descrição.`);
                totalErrors++;
            }
        });
    }

    // 3. Auditoria de Faixa dos Bosses
    console.log(`\n⚔️ 3. Auditando Regras de Conteúdo e Faixa dos Bosses...`);
    const bossesPath = path.join(ROOT, 'js/features/bossRaid/data/bosses.js');
    const raidChallengesPath = path.join(ROOT, 'js/features/bossRaid/data/raid-challenges.js');

    if (fs.existsSync(bossesPath) && fs.existsSync(raidChallengesPath)) {
        const bCode = fs.readFileSync(bossesPath, 'utf8');
        const rCode = fs.readFileSync(raidChallengesPath, 'utf8');

        const bBox = { window: {}, app: {}, authManager: { userData: { worldId: 'csharp_unity' } } };
        vm.createContext(bBox);
        vm.runInContext(bCode, bBox);

        const BossDataManager = bBox.window.BossDataManager || bBox.BossDataManager;
        if (BossDataManager && typeof BossDataManager.getChapterRangeForBoss === 'function') {
            const defaultMap = BossDataManager.getDefaultAssignments('csharp_unity');
            const bossChapters = Object.keys(defaultMap).map(Number).sort((a, b) => a - b);

            console.log(`   Verificando faixas para ${bossChapters.length} Bosses posicionados...`);
            bossChapters.forEach((chId, idx) => {
                const range = BossDataManager.getChapterRangeForBoss(chId, 'csharp_unity');
                const prevBossCh = idx > 0 ? bossChapters[idx - 1] : -1;
                const expectedStart = prevBossCh + 1;

                if (range.startChapter !== expectedStart || range.endChapter !== chId) {
                    console.error(`❌ Faixa incorreta para Boss no Cap ${chId}: Obteve [${range.startChapter}, ${range.endChapter}], esperado [${expectedStart}, ${chId}]`);
                    totalErrors++;
                } else {
                    const hasFuture = range.chapters.some(c => c > chId);
                    if (hasFuture) {
                        console.error(`❌ Boss no Cap ${chId} contém capítulos futuros além de seu teto.`);
                        totalErrors++;
                    }
                }
            });
        }
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log(`RESULTADO DA AUDITORIA CURRICULAR:`);
    console.log(`Erros Críticos: ${totalErrors}`);
    console.log(`Avisos Preventivos: ${totalWarnings}`);
    console.log('═══════════════════════════════════════════════════════\n');

    if (totalErrors > 0) {
        process.exit(1);
    } else {
        console.log('✅ TODAS AS ASSERÇÕES DE INTEGRIDADE CURRICULAR PASSARAM COM SUCESSO!\n');
    }
}

runAudit();
