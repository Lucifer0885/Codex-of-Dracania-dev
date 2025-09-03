import { app, BrowserWindow } from "electron";
import path from "path";
<<<<<<< Updated upstream
import { isDev, loadConfig } from "./utils/util.js";
import { findWindow } from "./utils/findWindow.js";
import { getPreloadPath, getUIPath } from "./utils/pathResolver.js";
import { ipcMainHandle } from "./utils/ipc.js";
=======
import { isDev } from "./utils/util.js";
import { getPreloadPath } from "./utils/pathResolver.js";
>>>>>>> Stashed changes

let mainWindow: BrowserWindow;

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

  loadConfig();

  ipcMainHandle("find-target-window", async () => {
    return await findWindow(null, "Nebula3::MainWindow");
  });
});
