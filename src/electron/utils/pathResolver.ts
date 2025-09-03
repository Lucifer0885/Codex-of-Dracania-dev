import { app } from "electron";
import path from "path";
import { isDev } from "./util.js";
import os from "os";
import * as fs from "fs";

export function getPreloadPath() {
  return path.join(app.getAppPath(), isDev() ? "." : "..", "/dist-electron/preload.cjs");
}

export function getUIPath() {
  return path.join(app.getAppPath(), "/dist-react/index.html");
}

export function getUserPath() {
  return os.userInfo().homedir;
}

export function getConfigPath() {
  return fs.existsSync(path.join(getUserPath(), ".dso-utils"))
    ? path.join(getUserPath(), ".dso-utils", "config.json")
    : fs.mkdirSync(path.join(getUserPath(), ".dso-utils")) + path.sep + "config.json";
}
