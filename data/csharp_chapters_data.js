/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — C# & UNITY 6.5 CHAPTERS DATA (LEGACY REDIRECT)
   Os capítulos foram modularizados individualmente em data/csharp_chapters/
   para reduzir consumo de tokens e permitir carregamento sob demanda.
   Este arquivo mantém compatibilidade total com referências legadas.
   ═══════════════════════════════════════════════════════════════ */

const { CSHARP_CHAPTERS } = typeof require !== "undefined" 
    ? require("./csharp_chapters/index.js") 
    : { CSHARP_CHAPTERS: window.CSHARP_CHAPTERS };

if (typeof module !== "undefined") {
    module.exports = { CSHARP_CHAPTERS };
}
if (typeof window !== "undefined") {
    window.CSHARP_CHAPTERS = CSHARP_CHAPTERS;
}
