import MacroStorageManager from "./MacroStorageManager.js";

export default class MacroBuilder {
  private storageManager: MacroStorageManager;

  constructor() {
    this.storageManager = new MacroStorageManager();
  }

  createNew(): MacroBuilderData {
    return {
      name: "",
      description: "",
      enabled: true,
      repeat: 1,
      steps: [],
      isValid: false,
      errors: [],
    };
  }

  loadMacro(macroId: string): MacroBuilderData | null {
    const macro = this.storageManager.getMacroById(macroId);
    if (!macro) return null;

    return {
      name: macro.name,
      description: macro.description || "",
      enabled: macro.enabled,
      keybinding: macro.keybinding,
      repeat: macro.repeat,
      steps: macro.actions.map((action, index) => {
        const stepData = {
          id: `step-${index}`,
          type: action.type,
          action: action.action,
          value: action.value,
          wait: action.wait,
          isValid: false,
          errors: [] as string[],
        };
        const validation = this.validateStep(stepData);
        stepData.isValid = validation.isValid;
        stepData.errors = validation.errors;
        return stepData;
      }),
      isValid: false,
      errors: [],
    };
  }

  addStep(builderData: MacroBuilderData, stepType: "keyboard-action" | "mouse-action" | "wait"): MacroBuilderData {
    const newStep: MacroBuilderStep = {
      id: `step-${Date.now()}`,
      type: stepType,
      action: stepType === "wait" ? "wait" : "",
      value: stepType === "wait" ? "1000" : "",
      wait: 0,
      isValid: false,
      errors: [],
    };

    const validation = this.validateStep(newStep);
    newStep.isValid = validation.isValid;
    newStep.errors = validation.errors;

    const updatedData = {
      ...builderData,
      steps: [...builderData.steps, newStep],
    };

    return this.validateBuilder(updatedData);
  }

  updateStep(builderData: MacroBuilderData, stepId: string, updates: Partial<MacroBuilderStep>): MacroBuilderData {
    const updatedSteps = builderData.steps.map((step) => {
      if (step.id === stepId) {
        const updatedStep = { ...step, ...updates };
        const validation = this.validateStep(updatedStep);
        updatedStep.isValid = validation.isValid;
        updatedStep.errors = validation.errors;
        return updatedStep;
      }
      return step;
    });

    const updatedData = {
      ...builderData,
      steps: updatedSteps,
    };

    return this.validateBuilder(updatedData);
  }

  removeStep(builderData: MacroBuilderData, stepId: string): MacroBuilderData {
    const updatedData = {
      ...builderData,
      steps: builderData.steps.filter((step) => step.id !== stepId),
    };

    return this.validateBuilder(updatedData);
  }

  moveStep(builderData: MacroBuilderData, stepId: string, direction: "up" | "down"): MacroBuilderData {
    const steps = [...builderData.steps];
    const currentIndex = steps.findIndex((step) => step.id === stepId);

    if (currentIndex === -1) return builderData;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0 || newIndex >= steps.length) return builderData;

    [steps[currentIndex], steps[newIndex]] = [steps[newIndex], steps[currentIndex]];

    const updatedData = {
      ...builderData,
      steps,
    };

    return this.validateBuilder(updatedData);
  }

  duplicateStep(builderData: MacroBuilderData, stepId: string): MacroBuilderData {
    const stepToDuplicate = builderData.steps.find((step) => step.id === stepId);
    if (!stepToDuplicate) return builderData;

    const duplicatedStep: MacroBuilderStep = {
      ...stepToDuplicate,
      id: `step-${Date.now()}`,
    };

    const stepIndex = builderData.steps.findIndex((step) => step.id === stepId);
    const updatedSteps = [
      ...builderData.steps.slice(0, stepIndex + 1),
      duplicatedStep,
      ...builderData.steps.slice(stepIndex + 1),
    ];

    const updatedData = {
      ...builderData,
      steps: updatedSteps,
    };

    return this.validateBuilder(updatedData);
  }

  buildMacro(builderData: MacroBuilderData): Macro | null {
    if (!builderData.isValid) return null;

    const actions: MacroStep[] = builderData.steps.map((step, index) => ({
      id: `action-${index}`,
      type: step.type,
      action: step.action,
      value: step.value,
      wait: step.wait,
    }));

    return {
      id: "",
      name: builderData.name,
      description: builderData.description || undefined,
      type: "custom",
      enabled: builderData.enabled,
      onRepeat: false,
      keybinding: builderData.keybinding,
      repeat: builderData.repeat,
      actions,
    };
  }

  saveMacro(builderData: MacroBuilderData, existingMacroId?: string): MacroOperationResult {
    const macro = this.buildMacro(builderData);
    if (!macro) {
      return {
        success: false,
        error: "Cannot save invalid macro",
      };
    }

    if (existingMacroId) {
      return this.storageManager.updateCustomMacro(existingMacroId, macro);
    } else {
      return this.storageManager.createCustomMacro(macro);
    }
  }

  getStepTemplates(): Record<string, MacroBuilderStep[]> {
    return {
      "Health Potion": [
        {
          id: "template-health",
          type: "keyboard-action",
          action: "key-press",
          value: "H",
          wait: 0,
          isValid: true,
          errors: [],
        },
      ],
      "Click and Wait": [
        {
          id: "template-click",
          type: "mouse-action",
          action: "click",
          value: "100,100",
          wait: 1000,
          isValid: true,
          errors: [],
        },
      ],
      "Pause (1 second)": [
        {
          id: "template-pause",
          type: "wait",
          action: "wait",
          value: "1000",
          wait: 0,
          isValid: true,
          errors: [],
        },
      ],
    };
  }

  addTemplate(builderData: MacroBuilderData, templateName: string): MacroBuilderData {
    const templates = this.getStepTemplates();
    const template = templates[templateName];

    if (!template) return builderData;

    let updatedData = builderData;
    for (const templateStep of template) {
      const newStep: MacroBuilderStep = {
        ...templateStep,
        id: `step-${Date.now()}-${Math.random()}`,
      };
      updatedData = {
        ...updatedData,
        steps: [...updatedData.steps, newStep],
      };
    }

    return this.validateBuilder(updatedData);
  }

  private validateStep(step: MacroBuilderStep): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!step.action?.trim()) {
      errors.push("Action is required");
    }

    if (step.type === "keyboard-action") {
      if (!step.value?.trim()) {
        errors.push("Key value is required");
      } else {
        const raw = step.value.trim();
        const normalized = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();

        const isAlphanumeric = /^[A-Za-z0-9]$/.test(raw);
        const isFunctionKey = /^F([1-9]|1[0-2])$/i.test(raw); // F1..F12
        const allowedSpecials = ["Space", "Enter", "Tab", "Escape", "Up", "Down", "Left", "Right"];
        const isAllowedSpecial = allowedSpecials.includes(normalized);

        if (!isAlphanumeric && !isFunctionKey && !isAllowedSpecial) {
          errors.push("Invalid key value");
        }
      }
    }

    if (step.type === "mouse-action") {
      if (!step.value?.trim()) {
        errors.push("Mouse coordinates are required");
      } else if (!/^\d+,\d+$/.test(step.value)) {
        errors.push("Invalid coordinate format (expected: x,y)");
      }
    }

    if (step.type === "wait") {
      const waitTime = parseInt(step.value);
      if (isNaN(waitTime) || waitTime < 0) {
        errors.push("Wait time must be a positive number");
      }
    }

    if (step.wait < 0) {
      errors.push("Wait time cannot be negative");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private validateBuilder(builderData: MacroBuilderData): MacroBuilderData {
    const errors: string[] = [];

    if (!builderData.name?.trim()) {
      errors.push("Macro name is required");
    }

    if (builderData.steps.length === 0) {
      errors.push("At least one step is required");
    }

    if (builderData.repeat < 1) {
      errors.push("Repeat count must be at least 1");
    }

    const hasInvalidSteps = builderData.steps.some((step) => !step.isValid);
    if (hasInvalidSteps) {
      errors.push("Some steps have validation errors");
    }

    return {
      ...builderData,
      isValid: errors.length === 0,
      errors,
    };
  }
}
