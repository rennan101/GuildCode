// tools/csharp_updater/apply_updates.js
const fs = require('fs');
const path = require('path');

const b1 = require('./batch1.js');
const b2 = require('./batch2.js');
const b3 = require('./batch3.js');
const allBatches = { ...b1, ...b2, ...b3 };

const targetFile = path.resolve(__dirname, '../../data/csharp_chapters_data.js');
let content = fs.readFileSync(targetFile, 'utf8');

function formatStory(storyArray) {
    return 'story: ' + JSON.stringify(storyArray, null, 8)
        .replace(/^/gm, '    ')
        .trim();
}

function formatConcept(conceptObj) {
    const titleEscaped = JSON.stringify(conceptObj.title);
    const explEscaped = JSON.stringify(conceptObj.explanation);
    return `concept: {
        title: ${titleEscaped},
        explanation: ${explEscaped},
        code: \`${conceptObj.code}\`
    }`;
}

function formatExample(exampleObj) {
    const titleEscaped = JSON.stringify(exampleObj.title);
    const outEscaped = JSON.stringify(exampleObj.output);
    return `example: {
        title: ${titleEscaped},
        code: \`${exampleObj.code}\`,
        output: ${outEscaped}
    }`;
}

let updatedCount = 0;

for (let id = 0; id <= 37; id++) {
    const data = allBatches[id];
    if (!data) {
        console.error(`Lote ausente para o capítulo ${id}`);
        process.exit(1);
    }

    const reg = new RegExp(
        `(id:\\s*${id},\\s*[\\s\\S]*?)(story:\\s*\\[[\\s\\S]*?\\],\\s*concept:\\s*{[\\s\\S]*?},\\s*example:\\s*{[\\s\\S]*?})(,\\s*experiment:)`
    );

    const match = reg.exec(content);
    if (!match) {
        console.error(`Não foi possível localizar o bloco para o capítulo ${id}`);
        process.exit(1);
    }

    const newStory = formatStory(data.story);
    const newConcept = formatConcept(data.concept);
    const newExample = formatExample(data.example);

    const replacement = `${newStory},\n    ${newConcept},\n    ${newExample}`;
    content = content.replace(reg, `$1${replacement}$3`);
    updatedCount++;
}

fs.writeFileSync(targetFile, content, 'utf8');
console.log(`Sucesso! ${updatedCount} capítulos atualizados em ${targetFile}`);
