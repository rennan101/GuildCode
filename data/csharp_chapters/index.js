/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — C# & UNITY 6.5 CHAPTERS DATA AGGREGATOR
   Agregador modular de todos os 38 capítulos de C# & Unity.
   Cada capítulo é mantido em seu arquivo isolado em data/csharp_chapters/
   ═══════════════════════════════════════════════════════════════ */

const { CAP_00 } = typeof require !== "undefined" ? require("./cap00.js") : { CAP_00: window.CAP_00 };
const { CAP_01 } = typeof require !== "undefined" ? require("./cap01.js") : { CAP_01: window.CAP_01 };
const { CAP_02 } = typeof require !== "undefined" ? require("./cap02.js") : { CAP_02: window.CAP_02 };
const { CAP_03 } = typeof require !== "undefined" ? require("./cap03.js") : { CAP_03: window.CAP_03 };
const { CAP_04 } = typeof require !== "undefined" ? require("./cap04.js") : { CAP_04: window.CAP_04 };
const { CAP_05 } = typeof require !== "undefined" ? require("./cap05.js") : { CAP_05: window.CAP_05 };
const { CAP_06 } = typeof require !== "undefined" ? require("./cap06.js") : { CAP_06: window.CAP_06 };
const { CAP_07 } = typeof require !== "undefined" ? require("./cap07.js") : { CAP_07: window.CAP_07 };
const { CAP_08 } = typeof require !== "undefined" ? require("./cap08.js") : { CAP_08: window.CAP_08 };
const { CAP_09 } = typeof require !== "undefined" ? require("./cap09.js") : { CAP_09: window.CAP_09 };
const { CAP_10 } = typeof require !== "undefined" ? require("./cap10.js") : { CAP_10: window.CAP_10 };
const { CAP_11 } = typeof require !== "undefined" ? require("./cap11.js") : { CAP_11: window.CAP_11 };
const { CAP_12 } = typeof require !== "undefined" ? require("./cap12.js") : { CAP_12: window.CAP_12 };
const { CAP_13 } = typeof require !== "undefined" ? require("./cap13.js") : { CAP_13: window.CAP_13 };
const { CAP_14 } = typeof require !== "undefined" ? require("./cap14.js") : { CAP_14: window.CAP_14 };
const { CAP_15 } = typeof require !== "undefined" ? require("./cap15.js") : { CAP_15: window.CAP_15 };
const { CAP_16 } = typeof require !== "undefined" ? require("./cap16.js") : { CAP_16: window.CAP_16 };
const { CAP_17 } = typeof require !== "undefined" ? require("./cap17.js") : { CAP_17: window.CAP_17 };
const { CAP_18 } = typeof require !== "undefined" ? require("./cap18.js") : { CAP_18: window.CAP_18 };
const { CAP_19 } = typeof require !== "undefined" ? require("./cap19.js") : { CAP_19: window.CAP_19 };
const { CAP_20 } = typeof require !== "undefined" ? require("./cap20.js") : { CAP_20: window.CAP_20 };
const { CAP_21 } = typeof require !== "undefined" ? require("./cap21.js") : { CAP_21: window.CAP_21 };
const { CAP_22 } = typeof require !== "undefined" ? require("./cap22.js") : { CAP_22: window.CAP_22 };
const { CAP_23 } = typeof require !== "undefined" ? require("./cap23.js") : { CAP_23: window.CAP_23 };
const { CAP_24 } = typeof require !== "undefined" ? require("./cap24.js") : { CAP_24: window.CAP_24 };
const { CAP_25 } = typeof require !== "undefined" ? require("./cap25.js") : { CAP_25: window.CAP_25 };
const { CAP_26 } = typeof require !== "undefined" ? require("./cap26.js") : { CAP_26: window.CAP_26 };
const { CAP_27 } = typeof require !== "undefined" ? require("./cap27.js") : { CAP_27: window.CAP_27 };
const { CAP_28 } = typeof require !== "undefined" ? require("./cap28.js") : { CAP_28: window.CAP_28 };
const { CAP_29 } = typeof require !== "undefined" ? require("./cap29.js") : { CAP_29: window.CAP_29 };
const { CAP_30 } = typeof require !== "undefined" ? require("./cap30.js") : { CAP_30: window.CAP_30 };
const { CAP_31 } = typeof require !== "undefined" ? require("./cap31.js") : { CAP_31: window.CAP_31 };
const { CAP_32 } = typeof require !== "undefined" ? require("./cap32.js") : { CAP_32: window.CAP_32 };
const { CAP_33 } = typeof require !== "undefined" ? require("./cap33.js") : { CAP_33: window.CAP_33 };
const { CAP_34 } = typeof require !== "undefined" ? require("./cap34.js") : { CAP_34: window.CAP_34 };
const { CAP_35 } = typeof require !== "undefined" ? require("./cap35.js") : { CAP_35: window.CAP_35 };
const { CAP_36 } = typeof require !== "undefined" ? require("./cap36.js") : { CAP_36: window.CAP_36 };
const { CAP_37 } = typeof require !== "undefined" ? require("./cap37.js") : { CAP_37: window.CAP_37 };

const CSHARP_CHAPTERS = [
    CAP_00,
    CAP_01,
    CAP_02,
    CAP_03,
    CAP_04,
    CAP_05,
    CAP_06,
    CAP_07,
    CAP_08,
    CAP_09,
    CAP_10,
    CAP_11,
    CAP_12,
    CAP_13,
    CAP_14,
    CAP_15,
    CAP_16,
    CAP_17,
    CAP_18,
    CAP_19,
    CAP_20,
    CAP_21,
    CAP_22,
    CAP_23,
    CAP_24,
    CAP_25,
    CAP_26,
    CAP_27,
    CAP_28,
    CAP_29,
    CAP_30,
    CAP_31,
    CAP_32,
    CAP_33,
    CAP_34,
    CAP_35,
    CAP_36,
    CAP_37
];

if (typeof module !== "undefined") {
    module.exports = { CSHARP_CHAPTERS };
}
if (typeof window !== "undefined") {
    window.CSHARP_CHAPTERS = CSHARP_CHAPTERS;
}
