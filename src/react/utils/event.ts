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
  progressBar: 15000,
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
