import { User32 } from "win32-api";

export async function findWindow(title: string | null = null, className: string | null = null) {
  if (!title && !className) {
    const nullInfo = {
      found: false,
      handle: null,
      title: title,
      className: className,
      error: "No title or className provided",
      timestamp: Date.now(),
    };
    return nullInfo;
  }

  try {
    const user32 = User32.load();
    const hwnd = user32.FindWindowExW(0, 0, className, title);

    const windowInfo = {
      found: hwnd !== null && hwnd !== 0,
      handle: hwnd ? hwnd.toString() : null,
      title: title,
      className: className,
      timestamp: Date.now(),
    };

    return windowInfo;
  } catch (error) {
    console.error("Error finding window:", error);
    const errorInfo = {
      found: false,
      handle: null,
      title: title,
      className: className,
      error: error instanceof Error ? error.message : String(error),
      timestamp: Date.now(),
    };
    return errorInfo;
  }
}
