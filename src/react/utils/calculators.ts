import type { BaseDifficulty, EventCalculatorResult } from "@interfaces/Ievent";
import type { GemTier, GemType, JewelTier, OpalTier, RuneTier, RuneType } from "@interfaces/Igem";
import type { Calculator } from "@interfaces/Igeneral";
import {
  DefensiveGemTiers,
  DefensiveRuneTier,
  JewelTiers,
  OffensiveGemTiers,
  OffensiveRuneTier,
  OpalTiersCreate,
  OpalTiersUpgrade,
  UtilityRuneTier,
} from "@utils/gem";
import { desertOfEssencesTable, fullMoonTable, newMoonTable, sargonTable } from "@utils/events/event";

export const calculators: Calculator[] = [
  {
    id: "gem",
    name: "Gem Calculator",
    description: "Calculate the shiny dust needed to upgrade gems",
    image: "/src/react/assets/gem/gem.png",
  },
  {
    id: "rune",
    name: "Rune Calculator",
    description: "Calculate the shiny dust needed to upgrade runes",
    image: "/src/react/assets/gem/rune.png",
  },
  {
    id: "jewel",
    name: "Jewel Calculator",
    description: "Calculate the shiny dust needed to upgrade jewels",
    image: "/src/react/assets/gem/jewel.png",
  },
  {
    id: "opal",
    name: "Opal Calculator",
    description: "Calculate the shiny dust needed to create or upgrade opal gems",
    image: "/src/react/assets/gem/gem.png",
  },
  {
    id: "event-new-moon",
    name: "New Moon Event Calculator",
    description: "Calculate the boss kills needed for the New Moon event",
    image: "/src/react/assets/events/newmoon/tabicon_newmoon.png",
  },
  {
    id: "event-sargon",
    name: "Sargon Event Calculator",
    description: "Calculate the runs needed for the Sargon event",
    image: "/src/react/assets/events/sargon/tabicon_sargon.png",
  },
  {
    id: "event-full-moon",
    name: "Full Moon Event Calculator",
    description: "Calculate the runs needed to finish for the Full Moon event",
    image: "/src/react/assets/events/newmoon/tabicon_newmoon.png",
  },
  {
    id: "event-desert-of-essences",
    name: "Desert of Essences Event Calculator",
    description: "Calculate the runs needed to finish for the Desert of Essences event",
    image: "/src/react/assets/events/newmoon/tabicon_newmoon.png",
  },
];

export function getGemCost(amount: number, gemTierStart: GemTier, gemTierEnd: GemTier, gemType: GemType): number {
  const gemTiers = gemType === "offensive" ? OffensiveGemTiers : DefensiveGemTiers;

  const startIndex = gemTiers.findIndex((tier) => tier.name === gemTierStart.name);
  const endIndex = gemTiers.findIndex((tier) => tier.name === gemTierEnd.name);

  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    throw new Error("Invalid gem tiers");
  }

  let totalCost = 0;
  for (let i = startIndex; i < endIndex; i++) {
    totalCost += gemTiers[i].cost * amount;
  }

  return totalCost;
}

export function getRuneCost(
  amount: number,
  runeTierStart: RuneTier,
  runeTierEnd: RuneTier,
  runeType: RuneType
): number {
  const runeTiers =
    runeType === "offensive" ? OffensiveRuneTier : runeType === "defensive" ? DefensiveRuneTier : UtilityRuneTier;

  const startIndex = runeTiers.findIndex((tier) => tier.name === runeTierStart.name);
  const endIndex = runeTiers.findIndex((tier) => tier.name === runeTierEnd.name);

  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    throw new Error("Invalid rune tiers");
  }

  let totalCost = 0;
  for (let i = startIndex; i < endIndex; i++) {
    totalCost += runeTiers[i].cost * amount;
  }

  return totalCost;
}

export function getJewelCost(amount: number, jewelTierStart: JewelTier, jewelTierEnd: JewelTier): number {
  const startIndex = JewelTiers.findIndex((tier) => tier.name === jewelTierStart.name);
  const endIndex = JewelTiers.findIndex((tier) => tier.name === jewelTierEnd.name);

  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    throw new Error("Invalid jewel tiers");
  }

  let totalCost = 0;
  for (let i = startIndex; i < endIndex; i++) {
    totalCost += JewelTiers[i].cost * amount;
  }

  return totalCost;
}

export function getOpalCreateCost(amount: number, opalTier: OpalTier): number {
  const opalTiers = OpalTiersCreate;

  const tier = opalTiers.find((t) => t.name === opalTier.name);
  if (!tier) {
    throw new Error("Invalid opal tier");
  }

  return tier.cost * amount;
}

export function getOpalUpgradeCost(amount: number, opalTierStart: OpalTier, opalTierEnd: OpalTier): number {
  const opalTiers = OpalTiersUpgrade;

  const startIndex = opalTiers.findIndex((tier) => tier.name === opalTierStart.name);
  const endIndex = opalTiers.findIndex((tier) => tier.name === opalTierEnd.name);

  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    throw new Error("Invalid opal tiers");
  }

  let totalCost = 0;
  for (let i = startIndex; i < endIndex; i++) {
    totalCost += opalTiers[i].cost * amount;
  }

  return totalCost;
}

export function getNewMoonRuns(
  difficulty: BaseDifficulty,
  haveAttire: boolean,
  bossesSpawned: number
): EventCalculatorResult {
  const dropPerDiff = newMoonTable["dropRates"][difficulty];
  if (!dropPerDiff) throw new Error("Invalid difficulty");

  if (bossesSpawned < 1 || bossesSpawned > 4) throw new Error("Bosses spawned must be between 1 and 4");

  let drop = 0;

  if (haveAttire) {
    if (newMoonTable.attirePercentBonus) {
      drop =
        typeof dropPerDiff === "number"
          ? (dropPerDiff + dropPerDiff * newMoonTable.attirePercentBonus) * bossesSpawned
          : (dropPerDiff[0] +
              dropPerDiff[0] * newMoonTable.attirePercentBonus +
              (dropPerDiff[1] + dropPerDiff[1] * newMoonTable.attirePercentBonus)) *
            bossesSpawned;
    }
  } else {
    drop =
      typeof dropPerDiff === "number"
        ? dropPerDiff * bossesSpawned
        : dropPerDiff[0] * bossesSpawned + dropPerDiff[1] * bossesSpawned;
  }

  const runs = Math.ceil(newMoonTable.progressBar[0].progress / drop);

  return { runs, drop: Math.floor(drop) };
}

export function getSargonRuns(difficulty: BaseDifficulty, haveAttire: boolean): EventCalculatorResult {
  const dropPerDiff = sargonTable["dropRates"][difficulty];
  if (!dropPerDiff) throw new Error("Invalid difficulty");
  if (typeof dropPerDiff === "number") throw new Error("Internal error, please report this");

  let drop = 0;

  if (haveAttire) {
    if (sargonTable.attirePercentBonus) {
      drop =
        (dropPerDiff[0] + dropPerDiff[0] * sargonTable.attirePercentBonus) * 3 +
        (dropPerDiff[1] + dropPerDiff[1] * sargonTable.attirePercentBonus);
    }
  } else {
    drop = dropPerDiff[0] * 3 + dropPerDiff[1];
  }

  const runs = Math.ceil(sargonTable.progressBar[0].progress / drop);

  return { runs, drop: Math.floor(drop) };
}

export function getFullMoonRuns(difficulty: BaseDifficulty, haveAttire: boolean, level: number): EventCalculatorResult {
  const dropPerDiff = fullMoonTable["dropRates"][difficulty];
  if (!dropPerDiff) throw new Error("Invalid difficulty");
  if (typeof dropPerDiff === "number") throw new Error("Internal error, please report this");

  let drop = 0;

  if (haveAttire) {
    if (fullMoonTable.attirePercentBonus) {
      drop =
        dropPerDiff[0] +
        dropPerDiff[0] * fullMoonTable.attirePercentBonus +
        (dropPerDiff[1] + dropPerDiff[1] * fullMoonTable.attirePercentBonus) * 3 +
        (dropPerDiff[2] + dropPerDiff[2] * fullMoonTable.attirePercentBonus);
    }
  } else {
    drop = dropPerDiff[0] + dropPerDiff[1] * 3 + dropPerDiff[2];
  }

  if (level >= 20 && level <= 80) {
    const runs = Math.ceil(fullMoonTable.progressBar[0].progress / drop);

    return { runs, drop: Math.floor(drop) };
  } else if (level > 80 && level <= 100) {
    const runs = Math.ceil(fullMoonTable.progressBar[1].progress / drop);
    return { runs, drop: Math.floor(drop) };
  } else {
    throw new Error("Level must be between 20 and 100");
  }
}

export function getDesertOfEssencesRuns(difficulty: BaseDifficulty, haveAttire: boolean): EventCalculatorResult {
  const dropPerDiff = desertOfEssencesTable["dropRates"][difficulty];
  if (!dropPerDiff) throw new Error("Invalid difficulty");
  if (Array.isArray(dropPerDiff)) throw new Error("Internal error, please report this");

  let drop = 0;

  if (haveAttire) {
    if (desertOfEssencesTable.attirePercentBonus) {
      drop = dropPerDiff + dropPerDiff * desertOfEssencesTable.attirePercentBonus;
    }
  } else {
    drop = dropPerDiff;
  }

  const runs = Math.ceil(desertOfEssencesTable.progressBar[0].progress / drop);

  return { runs, drop: Math.floor(drop) };
}
