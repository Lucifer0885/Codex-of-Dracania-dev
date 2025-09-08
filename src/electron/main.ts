import { app, BrowserWindow } from "electron";
import path from "path";
import { getMimeType, isDev, windowSizeListener } from "./utils/util.js";
import { loadConfig, resetConfig } from "./utils/config.js";
import { findWindow } from "./utils/targetWindow.js";
import { getConfigPath, getPreloadPath, getUIPath } from "./utils/pathResolver.js";
import { ipcMainHandle, ipcMainHandleWithData } from "./utils/ipc.js";
import fs from "fs";

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
    return config;
  });

  ipcMainHandleWithData<InventoryConfig, "save-inventory-config">("save-inventory-config", async (inventoryConfig) => {
    const currentConfig = loadConfig();
    currentConfig.user.inventory = inventoryConfig;
    fs.writeFileSync(getConfigPath(), JSON.stringify(currentConfig, null, 2));
    return currentConfig;
  });

  ipcMainHandleWithData<InventorySlotConfig[], "update-locked-slots">("update-locked-slots", async (lockedSlots) => {
    const currentConfig = loadConfig();
    currentConfig.user.inventory.lockedSlots = lockedSlots;
    fs.writeFileSync(getConfigPath(), JSON.stringify(currentConfig, null, 2));
    return currentConfig.user.inventory;
  });

  ipcMainHandle("find-target-window", async () => {
    return await findWindow(null, "Nebula3::MainWindow");
  });

  ipcMainHandle("reset-config", async () => {
    console.log("Resetting config...");
    resetConfig();
  });

  ipcMainHandleWithData<UserInfo, "update-user">("update-user", async (user) => {
    const currentConfig = loadConfig();
    currentConfig.user = user;
    fs.writeFileSync(getConfigPath(), JSON.stringify(currentConfig, null, 2));
    return currentConfig.user;
  });

  ipcMainHandleWithData<string, "read-local-file">("read-local-file", async (filePath) => {
    try {
      const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
      const ext = path.extname(filePath).toLowerCase();

      if (!allowedExtensions.includes(ext)) {
        throw new Error("File type not allowed");
      }

      if (!fs.existsSync(filePath)) {
        throw new Error("File not found");
      }

      const fileBuffer = fs.readFileSync(filePath);
      const mimeType = getMimeType(ext);
      const base64Data = fileBuffer.toString("base64");

      return `data:${mimeType};base64,${base64Data}`;
    } catch (error) {
      console.error("Error reading local file:", error);
      throw error;
    }
  });

  windowSizeListener();
});
