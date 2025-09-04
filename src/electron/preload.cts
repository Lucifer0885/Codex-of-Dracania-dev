const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  findTargetWindow: () => ipcRendererInvoke("find-target-window"),
  getConfig: () => ipcRendererInvoke("get-config"),
  saveInventoryConfig: (config: InventoryConfig) => ipcRendererInvokeWithData("save-inventory-config", config),
  updateLockedSlots: (slots: InventorySlotConfig[]) => ipcRendererInvokeWithData("update-locked-slots", slots),
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
