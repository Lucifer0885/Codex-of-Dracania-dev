export const DEFAULT_INVENTORY_PRESETS: InventoryLayoutPreset[] = [
  {
    windowWidth: 1920,
    windowHeight: 1080,
    name: "Full HD Window (1920x1080)",
    firstSlot: { x: 1375, y: 640 },
    firstTab: { x: 1345, y: 570 },
    gaps: { tabX: 50, columnX: 81, rowY: 81 },
  },
  {
    windowWidth: 1600,
    windowHeight: 900,
    name: "Medium Window (1600x900)",
    firstSlot: { x: 1150, y: 510 },
    firstTab: { x: 1130, y: 460 },
    gaps: { tabX: 40, columnX: 65, rowY: 65 },
  },
  {
    windowWidth: 2560,
    windowHeight: 1440,
    name: "2K QHD (2560x1440)",
    firstSlot: { x: 1829, y: 885 },
    firstTab: { x: 1794, y: 768 },
    gaps: { tabX: 67, columnX: 115, rowY: 115 },
  },
  {
    windowWidth: 3840,
    windowHeight: 2160,
    name: "4K UHD (3840x2160)",
    firstSlot: { x: 607, y: 363 },
    firstTab: { x: 598, y: 315 },
    gaps: { tabX: 50, columnX: 85, rowY: 104 },
  },
];
