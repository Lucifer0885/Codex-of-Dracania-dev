import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev, windowSizeListener } from "./utils/util.js";
import { loadConfig, resetConfig } from "./utils/config.js";
import { findWindow } from "./utils/targetWindow.js";
import { getConfigPath, getPreloadPath, getUIPath, readLocalFile } from "./utils/pathResolver.js";
import { ipcMainHandle, ipcMainHandleWithData } from "./utils/ipc.js";
import KeybindingManager from "./macros/KeybindingManager.js";
import MacroManager from "./macros/MacroManager.js";
import { container, SERVICE_KEYS } from "./utils/diContainer.js";
import { registerMacroIpcHandlers } from "./macros/macroIpc.js";
import fs from "fs";

let mainWindow: BrowserWindow;

container.registerSingleton(SERVICE_KEYS.MACRO_MANAGER, () => new MacroManager());
container.registerSingleton(SERVICE_KEYS.KEYBINDING_MANAGER, () => {
  const macroManager = container.get<MacroManager>(SERVICE_KEYS.MACRO_MANAGER);
  return new KeybindingManager(macroManager);
});

const keybindingManager = container.get<KeybindingManager>(SERVICE_KEYS.KEYBINDING_MANAGER);

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

  // Register keybindings and IPC handlers
  keybindingManager.registerMacroKeybinds();
  registerMacroIpcHandlers();

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
