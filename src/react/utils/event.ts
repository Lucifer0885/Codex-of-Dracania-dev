import type { BaseDifficulty, GameEvent, PWEventDifficulty } from "@interfaces/Ievent";

export const eventDifficulties: BaseDifficulty[] = [
  "normal",
  "painful",
  "excruciating",
  "fatal",
  "infernal",
  "merciless",
  "bloodshed",
];

export const extraEventDifficulties: PWEventDifficulty[] = ["pw-infernal", "pw-merciless", "pw-bloodshed"];

export const newMoonTable: GameEvent = {
  progressBar: [{ progress: 15000 }],
  attirePercentBonus: 0.5,
  dropRates: {
    normal: [240, 140],
    painful: 390,
    excruciating: 560,
    fatal: 700,
    infernal: 780,
    merciless: 928,
    bloodshed: 1200,
  },
};

export const newMoonTips: string[] = [
  "The attire is very worth to purchase, if you plan on farming the event a lot.",
  "Always try to spawn all 3 additional bosses for maximum drops.",
  "This event is best farmed in a group of 3 players, each spawning 1 additional boss for a total of 4 bosses or find a donor to spawn all 3 additional bosses.",
  "This event is like a mini DTU. If you need gems, consider farming this event a lot.",
  "Opening Amphora chests in the first event map is a decent way to get wood and boss entries.",
];

export const sargonTable: GameEvent = {
  progressBar: [{ progress: 50000 }],
  attirePercentBonus: 0.5,
  dropRates: {
    normal: [10, 103],
    painful: [15, 189],
    excruciating: [23, 291],
    fatal: [34, 501],
    infernal: [51, 810],
    merciless: [76, 1360],
    bloodshed: [114, 2235],
  },
};

export const sargonTips: string[] = [
  "The attire is not worth to purchase, as it does not provide a significant boost.",
  "This event is best farmed with at least 2 players, as the first map is quite long to solo.",
  "Each player should try to get at least 1 book drop per run to maximize clear speed.",
  "Consider using a speedrun strategy to clear the first map quickly.",
  "You can do bloodchests in the first map, but it is not very efficient.",
  "If you are struggling to find a group, consider joining the official DSO Discord and looking for a party there.",
];

export const fullMoonTable: GameEvent = {
  progressBar: [
    { level: 80, progress: 7500 },
    { level: 100, progress: 45000 },
  ],
  attirePercentBonus: 0.5,
  dropRates: {
    normal: [10, 13, 20],
    painful: [20, 19, 45],
    excruciating: [50, 26, 100],
    fatal: [87, 32, 175],
    infernal: [135, 39, 270],
    merciless: [270, 58, 540],
    bloodshed: [467, 71, 935],
  },
};
//TODO: Add tips
export const fullMoonTips: string[] = [];

export const desertOfEssencesTable: GameEvent = {
  progressBar: [{ progress: 4000 }],
  attirePercentBonus: 0.5,
  dropRates: {
    normal: 75,
    painful: 122,
    excruciating: 119,
    fatal: 150,
    infernal: 294,
    merciless: 361,
    bloodshed: 481,
  },
};
//TODO: Add tips
export const desertOfEssencesTips: string[] = [];
