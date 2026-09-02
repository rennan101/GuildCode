/* ═══════════════════════════════════════════════════════════════
   CODE LEVELER — BOSS BATTLE RAIDS CONSTANTS
   Definições de tempo, multiplicadores, modificadores e estados
   ═══════════════════════════════════════════════════════════════ */

const RAID_ACTION_TIMERS = {
    attack: 60,
    counter: 45,
    dodge: 35,
    item: 45,
    revive: 60
};

const RAID_ACTION_MULTIPLIERS = {
    attack: 1.0,
    counter: 0.75,
    bossSingle: 1.0,
    bossMulti: 0.80,
    bossAoe: 0.65
};

const SUBCLASS_RAID_MODIFIERS = {
    hardcoder: {
        damageMultiplier: 1.15,
        speedBonus: 10,
        counterMultiplier: 1.10,
        defenseMultiplier: 0.95,
        dodgeBonus: 0.05
    },
    analyst: {
        damageMultiplier: 1.05,
        speedBonus: 5,
        counterMultiplier: 1.25,
        defenseMultiplier: 1.0,
        dodgeBonus: 0.15
    },
    debugger: {
        damageMultiplier: 0.95,
        speedBonus: 0,
        counterMultiplier: 0.90,
        defenseMultiplier: 1.25,
        reviveBonus: 0.20,
        dodgeBonus: 0.10
    },
    reviewer: {
        damageMultiplier: 1.0,
        speedBonus: 5,
        counterMultiplier: 1.0,
        defenseMultiplier: 1.05,
        healMultiplier: 1.30,
        partyXpBonus: 0.10,
        partyTokenBonus: 0.10
    },
    cheatcode: {
        damageMultiplier: 1.25,
        speedBonus: 15,
        counterMultiplier: 1.20,
        defenseMultiplier: 1.25,
        healMultiplier: 1.25,
        reviveBonus: 0.25,
        dodgeBonus: 0.15
    }
};

const RAID_SOUND_EVENTS = {
    attack: 'attack',
    damage: 'damage',
    item: 'item',
    dodge: 'dodge',
    counter: 'counter',
    revive: 'revive',
    playerDown: 'playerDown',
    bossDefeat: 'bossDefeat',
    victory: 'victory',
    miss: 'miss'
};

const RAID_STATUS = {
    LOBBY: 'LOBBY',
    COUNTDOWN: 'COUNTDOWN',
    ACTIVE: 'ACTIVE',
    BOSS_TURN: 'BOSS_TURN',
    PLAYER_TURN: 'PLAYER_TURN',
    RESOLVING: 'RESOLVING',
    VICTORY: 'VICTORY',
    DEFEAT: 'DEFEAT',
    FINISHED: 'FINISHED'
};

const PLAYER_COMBAT_STATUS = {
    ACTIVE: 'ACTIVE',
    TARGETED: 'TARGETED',
    DOWNED: 'DOWNED',
    DISCONNECTED: 'DISCONNECTED'
};

const BOSS_ACTION_WEIGHTS = {
    SINGLE_TARGET: 0.50,
    MULTI_TARGET: 0.35,
    AOE: 0.15
};

const RECONNECT_WINDOW_MS = 60000;

window.RAID_ACTION_TIMERS = RAID_ACTION_TIMERS;
window.RAID_ACTION_MULTIPLIERS = RAID_ACTION_MULTIPLIERS;
window.SUBCLASS_RAID_MODIFIERS = SUBCLASS_RAID_MODIFIERS;
window.RAID_SOUND_EVENTS = RAID_SOUND_EVENTS;
window.RAID_STATUS = RAID_STATUS;
window.PLAYER_COMBAT_STATUS = PLAYER_COMBAT_STATUS;
window.BOSS_ACTION_WEIGHTS = BOSS_ACTION_WEIGHTS;
window.RECONNECT_WINDOW_MS = RECONNECT_WINDOW_MS;
