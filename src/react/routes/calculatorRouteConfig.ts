import GemCalculator from "@pages/calculators/GemCalculator";
import RuneCalculator from "@pages/calculators/RuneCalculator";
import JewelCalculator from "@pages/calculators/JewelCalculator";
import OpalCalculator from "@pages/calculators/OpalCalculator";

export const calculatorRouteConfig = [
  {
    path: "/calculators/gem",
    element: GemCalculator,
    key: "gem",
  },
  {
    path: "/calculators/rune",
    element: RuneCalculator,
    key: "rune",
  },
  {
    path: "/calculators/jewel",
    element: JewelCalculator,
    key: "jewel",
  },
  {
    path: "/calculators/opal",
    element: OpalCalculator,
    key: "opal",
  },
];
