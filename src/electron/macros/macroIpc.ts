import { ipcMainHandle, ipcMainHandleWithData } from "../utils/ipc.js";
import MacroStorageManager from "./MacroStorageManager.js";
import MacroBuilder from "./MacroBuilder.js";

const storageManager = new MacroStorageManager();
const macroBuilder = new MacroBuilder();

export function registerMacroIpcHandlers() {
  ipcMainHandle("macro-get-all", async () => {
    return storageManager.getAllMacros();
  });

  ipcMainHandleWithData<string, "macro-get-by-id">("macro-get-by-id", async (macroId) => {
    return storageManager.getMacroById(macroId);
  });

  ipcMainHandleWithData<Omit<Macro, "id" | "type">, "macro-create-custom">("macro-create-custom", async (macroData) => {
    return storageManager.createCustomMacro(macroData);
  });

  ipcMainHandleWithData<{ macroId: string; updates: Partial<Omit<Macro, "id" | "type">> }, "macro-update-custom">(
    "macro-update-custom",
    async ({ macroId, updates }) => {
      return storageManager.updateCustomMacro(macroId, updates);
    }
  );

  ipcMainHandleWithData<string, "macro-delete-custom">("macro-delete-custom", async (macroId) => {
    return storageManager.deleteCustomMacro(macroId);
  });

  ipcMainHandleWithData<{ macroId: string; enabled: boolean }, "macro-toggle-enabled">(
    "macro-toggle-enabled",
    async ({ macroId, enabled }) => {
      return storageManager.toggleMacroEnabled(macroId, enabled);
    }
  );

  ipcMainHandleWithData<{ defaultMacroId: string; newName?: string }, "macro-clone-default">(
    "macro-clone-default",
    async ({ defaultMacroId, newName }) => {
      return storageManager.cloneDefaultMacro(defaultMacroId, newName);
    }
  );

  ipcMainHandleWithData<string, "macro-import">("macro-import", async (macrosJson) => {
    return storageManager.importMacros(macrosJson);
  });

  ipcMainHandle("macro-export-custom", async () => {
    return storageManager.exportCustomMacros();
  });

  ipcMainHandle("macro-get-statistics", async () => {
    return storageManager.getStatistics();
  });

  ipcMainHandle("macro-builder-create-new", async () => {
    return macroBuilder.createNew();
  });

  ipcMainHandleWithData<string, "macro-builder-load-macro">("macro-builder-load-macro", async (macroId) => {
    return macroBuilder.loadMacro(macroId);
  });

  ipcMainHandleWithData<
    { builderData: MacroBuilderData; stepType: "keyboard-action" | "mouse-action" | "wait" },
    "macro-builder-add-step"
  >("macro-builder-add-step", async ({ builderData, stepType }) => {
    return macroBuilder.addStep(builderData, stepType);
  });

  ipcMainHandleWithData<
    { builderData: MacroBuilderData; stepId: string; updates: Partial<MacroBuilderStep> },
    "macro-builder-update-step"
  >("macro-builder-update-step", async ({ builderData, stepId, updates }) => {
    return macroBuilder.updateStep(builderData, stepId, updates);
  });

  ipcMainHandleWithData<{ builderData: MacroBuilderData; stepId: string }, "macro-builder-remove-step">(
    "macro-builder-remove-step",
    async ({ builderData, stepId }) => {
      return macroBuilder.removeStep(builderData, stepId);
    }
  );

  ipcMainHandleWithData<
    { builderData: MacroBuilderData; stepId: string; direction: "up" | "down" },
    "macro-builder-move-step"
  >("macro-builder-move-step", async ({ builderData, stepId, direction }) => {
    return macroBuilder.moveStep(builderData, stepId, direction);
  });

  ipcMainHandleWithData<{ builderData: MacroBuilderData; stepId: string }, "macro-builder-duplicate-step">(
    "macro-builder-duplicate-step",
    async ({ builderData, stepId }) => {
      return macroBuilder.duplicateStep(builderData, stepId);
    }
  );

  ipcMainHandleWithData<{ builderData: MacroBuilderData; existingMacroId?: string }, "macro-builder-save-macro">(
    "macro-builder-save-macro",
    async ({ builderData, existingMacroId }) => {
      return macroBuilder.saveMacro(builderData, existingMacroId);
    }
  );

  ipcMainHandle("macro-builder-get-templates", async () => {
    return macroBuilder.getStepTemplates();
  });

  ipcMainHandleWithData<{ builderData: MacroBuilderData; templateName: string }, "macro-builder-add-template">(
    "macro-builder-add-template",
    async ({ builderData, templateName }) => {
      return macroBuilder.addTemplate(builderData, templateName);
    }
  );
}
