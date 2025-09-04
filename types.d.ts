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

interface GlobalConfig {
  user: {
    name: string;
    role: Role;
    avatarPath: string;
    inventory: InventoryConfig;
    macros: MacroConfig;
  };
}

interface InventorySlotConfig {
  id: string;
  tabIndex: number;
  row: number;
  column: number;
  isLocked: boolean;
}

interface InventoryConfig {
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

interface MacroConfig {
  // Placeholder for macro configuration
  // This can be expanded based on your macro requirements
  enabled?: boolean;
}

type EventPayloadMapping = {
  "find-target-window": TargetWindowInfo | TargetErrorInfo | TargetNullInfo;
  "get-config": import("./src/electron/interfaces/Iconfig.js").GlobalConfig;
};

interface Window {
  electron: {
    findTargetWindow: () => Promise<TargetWindowInfo | TargetErrorInfo | TargetNullInfo>;
    getConfig();
  };
}
