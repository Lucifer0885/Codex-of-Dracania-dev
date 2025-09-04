import { WebFrameMain } from "electron";
import { getConfigPath, getUIPath } from "./pathResolver.js";
import { pathToFileURL } from "url";
import * as fs from "fs";

export function isDev() {
  return process.env.NODE_ENV === "development";
}

export function validateEventFrame(frame: WebFrameMain) {
  if (isDev() && new URL(frame.url).host === "localhost:3055") {
    return;
  }

  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error("Malicious Event");
  }
}

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
