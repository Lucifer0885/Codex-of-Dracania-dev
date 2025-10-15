import type { BaseDifficulty, Event, PWEventDifficulty } from "@interfaces/Ievent";
import { FullMoonEventItems1, FullMoonEventItems2, fullMoonTips } from "@utils/events/FullMoonItems";
import { NewMoonEventItems1, NewMoonEventItems2, NewMoonTips } from "@utils/events/NewMoonItems";
import { DesertOfEssencesEventItems, desertOfEssencesTips } from "@utils/events/DesertOfEssencesItems";
import {
  SargonEventItems1,
  SargonEventItems2,
  SargonEventItems3,
  SargonEventItems4,
  SargonEventItems5,
  SargonTips,
} from "@utils/events/SargonItems";
import { ImageExporter } from "@utils/ImageExporter";
import {
  GhostFestivalEventItems,
  GhostFestivalMiniEventItems,
  GhostFestivalMiniTips,
  GhostFestivalTips,
} from "./GhostFestivalItems";

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
  image: ImageExporter.tabIconNewmoon,
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
  eventTips: NewMoonTips,
  items: [NewMoonEventItems1, NewMoonEventItems2],
};

// Sargon Event
export const sargonTable: Event = {
  id: "sargon",
  name: "Terrifying Shadows",
  image: ImageExporter.tabIconSargon,
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
  eventTips: SargonTips,
  items: [SargonEventItems1, SargonEventItems2, SargonEventItems3, SargonEventItems4, SargonEventItems5],
};

// Full Moon Event
export const fullMoonTable: Event = {
  id: "full-moon",
  name: "Full Moon",
  image: ImageExporter.tabIconFullmoon,
  description:
    "The full moon rises over Varholm! Join the hunt, slay cursed werewolves, and confront the Bloodmage for treasures hidden in the night.",
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
  items: [FullMoonEventItems1, FullMoonEventItems2],
};

// Desert of Essences Event
export const desertOfEssencesTable: Event = {
  id: "desert-of-essences",
  name: "Desert of Essences",
  image: ImageExporter.tabIconDoe,
  description: "Thabo found a wondrous place in Qaizah. Mysterious and deadly. Are you willing to unveil its secrets?",
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
  items: [DesertOfEssencesEventItems],
};

// Ghost Festival Event
export const ghostFestivalTable: Event = {
  id: "ghost-festival",
  name: "Ghost Festival",
  image: ImageExporter.tabIconGhostFestival,
  description:
    "Once upon a time, there was a wicked, yet beautiful queen. When she died, the people rejoiced. When she returns... begging for mercy won't save you.",
  progressBar: [{ progress: 167500 }],
  attirePercentBonus: 0.5,
  dropRates: {
    normal: 50,
    painful: 75,
    excruciating: 100,
    fatal: 125,
    infernal: 200,
    merciless: 300,
    bloodshed: 400,
  },
  eventTips: GhostFestivalTips,
  items: [GhostFestivalEventItems],
};

// Ghost Festival Mini Event - Return of the Dead
export const ghostFestivalMiniTable: Event = {
  id: "ghost-festival-mini",
  name: "Return of the Dead",
  image: ImageExporter.tabIconGhostFestival,
  description: "Beware the beast, it eats your flesh. Beware the beast, it brings the dead...",
  progressBar: [{ progress: 234500 }],
  attirePercentBonus: 0.5,
  dropRates: {
    normal: 95,
    painful: 125,
    excruciating: 250,
    fatal: 400,
    infernal: 550,
    merciless: 1115,
    bloodshed: 1500,
  },
  eventTips: GhostFestivalMiniTips,
  items: [GhostFestivalMiniEventItems],
};

export const EventsList: Event[] = [
  newMoonTable,
  sargonTable,
  fullMoonTable,
  desertOfEssencesTable,
  ghostFestivalTable,
  ghostFestivalMiniTable,
];
