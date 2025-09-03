const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  findTargetWindow: () => ipcRendererInvoke("find-target-window"),
} satisfies Window["electron"]);

function ipcRendererInvoke<Key extends keyof EventPayloadMapping>(key: Key) {
  return electron.ipcRenderer.invoke(key);
}

function ipcRendererOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  const cb = (_: Electron.IpcRendererEvent, payload: any) => callback(payload);
  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}
