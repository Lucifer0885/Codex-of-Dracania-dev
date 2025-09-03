import { Role } from "./Igeneral.js";

export interface GlobalConfig {
  user: {
    name: string;
    role: Role;
    avatarPath: string;
    inventory: InventoryConfig;
    macros: MacroConfig;
  };
}

export interface InventorySlotConfig {
  id: string;
  tabIndex: number;
  row: number;
  column: number;
  isLocked: boolean;
}

export interface InventoryConfig {
  layout: {
    totalTabs: number;
    rowsPerTab: number;
    columnsPerRow: number;
  };

  lockedSlots: InventorySlotConfig[];

  autoSave: {
    enabled: boolean;
    intervalMs: number;
    saveOnlyLocked: boolean;
  };
}

export interface MacroConfig {
  // Placeholder for macro configuration
  // This can be expanded based on your macro requirements
  enabled?: boolean;
}
