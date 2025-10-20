const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  openExternal: (url: string, options?: unknown) => ipcRendererInvokeWithData("open-external", { url, options }),
  getAppVersion: () => ipcRendererInvoke("get-app-version"),
  updateMessage: (callback: (message: string) => void) => ipcRendererOn("update-message", callback),
  findTargetWindow: () => ipcRendererInvoke("find-target-window"),
  getConfig: () => ipcRendererInvoke("get-config"),
  saveInventoryConfig: (config: InventoryConfig) => ipcRendererInvokeWithData("save-inventory-config", config),
  updateLockedSlots: (slots: InventorySlotConfig[]) => ipcRendererInvokeWithData("update-locked-slots", slots),
  resetConfig: () => ipcRendererInvoke("reset-config"),
  updateUserConfig: (data: UserInfo) => ipcRendererInvokeWithData("update-user", data),
  readLocalFile: (filePath: string) => ipcRendererInvokeWithData("read-local-file", filePath),
  // Config import/export
  exportConfig: () => ipcRendererInvoke("export-config"),
  importConfig: () => ipcRendererInvoke("import-config"),
  // Inventory Preset Management API
  getAvailablePresets: () => ipcRendererInvoke("get-available-presets"),
  getSelectedPreset: () => ipcRendererInvoke("get-selected-preset"),
  setSelectedPreset: (presetName: string) => ipcRendererInvokeWithData("set-selected-preset", presetName),
  // Macro Management API
  macroGetAll: () => ipcRendererInvoke("macro-get-all"),
  macroGetById: (macroId: string) => ipcRendererInvokeWithData("macro-get-by-id", macroId),
  macroCreateCustom: (macroData: any) => ipcRendererInvokeWithData("macro-create-custom", macroData),
  macroUpdateCustom: (macroId: string, updates: any) =>
    ipcRendererInvokeWithData("macro-update-custom", { macroId, updates }),
  macroDeleteCustom: (macroId: string) => ipcRendererInvokeWithData("macro-delete-custom", macroId),
  macroToggleEnabled: (macroId: string, enabled: boolean) =>
    ipcRendererInvokeWithData("macro-toggle-enabled", { macroId, enabled }),
  macroCloneDefault: (defaultMacroId: string, newName?: string) =>
    ipcRendererInvokeWithData("macro-clone-default", { defaultMacroId, newName }),
  macroImport: (macrosJson: string) => ipcRendererInvokeWithData("macro-import", macrosJson),
  macroExportCustom: () => ipcRendererInvoke("macro-export-custom"),
  macroGetStatistics: () => ipcRendererInvoke("macro-get-statistics"),
  // Macro Builder API
  macroBuilderCreateNew: () => ipcRendererInvoke("macro-builder-create-new"),
  macroBuilderLoadMacro: (macroId: string) => ipcRendererInvokeWithData("macro-builder-load-macro", macroId),
  macroBuilderAddStep: (builderData: any, stepType: any) =>
    ipcRendererInvokeWithData("macro-builder-add-step", { builderData, stepType }),
  macroBuilderUpdateStep: (builderData: any, stepId: string, updates: any) =>
    ipcRendererInvokeWithData("macro-builder-update-step", { builderData, stepId, updates }),
  macroBuilderRemoveStep: (builderData: any, stepId: string) =>
    ipcRendererInvokeWithData("macro-builder-remove-step", { builderData, stepId }),
  macroBuilderMoveStep: (builderData: any, stepId: string, direction: any) =>
    ipcRendererInvokeWithData("macro-builder-move-step", { builderData, stepId, direction }),
  macroBuilderDuplicateStep: (builderData: any, stepId: string) =>
    ipcRendererInvokeWithData("macro-builder-duplicate-step", { builderData, stepId }),
  macroBuilderSaveMacro: (builderData: any, existingMacroId?: string) =>
    ipcRendererInvokeWithData("macro-builder-save-macro", { builderData, existingMacroId }),
  macroBuilderGetTemplates: () => ipcRendererInvoke("macro-builder-get-templates"),
  macroBuilderAddTemplate: (builderData: any, templateName: string) =>
    ipcRendererInvokeWithData("macro-builder-add-template", { builderData, templateName }),
  // Bonus Codes
  getAllBonusCodes: (params?: {
    page?: number;
    limit?: number;
    sortBy?: "startDate" | "endDate" | "name" | "id";
    order?: "asc" | "desc";
  }) => ipcRendererInvokeWithData("get-all-bonus-codes", params || {}),
  getActiveBonusCodes: () => ipcRendererInvoke("get-active-bonus-codes"),
  getBonusCode: (codeId: string) => ipcRendererInvokeWithData("get-bonus-code", codeId),
} satisfies Window["electron"]);

function ipcRendererInvoke<Key extends keyof EventPayloadMapping>(key: Key) {
  return electron.ipcRenderer.invoke(key);
}

function ipcRendererInvokeWithData<Key extends keyof EventPayloadMapping>(key: Key, data: any) {
  return electron.ipcRenderer.invoke(key, data);
}

function ipcRendererOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}

function ipcRendererOnce<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.once(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}
