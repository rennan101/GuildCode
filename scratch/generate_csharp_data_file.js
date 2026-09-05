/**
 * COMPLETE CHAPTER DATA GENERATOR
 * Merges metadata, story, concept, example, experiment, tutorial,
 * and 5 activities for each of the 38 chapters (0 to 37) into data/csharp_chapters_data.js.
 */

const fs = require('fs');
const path = require('path');
const SUBJECTS = require('./subjects_data.js');
const p1 = require('./acts_part1.js').buildAllActivities();
const p2 = require('./acts_part2.js').buildPart2();
const p3 = require('./acts_part3.js').buildPart3();
const p4 = require('./acts_part4.js').buildPart4();
const p5 = require('./acts_part5.js').buildPart5();

const ALL_ACTIVITIES = { ...p1, ...p2, ...p3, ...p4, ...p5 };

function escapeCode(str) {
    return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\${/g, '\\${');
}

const chaptersOutput = [];

for (const sub of SUBJECTS) {
    const chId = sub.id;
    const acts = ALL_ACTIVITIES[chId];
    if (!acts || acts.length !== 5) {
        throw new Error(`Missing 5 activities for Chapter ${chId}`);
    }

    // Story dialogues
    const story = [
        { type: "system", text: `[ SISTEMA ] Inicializando Protocolo do ${sub.mod} — Assunto #${sub.num}.` },
        { type: "narrative", text: `A Cidadela Dimensional calibra os subsistemas de ${sub.title}. Os códigos da engine ganham densidade e forma.` },
        { type: "character", name: sub.name, role: sub.role, cssClass: sub.char, text: `Engenheiro de Jogos, preste atenção aos princípios de <span class='highlight'>${sub.title}</span>. Cada linha molda o comportamento e a estabilidade da simulação!` },
        { type: "gm", name: "GM", role: "Guia do Sistema", cssClass: "gm", text: `Pratique os conceitos através dos testes guiados e execute as 5 atividades práticas deste capítulo para consolidar sua maestria dimensional.` }
    ];

    // Build activities formatted for data file
    const formattedActivities = acts.map((a, idx) => {
        const actNumber = idx + 1;
        const reqPatternsStr = JSON.stringify(a.reqs);
        return `        {
            id: "cs_act_${chId}_${actNumber}",
            title: ${JSON.stringify(a.title)},
            difficulty: ${JSON.stringify(a.diff)},
            description: ${JSON.stringify(a.desc)},
            validationRules: { requiredPatterns: ${reqPatternsStr} },
            starterCode: \`${escapeCode(a.starter)}\`,
            solution: \`${escapeCode(a.sol)}\`,
            tests: [
                { input: "", expected: ${JSON.stringify(a.exp)}, description: ${JSON.stringify(a.descTest)} }
            ],
            hints: [
                { level: "I", text: ${JSON.stringify("Certifique-se de usar a estrutura pedida: " + a.reqs.slice(0, 2).join(", "))} },
                { level: "II", text: ${JSON.stringify("A saída no console deve conter exatamente: " + a.exp.split('\n')[0])} },
                { level: "III", text: ${JSON.stringify("Exemplo estrutural:\n" + a.sol.split('\n').slice(4, 9).join('\n'))} }
            ],
            validator: function(code, output) {
                let errors = [];
                const reqs = ${reqPatternsStr};
                for (let r of reqs) {
                    if (!code.includes(r)) errors.push("Seu código precisa conter: " + r);
                }
                const expFirst = ${JSON.stringify(a.exp.split('\n')[0])};
                if (!output.includes(expFirst)) errors.push("A saída gerada no console não corresponde ao esperado.");
                return { pass: errors.length === 0, errors };
            }
        }`;
    }).join(',\n');

    // First activity's solution as example
    const firstSol = acts[0].sol;
    const firstExp = acts[0].exp;

    const chapterStr = `// ═══════════════════════════════════════════════════════
// CAPÍTULO ${String(chId).padStart(2, '0')} — ${sub.title.toUpperCase()}
// ═══════════════════════════════════════════════════════
{
    id: ${chId},
    title: ${JSON.stringify(sub.title)},
    theme: ${JSON.stringify(sub.mod)},
    unlock: ${JSON.stringify(sub.unlock)},
    unlockIcon: ${JSON.stringify(sub.icon)},
    character: ${JSON.stringify(sub.char)},
    xpReward: ${sub.xp},
    story: ${JSON.stringify(story, null, 8).trim()},
    concept: {
        title: ${JSON.stringify(sub.title.toUpperCase())},
        explanation: ${JSON.stringify(`Estudo aprofundado de ${sub.title} no contexto de desenvolvimento de jogos com C# e Unity 6.5. Pratique declarando componentes, dados e lógicas correspondentes.`)},
        code: \`${escapeCode(firstSol)}\`
    },
    example: {
        title: ${JSON.stringify("Exemplo — " + sub.title)},
        code: \`${escapeCode(firstSol)}\`,
        output: ${JSON.stringify(firstExp)}
    },
    experiment: {
        title: "Experimente no Editor",
        description: ${JSON.stringify(`Modifique os parâmetros de ${sub.title} e observe as alterações no Console Unity.`)},
        starterCode: \`${escapeCode(acts[0].starter)}\`
    },
    tutorial: {
        title: "Tutorial Guiado",
        steps: [
            {
                instruction: ${JSON.stringify(`Execute a rotina inicial de ${sub.title}:`)},
                starterCode: \`${escapeCode(acts[0].starter)}\`,
                solution: \`${escapeCode(firstSol)}\`,
                hint: ${JSON.stringify(firstExp.split('\n')[0])}
            }
        ]
    },
    activities: [
${formattedActivities}
    ]
}`;
    chaptersOutput.push(chapterStr);
}

const fileHeader = `/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — C# & UNITY 6.5 CHAPTERS DATA (DIMENSÃO C# UNITY)
   38 Capítulos Oficiais estruturados de Game Development em C# e Unity 6.5.
   Mapeados 1:1 a partir de csharp/subjects.md (Módulos 1 a 9).
   Cada capítulo contém exatamente 5 atividades práticas completas (190 no total),
   com regras de anti-trapaça estruturais e descrições focadas em lógica.
   ═══════════════════════════════════════════════════════════════ */

const CSHARP_CHAPTERS = [
${chaptersOutput.join(',\n\n')}
];

if (typeof module !== 'undefined') {
    module.exports = { CSHARP_CHAPTERS };
}
if (typeof window !== 'undefined') {
    window.CSHARP_CHAPTERS = CSHARP_CHAPTERS;
}
`;

fs.writeFileSync(path.join(__dirname, '../data/csharp_chapters_data.js'), fileHeader, 'utf8');
console.log('Successfully generated data/csharp_chapters_data.js with 38 chapters!');
