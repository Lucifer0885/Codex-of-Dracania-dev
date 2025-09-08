import { User32 } from "win32-api";
import {
  WM_KEYDOWN,
  WM_KEYUP,
  WM_LBUTTONDOWN,
  WM_LBUTTONUP,
  WM_MBUTTONDOWN,
  WM_MBUTTONUP,
  WM_MOUSEMOVE,
  WM_RBUTTONDOWN,
  WM_RBUTTONUP,
} from "../constants/windows-message.js";
import { Macro, MacroStep } from "../interfaces/Imacro.js";
import { getVirtualKeyCode, makeLParam } from "../utils/util.js";
import { findWindow } from "../utils/targetWindow.js";

export default class MacroExecution {
  private shouldStop = false;
  private user32: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  private gameWindowHandle: number | null = null;

  constructor(private macro: Macro, private executionId: string) {
    this.user32 = User32.load();
  }

  async start(): Promise<void> {
    try {
      this.gameWindowHandle = await this.getGameWindowHandle();

      for (let i = 0; i < this.macro.repeat; i++) {
        if (this.shouldStop) break;

        for (const step of this.macro.actions) {
          if (this.shouldStop) break;
          await this.executeStep(step);
        }

        if (this.macro.onRepeat && i < this.macro.repeat - 1) {
          await this.delay(100);
        }
      }
    } catch (error) {
      console.error(`Macro execution failed for ${this.macro.name}:`, error);
    }
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

    const [x, y] = coords;
    const lParam = makeLParam(x, y);

    switch (step.action) {
      case "click":
        this.user32.PostMessageW(this.gameWindowHandle, WM_LBUTTONDOWN, 0, lParam);
        await this.delay(10);
        this.user32.PostMessageW(this.gameWindowHandle, WM_LBUTTONUP, 0, lParam);
        break;
      case "right-click":
        this.user32.PostMessageW(this.gameWindowHandle, WM_RBUTTONDOWN, 0, lParam);
        await this.delay(10);
        this.user32.PostMessageW(this.gameWindowHandle, WM_RBUTTONUP, 0, lParam);
        break;
      case "middle-click":
        this.user32.PostMessageW(this.gameWindowHandle, WM_MBUTTONDOWN, 0, lParam);
        await this.delay(10);
        this.user32.PostMessageW(this.gameWindowHandle, WM_MBUTTONUP, 0, lParam);
        break;
      case "move":
        this.user32.PostMessageW(this.gameWindowHandle, WM_MOUSEMOVE, 0, lParam);
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
    return this.macro;
  }

  isRunning(): boolean {
    return !this.shouldStop;
  }
}
