import { loadConfig, updateConfig } from "../utils/config.js";
import { findKeybindConflicts, isValidKeybind, normalizeKeybind } from "../utils/keybinding.js";

export default class MacroStorageManager {
  getAllMacros(): MacroListResult {
    const config = loadConfig();
    return {
      defaultMacros: config.user.macros.defaultMacros || [],
      customMacros: config.user.macros.customMacros || [],
      totalCount: (config.user.macros.defaultMacros?.length || 0) + (config.user.macros.customMacros?.length || 0),
    };
  }

  getMacroById(id: string): Macro | null {
    const { defaultMacros, customMacros } = this.getAllMacros();
    const allMacros = [...defaultMacros, ...customMacros];
    return allMacros.find((macro) => macro.id === id) || null;
  }

  createCustomMacro(macroData: Omit<Macro, "id" | "type">): MacroOperationResult {
    try {
      const id = this.generateUniqueId(macroData.name);

      const newMacro: Macro = {
        ...macroData,
        id,
        type: "custom",
      };

      const validation = this.validateMacro(newMacro);
      if (!validation.success) {
        return validation;
      }

      if (newMacro.keybinding) {
        const conflicts = this.checkKeybindConflicts(newMacro.keybinding);
        if (conflicts.length > 0) {
          return {
            success: false,
            error: `Keybinding '${newMacro.keybinding}' is already used by: ${conflicts.map((m) => m.name).join(", ")}`,
          };
        }
      }

      const config = loadConfig();
      if (!config.user.macros.customMacros) {
        config.user.macros.customMacros = [];
      }
      config.user.macros.customMacros.push(newMacro);
      config.user.macros.lastModified = Date.now();

      updateConfig(config);

      return {
        success: true,
        data: newMacro,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  updateCustomMacro(id: string, updates: Partial<Omit<Macro, "id" | "type">>): MacroOperationResult {
    try {
      const config = loadConfig();
      const macroIndex = config.user.macros.customMacros?.findIndex((macro) => macro.id === id) ?? -1;

      if (macroIndex === -1) {
        return {
          success: false,
          error: `Custom macro with ID '${id}' not found`,
        };
      }

      const currentMacro = config.user.macros.customMacros![macroIndex];
      const updatedMacro: Macro = {
        ...currentMacro,
        ...updates,
        id,
        type: "custom",
      };

      const validation = this.validateMacro(updatedMacro);
      if (!validation.success) {
        return validation;
      }

      if (updatedMacro.keybinding) {
        const conflicts = this.checkKeybindConflicts(updatedMacro.keybinding, id);
        if (conflicts.length > 0) {
          return {
            success: false,
            error: `Keybinding '${updatedMacro.keybinding}' is already used by: ${conflicts
              .map((m) => m.name)
              .join(", ")}`,
          };
        }
      }

      config.user.macros.customMacros![macroIndex] = updatedMacro;
      config.user.macros.lastModified = Date.now();

      updateConfig(config);

      return {
        success: true,
        data: updatedMacro,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  deleteCustomMacro(id: string): MacroOperationResult {
    try {
      const config = loadConfig();
      const macroIndex = config.user.macros.customMacros?.findIndex((macro) => macro.id === id) ?? -1;

      if (macroIndex === -1) {
        return {
          success: false,
          error: `Custom macro with ID '${id}' not found`,
        };
      }

      const deletedMacro = config.user.macros.customMacros![macroIndex];
      config.user.macros.customMacros!.splice(macroIndex, 1);
      config.user.macros.lastModified = Date.now();

      updateConfig(config);

      return {
        success: true,
        data: deletedMacro,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  toggleMacroEnabled(id: string, enabled: boolean): MacroOperationResult {
    try {
      const config = loadConfig();

      const customIndex = config.user.macros.customMacros?.findIndex((macro) => macro.id === id) ?? -1;
      if (customIndex !== -1) {
        config.user.macros.customMacros![customIndex].enabled = enabled;
        config.user.macros.lastModified = Date.now();
        updateConfig(config);
        return { success: true, data: config.user.macros.customMacros![customIndex] };
      }

      const defaultIndex = config.user.macros.defaultMacros?.findIndex((macro) => macro.id === id) ?? -1;
      if (defaultIndex !== -1) {
        config.user.macros.defaultMacros![defaultIndex].enabled = enabled;
        config.user.macros.lastModified = Date.now();
        updateConfig(config);
        return { success: true, data: config.user.macros.defaultMacros![defaultIndex] };
      }

      return {
        success: false,
        error: `Macro with ID '${id}' not found`,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  cloneDefaultMacro(defaultMacroId: string, newName?: string): MacroOperationResult {
    try {
      const config = loadConfig();
      const defaultMacro = config.user.macros.defaultMacros?.find((macro) => macro.id === defaultMacroId);

      if (!defaultMacro) {
        return {
          success: false,
          error: `Default macro with ID '${defaultMacroId}' not found`,
        };
      }

      const clonedMacro: Macro = {
        ...defaultMacro,
        id: this.generateUniqueId(newName || `${defaultMacro.name} (Copy)`),
        name: newName || `${defaultMacro.name} (Copy)`,
        type: "custom",
        keybinding: undefined,
      };

      if (!config.user.macros.customMacros) {
        config.user.macros.customMacros = [];
      }
      config.user.macros.customMacros.push(clonedMacro);
      config.user.macros.lastModified = Date.now();

      updateConfig(config);

      return {
        success: true,
        data: clonedMacro,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  importMacros(macrosJson: string): MacroOperationResult {
    try {
      const importedMacros = JSON.parse(macrosJson) as Macro[];

      if (!Array.isArray(importedMacros)) {
        return {
          success: false,
          error: "Invalid format: expected an array of macros",
        };
      }

      const results = {
        imported: 0,
        skipped: 0,
        errors: [] as string[],
      };

      const config = loadConfig();
      if (!config.user.macros.customMacros) {
        config.user.macros.customMacros = [];
      }

      for (const macro of importedMacros) {
        try {
          const customMacro: Macro = {
            ...macro,
            id: this.generateUniqueId(macro.name),
            type: "custom",
          };

          const validation = this.validateMacro(customMacro);
          if (!validation.success) {
            results.errors.push(`Macro '${macro.name}': ${validation.errors?.join(", ")}`);
            results.skipped++;
            continue;
          }

          if (customMacro.keybinding) {
            const conflicts = this.checkKeybindConflicts(customMacro.keybinding);
            if (conflicts.length > 0) {
              customMacro.keybinding = undefined;
              results.errors.push(`Macro '${macro.name}': Keybinding removed due to conflict`);
            }
          }

          config.user.macros.customMacros.push(customMacro);
          results.imported++;
        } catch (error) {
          results.errors.push(`Macro '${macro.name}': ${error instanceof Error ? error.message : String(error)}`);
          results.skipped++;
        }
      }

      config.user.macros.lastModified = Date.now();
      updateConfig(config);

      return {
        success: true,
        data: results,
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to parse JSON: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  exportCustomMacros(): MacroOperationResult {
    try {
      const { customMacros } = this.getAllMacros();
      return {
        success: true,
        data: JSON.stringify(customMacros, null, 2),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  getStatistics(): MacroOperationResult {
    try {
      const { defaultMacros, customMacros } = this.getAllMacros();
      const allMacros = [...defaultMacros, ...customMacros];

      const stats = {
        total: allMacros.length,
        default: defaultMacros.length,
        custom: customMacros.length,
        enabled: allMacros.filter((m) => m.enabled).length,
        disabled: allMacros.filter((m) => !m.enabled).length,
        withKeybindings: allMacros.filter((m) => m.keybinding).length,
        conflicts: findKeybindConflicts(allMacros).length,
      };

      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  private generateUniqueId(baseName: string): string {
    const baseId = baseName.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const { defaultMacros, customMacros } = this.getAllMacros();
    const allMacros = [...defaultMacros, ...customMacros];

    let counter = 1;
    let newId = baseId;

    while (allMacros.some((macro) => macro.id === newId)) {
      newId = `${baseId}-${counter}`;
      counter++;
    }

    return newId;
  }

  private validateMacro(macro: Macro): MacroOperationResult {
    const errors: string[] = [];

    if (!macro.name?.trim()) {
      errors.push("Macro name is required");
    }

    if (!macro.actions?.length) {
      errors.push("Macro must have at least one action");
    }

    if (macro.keybinding && !isValidKeybind(macro.keybinding)) {
      errors.push(`Invalid keybinding format: '${macro.keybinding}'`);
    }

    for (let i = 0; i < (macro.actions?.length || 0); i++) {
      const step = macro.actions[i];

      if (!step.type || !["keyboard-action", "mouse-action", "wait"].includes(step.type)) {
        errors.push(`Step ${i + 1}: Invalid action type`);
      }

      if (!step.action?.trim()) {
        errors.push(`Step ${i + 1}: Action is required`);
      }

      if (!step.value?.trim() && step.type !== "wait") {
        errors.push(`Step ${i + 1}: Value is required`);
      }

      if (step.wait < 0) {
        errors.push(`Step ${i + 1}: Wait time cannot be negative`);
      }
    }

    if (macro.repeat < 1) {
      errors.push("Repeat count must be at least 1");
    }

    return {
      success: errors.length === 0,
      errors,
    };
  }

  private checkKeybindConflicts(keybinding: string, excludeId?: string): Array<{ id: string; name: string }> {
    const { defaultMacros, customMacros } = this.getAllMacros();
    const allMacros = [...defaultMacros, ...customMacros];

    const normalizedKeybind = normalizeKeybind(keybinding);

    return allMacros
      .filter(
        (macro) =>
          macro.id !== excludeId && macro.keybinding && normalizeKeybind(macro.keybinding) === normalizedKeybind
      )
      .map((macro) => ({ id: macro.id, name: macro.name }));
  }
}
