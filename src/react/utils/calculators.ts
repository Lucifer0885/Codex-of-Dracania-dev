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

export const calculators: Calculator[] = [
  {
    id: "gem",
    name: "Gem Calculator",
    description: "Calculate the shiny dust needed to upgrade gems",
    image: "/src/react/assets/gem.png",
  },
  {
    id: "rune",
    name: "Rune Calculator",
    description: "Calculate the shiny dust needed to upgrade runes",
    image: "/src/react/assets/rune.png",
  },
  {
    id: "jewel",
    name: "Jewel Calculator",
    description: "Calculate the shiny dust needed to upgrade jewels",
    image: "/src/react/assets/jewel.png",
  },
  {
    id: "opal-create",
    name: "Opal Creation Calculator",
    description: "Calculate the shiny dust needed to create opal gems",
    image: "/src/react/assets/gem.png",
  },
  {
    id: "opal-upgrade",
    name: "Opal Upgrade Calculator",
    description: "Calculate the shiny dust needed to upgrade opal gems",
    image: "/src/react/assets/gem.png",
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
