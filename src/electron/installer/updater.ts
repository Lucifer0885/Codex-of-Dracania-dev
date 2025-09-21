import electronUpdater, { type AppUpdater } from "electron-updater";

export function getAppUpdater(): AppUpdater {
  const { autoUpdater } = electronUpdater;
  return autoUpdater;
}
