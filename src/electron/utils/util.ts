import { WebFrameMain } from "electron";
import { getUIPath } from "./pathResolver.js";
import { pathToFileURL } from "url";
import { getTargetWindowSize } from "./targetWindow.js";
import { updateWindowSizeConfig } from "./config.js";

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
      console.log("Updated window size:", size);
      await wait(5000); // Check every 5 seconds when window is found
    } catch (error) {
      if (error instanceof Error && error.message.includes("Target window not found")) {
        console.log("Target window not found, waiting for it to become available...");
        await wait(10000); // Wait longer when window is not found
      } else {
        console.error("Error getting window size:", error);
        await wait(5000);
      }
    }
  }
}
