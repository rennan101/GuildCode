/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — App (Stub de Retrocompatibilidade)
   A lógica de ciclo de vida e orquestração do App foi decomposta em js/frontend/app/:
   - soundfx.js (Motor de áudio Web Audio API e síntese de efeitos sonoros)
   - app-core.js (Classe base GuildCodeApp, constructor, init, auth, login modals)
   - navigation-events.js (Roteamento de telas, atalhos de teclado e eventos globais)
   - tournaments-pvp.js (Torneios, duelos PVP e partidas em tempo real)
   - settings-saves.js (Configurações, volume, snapshots e backup de progresso)
   - admin-guild.js (Painel do professor, gerenciamento de turmas e alunos)
   - inventory-transmute.js (Inventário, loja, forja e transmutação de artefatos)
   - abyss-runner.js (Execução de câmaras do Abismo, cronômetro e recompensas)
   - subclasses-party.js (Despertar de subclasses, talentos e party lobby)
   - map-crystals.js (Posicionamento customizado do mapa e cristais de ascensão)
   - app-bootstrap.js (Inicialização no DOMContentLoaded)
   ═══════════════════════════════════════════════════════════════ */

if (typeof require !== 'undefined') {
    require('./app/soundfx.js');
    require('./app/app-core.js');
    require('./app/navigation-events.js');
    require('./app/tournaments-pvp.js');
    require('./app/settings-saves.js');
    require('./app/admin-guild.js');
    require('./app/inventory-transmute.js');
    require('./app/abyss-runner.js');
    require('./app/subclasses-party.js');
    require('./app/map-crystals.js');
    require('./app/app-bootstrap.js');
}
