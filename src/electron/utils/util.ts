import { WebFrameMain } from "electron";
import { getUIPath } from "./pathResolver.js";
import { pathToFileURL } from "url";
import { getTargetWindowSize } from "./targetWindow.js";
import { updateWindowSizeConfig } from "./config.js";
import { VK_CODES } from "../constants/vk-codes.js";

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

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function windowSizeListener() {
  while (true) {
    try {
      const size = await getTargetWindowSize();
      updateWindowSizeConfig(size);
      await wait(5000);
    } catch (error) {
      if (error instanceof Error && error.message.includes("Target window not found")) {
        await wait(10000);
      } else {
        console.error("Error getting window size:", error);
        await wait(5000);
      }
    }
  }
}

export function getMimeType(ext: string): string {
  const mimeTypes: { [key: string]: string } = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".bmp": "image/bmp",
    ".webp": "image/webp",
  };
  return mimeTypes[ext] || "image/jpeg";
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function makeLParam(x: number, y: number): number {
  return (y << 16) | (x & 0xffff);
}

export function getVirtualKeyCode(keyName: string): number {
  const upperKey = keyName.toUpperCase();
  const vkKey = `VK_${upperKey}` as keyof typeof VK_CODES;

  if (vkKey in VK_CODES) {
    return VK_CODES[vkKey];
  }

  // Handle single character keys
  if (keyName.length === 1) {
    const charCode = keyName.toUpperCase().charCodeAt(0);
    if (charCode >= 65 && charCode <= 90) {
      // A-Z
      return charCode;
    }
    if (charCode >= 48 && charCode <= 57) {
      // 0-9
      return charCode;
    }
  }

  throw new Error(`Unknown key: ${keyName}`);
}
