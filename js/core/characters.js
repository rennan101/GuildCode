/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — Character Definitions
   ═══════════════════════════════════════════════════════════════ */

const CHARACTERS = {
    gm: {
        name: "GM",
        fullName: "Game Master",
        role: "Guia do Sistema",
        color: "#fbbf24",
        borderColor: "var(--gold-dim)",
        image: "assets/characters/char_gm.png"
    },
    arkan: {
        name: "ARKAN",
        fullName: "Arkan Velor",
        role: "Mestre da Guilda",
        color: "#38bdf8",
        borderColor: "#0284c7",
        image: "assets/characters/char_arkan.png"
    },
    lyra: {
        name: "LYRA",
        fullName: "Lyra Nex",
        role: "Arquivista",
        color: "#c084fc",
        borderColor: "#a855f7",
        image: "assets/characters/char_lyra.png"
    },
    kael: {
        name: "KAEL",
        fullName: "Kael Thorn",
        role: "Ferreiro de Codigo",
        color: "#fb923c",
        borderColor: "#ea580c",
        image: "assets/characters/char_kael.png"
    },
    mira: {
        name: "MIRA",
        fullName: "Mira Solis",
        role: "Cartografa",
        color: "#4ade80",
        borderColor: "#16a34a",
        image: "assets/characters/char_mira.png"
    },
    orin: {
        name: "ORIN",
        fullName: "Orin Vega",
        role: "Mensageiro",
        color: "#60a5fa",
        borderColor: "#2563eb",
        image: "assets/characters/char_orin.png"
    },
    elion: {
        name: "ELION",
        fullName: "Elion Dusk",
        role: "Bibliotecario",
        color: "#a855f7",
        borderColor: "#7e22ce",
        image: "assets/characters/char_elion.png"
    }
};

// Character name lookup for story entries (lowercase to match story data)
const CHARACTER_LOOKUP = {};
Object.keys(CHARACTERS).forEach(key => {
    CHARACTER_LOOKUP[key.toLowerCase()] = CHARACTERS[key];
});
// Also add common aliases
CHARACTER_LOOKUP['arkan'] = CHARACTERS.arkan;
CHARACTER_LOOKUP['lyra'] = CHARACTERS.lyra;
CHARACTER_LOOKUP['kael'] = CHARACTERS.kael;
CHARACTER_LOOKUP['mira'] = CHARACTERS.mira;
CHARACTER_LOOKUP['orin'] = CHARACTERS.orin;
CHARACTER_LOOKUP['elion'] = CHARACTERS.elion;
CHARACTER_LOOKUP['gm'] = CHARACTERS.gm;
