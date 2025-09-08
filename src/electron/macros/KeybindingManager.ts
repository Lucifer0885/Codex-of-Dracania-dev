import { globalShortcut } from "electron";
import { loadConfig } from "../utils/config.js";
import { container, SERVICE_KEYS } from "../utils/diContainer.js";
import MacroManager from "./MacroManager.js";

export default class KeybindingManager {
  private registeredKeybinds: Map<string, string> = new Map();

  constructor(private macroManager?: MacroManager) {}

  registerMacroKeybinds(): void {
    globalShortcut.unregisterAll();
    this.registeredKeybinds.clear();

    const config = loadConfig();
    const allMacros = [...config.user.macros.defaultMacros, ...config.user.macros.customMacros];

    for (const macro of allMacros) {
      if (macro.enabled && macro.keybinding) {
        try {
          const success = globalShortcut.register(macro.keybinding, async () => {
            console.log(`Hotkey ${macro.keybinding} triggered for macro: ${macro.name}`);
            await this.executeMacroById(macro.id);
          });

          if (success) {
            this.registeredKeybinds.set(macro.keybinding, macro.id);
            console.log(`Registered keybind ${macro.keybinding} for macro: ${macro.name}`);
          } else {
            console.warn(`Failed to register keybind ${macro.keybinding} for macro: ${macro.name}`);
          }
        } catch (error) {
          console.error(`Error registering keybind ${macro.keybinding}:`, error);
        }
      }
    }
  }

  private async executeMacroById(macroId: string): Promise<void> {
    try {
      const macroManager = this.macroManager || container.get<MacroManager>(SERVICE_KEYS.MACRO_MANAGER);

      const config = loadConfig();
      const allMacros = [...config.user.macros.defaultMacros, ...config.user.macros.customMacros];
      const macro = allMacros.find((m) => m.id === macroId);

      if (macro) {
        const executionId = await macroManager.executeMacro(macro);
        console.log(`Macro ${macro.name} started with execution ID: ${executionId}`);
      }
    } catch (error) {
      console.error(`Failed to execute macro ${macroId}:`, error);
    }
  }

  unregisterAll(): void {
    globalShortcut.unregisterAll();
    this.registeredKeybinds.clear();
  }

  getRegisteredKeybinds(): Array<{ keybind: string; macroId: string }> {
    return Array.from(this.registeredKeybinds.entries()).map(([keybind, macroId]) => ({
      keybind,
      macroId,
    }));
  }
}
