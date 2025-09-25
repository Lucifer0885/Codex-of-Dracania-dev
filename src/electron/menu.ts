import { Menu } from "electron";
import { isDev } from "./utils/util.js";
import type { MenuItemConstructorOptions } from "electron";

export function InitMenu() {
  const template: MenuItemConstructorOptions[] = [
    {
      label: "App",
      submenu: [{ label: "Quit     ", role: "quit" }],
    },
    {
      label: "Edit",
      submenu: [
        {
          label: "Undo",
          role: "undo",
        },
        {
          label: "Redo",
          role: "redo",
        },
        { type: "separator" },
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
        { type: "separator" },
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
  ];

  if (isDev()) {
    template.push({
      label: "Developer",
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
    });
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}
