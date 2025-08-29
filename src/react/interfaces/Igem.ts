export type RuneTier =
  | { name: "common"; cost: number }
  | { name: "uncommon"; cost: number }
  | { name: "magic"; cost: number }
  | { name: "rare"; cost: number }
  | { name: "epic"; cost: number };

export type RuneType = "offensive" | "defensive";

export interface Rune {
  id: string;
  name: string;
  tier: RuneTier;
  type: RuneType;
}

export type JewelTier =
  | { name: "common"; cost: number }
  | { name: "uncommon"; cost: number }
  | { name: "magic"; cost: number }
  | { name: "rare"; cost: number }
  | { name: "epic"; cost: number };

export interface Jewel {
  id: string;
  name: string;
  tier: JewelTier;
}

export type GemTier =
  | { name: "flawed"; cost: number }
  | { name: "splintered"; cost: number }
  | { name: "simple"; cost: number }
  | { name: "normal"; cost: number }
  | { name: "polished"; cost: number }
  | { name: "radiant"; cost: number }
  | { name: "flawless"; cost: number }
  | { name: "sacred"; cost: number }
  | { name: "royal"; cost: number }
  | { name: "trapezoid"; cost: number }
  | { name: "refined trapezoid"; cost: number }
  | { name: "brilliant trapezoid"; cost: number }
  | { name: "exquisite trapezoid"; cost: number }
  | { name: "imperial"; cost: number }
  | { name: "refined imperial"; cost: number }
  | { name: "brilliant imperial"; cost: number }
  | { name: "exquisite imperial"; cost: number };

export type GemType = "offensive" | "defensive";

export interface Gem {
  id: string;
  name: string;
  tier: GemTier;
  type: GemType;
}

export type OpalType =
  | "offensive-defensive-0-3"
  | "offensive-defensive-1-2"
  | "offensive-defensive-2-1"
  | "offensive-defensive-3-0";

export interface Opal {
  id: string;
  name: string;
  tier: GemTier;
  type: OpalType;
}
