import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev, loadConfig } from "./utils/util.js";
import { findWindow } from "./utils/findWindow.js";
import { getConfigPath, getPreloadPath, getUIPath } from "./utils/pathResolver.js";
import { ipcMainHandle, ipcMainHandleWithData } from "./utils/ipc.js";
import * as fs from "fs";

let mainWindow: BrowserWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 850,
    icon: path.join(app.getAppPath(), "/assets/dso.ico"),
    title: "Drakensang Online Utils",
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:3055");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  mainWindow.maximize();

  ipcMainHandle("get-config", async () => {
    const config = loadConfig();
    console.log("Main: get-config returning", config.user.inventory.lockedSlots.length, "locked slots");
    return config;
  });

  ipcMainHandleWithData<InventoryConfig, "save-inventory-config">("save-inventory-config", async (inventoryConfig) => {
    const currentConfig = loadConfig();
    currentConfig.user.inventory = inventoryConfig;
    fs.writeFileSync(getConfigPath(), JSON.stringify(currentConfig, null, 2));
    return currentConfig;
  });

  ipcMainHandleWithData<InventorySlotConfig[], "update-locked-slots">("update-locked-slots", async (lockedSlots) => {
    console.log("Main: update-locked-slots received", lockedSlots.length, "locked slots");
    const currentConfig = loadConfig();
    currentConfig.user.inventory.lockedSlots = lockedSlots;
    fs.writeFileSync(getConfigPath(), JSON.stringify(currentConfig, null, 2));
    console.log("Main: saved config with", lockedSlots.length, "locked slots");
    return currentConfig.user.inventory;
  });

  ipcMainHandle("find-target-window", async () => {
    return await findWindow(null, "Nebula3::MainWindow");
  });
});
