import { Macro } from "../interfaces/Imacro.js";

export const defaultMacros: Macro[] = [
  {
    id: "health-potion",
    name: "Use Health Potion",
    description: "Quickly use a health potion (default key: H)",
    enabled: true,
    onRepeat: false,
    repeat: 1,
    type: "default",
    keybinding: "F5",
    actions: [
      {
        id: "hp-1",
        type: "keyboard-action",
        action: "key-press",
        value: "H",
        wait: 100,
      },
    ],
  },
  {
    id: "sell-inventory",
    name: "Sell Inventory",
    description:
      "Automates selling items in inventory by right-clicking each slot, skipping locked slots. DO NOT MOVE THE MOUSE DURING THE PROCESS",
    enabled: true,
    onRepeat: false,
    repeat: 1,
    type: "default",
    keybinding: "Ctrl+Alt+F",
    actions: [],
  },
  {
    id: "melt-inventory",
    name: "Melt Inventory",
    description:
      "Automates melting items in inventory by dragging each slot to the melt area, skipping locked slots. DO NOT MOVE THE MOUSE DURING THE PROCESS",
    enabled: true,
    onRepeat: false,
    repeat: 1,
    type: "default",
    keybinding: "Ctrl+Shift+M",
    actions: [],
  },
];
