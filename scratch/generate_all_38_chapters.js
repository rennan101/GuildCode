/**
 * BUILDER ENGINE THAT ASSEMBLES ALL 38 CHAPTERS AND VALIDATES THEM
 */

const fs = require('fs');
const path = require('path');
const CSharpInterpreter = require('./csharp/interpreter.js');
const MissionValidator = require('./js/core/mission-validator.js');

// Load metadata table for 38 subjects
// Each subject from subjects.md has: id, subjectNum, title, module, character, unlock, unlockIcon, xpReward, conceptTitle, conceptExpl, conceptCode, exampleCode, exampleOutput, experimentCode, tutorialSteps, acts [5 activities]
const all38Chapters = [];

// Helper for generating activity objects
function makeActivity(chapId, actIdx, title, diff, desc, reqPatterns, starterCode, solutionCode, expectedOutput, testDesc) {
    return {
        id: `cs_act_${chapId}_${actIdx}`,
        title: title,
        difficulty: diff,
        description: desc,
        validationRules: { requiredPatterns: reqPatterns },
        starterCode: starterCode.trim(),
        solution: solutionCode.trim(),
        tests: [
            { input: "", expected: expectedOutput, description: testDesc }
        ],
        hints: [
            { level: "I", text: `Verifique se o seu código atende aos requisitos e usa: ${reqPatterns.slice(0, 2).join(", ")}` },
            { level: "II", text: `Certifique-se de que a saída esperada seja exatamente: ${expectedOutput.replace(/\n/g, ' ')}` },
            { level: "III", text: `Exemplo estrutural:\n${solutionCode.split('\n').slice(4, 9).join('\n')}` }
        ],
        validator: function(code, output) {
            let errors = [];
            for (let req of reqPatterns) {
                if (!code.includes(req)) {
                    errors.push(`Seu código precisa conter o padrão: ${req}`);
                }
            }
            if (!output.includes(expectedOutput.split('\n')[0])) {
                errors.push(`A saída gerada no console não corresponde ao esperado.`);
            }
            return { pass: errors.length === 0, errors };
        }
    };
}

console.log('Builder module ready.');
