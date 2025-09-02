import { FindWindowEx } from "win32-api/util";

export function isDev() {
  return process.env.NODE_ENV === "development";
}

export function findWindow(title: string | null = null, className: string | null = null) {
  if (!title && !className) {
    return null;
  }
  return FindWindowEx(null, null, className, title);
}
