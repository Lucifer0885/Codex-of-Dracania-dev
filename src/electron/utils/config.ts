import { getConfigPath } from "./pathResolver.js";
import fs from "fs";

export function createConfig() {
  const defaultConfig: GlobalConfig = {
    user: {
      name: "Player",
      role: "player",
      avatarPath: "",
      inventory: {
        layout: {
          totalTabs: 9,
          rowsPerTab: 4,
          columnsPerRow: 7,
        },
        lockedSlots: [],
      },
      macros: {
        enabled: true,
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

export function loadConfig() {
  const configPath = getConfigPath();
  if (!fs.existsSync(configPath)) {
    createConfig();
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  return config;
}

export function updateWindowSizeConfig(newSize: TargetWindowSize) {
  const config: GlobalConfig = loadConfig();
  console.log("new size: " + JSON.stringify(newSize));
  console.log("old size: " + JSON.stringify(config.targetWindow.size));
  config.targetWindow.size = { ...config.targetWindow.size, ...newSize };
  fs.writeFileSync(getConfigPath(), JSON.stringify(config, null, 2));
}
