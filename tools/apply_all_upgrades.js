const fs = require('fs');
const path = require('path');
const CSharpInterpreter = require('../csharp/interpreter.js');
const interp = new CSharpInterpreter();

const { UPGRADES_PART1 } = require('./upgrades_part1.js');
const { UPGRADES_PART2 } = require('./upgrades_part2.js');
const { UPGRADES_PART3 } = require('./upgrades_part3.js');
const { UPGRADES_PART4 } = require('./upgrades_part4.js');

const ALL_UPGRADES = {
  ...UPGRADES_PART1,
  ...UPGRADES_PART2,
  ...UPGRADES_PART3,
  ...UPGRADES_PART4
};

console.log(`Carregados upgrades para ${Object.keys(ALL_UPGRADES).length} capítulos.\n`);

let totalTested = 0;
let totalPassed = 0;
let failedTests = [];

for (const capIdStr of Object.keys(ALL_UPGRADES)) {
  const capId = parseInt(capIdStr, 10);
  const pad = String(capId).padStart(2, '0');
  const filePath = path.join(__dirname, `../data/csharp_chapters/cap${pad}.js`);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ Arquivo não encontrado: ${filePath}`);
    continue;
  }

  const upgradeData = ALL_UPGRADES[capId];
  const origMod = require(filePath);
  const origCap = origMod[`CAP_${capId}`] || origMod[`CAP_${pad}`];

  // Monta o objeto de capítulo completo preservando metadados e narrativa
  const mergedCap = {
    id: origCap.id,
    artifactReward: origCap.artifactReward,
    title: origCap.title,
    theme: origCap.theme,
    unlock: origCap.unlock,
    unlockIcon: origCap.unlockIcon,
    character: origCap.character,
    xpReward: origCap.xpReward,
    story: origCap.story,
    concept: upgradeData.concept,
    example: upgradeData.example,
    experiment: upgradeData.experiment,
    tutorial: upgradeData.tutorial,
    activities: upgradeData.activities
  };

  // Testa todas as 5 atividades no interpretador
  upgradeData.activities.forEach(act => {
    totalTested++;
    const res = interp.executeFormatted(act.solution);
    const exp = act.tests[0].expected;
    const passed = res.output.trim().includes(exp.trim());
    if (passed) {
      totalPassed++;
    } else {
      failedTests.push({
        capId,
        actId: act.id,
        title: act.title,
        expected: exp,
        got: res.output,
        errors: res.errors
      });
    }
  });

  // Formata o capítulo preservando funções
  let json = JSON.stringify(mergedCap, (k, v) => {
    if (typeof v === 'function') {
      return '__FUNC__' + v.toString() + '__FUNC__';
    }
    return v;
  }, 4);

  // Desempacota as funções limpas
  json = json.replace(/"__FUNC__([\s\S]*?)__FUNC__"/g, (match, fnStr) => {
    return JSON.parse('"' + fnStr + '"');
  });

  const fileContent = `/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — C# UNITY: CAPÍTULO ${pad}
   ═══════════════════════════════════════════════════════════════ */

// CAPÍTULO ${pad} — ${origCap.title.toUpperCase()}
// ═══════════════════════════════════════════════════════

const CAP_${pad} = ${json};

if (typeof module !== "undefined") {
    module.exports = { CAP_${pad}, CAP_${capId}: CAP_${pad} };
}
if (typeof window !== "undefined") {
    window.CAP_${pad} = CAP_${pad};
    window.CAP_${capId} = CAP_${pad};
}
`;

  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`✅ Cap ${pad} (${origCap.title}): Atualizado e salvo com sucesso.`);
}

console.log('\n═══════════════════════════════════════════════════════');
console.log(`TOTAL ATIVIDADES TESTADAS: ${totalTested}`);
console.log(`TOTAL PASSOU: ${totalPassed}`);
console.log(`TOTAL FALHAS: ${failedTests.length}`);
console.log('═══════════════════════════════════════════════════════\n');

if (failedTests.length > 0) {
  console.error('❌ Falhas encontradas:', JSON.stringify(failedTests, null, 2));
  process.exit(1);
} else {
  console.log('🎉 TODOS OS CAPÍTULOS ATUALIZADOS E TESTADOS COM 100% DE SUCESSO!');
}
