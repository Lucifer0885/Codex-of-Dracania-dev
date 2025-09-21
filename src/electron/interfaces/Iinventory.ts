export interface InventorySlotPosition {
  x: number;
  y: number;
  tabIndex: number;
  row: number;
  column: number;
}

export interface InventoryLayoutPreset {
  windowWidth: number;
  windowHeight: number;
  name: string;

  firstSlot: {
    x: number;
    y: number;
  };

  firstTab: {
    x: number;
    y: number;
  };

  gaps: {
    tabX: number;
    columnX: number;
    rowY: number;
  };
}
