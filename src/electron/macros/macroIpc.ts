import { ipcMainHandle, ipcMainHandleWithData } from "../utils/ipc.js";
import MacroStorageManager from "./MacroStorageManager.js";
import MacroBuilder from "./MacroBuilder.js";

const storageManager = new MacroStorageManager();
const macroBuilder = new MacroBuilder();

// Macro Storage IPC Handlers
export function registerMacroIpcHandlers() {
  // Get all macros
  ipcMainHandle("macro-get-all", async () => {
    return storageManager.getAllMacros();
  });

  // Get macro by ID
  ipcMainHandleWithData<string, "macro-get-by-id">("macro-get-by-id", async (macroId) => {
    return storageManager.getMacroById(macroId);
  });

  // Create custom macro
  ipcMainHandleWithData<Omit<Macro, "id" | "type">, "macro-create-custom">("macro-create-custom", async (macroData) => {
    return storageManager.createCustomMacro(macroData);
  });

  // Update custom macro
  ipcMainHandleWithData<{ macroId: string; updates: Partial<Omit<Macro, "id" | "type">> }, "macro-update-custom">(
    "macro-update-custom",
    async ({ macroId, updates }) => {
      return storageManager.updateCustomMacro(macroId, updates);
    }
  );

  // Delete custom macro
  ipcMainHandleWithData<string, "macro-delete-custom">("macro-delete-custom", async (macroId) => {
    return storageManager.deleteCustomMacro(macroId);
  });

  // Toggle macro enabled/disabled
  ipcMainHandleWithData<{ macroId: string; enabled: boolean }, "macro-toggle-enabled">(
    "macro-toggle-enabled",
    async ({ macroId, enabled }) => {
      return storageManager.toggleMacroEnabled(macroId, enabled);
    }
  );

  // Clone default macro
  ipcMainHandleWithData<{ defaultMacroId: string; newName?: string }, "macro-clone-default">(
    "macro-clone-default",
    async ({ defaultMacroId, newName }) => {
      return storageManager.cloneDefaultMacro(defaultMacroId, newName);
    }
  );

  // Import macros
  ipcMainHandleWithData<string, "macro-import">("macro-import", async (macrosJson) => {
    return storageManager.importMacros(macrosJson);
  });

  // Export custom macros
  ipcMainHandle("macro-export-custom", async () => {
    return storageManager.exportCustomMacros();
  });

  // Get statistics
  ipcMainHandle("macro-get-statistics", async () => {
    return storageManager.getStatistics();
  });

  // Macro Builder IPC Handlers

  // Create new builder instance
  ipcMainHandle("macro-builder-create-new", async () => {
    return macroBuilder.createNew();
  });

  // Load macro into builder
  ipcMainHandleWithData<string, "macro-builder-load-macro">("macro-builder-load-macro", async (macroId) => {
    return macroBuilder.loadMacro(macroId);
  });

  // Add step
  ipcMainHandleWithData<
    { builderData: MacroBuilderData; stepType: "keyboard-action" | "mouse-action" | "wait" },
    "macro-builder-add-step"
  >("macro-builder-add-step", async ({ builderData, stepType }) => {
    return macroBuilder.addStep(builderData, stepType);
  });

  // Update step
  ipcMainHandleWithData<
    { builderData: MacroBuilderData; stepId: string; updates: Partial<MacroBuilderStep> },
    "macro-builder-update-step"
  >("macro-builder-update-step", async ({ builderData, stepId, updates }) => {
    return macroBuilder.updateStep(builderData, stepId, updates);
  });

  // Remove step
  ipcMainHandleWithData<{ builderData: MacroBuilderData; stepId: string }, "macro-builder-remove-step">(
    "macro-builder-remove-step",
    async ({ builderData, stepId }) => {
      return macroBuilder.removeStep(builderData, stepId);
    }
  );

  // Move step
  ipcMainHandleWithData<
    { builderData: MacroBuilderData; stepId: string; direction: "up" | "down" },
    "macro-builder-move-step"
  >("macro-builder-move-step", async ({ builderData, stepId, direction }) => {
    return macroBuilder.moveStep(builderData, stepId, direction);
  });

  // Duplicate step
  ipcMainHandleWithData<{ builderData: MacroBuilderData; stepId: string }, "macro-builder-duplicate-step">(
    "macro-builder-duplicate-step",
    async ({ builderData, stepId }) => {
      return macroBuilder.duplicateStep(builderData, stepId);
    }
  );

  // Save macro
  ipcMainHandleWithData<{ builderData: MacroBuilderData; existingMacroId?: string }, "macro-builder-save-macro">(
    "macro-builder-save-macro",
    async ({ builderData, existingMacroId }) => {
      return macroBuilder.saveMacro(builderData, existingMacroId);
    }
  );

  // Get step templates
  ipcMainHandle("macro-builder-get-templates", async () => {
    return macroBuilder.getStepTemplates();
  });

  // Add template
  ipcMainHandleWithData<{ builderData: MacroBuilderData; templateName: string }, "macro-builder-add-template">(
    "macro-builder-add-template",
    async ({ builderData, templateName }) => {
      return macroBuilder.addTemplate(builderData, templateName);
    }
  );
}
