import fs from "fs";
import path from "path";
import { app, BrowserWindow, shell } from "electron";
import { handleCloseEvents, isDev, windowSizeListener } from "./utils/util.js";
import { loadConfig, resetConfig, createConfig, importConfig, exportConfig } from "./utils/config.js";
import { findWindow } from "./utils/targetWindow.js";
import { getAssetsPath, getConfigPath, getPreloadPath, getUIPath, readLocalFile } from "./utils/pathResolver.js";
import { ipcMainHandle, ipcMainHandleWithData, ipcWebContentsSend } from "./utils/ipc.js";
import KeybindingManager from "./macros/KeybindingManager.js";
import MacroManager from "./macros/MacroManager.js";
import { container, SERVICE_KEYS } from "./utils/diContainer.js";
import { registerMacroIpcHandlers } from "./macros/macroIpc.js";
import { getAppUpdater } from "./installer/updater.js";
import { initTray } from "./tray.js";
import { InitMenu } from "./menu.js";
import { getActiveBonusCodes, getBonusCodeById, getBonusCodes } from "./api/bonusCodes.js";

let mainWindow: BrowserWindow;
const autoUpdater = getAppUpdater();
autoUpdater.autoDownload = true; // Enable auto-download
autoUpdater.autoInstallOnAppQuit = true;

container.registerSingleton(SERVICE_KEYS.MACRO_MANAGER, () => new MacroManager());
container.registerSingleton(SERVICE_KEYS.KEYBINDING_MANAGER, () => {
  const macroManager = container.get<MacroManager>(SERVICE_KEYS.MACRO_MANAGER);
  return new KeybindingManager(macroManager);
});

const keybindingManager = container.get<KeybindingManager>(SERVICE_KEYS.KEYBINDING_MANAGER);

app.whenReady().then(() => {
  if (!fs.existsSync(getConfigPath())) {
    createConfig();
  }

  mainWindow = new BrowserWindow({
    minWidth: 1200,
    minHeight: 850,
    icon: path.join(getAssetsPath(), "/dracania-codex@3x.png"),
    title: "Codex of Dracania",
    webPreferences: {
      preload: getPreloadPath(),
      devTools: isDev(),
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:3055");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  initTray(mainWindow);
  InitMenu();

  handleCloseEvents(mainWindow);

  // Setup auto-updater event listeners BEFORE checking for updates
  autoUpdater.on("checking-for-update", () => {
    console.log("Checking for updates...");
  });

  autoUpdater.on("update-available", (info) => {
    console.log("Update available:", info);
    ipcWebContentsSend("update-message", mainWindow.webContents, "Update available. Downloading...");
  });

  autoUpdater.on("update-not-available", (info) => {
    console.log("Update not available:", info);
  });

  autoUpdater.on("error", (err) => {
    if (err) ipcWebContentsSend("update-message", mainWindow.webContents, `Update error: ${err.message}`);
  });

  autoUpdater.on("download-progress", (progressObj) => {
    const logMessage = `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred}/${progressObj.total})`;
    console.log(logMessage);
    ipcWebContentsSend(
      "update-message",
      mainWindow.webContents,
      `Downloading update: ${Math.round(progressObj.percent)}%`
    );
  });

  autoUpdater.on("update-downloaded", (info) => {
    console.log("Update downloaded:", info);
    ipcWebContentsSend("update-message", mainWindow.webContents, "Update downloaded. It will be installed on restart.");
  });

  autoUpdater.checkForUpdates().catch((err) => {
    console.error("Failed to check for updates:", err);
  });

  mainWindow.maximize();

  keybindingManager.registerMacroKeybinds();
  registerMacroIpcHandlers();

  ipcMainHandle("get-app-version", async () => {
    return app.getVersion();
  });

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

  ipcMainHandle("get-available-presets", async () => {
    const { getAvailablePresets } = await import("./utils/inventoryCalculations.js");
    return getAvailablePresets();
  });

  ipcMainHandle("get-selected-preset", async () => {
    const currentConfig = loadConfig();
    return currentConfig.user.inventory.selectedPresetName || null;
  });

  ipcMainHandleWithData<string, "set-selected-preset">("set-selected-preset", async (presetName) => {
    const currentConfig = loadConfig();
    currentConfig.user.inventory.selectedPresetName = presetName;
    fs.writeFileSync(getConfigPath(), JSON.stringify(currentConfig, null, 2));
    return presetName;
  });

  ipcMainHandle("find-target-window", async () => {
    return await findWindow(null, "Nebula3::MainWindow");
  });

  ipcMainHandleWithData<{ url: string; options?: unknown }, "open-external">(
    "open-external",
    async ({ url, options }) => {
      try {
        await shell.openExternal(url, options as Electron.OpenExternalOptions);
        return { success: true };
      } catch (error) {
        console.error("Failed to open external URL:", error);
        throw error;
      }
    }
  );

  ipcMainHandle("reset-config", async () => {
    resetConfig();
  });

  ipcMainHandle("export-config", async () => {
    return exportConfig(mainWindow);
  });

  ipcMainHandle("import-config", async () => {
    return importConfig(mainWindow);
  });

  ipcMainHandleWithData<UserInfo, "update-user">("update-user", async (user) => {
    const currentConfig = loadConfig();
    currentConfig.user = user;
    fs.writeFileSync(getConfigPath(), JSON.stringify(currentConfig, null, 2));
    return currentConfig.user;
  });

  ipcMainHandleWithData<string, "read-local-file">("read-local-file", async (filePath) => {
    return readLocalFile(filePath);
  });

  ipcMainHandle("get-macros", async () => {
    const config = loadConfig();
    return {
      defaultMacros: config.user.macros.defaultMacros,
      customMacros: config.user.macros.customMacros,
      settings: config.user.macros.executionSettings,
    };
  });

  ipcMainHandleWithData<string, "execute-macro-by-id">("execute-macro-by-id", async (macroId) => {
    try {
      const config = loadConfig();
      const allMacros = [...config.user.macros.defaultMacros, ...config.user.macros.customMacros];
      const macro = allMacros.find((m) => m.id === macroId);

      if (!macro) {
        return { success: false, error: `Macro with ID '${macroId}' not found` };
      }

      const macroManager = container.get<MacroManager>(SERVICE_KEYS.MACRO_MANAGER);

      const executionId = await macroManager.executeMacro(macro);
      return { success: true, executionId };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  });

  ipcMainHandle("refresh-keybinds", async () => {
    keybindingManager.registerMacroKeybinds();
    return { success: true };
  });

  ipcMainHandle("get-registered-keybinds", async () => {
    return keybindingManager.getRegisteredKeybinds();
  });

  ipcMainHandleWithData<
    { page?: number; limit?: number; sortBy?: "startDate" | "endDate" | "name" | "id"; order?: "asc" | "desc" },
    "get-all-bonus-codes"
  >("get-all-bonus-codes", async (params) => {
    const bonuscodes = await getBonusCodes(params);
    return {
      data: bonuscodes.data,
      pagination: bonuscodes.pagination,
    };
  });

  ipcMainHandle("get-active-bonus-codes", async () => {
    const bonuscodes = await getActiveBonusCodes();
    const activeCodes = bonuscodes.data;
    return activeCodes;
  });

  ipcMainHandleWithData<string, "get-bonus-code">("get-bonus-code", async (codeId) => {
    const bonuscode = await getBonusCodeById(codeId);
    const code = bonuscode.data;
    return code;
  });

  windowSizeListener();
});

app.on("before-quit", () => {
  keybindingManager.unregisterAll();
});

app.on("window-all-closed", () => {
  keybindingManager.unregisterAll();
  if (process.platform !== "darwin") {
    app.quit();
  }
});
