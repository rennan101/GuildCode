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
        portrait: [
            "         ___________        ",
            "        /           \\       ",
            "       /  [=======]  \\      ",
            "      |   |       |   |     ",
            "      |   |  ^ ^  |   |     ",
            "      |   |  ---  |   |     ",
            "       \\   \\_____/   /      ",
            "        \\           /       ",
            "         |  |   |  |        ",
            "         |  |   |  |        ",
            "        /|  |   |  |\\       ",
            "       / |__|   |__| \\      ",
            "      /  |___________|\\    ",
            "     /   / /       \\ \\ \\   ",
            "    /___/ /         \\ \\_\\  ",
            "        |/           \\|     "
        ]
    },
    arkan: {
        name: "ARKAN",
        fullName: "Arkan Velor",
        role: "Mestre da Guilda",
        color: "#a78bfa",
        borderColor: "var(--purple-dim)",
        portrait: [
            "         ______            ",
            "        /      \\           ",
            "       / /\\  /\\ \\          ",
            "      / /  \\/  \\ \\         ",
            "     | |   ||   | |        ",
            "     | |   ||   | |        ",
            "      \\ \\  ||  / /         ",
            "       \\ '-||-' /          ",
            "        \\   || /           ",
            "     ____\\  || /____       ",
            "    /  __ \\ || / __  \\     ",
            "   |  /  \\ \\||/ /  \\  |   ",
            "   |  \\__/ /  \\ \\__/  |   ",
            "    \\     / /\\ \\     /    ",
            "     \\   / /  \\ \\   /     ",
            "      \\_/ /    \\ \\_/      "
        ]
    },
    lyra: {
        name: "LYRA",
        fullName: "Lyra Nex",
        role: "Arquivista",
        color: "#38bdf8",
        borderColor: "var(--cyan-dim)",
        portrait: [
            "         ______            ",
            "        /      \\           ",
            "       / /\\  /\\ \\          ",
            "      / / \\/ \\  \\ \\        ",
            "     | |  (--)  | |        ",
            "     | |   ||   | |        ",
            "      \\ \\  ||  / /         ",
            "       \\ '.||.' /          ",
            "        \\  ||  /           ",
            "     ____\\ || /____        ",
            "    /  __ \\|| / __  \\      ",
            "   |  /  \\ \\  / /  \\  |   ",
            "   |  \\__/  \\/  \\__/  |   ",
            "    \\      /\\      /      ",
            "     \\    / /\\    /       ",
            "      \\__/ /  \\__/        "
        ]
    },
    kael: {
        name: "KAEL",
        fullName: "Kael Thorn",
        role: "Ferreiro de Codigo",
        color: "#fb923c",
        borderColor: "var(--orange-dim)",
        portrait: [
            "         ______            ",
            "        /      \\           ",
            "       / /\\  /\\ \\          ",
            "      / / =  = \\ \\         ",
            "     | |  \\  /  | |        ",
            "     | |   ||   | |        ",
            "      \\ \\  ||  / /         ",
            "       \\ '---' /           ",
            "        \\ | | /            ",
            "     ____\\| |/____         ",
            "    /  __ \\|/ __  \\        ",
            "   |  |  |   |  |  |       ",
            "   |  |__|   |__|  |       ",
            "    \\     / \\     /        ",
            "     \\   /   \\   /         ",
            "      \\_/     \\_/          "
        ]
    },
    mira: {
        name: "MIRA",
        fullName: "Mira Solis",
        role: "Cartografa",
        color: "#4ade80",
        borderColor: "var(--green-dim)",
        portrait: [
            "         ______            ",
            "        /      \\           ",
            "       / /\\  /\\ \\          ",
            "      / / o  o \\ \\         ",
            "     | |    <   | |        ",
            "     | |   |||  | |        ",
            "      \\ \\  ||| / /         ",
            "       \\ '---' /           ",
            "        \\  ~  /            ",
            "     ____\\   /____         ",
            "    /  __ \\ / __  \\        ",
            "   |  /  \\ V /  \\  |      ",
            "   |  \\__/   \\__/  |      ",
            "    \\     / \\     /        ",
            "     \\   /   \\   /         ",
            "      \\_/     \\_/          "
        ]
    },
    orin: {
        name: "ORIN",
        fullName: "Orin Vega",
        role: "Mensageiro",
        color: "#60a5fa",
        borderColor: "var(--blue-dim)",
        portrait: [
            "         ______            ",
            "        /      \\           ",
            "       / /\\  /\\ \\          ",
            "      / / ^  ^ \\ \\         ",
            "     | |   __   | |        ",
            "     | |  |  |  | |        ",
            "      \\ \\ |__| / /         ",
            "       \\ '---' /           ",
            "        \\     /            ",
            "     ____\\   /____         ",
            "    /  __ \\ / __  \\        ",
            "   |  /  \\ V /  \\  |      ",
            "   |  \\__/   \\__/  |      ",
            "    \\     / \\     /        ",
            "     \\   /   \\   /         ",
            "      \\_/     \\_/          "
        ]
    },
    elion: {
        name: "ELION",
        fullName: "Elion Dusk",
        role: "Bibliotecario",
        color: "#fbbf24",
        borderColor: "var(--gold-dim)",
        portrait: [
            "         ______            ",
            "        /      \\           ",
            "       / /\\  /\\ \\          ",
            "      / / o  o \\ \\         ",
            "     | |  (oo)  | |        ",
            "     | |   ||   | |        ",
            "      \\ \\  ||  / /         ",
            "       \\ '-||-' /          ",
            "        \\ [||] /           ",
            "     ____\\ || /____        ",
            "    /  __ \\||/ __  \\       ",
            "   |  |  |    |  |  |      ",
            "   |  |__|    |__|  |      ",
            "    \\     /\\      /        ",
            "     \\   / /\\    /         ",
            "      \\_/ /  \\__/          "
        ]
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
