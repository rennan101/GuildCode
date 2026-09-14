/**
 * GUILDCODE — C# Unity Abyss Chambers Data Aggregator
 * Agrega os 38 andares modulares de data/csharp_abyss/
 */

const _getFloor = (name, file) => {
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

const CSHARP_SIDE_QUESTS = {
  "csharp_ch0": typeof CSHARP_ABYSS_FLOOR_00 !== "undefined" ? CSHARP_ABYSS_FLOOR_00 : _getFloor("CSHARP_ABYSS_FLOOR_00", "./floor00.js"),
  "csharp_ch1": typeof CSHARP_ABYSS_FLOOR_01 !== "undefined" ? CSHARP_ABYSS_FLOOR_01 : _getFloor("CSHARP_ABYSS_FLOOR_01", "./floor01.js"),
  "csharp_ch2": typeof CSHARP_ABYSS_FLOOR_02 !== "undefined" ? CSHARP_ABYSS_FLOOR_02 : _getFloor("CSHARP_ABYSS_FLOOR_02", "./floor02.js"),
  "csharp_ch3": typeof CSHARP_ABYSS_FLOOR_03 !== "undefined" ? CSHARP_ABYSS_FLOOR_03 : _getFloor("CSHARP_ABYSS_FLOOR_03", "./floor03.js"),
  "csharp_ch4": typeof CSHARP_ABYSS_FLOOR_04 !== "undefined" ? CSHARP_ABYSS_FLOOR_04 : _getFloor("CSHARP_ABYSS_FLOOR_04", "./floor04.js"),
  "csharp_ch5": typeof CSHARP_ABYSS_FLOOR_05 !== "undefined" ? CSHARP_ABYSS_FLOOR_05 : _getFloor("CSHARP_ABYSS_FLOOR_05", "./floor05.js"),
  "csharp_ch6": typeof CSHARP_ABYSS_FLOOR_06 !== "undefined" ? CSHARP_ABYSS_FLOOR_06 : _getFloor("CSHARP_ABYSS_FLOOR_06", "./floor06.js"),
  "csharp_ch7": typeof CSHARP_ABYSS_FLOOR_07 !== "undefined" ? CSHARP_ABYSS_FLOOR_07 : _getFloor("CSHARP_ABYSS_FLOOR_07", "./floor07.js"),
  "csharp_ch8": typeof CSHARP_ABYSS_FLOOR_08 !== "undefined" ? CSHARP_ABYSS_FLOOR_08 : _getFloor("CSHARP_ABYSS_FLOOR_08", "./floor08.js"),
  "csharp_ch9": typeof CSHARP_ABYSS_FLOOR_09 !== "undefined" ? CSHARP_ABYSS_FLOOR_09 : _getFloor("CSHARP_ABYSS_FLOOR_09", "./floor09.js"),
  "csharp_ch10": typeof CSHARP_ABYSS_FLOOR_10 !== "undefined" ? CSHARP_ABYSS_FLOOR_10 : _getFloor("CSHARP_ABYSS_FLOOR_10", "./floor10.js"),
  "csharp_ch11": typeof CSHARP_ABYSS_FLOOR_11 !== "undefined" ? CSHARP_ABYSS_FLOOR_11 : _getFloor("CSHARP_ABYSS_FLOOR_11", "./floor11.js"),
  "csharp_ch12": typeof CSHARP_ABYSS_FLOOR_12 !== "undefined" ? CSHARP_ABYSS_FLOOR_12 : _getFloor("CSHARP_ABYSS_FLOOR_12", "./floor12.js"),
  "csharp_ch13": typeof CSHARP_ABYSS_FLOOR_13 !== "undefined" ? CSHARP_ABYSS_FLOOR_13 : _getFloor("CSHARP_ABYSS_FLOOR_13", "./floor13.js"),
  "csharp_ch14": typeof CSHARP_ABYSS_FLOOR_14 !== "undefined" ? CSHARP_ABYSS_FLOOR_14 : _getFloor("CSHARP_ABYSS_FLOOR_14", "./floor14.js"),
  "csharp_ch15": typeof CSHARP_ABYSS_FLOOR_15 !== "undefined" ? CSHARP_ABYSS_FLOOR_15 : _getFloor("CSHARP_ABYSS_FLOOR_15", "./floor15.js"),
  "csharp_ch16": typeof CSHARP_ABYSS_FLOOR_16 !== "undefined" ? CSHARP_ABYSS_FLOOR_16 : _getFloor("CSHARP_ABYSS_FLOOR_16", "./floor16.js"),
  "csharp_ch17": typeof CSHARP_ABYSS_FLOOR_17 !== "undefined" ? CSHARP_ABYSS_FLOOR_17 : _getFloor("CSHARP_ABYSS_FLOOR_17", "./floor17.js"),
  "csharp_ch18": typeof CSHARP_ABYSS_FLOOR_18 !== "undefined" ? CSHARP_ABYSS_FLOOR_18 : _getFloor("CSHARP_ABYSS_FLOOR_18", "./floor18.js"),
  "csharp_ch19": typeof CSHARP_ABYSS_FLOOR_19 !== "undefined" ? CSHARP_ABYSS_FLOOR_19 : _getFloor("CSHARP_ABYSS_FLOOR_19", "./floor19.js"),
  "csharp_ch20": typeof CSHARP_ABYSS_FLOOR_20 !== "undefined" ? CSHARP_ABYSS_FLOOR_20 : _getFloor("CSHARP_ABYSS_FLOOR_20", "./floor20.js"),
  "csharp_ch21": typeof CSHARP_ABYSS_FLOOR_21 !== "undefined" ? CSHARP_ABYSS_FLOOR_21 : _getFloor("CSHARP_ABYSS_FLOOR_21", "./floor21.js"),
  "csharp_ch22": typeof CSHARP_ABYSS_FLOOR_22 !== "undefined" ? CSHARP_ABYSS_FLOOR_22 : _getFloor("CSHARP_ABYSS_FLOOR_22", "./floor22.js"),
  "csharp_ch23": typeof CSHARP_ABYSS_FLOOR_23 !== "undefined" ? CSHARP_ABYSS_FLOOR_23 : _getFloor("CSHARP_ABYSS_FLOOR_23", "./floor23.js"),
  "csharp_ch24": typeof CSHARP_ABYSS_FLOOR_24 !== "undefined" ? CSHARP_ABYSS_FLOOR_24 : _getFloor("CSHARP_ABYSS_FLOOR_24", "./floor24.js"),
  "csharp_ch25": typeof CSHARP_ABYSS_FLOOR_25 !== "undefined" ? CSHARP_ABYSS_FLOOR_25 : _getFloor("CSHARP_ABYSS_FLOOR_25", "./floor25.js"),
  "csharp_ch26": typeof CSHARP_ABYSS_FLOOR_26 !== "undefined" ? CSHARP_ABYSS_FLOOR_26 : _getFloor("CSHARP_ABYSS_FLOOR_26", "./floor26.js"),
  "csharp_ch27": typeof CSHARP_ABYSS_FLOOR_27 !== "undefined" ? CSHARP_ABYSS_FLOOR_27 : _getFloor("CSHARP_ABYSS_FLOOR_27", "./floor27.js"),
  "csharp_ch28": typeof CSHARP_ABYSS_FLOOR_28 !== "undefined" ? CSHARP_ABYSS_FLOOR_28 : _getFloor("CSHARP_ABYSS_FLOOR_28", "./floor28.js"),
  "csharp_ch29": typeof CSHARP_ABYSS_FLOOR_29 !== "undefined" ? CSHARP_ABYSS_FLOOR_29 : _getFloor("CSHARP_ABYSS_FLOOR_29", "./floor29.js"),
  "csharp_ch30": typeof CSHARP_ABYSS_FLOOR_30 !== "undefined" ? CSHARP_ABYSS_FLOOR_30 : _getFloor("CSHARP_ABYSS_FLOOR_30", "./floor30.js"),
  "csharp_ch31": typeof CSHARP_ABYSS_FLOOR_31 !== "undefined" ? CSHARP_ABYSS_FLOOR_31 : _getFloor("CSHARP_ABYSS_FLOOR_31", "./floor31.js"),
  "csharp_ch32": typeof CSHARP_ABYSS_FLOOR_32 !== "undefined" ? CSHARP_ABYSS_FLOOR_32 : _getFloor("CSHARP_ABYSS_FLOOR_32", "./floor32.js"),
  "csharp_ch33": typeof CSHARP_ABYSS_FLOOR_33 !== "undefined" ? CSHARP_ABYSS_FLOOR_33 : _getFloor("CSHARP_ABYSS_FLOOR_33", "./floor33.js"),
  "csharp_ch34": typeof CSHARP_ABYSS_FLOOR_34 !== "undefined" ? CSHARP_ABYSS_FLOOR_34 : _getFloor("CSHARP_ABYSS_FLOOR_34", "./floor34.js"),
  "csharp_ch35": typeof CSHARP_ABYSS_FLOOR_35 !== "undefined" ? CSHARP_ABYSS_FLOOR_35 : _getFloor("CSHARP_ABYSS_FLOOR_35", "./floor35.js"),
  "csharp_ch36": typeof CSHARP_ABYSS_FLOOR_36 !== "undefined" ? CSHARP_ABYSS_FLOOR_36 : _getFloor("CSHARP_ABYSS_FLOOR_36", "./floor36.js"),
  "csharp_ch37": typeof CSHARP_ABYSS_FLOOR_37 !== "undefined" ? CSHARP_ABYSS_FLOOR_37 : _getFloor("CSHARP_ABYSS_FLOOR_37", "./floor37.js"),
};

if (typeof module !== "undefined") {
  module.exports = { CSHARP_SIDE_QUESTS };
}
if (typeof window !== "undefined") {
  window.CSHARP_SIDE_QUESTS = CSHARP_SIDE_QUESTS;
}
