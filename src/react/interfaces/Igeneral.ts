export interface NavLink {
  to: string;
  label: string;
  icon: string;
}

export interface Calculator {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Inventory {
  tabs: number;
  rows: number;
  columns: number;
}

export interface InventoryItem {
  name: string;
  type: string;
  rarity?: string;
  quantity?: number;
  description?: string;
}

export interface InventorySlotData {
  id: string;
  tabIndex: number;
  row: number;
  column: number;
  isLocked: boolean;
}
