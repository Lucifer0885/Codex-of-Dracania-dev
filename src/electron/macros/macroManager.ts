import { Macro } from "../interfaces/Imacro.js";
import { generateId } from "../utils/util.js";
import { getVirtualKeyCode } from "../utils/util.js";
import MacroExecution from "./MacroExecution.js";

export default class MacroManager {
  private activeMacros: Map<string, MacroExecution> = new Map();
  private maxConcurrentMacros: number = 5;

  async executeMacro(macro: Macro): Promise<string> {
    if (this.activeMacros.size >= this.maxConcurrentMacros) {
      throw new Error(`Maximum concurrent macros (${this.maxConcurrentMacros}) reached`);
    }

    if (!macro.enabled) {
      throw new Error(`Macro '${macro.name}' is disabled`);
    }

    const executionId = generateId();
    const execution = new MacroExecution(macro, executionId);

    this.activeMacros.set(executionId, execution);

    execution.start().finally(() => {
      this.activeMacros.delete(executionId);
    });

    return executionId;
  }

  stopMacro(executionId: string): void {
    const execution = this.activeMacros.get(executionId);
    execution?.stop();
  }

  stopAllMacros(): void {
    for (const execution of this.activeMacros.values()) {
      execution.stop();
    }
  }

  getActiveMacros(): MacroExecution[] {
    return Array.from(this.activeMacros.values());
  }

  getActiveMacroIds(): string[] {
    return Array.from(this.activeMacros.keys());
  }

  getMacroStatus(executionId: string): { found: boolean; isRunning?: boolean; macroName?: string } {
    const execution = this.activeMacros.get(executionId);
    if (!execution) {
      return { found: false };
    }

    return {
      found: true,
      isRunning: execution.isRunning(),
      macroName: execution.getMacro().name,
    };
  }

  getStats(): { active: number; maxConcurrent: number } {
    return {
      active: this.activeMacros.size,
      maxConcurrent: this.maxConcurrentMacros,
    };
  }

  setMaxConcurrentMacros(limit: number): void {
    this.maxConcurrentMacros = Math.max(1, limit);
  }

  validateMacro(macro: Macro): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!macro.name?.trim()) {
      errors.push("Macro name is required");
    }

    if (!macro.actions?.length) {
      errors.push("Macro must have at least one action");
    }

    for (let i = 0; i < (macro.actions?.length || 0); i++) {
      const step = macro.actions[i];

      if (!step.type || !["keyboard-action", "mouse-action", "wait"].includes(step.type)) {
        errors.push(`Step ${i + 1}: Invalid action type`);
      }

      if (step.type === "keyboard-action") {
        if (!step.value?.trim()) {
          errors.push(`Step ${i + 1}: Keyboard action requires a key value`);
        } else {
          try {
            getVirtualKeyCode(step.value);
          } catch {
            errors.push(`Step ${i + 1}: Unknown key '${step.value}'`);
          }
        }
      }

      if (step.type === "mouse-action") {
        if (!step.value?.trim()) {
          errors.push(`Step ${i + 1}: Mouse action requires coordinates`);
        } else {
          const coords = step.value.split(",").map((coord) => parseInt(coord.trim()));
          if (coords.length !== 2 || coords.some(isNaN)) {
            errors.push(`Step ${i + 1}: Invalid mouse coordinates format. Use 'x,y'`);
          }
        }
      }

      if (step.wait < 0) {
        errors.push(`Step ${i + 1}: Wait time cannot be negative`);
      }
    }

    if (macro.repeat < 1) {
      errors.push("Repeat count must be at least 1");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
