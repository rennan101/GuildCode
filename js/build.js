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
    
    // 🖥️ Frontend / UI & Presentation
    'js/frontend/intro.js',
    'js/frontend/dialogue.js',
    'js/frontend/chat-ui.js',
    'js/frontend/ui.js',
    'js/frontend/app.js'
];

// 1. Read and bundle modular CSS
function bundleCSS(entryFilePath) {
    const entryDir = path.dirname(entryFilePath);
    let content = fs.readFileSync(entryFilePath, 'utf8');

    // Resolve @import url('...') or @import '...'
    return content.replace(/@import\s+(?:url\(['"]?([^'"\)]+)['"]?\)|['"]([^'"]+)['"]);/g, (match, p1, p2) => {
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

// Remove ALL existing script tags (both external and inline)
html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '');

// Inject Firebase CDN + combined JS before </body>
const scriptBlock = `${FIREBASE_CDN}\n<script>\n${jsContent}\n</script>`;
html = html.replace('</body>', scriptBlock + '\n</body>');

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
    hasUIRenderer: verify.includes('class UIRenderer'),
    hasApp: verify.includes('window.app = app'),
    screens: ['loading','title','name','prologue','dashboard','chapter','activity','reward','admin','ranked','tournament','login','guild']
        .every(s => verify.includes(`screen-${s}`))
};

console.log('Build complete:', JSON.stringify(checks, null, 2));
