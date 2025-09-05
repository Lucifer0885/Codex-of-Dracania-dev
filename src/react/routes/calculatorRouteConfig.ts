import GemCalculator from "@pages/calculators/GemCalculator";
import RuneCalculator from "@pages/calculators/RuneCalculator";
import JewelCalculator from "@pages/calculators/JewelCalculator";
import OpalCalculator from "@pages/calculators/OpalCalculator";
import NewMoonCalculator from "@pages/calculators/NewMoonCalculator";

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
  {
    path: "/calculators/event-new-moon",
    element: NewMoonCalculator,
    key: "event-new-moon",
  },
];
