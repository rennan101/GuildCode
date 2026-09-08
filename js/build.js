/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — Build Script
   Rebuilds index.html by inlining CSS and JS from source files.
   Firebase CDN scripts are always preserved.
   ═══════════════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(path.dirname(__filename || __dirname), '..');

// Firebase CDN scripts (always preserved)
const FIREBASE_CDN = `<!-- Firebase SDKs (compat mode) -->
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics-compat.js"></script>`;

// JS files in dependency order (Backend -> Core -> Frontend)
const JS_FILES = [
    // ☁️ Backend / Cloud & Auth
    'js/backend/firebase-config.js',
    'js/backend/auth.js',
    
    // ⚙️ Core / Engine & Content
    'js/core/skills.js',
    'js/core/skill-icons.js',
    'js/core/avatars-skills.js',
    'js/core/gacha-engine.js',
    'js/core/artifacts-generator.js',
    'js/core/engine.js',
    'js/core/characters.js',
    'js/core/chapters.js',
    'js/core/sidequests.js',
    'js/core/interpreter.js',
    'js/core/mission-validator.js',
    'js/backend/missions-manager.js',
    
    // ☁️ Backend / Real-time Games, Tournaments, Party & Chat
    'js/backend/ranked.js',
    'js/backend/tournament.js',
    'js/backend/party.js',
    'js/backend/chat.js',

    // 🎮 Dimensão C# Unity & Interpretador
    'csharp/highlight.js',
    'csharp/interpreter.js',
    'data/csharp_glossary_data.js',
    'data/csharp_chapters_data.js',
    'data/csharp_abyss_data.js',

    // 🎯 Treinamento Procedural (PTS)
    'js/features/proceduralTraining/core/SeededRandom.js',
    'js/features/proceduralTraining/content/CurriculumGraph.js',
    'js/features/proceduralTraining/content/CurriculumGraphCS.js',
    'js/features/proceduralTraining/core/DifficultyEngine.js',
    'js/features/proceduralTraining/learning/LearningEvents.js',
    'js/features/proceduralTraining/learning/MasteryEngine.js',
    'js/features/proceduralTraining/learning/PlayerLearningProfile.js',
    'js/features/proceduralTraining/core/TopicSelector.js',
    'js/features/proceduralTraining/core/ActivityValidator.js',
    'js/features/proceduralTraining/core/ActivityGenerator.js',
    'js/features/proceduralTraining/core/TrainingOrchestrator.js',
    'js/features/proceduralTraining/boss/BossTrainingManager.js',
    'js/features/proceduralTraining/persistence/PTSRepositories.js',
    'js/features/proceduralTraining/PTSFacade.js',
    
    // ⚔️ Boss Battle Raids Modular Feature
    'js/features/bossRaid/constants/raid-constants.js',
    'js/features/bossRaid/data/bosses.js',
    'js/features/bossRaid/data/raid-challenges.js',
    'js/features/bossRaid/engine/combat-formulas.js',
    'js/features/bossRaid/engine/turn-engine.js',
    'js/features/bossRaid/engine/boss-ai.js',
    'js/features/bossRaid/engine/raid-challenge-engine.js',
    'js/features/bossRaid/services/raid-realtime.js',
    'js/features/bossRaid/sounds/raid-audio.js',
    'js/features/bossRaid/ui/raid-animations.js',
    'js/features/bossRaid/ui/raid-battle-ui.js',
    'js/features/bossRaid/boss-raid-manager.js',

    // 🖥️ Frontend / UI & Presentation
    'data/c_glossary_data.js',
    'js/frontend/intro.js',
    'js/frontend/dialogue.js',
    'js/frontend/chat-ui.js',
    'js/frontend/landing.js',
    'js/frontend/gacha-ui.js',
    'js/frontend/glossary-ui.js',
    'js/frontend/ui.js',
    'js/frontend/app.js'
];

// 1. Read and bundle modular CSS
function bundleCSS(entryFilePath) {
    const entryDir = path.dirname(entryFilePath);
    let content = fs.readFileSync(entryFilePath, 'utf8');

    // 1. Rewrite relative url(...) for assets (images, fonts) to be relative to ROOT for this file
    content = content.replace(/url\(\s*['"]?(?!\/|https?:\/\/|data:)([^'"\)]+)['"]?\s*\)/g, (match, urlPath) => {
        if (urlPath.endsWith('.css')) return match;
        const absoluteAssetPath = path.resolve(entryDir, urlPath);
        const relativeToRoot = path.relative(ROOT, absoluteAssetPath).replace(/\\/g, '/');
        return `url('${relativeToRoot}')`;
    });

    // 2. Resolve @import url('...') or @import '...'
    content = content.replace(/@import\s+(?:url\(['"]?([^'"\)]+)['"]?\)|['"]([^'"]+)['"]);/g, (match, p1, p2) => {
        const importPath = p1 || p2;
        // Ignore external HTTP/HTTPS font imports
        if (importPath.startsWith('http://') || importPath.startsWith('https://')) {
            return match;
        }
        const absolutePath = path.resolve(entryDir, importPath);
        if (fs.existsSync(absolutePath)) {
            return `/* ═══ @import ${importPath} ═══ */\n` + bundleCSS(absolutePath);
        }
        return match;
    });

    return content;
}

const css = bundleCSS(path.join(ROOT, 'css/style.css'));

// 2. Read and combine JS
const jsContent = JS_FILES.map(f => {
    const code = fs.readFileSync(path.join(ROOT, f), 'utf8');
    return `/* ═══ ${path.basename(f)} ═══ */\n${code}`;
}).join('\n\n');

// 3. Read the HTML template (the part before <style> and after </style>)
let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

// Replace <style>...</style>
html = html.replace(/<style>[\s\S]*?<\/style>/, `<style>\n${css}\n</style>`);

// Clean out scripts and trailing build artifacts before </body>
const cutIdx = html.indexOf("<!-- Firebase SDKs");
if (cutIdx !== -1) {
    html = html.slice(0, cutIdx).trimEnd();
} else if (html.includes("</body>")) {
    html = html.slice(0, html.indexOf("</body>")).trimEnd();
}

html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '');

// Inject Firebase CDN + combined JS before </body>
const scriptBlock = `\n\n${FIREBASE_CDN}\n<script>\n${jsContent}\n</script>\n</body>\n</html>`;
html = html + scriptBlock;

// 4. Write output
fs.writeFileSync(path.join(ROOT, 'index.html'), html);

// 5. Verify
const verify = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const checks = {
    size: verify.length,
    hasCSS: verify.includes('<style>'),
    hasFirebaseApp: verify.includes('firebase-app-compat'),
    hasFirebaseAuth: verify.includes('firebase-auth-compat'),
    hasFirebaseFirestore: verify.includes('firebase-firestore-compat'),
    hasCInterpreter: verify.includes('class CInterpreter'),
    hasCSharpInterpreter: verify.includes('class CSharpInterpreter') || verify.includes('CSharpInterpreter'),
    hasCSharpChapters: verify.includes('CSHARP_CHAPTERS'),
    hasCSharpAbyss: verify.includes('CSHARP_SIDE_QUESTS'),
    hasPTS: verify.includes('PTSFacade'),
    hasUIRenderer: verify.includes('class UIRenderer'),
    hasApp: verify.includes('window.app = app'),
    screens: ['loading','title','name','prologue','dashboard','chapter','activity','reward','admin','ranked','tournament','login','guild','abyss']
        .every(s => verify.includes(`screen-${s}`))
};

console.log('Build complete:', JSON.stringify(checks, null, 2));
