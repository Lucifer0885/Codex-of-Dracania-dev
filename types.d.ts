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

type InventoryLayoutPreset = {
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
};

type InventoryConfig = {
  layout: {
    totalTabs: number;
    rowsPerTab: number;
    columnsPerRow: number;
  };

  lockedSlots: InventorySlotConfig[];

  // Simple preset selection - users choose from predefined presets
  selectedPresetName?: string; // Name of selected preset from DEFAULT_INVENTORY_PRESETS
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

// Macro Management Types
type MacroAction = "mouse-action" | "keyboard-action" | "wait";

type MacroType = "default" | "custom";

type MacroStep = {
  id: string;
  type: MacroAction;
  action: string;
  value: string;
  wait: number;
};

type Macro = {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  onRepeat: boolean;
  repeat: number;
  type: MacroType;
  keybinding?: string;
  actions: MacroStep[];
};

type MacroOperationResult = {
  success: boolean;
  error?: string;
  errors?: string[];
  data?: unknown;
};

type MacroListResult = {
  defaultMacros: Macro[];
  customMacros: Macro[];
  totalCount: number;
};

type MacroBuilderStep = {
  id: string;
  type: "keyboard-action" | "mouse-action" | "wait";
  action: string;
  value: string;
  wait: number;
  isValid: boolean;
  errors: string[];
};

type MacroBuilderData = {
  name: string;
  description: string;
  enabled: boolean;
  keybinding?: string;
  repeat: number;
  steps: MacroBuilderStep[];
  isValid: boolean;
  errors: string[];
};

type MacroStatistics = {
  total: number;
  default: number;
  custom: number;
  enabled: number;
  disabled: number;
  withKeybindings: number;
  conflicts: number;
};

type EventPayloadMapping = {
  "find-target-window": TargetWindowInfo | TargetErrorInfo | TargetNullInfo;
  "get-config": GlobalConfig;
  "save-inventory-config": GlobalConfig;
  "update-locked-slots": InventoryConfig;
  "reset-config": void;
  "update-user": UserInfo;
  "read-local-file": string;
  // Inventory Preset Management
  "get-available-presets": InventoryLayoutPreset[];
  "get-selected-preset": string | null;
  "set-selected-preset": string;
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
  // Macro Management events
  "macro-get-all": MacroListResult;
  "macro-get-by-id": Macro | null;
  "macro-create-custom": MacroOperationResult;
  "macro-update-custom": MacroOperationResult;
  "macro-delete-custom": MacroOperationResult;
  "macro-toggle-enabled": MacroOperationResult;
  "macro-clone-default": MacroOperationResult;
  "macro-import": MacroOperationResult;
  "macro-export-custom": MacroOperationResult;
  "macro-get-statistics": MacroOperationResult;
  // Macro Builder events
  "macro-builder-create-new": MacroBuilderData;
  "macro-builder-load-macro": MacroBuilderData | null;
  "macro-builder-add-step": MacroBuilderData;
  "macro-builder-update-step": MacroBuilderData;
  "macro-builder-remove-step": MacroBuilderData;
  "macro-builder-move-step": MacroBuilderData;
  "macro-builder-duplicate-step": MacroBuilderData;
  "macro-builder-save-macro": MacroOperationResult;
  "macro-builder-get-templates": Record<string, MacroBuilderStep[]>;
  "macro-builder-add-template": MacroBuilderData;
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
    // Inventory Preset Management API
    getAvailablePresets: () => Promise<InventoryLayoutPreset[]>;
    getSelectedPreset: () => Promise<string | null>;
    setSelectedPreset: (presetName: string) => Promise<string>;
    // Macro Management API
    macroGetAll: () => Promise<MacroListResult>;
    macroGetById: (macroId: string) => Promise<Macro | null>;
    macroCreateCustom: (macroData: Omit<Macro, "id" | "type">) => Promise<MacroOperationResult>;
    macroUpdateCustom: (macroId: string, updates: Partial<Omit<Macro, "id" | "type">>) => Promise<MacroOperationResult>;
    macroDeleteCustom: (macroId: string) => Promise<MacroOperationResult>;
    macroToggleEnabled: (macroId: string, enabled: boolean) => Promise<MacroOperationResult>;
    macroCloneDefault: (defaultMacroId: string, newName?: string) => Promise<MacroOperationResult>;
    macroImport: (macrosJson: string) => Promise<MacroOperationResult>;
    macroExportCustom: () => Promise<MacroOperationResult>;
    macroGetStatistics: () => Promise<MacroOperationResult>;
    // Macro Builder API
    macroBuilderCreateNew: () => Promise<MacroBuilderData>;
    macroBuilderLoadMacro: (macroId: string) => Promise<MacroBuilderData | null>;
    macroBuilderAddStep: (
      builderData: MacroBuilderData,
      stepType: "keyboard-action" | "mouse-action" | "wait"
    ) => Promise<MacroBuilderData>;
    macroBuilderUpdateStep: (
      builderData: MacroBuilderData,
      stepId: string,
      updates: Partial<MacroBuilderStep>
    ) => Promise<MacroBuilderData>;
    macroBuilderRemoveStep: (builderData: MacroBuilderData, stepId: string) => Promise<MacroBuilderData>;
    macroBuilderMoveStep: (
      builderData: MacroBuilderData,
      stepId: string,
      direction: "up" | "down"
    ) => Promise<MacroBuilderData>;
    macroBuilderDuplicateStep: (builderData: MacroBuilderData, stepId: string) => Promise<MacroBuilderData>;
    macroBuilderSaveMacro: (builderData: MacroBuilderData, existingMacroId?: string) => Promise<MacroOperationResult>;
    macroBuilderGetTemplates: () => Promise<Record<string, MacroBuilderStep[]>>;
    macroBuilderAddTemplate: (builderData: MacroBuilderData, templateName: string) => Promise<MacroBuilderData>;
  };
}
