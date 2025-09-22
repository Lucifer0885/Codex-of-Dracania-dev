import NewMoonEventDetails from "@pages/events/NewMoonEventDetails";
import SargonEventDetails from "@pages/events/SargonEventDetails";
import FullMoonEventDetails from "@pages/events/FullMoonEventDetails";
import DesertofEssencesEventDetails from "@pages/events/DesertofEssencesEventDetails";

export const eventRouteConfig = [
  {
    path: "/events/new-moon",
    element: NewMoonEventDetails,
    key: "event-new-moon",
  },
  {
    path: "/events/sargon",
    element: SargonEventDetails,
    key: "event-sargon",
  },
  {
    path: "/events/full-moon",
    element: FullMoonEventDetails,
    key: "event-full-moon",
  },
  {
    path: "/events/desert-of-essences",
    element: DesertofEssencesEventDetails,
    key: "event-desert-of-essences",
  },
];
