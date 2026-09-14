/**
 * GUILDCODE — C# Unity Abyss Chambers Data (Stub de Redirecionamento)
 * Os dados agora estão modularizados em data/csharp_abyss/ (floor00.js .. floor37.js e index.js).
 * Este arquivo mantém retrocompatibilidade total.
 */
if (typeof require !== 'undefined') {
  const { CSHARP_SIDE_QUESTS } = require('./csharp_abyss/index.js');
  if (typeof module !== 'undefined') {
    module.exports = { CSHARP_SIDE_QUESTS };
  }
  if (typeof window !== 'undefined') {
    window.CSHARP_SIDE_QUESTS = CSHARP_SIDE_QUESTS;
  }
}
