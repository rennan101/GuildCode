/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — C# & UNITY 6.5 CHAPTERS DATA AGGREGATOR
   Agregador modular de todos os 38 capítulos de C# & Unity.
   Cada capítulo é mantido em seu arquivo isolado em data/csharp_chapters/
   ═══════════════════════════════════════════════════════════════ */

// Em bundle unificado (window/global), CAP_00..CAP_37 já estão no escopo global.
// Para compatibilidade com Node.js (CommonJS) ou carregamento modular:
const _getCap = (name, file) => {
    try {
        if (typeof window !== "undefined" && window[name]) return window[name];
        if (typeof globalThis !== "undefined" && globalThis[name]) return globalThis[name];
        if (typeof require !== "undefined") {
            const mod = require(file);
            return mod[name] || mod;
        }
    } catch (e) {}
    return null;
};


const CSHARP_CHAPTERS = [
    typeof CAP_00 !== "undefined" ? CAP_00 : _getCap("CAP_00", "./cap00.js"),
    typeof CAP_01 !== "undefined" ? CAP_01 : _getCap("CAP_01", "./cap01.js"),
    typeof CAP_02 !== "undefined" ? CAP_02 : _getCap("CAP_02", "./cap02.js"),
    typeof CAP_03 !== "undefined" ? CAP_03 : _getCap("CAP_03", "./cap03.js"),
    typeof CAP_04 !== "undefined" ? CAP_04 : _getCap("CAP_04", "./cap04.js"),
    typeof CAP_05 !== "undefined" ? CAP_05 : _getCap("CAP_05", "./cap05.js"),
    typeof CAP_06 !== "undefined" ? CAP_06 : _getCap("CAP_06", "./cap06.js"),
    typeof CAP_07 !== "undefined" ? CAP_07 : _getCap("CAP_07", "./cap07.js"),
    typeof CAP_08 !== "undefined" ? CAP_08 : _getCap("CAP_08", "./cap08.js"),
    typeof CAP_09 !== "undefined" ? CAP_09 : _getCap("CAP_09", "./cap09.js"),
    typeof CAP_10 !== "undefined" ? CAP_10 : _getCap("CAP_10", "./cap10.js"),
    typeof CAP_11 !== "undefined" ? CAP_11 : _getCap("CAP_11", "./cap11.js"),
    typeof CAP_12 !== "undefined" ? CAP_12 : _getCap("CAP_12", "./cap12.js"),
    typeof CAP_13 !== "undefined" ? CAP_13 : _getCap("CAP_13", "./cap13.js"),
    typeof CAP_14 !== "undefined" ? CAP_14 : _getCap("CAP_14", "./cap14.js"),
    typeof CAP_15 !== "undefined" ? CAP_15 : _getCap("CAP_15", "./cap15.js"),
    typeof CAP_16 !== "undefined" ? CAP_16 : _getCap("CAP_16", "./cap16.js"),
    typeof CAP_17 !== "undefined" ? CAP_17 : _getCap("CAP_17", "./cap17.js"),
    typeof CAP_18 !== "undefined" ? CAP_18 : _getCap("CAP_18", "./cap18.js"),
    typeof CAP_19 !== "undefined" ? CAP_19 : _getCap("CAP_19", "./cap19.js"),
    typeof CAP_20 !== "undefined" ? CAP_20 : _getCap("CAP_20", "./cap20.js"),
    typeof CAP_21 !== "undefined" ? CAP_21 : _getCap("CAP_21", "./cap21.js"),
    typeof CAP_22 !== "undefined" ? CAP_22 : _getCap("CAP_22", "./cap22.js"),
    typeof CAP_23 !== "undefined" ? CAP_23 : _getCap("CAP_23", "./cap23.js"),
    typeof CAP_24 !== "undefined" ? CAP_24 : _getCap("CAP_24", "./cap24.js"),
    typeof CAP_25 !== "undefined" ? CAP_25 : _getCap("CAP_25", "./cap25.js"),
    typeof CAP_26 !== "undefined" ? CAP_26 : _getCap("CAP_26", "./cap26.js"),
    typeof CAP_27 !== "undefined" ? CAP_27 : _getCap("CAP_27", "./cap27.js"),
    typeof CAP_28 !== "undefined" ? CAP_28 : _getCap("CAP_28", "./cap28.js"),
    typeof CAP_29 !== "undefined" ? CAP_29 : _getCap("CAP_29", "./cap29.js"),
    typeof CAP_30 !== "undefined" ? CAP_30 : _getCap("CAP_30", "./cap30.js"),
    typeof CAP_31 !== "undefined" ? CAP_31 : _getCap("CAP_31", "./cap31.js"),
    typeof CAP_32 !== "undefined" ? CAP_32 : _getCap("CAP_32", "./cap32.js"),
    typeof CAP_33 !== "undefined" ? CAP_33 : _getCap("CAP_33", "./cap33.js"),
    typeof CAP_34 !== "undefined" ? CAP_34 : _getCap("CAP_34", "./cap34.js"),
    typeof CAP_35 !== "undefined" ? CAP_35 : _getCap("CAP_35", "./cap35.js"),
    typeof CAP_36 !== "undefined" ? CAP_36 : _getCap("CAP_36", "./cap36.js"),
    typeof CAP_37 !== "undefined" ? CAP_37 : _getCap("CAP_37", "./cap37.js")
];

if (typeof module !== "undefined") {
    module.exports = { CSHARP_CHAPTERS };
}
if (typeof window !== "undefined") {
    window.CSHARP_CHAPTERS = CSHARP_CHAPTERS;
}
