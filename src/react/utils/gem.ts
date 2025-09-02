import type { GemTier, JewelTier, OpalTier, RuneTier } from "@interfaces/Igem";

export const OffensiveGemTiers: GemTier[] = [
  { name: "flawed", cost: 2 },
  { name: "splintered", cost: 6 },
  { name: "simple", cost: 10 },
  { name: "normal", cost: 20 },
  { name: "polished", cost: 50 },
  { name: "radiant", cost: 150 },
  { name: "flawless", cost: 450 },
  { name: "sacred", cost: 1000 },
  { name: "royal", cost: 2000 },
  { name: "trapezoid", cost: 3500 },
  { name: "refined trapezoid", cost: 5500 },
  { name: "brilliant trapezoid", cost: 8000 },
  { name: "exquisite trapezoid", cost: 11000 },
  { name: "imperial", cost: 14500 },
  { name: "refined imperial", cost: 18500 },
  { name: "brilliant imperial", cost: 23000 },
  { name: "exquisite imperial", cost: 0 },
];

export const DefensiveGemTiers: GemTier[] = [
  { name: "flawed", cost: 2 },
  { name: "splintered", cost: 4 },
  { name: "simple", cost: 8 },
  { name: "normal", cost: 16 },
  { name: "polished", cost: 40 },
  { name: "radiant", cost: 120 },
  { name: "flawless", cost: 360 },
  { name: "sacred", cost: 800 },
  { name: "royal", cost: 1600 },
  { name: "trapezoid", cost: 2800 },
  { name: "refined trapezoid", cost: 4400 },
  { name: "brilliant trapezoid", cost: 6400 },
  { name: "exquisite trapezoid", cost: 8800 },
  { name: "imperial", cost: 11600 },
  { name: "refined imperial", cost: 14800 },
  { name: "brilliant imperial", cost: 18400 },
  { name: "exquisite imperial", cost: 0 },
];

export const OffensiveRuneTier: RuneTier[] = [
  { name: "common", cost: 3126 },
  { name: "uncommon", cost: 8596 },
  { name: "magic", cost: 17188 },
  { name: "rare", cost: 28908 },
  { name: "epic", cost: 0 },
];

export const DefensiveRuneTier: RuneTier[] = [
  { name: "common", cost: 2500 },
  { name: "uncommon", cost: 6876 },
  { name: "magic", cost: 13750 },
  { name: "rare", cost: 23126 },
  { name: "epic", cost: 0 },
];

export const UtilityRuneTier: RuneTier[] = [
  { name: "common", cost: 250 },
  { name: "uncommon", cost: 688 },
  { name: "magic", cost: 1375 },
  { name: "rare", cost: 2313 },
  { name: "epic", cost: 0 },
];

export const JewelTiers: JewelTier[] = [
  { name: "common", cost: 3000 },
  { name: "uncommon", cost: 8250 },
  { name: "magic", cost: 16500 },
  { name: "rare", cost: 27750 },
  { name: "epic", cost: 0 },
];

export const OpalTiersUpgrade: OpalTier[] = [
  { name: "royal", cost: 4500 },
  { name: "trapezoid", cost: 7875 },
  { name: "refined trapezoid", cost: 12375 },
  { name: "brilliant trapezoid", cost: 18000 },
  { name: "exquisite trapezoid", cost: 25700 },
  { name: "imperial", cost: 32625 },
  { name: "refined imperial", cost: 41625 },
  { name: "brilliant imperial", cost: 51750 },
  { name: "exquisite imperial", cost: 0 },
];

export const OpalTiersCreate: OpalTier[] = [
  { name: "royal", cost: 4500 },
  { name: "trapezoid", cost: 7875 },
  { name: "refined trapezoid", cost: 12375 },
  { name: "brilliant trapezoid", cost: 18000 },
  { name: "exquisite trapezoid", cost: 24750 },
  { name: "imperial", cost: 32625 },
  { name: "refined imperial", cost: 41625 },
  { name: "brilliant imperial", cost: 51750 },
  { name: "exquisite imperial", cost: 63000 },
];
