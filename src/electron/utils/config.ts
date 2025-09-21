import { getConfigPath } from "./pathResolver.js";
import { defaultMacros } from "../macros/defaultMacros.js";
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
