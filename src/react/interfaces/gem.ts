export type RuneTier = "common" | "uncommon" | "magic" | "rare" | "epic";

export interface Rune {
  id: string;
  name: string;
  tier: RuneTier;
}

export type JewelTier = "common" | "uncommon" | "magic" | "rare" | "epic";

export interface Jewel {
  id: string;
  name: string;
  tier: JewelTier;
}

export type GemTier =
  | "flawed"
  | "splintered"
  | "simple"
  | "normal"
  | "radiant"
  | "flawless"
  | "sacred"
  | "royal"
  | "trapezoid"
  | "refined trapezoid"
  | "brilliant trapezoid"
  | "exquisite trapezoid"
  | "imperial"
  | "refined imperial"
  | "brilliant imperial"
  | "exquisite imperial";

export interface Gem {
  id: string;
  name: string;
  tier: GemTier;
}

export type OpalType =
  | "offensive-defensive-0-3"
  | "offensive-defensive-1-2"
  | "offensive-defensive-2-1"
  | "offensive-defensive-3-0";

export interface Opal extends Gem {
  type: OpalType;
}
