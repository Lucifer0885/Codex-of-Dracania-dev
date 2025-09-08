type GlobalConfig = {
  user: UserInfo;
  targetWindow: TargetWindowConfig;
};

type UserInfo = {
  name: string;
  role: Role;
  avatars: { path: string; selected: boolean }[];
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
  enabled: boolean;
  defaultMacros: Macro[];
  customMacros: Macro[];
  executionSettings: {
    maxConcurrentMacros: number; // Limit simultaneous executions
    defaultStepDelay: number; // Default delay between steps
  };
  lastModified: number;
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
  "reset-config": void;
  "update-user": UserInfo;
  "read-local-file": string;
  // Basic macro events
  "get-macros": {
    defaultMacros: Macro[];
    customMacros: Macro[];
    settings: { maxConcurrentMacros: number; defaultStepDelay: number };
  };
  "execute-macro-by-id": { success: boolean; executionId?: string; error?: string };
  // Keybinding events
  "refresh-keybinds": { success: boolean };
  "get-registered-keybinds": Array<{ keybind: string; macroId: string }>;
};

interface Window {
  electron: {
    findTargetWindow: () => Promise<TargetWindowInfo | TargetErrorInfo | TargetNullInfo>;
    getConfig: () => Promise<GlobalConfig>;
    saveInventoryConfig: (config: InventoryConfig) => Promise<GlobalConfig>;
    updateLockedSlots: (slots: InventorySlotConfig[]) => Promise<InventoryConfig>;
    resetConfig: () => Promise<void>;
    updateUserConfig: (data: UserInfo) => Promise<UserInfo>;
    readLocalFile: (filePath: string) => Promise<string>;
  };
}
