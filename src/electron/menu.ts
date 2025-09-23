import { Menu } from "electron";
import { isDev } from "./utils/util.js";

export function InitMenu() {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: "App",
        type: "submenu",
        submenu: [
          {
            label: "Quit",
            role: "quit",
            accelerator: "CmdOrCtrl+Q",
          },
        ],
      },
      {
        label: "Edit",
        type: "submenu",
        submenu: [
          {
            label: "Undo",
            role: "undo",
          },
          {
            label: "Redo",
            role: "redo",
          },
          {
            type: "separator",
          },
          {
            label: "Cut",
            role: "cut",
          },
          {
            label: "Copy",
            role: "copy",
          },
          {
            label: "Paste",
            role: "paste",
          },
          {
            type: "separator",
          },
          {
            label: "Paste and Match Style",
            role: "pasteAndMatchStyle",
          },
          {
            label: "Delete",
            role: "delete",
          },
        ],
      },
      {
        label: "View",
        type: "submenu",
        submenu: [
          {
            label: "Zoom In",
            role: "zoomIn",
          },
          {
            label: "Zoom Out",
            role: "zoomOut",
          },
          {
            label: "Reset Zoom",
            role: "resetZoom",
          },
          { type: "separator" },
          {
            label: "Toggle Fullscreen",
            role: "togglefullscreen",
          },
          { type: "separator" },
          {
            label: "Minimize",
            role: "minimize",
          },
        ],
      },
      {
        label: "Developer",
        visible: isDev(),
        type: "submenu",
        submenu: [
          {
            label: "Reload",
            role: "reload",
          },
          {
            label: "Force Reload",
            role: "forceReload",
          },
          {
            label: "Toggle Developer Tools",
            role: "toggleDevTools",
          },
        ],
      },
    ])
  );
}
