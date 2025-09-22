import GemCalculator from "@pages/calculators/GemCalculator";
import RuneCalculator from "@pages/calculators/RuneCalculator";
import JewelCalculator from "@pages/calculators/JewelCalculator";
import OpalCalculator from "@pages/calculators/OpalCalculator";
import NewMoonCalculator from "@pages/calculators/NewMoonCalculator";
import SargonCalculator from "@pages/calculators/SargonCalculator";
import FullMoonCalculator from "@pages/calculators/FullMoonCalculator";
import DesertOfEssencesCalculator from "@pages/calculators/DesertOfEssencesCalculator";

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
  {
    path: "/calculators/event-sargon",
    element: SargonCalculator,
    key: "event-sargon",
  },
  {
    path: "/calculators/event-full-moon",
    element: FullMoonCalculator,
    key: "event-full-moon",
  },
  {
    path: "/calculators/event-desert-of-essences",
    element: DesertOfEssencesCalculator,
    key: "event-desert-of-essences",
  },
];
