import { type BrowserWindow, Menu, Tray, app } from "electron";
import { getAssetsPath } from "./utils/pathResolver.js";
import path from "path";

export function initTray(mainWindow: BrowserWindow) {
  const tray = new Tray(path.join(getAssetsPath(), "dracania-codex@3x.png"));

  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Show",
        click: () => {
          mainWindow.show();
        },
      },
      {
        type: "separator",
      },
      {
        label: "Hide",
        click: () => {
          mainWindow.hide();
        },
      },
      {
        type: "separator",
      },
      {
        label: "Quit",
        click: () => {
          app.quit();
        },
      },
      {
        type: "separator",
      },
      {
        label: "Version: " + app.getVersion(),
        enabled: false,
      },
    ])
  );

  tray.on("click", () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });
}
