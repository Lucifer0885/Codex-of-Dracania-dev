import { app } from "electron";
import path from "path";
import { getMimeType, isDev } from "./util.js";
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

export function getAssetsPath() {
  return path.join(app.getAppPath(), isDev() ? "." : "..", "/src/assets");
}

export function getConfigPath() {
  return fs.existsSync(path.join(getUserPath(), ".dso-utils"))
    ? path.join(getUserPath(), ".dso-utils", "config.json")
    : fs.mkdirSync(path.join(getUserPath(), ".dso-utils")) + path.sep + "config.json";
}

export function readLocalFile(filePath: string): string {
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
}
