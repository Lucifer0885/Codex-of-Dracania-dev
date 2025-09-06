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

export async function getTargetWindowSize() {
  const window = await findWindow(null, "Nebula3::MainWindow");
  if (!window.found) {
    throw new Error("Target window not found");
  }

  const hwnd = window.handle;
  if (!hwnd) {
    throw new Error("Invalid window handle");
  }

  try {
    const user32 = User32.load();

    const rect = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    };

    const fullscreenResult = user32.GetWindowRect(Number(hwnd), rect);
    const isVisible = user32.IsWindowVisible(Number(hwnd));

    if (!fullscreenResult) {
      throw new Error("Failed to get window rectangle");
    }

    if (!isVisible) {
      const window = await findWindow(null, "Qt5QWindowIcon");
      if (!window.found || !window.handle) {
        throw new Error("Client window not found or invalid handle");
      }
      try {
        const clientRect = {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        };
        const clientResult = user32.GetWindowRect(Number(window.handle), clientRect);
        if (!clientResult) {
          throw new Error("Failed to get client rectangle");
        }

        const width = clientRect.right - clientRect.left;
        const height = clientRect.bottom - clientRect.top;

        return {
          x: clientRect.left,
          y: clientRect.top,
          width: width,
          height: height,
        };
      } catch (error) {
        console.error("Error finding client window:", error);
      }
    }

    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;

    return {
      x: rect.left,
      y: rect.top,
      width: width,
      height: height,
    };
  } catch (error) {
    throw new Error(`Failed to get window size: ${error instanceof Error ? error.message : String(error)}`);
  }
}
