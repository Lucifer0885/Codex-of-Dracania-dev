import { getConfigPath } from "./pathResolver.js";
import { defaultMacros } from "../macros/defaultMacros.js";
import { dialog, BrowserWindow } from "electron";
import fs from "fs";

export function createConfig() {
  const defaultConfig: GlobalConfig = {
    user: {
      name: "Player",
      role: "player",
      avatars: [{ path: "default", selected: true }],
      inventory: {
        layout: {
          totalTabs: 9,
          rowsPerTab: 4,
          columnsPerRow: 7,
        },
        lockedSlots: [],
        selectedPresetName: "Full HD Window (1920x1080)",
      },
      macros: {
        enabled: true,
        defaultMacros: defaultMacros,
        customMacros: [],
        executionSettings: {
          maxConcurrentMacros: 5,
          defaultStepDelay: 100,
        },
        lastModified: Date.now(),
      },
    },
    targetWindow: {
      class: "",
      title: "",
      handle: null,
      size: {
        x: 0,
        y: 0,
        width: 880,
        height: 670,
      },
    },
  };

  fs.writeFileSync(getConfigPath(), JSON.stringify(defaultConfig, null, 2));
}

export function loadConfig(): GlobalConfig {
  const configPath = getConfigPath();
  if (!fs.existsSync(configPath)) {
    createConfig();
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  return config;
}

export function updateWindowSizeConfig(newSize: TargetWindowSize): void {
  const config: GlobalConfig = loadConfig();
  config.targetWindow.size = { ...config.targetWindow.size, ...newSize };
  fs.writeFileSync(getConfigPath(), JSON.stringify(config, null, 2));
}

export function resetConfig(): void {
  const configPath = getConfigPath();
  if (fs.existsSync(configPath)) {
    fs.unlinkSync(configPath);
  }
  createConfig();
}

export function updateConfig(config: GlobalConfig): void {
  fs.writeFileSync(getConfigPath(), JSON.stringify(config, null, 2));
}

export async function importConfig(mainWindow: BrowserWindow) {
  try {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      title: "Import Configuration",
      properties: ["openFile"],
      filters: [{ name: "JSON Files", extensions: ["json"] }],
    });
    if (canceled || filePaths.length === 0) {
      return { success: false, error: "Import canceled" };
    }
    const selectedPath = filePaths[0];
    const raw = fs.readFileSync(selectedPath, "utf-8");
    const parsed = JSON.parse(raw) as GlobalConfig;

    // Basic validation: ensure required top-level keys exist
    if (!parsed || typeof parsed !== "object" || !("user" in parsed) || !("targetWindow" in parsed)) {
      return { success: false, error: "Invalid configuration format" };
    }

    // Write to app config path
    fs.writeFileSync(getConfigPath(), JSON.stringify(parsed, null, 2), "utf-8");
    return { success: true, config: parsed };
  } catch (error) {
    console.error("Failed to import config:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

export async function exportConfig(mainWindow: BrowserWindow) {
  try {
    const config = loadConfig();
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      title: "Export Configuration",
      defaultPath: "config.json",
      filters: [{ name: "JSON Files", extensions: ["json"] }],
    });
    if (canceled || !filePath) {
      return { success: false, error: "Export canceled" };
    }
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2), "utf-8");
    return { success: true, filePath };
  } catch (error) {
    console.error("Failed to export config:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}
