export const calculators = [
  {
    id: "gem",
    name: "Gem Calculator",
    description: "Calculate the shiny dust needed to upgrade gems",
  },
  {
    id: "opal",
    name: "Opal Calculator",
    description: "Calculate the shiny dust needed to upgrade opal gems",
  },
  {
    id: "rune",
    name: "Rune Calculator",
    description: "Calculate the shiny dust needed to upgrade runes",
  },
];

export function getGemCost(ammount: number, gemTypeStart: string, gemTypeEnd: string): number {
  // Implement the logic to calculate the gem cost
}
