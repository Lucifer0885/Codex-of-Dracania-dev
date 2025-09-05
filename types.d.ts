type GlobalConfig = {
  user: UserInfo;
  targetWindow: TargetWindowConfig;
};

type UserInfo = {
  name: string;
  role: Role;
  avatarPath: string;
  inventory: InventoryConfig;
  macros: MacroConfig;
};

type Role = "player" | "developer" | "contributor";

type TargetWindowConfig = {
  class: string;
  title: string;
  handle: string | null;
  size: TargetWindowSize;
};

type TargetWindowSize = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type InventorySlotConfig = {
  id: string;
  tabIndex: number;
  row: number;
  column: number;
  isLocked: boolean;
};

type InventoryConfig = {
  layout: {
    totalTabs: number;
    rowsPerTab: number;
    columnsPerRow: number;
  };

  lockedSlots: InventorySlotConfig[];
};

type MacroConfig = {
  // Placeholder for macro configuration
  // This can be expanded based on your macro requirements
  enabled?: boolean;
};

type TargetNullInfo = {
  found: false;
  handle: null;
  title: string | null;
  className: string | null;
  error: string;
  timestamp: number;
};

type TargetWindowInfo = {
  found: boolean;
  handle: string | null;
  title: string | null;
  className: string | null;
  timestamp: number;
};

type TargetErrorInfo = {
  found: false;
  handle: null;
  title: string | null;
  className: string | null;
  error: string;
  timestamp: number;
};

type EventPayloadMapping = {
  "find-target-window": TargetWindowInfo | TargetErrorInfo | TargetNullInfo;
  "get-config": GlobalConfig;
  "save-inventory-config": GlobalConfig;
  "update-locked-slots": InventoryConfig;
};

interface Window {
  electron: {
    findTargetWindow: () => Promise<TargetWindowInfo | TargetErrorInfo | TargetNullInfo>;
    getConfig: () => Promise<GlobalConfig>;
    saveInventoryConfig: (config: InventoryConfig) => Promise<GlobalConfig>;
    updateLockedSlots: (slots: InventorySlotConfig[]) => Promise<InventoryConfig>;
  };
}
