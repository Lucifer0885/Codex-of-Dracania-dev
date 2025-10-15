import NewMoonEventDetails from "@pages/events/NewMoonEventDetails";
import SargonEventDetails from "@pages/events/SargonEventDetails";
import FullMoonEventDetails from "@pages/events/FullMoonEventDetails";
import DesertofEssencesEventDetails from "@pages/events/DesertofEssencesEventDetails";
import GhostFestivalEventDetails from "@pages/events/GhostFestivalEventDetails";
import GhostFestivalMiniEventDetails from "@pages/events/GhostFestivalMiniEventDetails";

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
  {
    path: "/events/ghost-festival",
    element: GhostFestivalEventDetails,
    key: "event-ghost-festival",
  },
  {
    path: "/events/ghost-festival-mini",
    element: GhostFestivalMiniEventDetails,
    key: "event-ghost-festival-mini",
  },
];
