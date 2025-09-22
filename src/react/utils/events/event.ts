import type { BaseDifficulty, Event, PWEventDifficulty } from "@interfaces/Ievent";
import { DesertOfEssencesEventItems, NewMoonEventItems, SargonEventItems } from "@utils/events/eventItems";
import { FullMoonEventItems } from "@utils/events/FullMoonItems";
import { desertOfEssencesTips, fullMoonTips, newMoonTips, sargonTips } from "@utils/events/eventTips";

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

// New Moon Event
export const newMoonTable: Event = {
  id: "new-moon",
  name: "New Moon",
  image: "/src/react/assets/events/newmoon/tabicon_newmoon.png",
  description: "A mysterious event that occurs during the new moon.",
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
  eventTips: newMoonTips,
  items: NewMoonEventItems,
};

// Sargon Event
export const sargonTable: Event = {
  id: "sargon",
  name: "Sargon",
  image: "/src/react/assets/events/sargon/tabicon_sargon.png",
  description: "A challenging event featuring the powerful Sargon.",
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
  eventTips: sargonTips,
  items: SargonEventItems,
};

// Full Moon Event
export const fullMoonTable: Event = {
  id: "full-moon",
  name: "Full Moon",
  image: "/src/react/assets/events/event.png",
  description: "A mystical event that takes place during the full moon.",
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
  eventTips: fullMoonTips,
  items: FullMoonEventItems,
};

// Desert of Essences Event
export const desertOfEssencesTable: Event = {
  id: "desert-of-essences",
  name: "Desert of Essences",
  image: "/src/react/assets/events/event.png",
  description: "Explore the Desert of Essences and uncover its secrets.",
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
  eventTips: desertOfEssencesTips,
  items: DesertOfEssencesEventItems,
};

export const EventsList: Event[] = [newMoonTable, sargonTable, fullMoonTable, desertOfEssencesTable];
