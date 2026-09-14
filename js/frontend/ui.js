/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — UI Renderer (Stub de Retrocompatibilidade)
   O código de UI foi decomposto em módulos de domínio em js/frontend/ui/:
   - ui-core.js (Classe base, ciclo de vida de telas, floating stats, partículas, prólogo)
   - map-ui.js (Mapa interativo, conexões, arrasto de nós, boss assignment, gaveta de capítulos)
   - editor-ui.js (IDE de código, IntelliSense, compilação, feedback, terminal tabs, hints)
   - admin-ui.js (Painel administrativo, gestão curricular de missões e turmas)
   - guild-pvp-ui.js (Tela de guilda, perfil, arenas PVP ranqueadas, torneios, loja)
   - abyss-subclasses-party-ui.js (Espiral do Abismo, subclasses, árvore de talentos, party)
   - inventory-ui.js (Inventário, cards de avatar 3D, boss skills, transmutação, badges)
   ═══════════════════════════════════════════════════════════════ */

if (typeof require !== 'undefined') {
    require('./ui/ui-core.js');
    require('./ui/map-ui.js');
    require('./ui/editor-ui.js');
    require('./ui/admin-ui.js');
    require('./ui/guild-pvp-ui.js');
    require('./ui/abyss-subclasses-party-ui.js');
    require('./ui/inventory-ui.js');
}
