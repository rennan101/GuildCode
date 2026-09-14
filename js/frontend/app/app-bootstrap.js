/* ═══════════════════════════════════════════════════════════════
   GUILDCODE — App Bootstrap & Instantiation
   ═══════════════════════════════════════════════════════════════ */

let app;
window.addEventListener('DOMContentLoaded', () => {
    window.soundFX = new SoundFX();
    app = new GuildCodeApp();
    window.app = app;
    app.init();
});
