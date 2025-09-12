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
  // First slot position (row 1, column 1)
  firstSlot: {
    x: number;
    y: number;
  };
  // First tab position
  firstTab: {
    x: number;
    y: number;
  };
  // Gaps between elements
  gaps: {
    tabX: number; // Gap between tabs (X only)
    columnX: number; // Gap between item slots in columns (X only)
    rowY: number; // Gap between rows (Y only)
  };
}
