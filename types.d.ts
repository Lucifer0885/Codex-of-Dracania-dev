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

type Role = "player" | "developer" | "contributor";

type GlobalConfig = {
  user: {
    name: string;
    role: Role;
    avatarPath: string;
    inventory: InventoryConfig;
    macros: MacroConfig;
  };
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
