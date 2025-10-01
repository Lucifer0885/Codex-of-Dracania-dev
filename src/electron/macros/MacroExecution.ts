import { User32 } from "win32-api";
import {
  WM_KEYDOWN,
  WM_KEYUP,
  WM_LBUTTONDOWN,
  WM_LBUTTONUP,
  WM_LBUTTONDBLCLK,
  WM_MBUTTONDOWN,
  WM_MBUTTONUP,
  WM_MOUSEMOVE,
  WM_RBUTTONDOWN,
  WM_RBUTTONUP,
} from "../constants/windows-message.js";
import { MK_LBUTTON, MK_MBUTTON, MK_RBUTTON } from "../constants/windows-message.js";
import { Macro, MacroStep } from "../interfaces/Imacro.js";
import { getVirtualKeyCode, makeLParam } from "../utils/util.js";
import { findWindow, getTargetWindowSize } from "../utils/targetWindow.js";
import { generateSellInventoryActions, generateMeltInventoryActions } from "../utils/inventoryCalculations.js";
import { loadConfig } from "../utils/config.js";

export default class MacroExecution {
  private shouldStop = false;
  private user32: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  private gameWindowHandle: number | null = null;
  private mouseWindowHandle: number | null = null;
  private actualMacro: Macro;
  private targetWindowRect: { x: number; y: number; width: number; height: number } | null = null;

  constructor(private macro: Macro, private executionId: string) {
    this.user32 = User32.load();
    this.actualMacro = macro;
  }

  async start(): Promise<void> {
    try {
      this.gameWindowHandle = await this.getGameWindowHandle();
      this.mouseWindowHandle = await this.getMouseTargetWindowHandle(this.gameWindowHandle);
      try {
        this.targetWindowRect = await getTargetWindowSize();
      } catch {
        this.targetWindowRect = null;
      }

      if (this.macro.id === "sell-inventory") {
        this.actualMacro = await this.generateDynamicSellInventoryMacro();
      } else if (this.macro.id === "melt-inventory") {
        this.actualMacro = await this.generateDynamicMeltInventoryMacro();
      }

      for (let i = 0; i < this.actualMacro.repeat; i++) {
        if (this.shouldStop) break;

        for (const step of this.actualMacro.actions) {
          if (this.shouldStop) break;
          await this.executeStep(step);
        }

        if (this.actualMacro.onRepeat && i < this.actualMacro.repeat - 1) {
          await this.delay(10);
        }
      }
    } catch (error) {
      console.error(`Macro execution failed for ${this.actualMacro.name}:`, error);
    }
  }

  private async generateDynamicSellInventoryMacro(): Promise<Macro> {
    const config = loadConfig();

    let windowWidth = config.targetWindow.size.width;
    let windowHeight = config.targetWindow.size.height;

    try {
      const windowSize = await getTargetWindowSize();
      windowWidth = windowSize.width;
      windowHeight = windowSize.height;
    } catch (error) {
      console.warn("Could not get current window size, using config defaults:", error);
    }

    const { layout, lockedSlots } = config.user.inventory;

    const sellActions = generateSellInventoryActions(
      windowWidth,
      windowHeight,
      lockedSlots,
      layout.totalTabs,
      layout.rowsPerTab,
      layout.columnsPerRow
    );

    return {
      ...this.macro,
      description: `Automates selling items in inventory by right-clicking each slot, skipping locked slots. Generated for ${windowWidth}x${windowHeight} window with ${sellActions.length} actions.`,
      actions: sellActions,
    };
  }

  private async generateDynamicMeltInventoryMacro(): Promise<Macro> {
    const config = loadConfig();

    let windowWidth = config.targetWindow.size.width;
    let windowHeight = config.targetWindow.size.height;

    try {
      const windowSize = await getTargetWindowSize();
      windowWidth = windowSize.width;
      windowHeight = windowSize.height;
    } catch (error) {
      console.warn("Could not get current window size, using config defaults:", error);
    }

    const { layout, lockedSlots } = config.user.inventory;

    const meltActions = generateMeltInventoryActions(
      windowWidth,
      windowHeight,
      lockedSlots,
      layout.totalTabs,
      layout.rowsPerTab,
      layout.columnsPerRow
    );

    return {
      ...this.macro,
      description: `Automates melting items in inventory by right-clicking each slot (batched every 9) and clicking melt. Generated for ${windowWidth}x${windowHeight} window with ${meltActions.length} actions.`,
      actions: meltActions,
    };
  }

  stop(): void {
    this.shouldStop = true;
  }

  private async getGameWindowHandle(): Promise<number> {
    const window = await findWindow(null, "Nebula3::MainWindow");
    if (!window.found || !window.handle) {
      throw new Error("Target game window not found. Make sure Drakensang Online is running.");
    }
    return Number(window.handle);
  }

  private async getMouseTargetWindowHandle(mainHandle: number): Promise<number> {
    try {
      const isVisible = this.user32.IsWindowVisible(Number(mainHandle));
      if (isVisible) {
        return Number(mainHandle);
      }
      const client = await findWindow(null, "Qt5QWindowIcon");
      if (client.found && client.handle) {
        return Number(client.handle);
      }
      return Number(mainHandle);
    } catch {
      return Number(mainHandle);
    }
  }

  private async executeStep(step: MacroStep): Promise<void> {
    if (!this.gameWindowHandle) {
      throw new Error("Game window handle not available");
    }

    switch (step.type) {
      case "keyboard-action":
        await this.executeKeyboardAction(step);
        break;
      case "mouse-action":
        await this.executeMouseAction(step);
        break;
      case "wait":
        await this.executeWaitAction(step);
        break;
    }

    if (step.wait > 0) {
      await this.delay(step.wait);
    }
  }

  private async executeKeyboardAction(step: MacroStep): Promise<void> {
    const vkCode = getVirtualKeyCode(step.value);

    switch (step.action) {
      case "key-press":
        this.user32.SendMessageW(this.gameWindowHandle, WM_KEYDOWN, vkCode, 0);
        await this.delay(50);
        this.user32.SendMessageW(this.gameWindowHandle, WM_KEYUP, vkCode, 0);
        break;
      case "key-down":
        this.user32.SendMessageW(this.gameWindowHandle, WM_KEYDOWN, vkCode, 0);
        break;
      case "key-up":
        this.user32.SendMessageW(this.gameWindowHandle, WM_KEYUP, vkCode, 0);
        break;
    }
  }

  private async executeMouseAction(step: MacroStep): Promise<void> {
    const coords = step.value.split(",").map((coord) => parseInt(coord.trim()));
    if (coords.length !== 2) {
      throw new Error(`Invalid mouse coordinates: ${step.value}`);
    }

    let [x, y] = coords;
    if (this.targetWindowRect) {
      const { x: winX, y: winY, width, height } = this.targetWindowRect;
      if (x > width || y > height) {
        x = x - winX;
        y = y - winY;
        x = Math.max(0, Math.min(x, width - 1));
        y = Math.max(0, Math.min(y, height - 1));
      }
    }
    const lParam = makeLParam(x, y);
    const targetHwnd = this.mouseWindowHandle ?? this.gameWindowHandle;
    if (!targetHwnd) {
      throw new Error("Mouse target window handle not available");
    }

    this.user32.PostMessageW(targetHwnd, WM_MOUSEMOVE, 0, lParam);
    await this.delay(5);

    switch (step.action) {
      case "click":
        this.user32.PostMessageW(targetHwnd, WM_LBUTTONDOWN, MK_LBUTTON, lParam);
        await this.delay(10);
        this.user32.PostMessageW(targetHwnd, WM_LBUTTONUP, 0, lParam);
        break;
      case "right-click":
        this.user32.PostMessageW(targetHwnd, WM_RBUTTONDOWN, MK_RBUTTON, lParam);
        await this.delay(10);
        this.user32.PostMessageW(targetHwnd, WM_RBUTTONUP, 0, lParam);
        break;
      case "double-click":
        this.user32.PostMessageW(targetHwnd, WM_LBUTTONDOWN, MK_LBUTTON, lParam);
        await this.delay(10);
        this.user32.PostMessageW(targetHwnd, WM_LBUTTONUP, 0, lParam);
        await this.delay(80);
        this.user32.PostMessageW(targetHwnd, WM_LBUTTONDBLCLK, MK_LBUTTON, lParam);
        await this.delay(10);
        this.user32.PostMessageW(targetHwnd, WM_LBUTTONUP, 0, lParam);
        break;
      case "middle-click":
        this.user32.PostMessageW(targetHwnd, WM_MBUTTONDOWN, MK_MBUTTON, lParam);
        await this.delay(10);
        this.user32.PostMessageW(targetHwnd, WM_MBUTTONUP, 0, lParam);
        break;
      case "move":
        this.user32.PostMessageW(targetHwnd, WM_MOUSEMOVE, 0, lParam);
        break;
    }
  }

  private async executeWaitAction(step: MacroStep): Promise<void> {
    const waitTime = parseInt(step.value) || 1000;
    await this.delay(waitTime);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getId(): string {
    return this.executionId;
  }

  getMacro(): Macro {
    return this.actualMacro;
  }

  isRunning(): boolean {
    return !this.shouldStop;
  }
}
