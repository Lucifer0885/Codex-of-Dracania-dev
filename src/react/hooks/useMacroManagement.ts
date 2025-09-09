import { useState, useCallback, useEffect } from "react";

// All types are now available globally from types.d.ts

export function useMacroStorage() {
  const [macros, setMacros] = useState<MacroListResult>({
    defaultMacros: [],
    customMacros: [],
    totalCount: 0,
  });
  const [statistics, setStatistics] = useState<MacroStatistics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load all macros
  const loadMacros = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await window.electron.macroGetAll();
      setMacros(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load macros");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load statistics
  const loadStatistics = useCallback(async () => {
    try {
      const result = await window.electron.macroGetStatistics();
      if (result.success && result.data) {
        setStatistics(result.data as MacroStatistics);
      }
    } catch (err) {
      console.error("Failed to load statistics:", err);
    }
  }, []);

  // Create custom macro
  const createCustomMacro = useCallback(
    async (macroData: Omit<Macro, "id" | "type">): Promise<MacroOperationResult> => {
      const result = await window.electron.macroCreateCustom(macroData);
      if (result.success) {
        await loadMacros();
        await loadStatistics();
      }
      return result;
    },
    [loadMacros, loadStatistics]
  );

  // Update custom macro
  const updateCustomMacro = useCallback(
    async (macroId: string, updates: Partial<Omit<Macro, "id" | "type">>): Promise<MacroOperationResult> => {
      const result = await window.electron.macroUpdateCustom(macroId, updates);
      if (result.success) {
        await loadMacros();
        await loadStatistics();
      }
      return result;
    },
    [loadMacros, loadStatistics]
  );

  // Delete custom macro
  const deleteCustomMacro = useCallback(
    async (macroId: string): Promise<MacroOperationResult> => {
      const result = await window.electron.macroDeleteCustom(macroId);
      if (result.success) {
        await loadMacros();
        await loadStatistics();
      }
      return result;
    },
    [loadMacros, loadStatistics]
  );

  // Toggle macro enabled/disabled
  const toggleMacroEnabled = useCallback(
    async (macroId: string, enabled: boolean): Promise<MacroOperationResult> => {
      const result = await window.electron.macroToggleEnabled(macroId, enabled);
      if (result.success) {
        await loadMacros();
        await loadStatistics();
      }
      return result;
    },
    [loadMacros, loadStatistics]
  );

  // Clone default macro
  const cloneDefaultMacro = useCallback(
    async (defaultMacroId: string, newName?: string): Promise<MacroOperationResult> => {
      const result = await window.electron.macroCloneDefault(defaultMacroId, newName);
      if (result.success) {
        await loadMacros();
        await loadStatistics();
      }
      return result;
    },
    [loadMacros, loadStatistics]
  );

  // Import macros
  const importMacros = useCallback(
    async (macrosJson: string): Promise<MacroOperationResult> => {
      const result = await window.electron.macroImport(macrosJson);
      if (result.success) {
        await loadMacros();
        await loadStatistics();
      }
      return result;
    },
    [loadMacros, loadStatistics]
  );

  // Export custom macros
  const exportCustomMacros = useCallback(async (): Promise<MacroOperationResult> => {
    return await window.electron.macroExportCustom();
  }, []);

  // Get macro by ID
  const getMacroById = useCallback(async (macroId: string): Promise<Macro | null> => {
    return await window.electron.macroGetById(macroId);
  }, []);

  // Initial load
  useEffect(() => {
    loadMacros();
    loadStatistics();
  }, [loadMacros, loadStatistics]);

  return {
    macros,
    statistics,
    loading,
    error,
    actions: {
      loadMacros,
      loadStatistics,
      createCustomMacro,
      updateCustomMacro,
      deleteCustomMacro,
      toggleMacroEnabled,
      cloneDefaultMacro,
      importMacros,
      exportCustomMacros,
      getMacroById,
    },
  };
}

export function useMacroBuilder(initialMacroId?: string) {
  const [builderData, setBuilderData] = useState<MacroBuilderData | null>(null);
  const [templates, setTemplates] = useState<Record<string, MacroBuilderStep[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize new builder
  const createNew = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const newBuilderData = await window.electron.macroBuilderCreateNew();
      setBuilderData(newBuilderData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create new builder");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load existing macro into builder
  const loadMacro = useCallback(async (macroId: string) => {
    setLoading(true);
    setError(null);
    try {
      const loadedBuilderData = await window.electron.macroBuilderLoadMacro(macroId);
      if (loadedBuilderData) {
        setBuilderData(loadedBuilderData);
      } else {
        setError("Macro not found");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load macro");
    } finally {
      setLoading(false);
    }
  }, []);

  // Add step
  const addStep = useCallback(
    async (stepType: "keyboard-action" | "mouse-action" | "wait") => {
      if (!builderData) return;

      try {
        const updatedData = await window.electron.macroBuilderAddStep(builderData, stepType);
        setBuilderData(updatedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add step");
      }
    },
    [builderData]
  );

  // Update step
  const updateStep = useCallback(
    async (stepId: string, updates: Partial<MacroBuilderStep>) => {
      if (!builderData) return;

      try {
        const updatedData = await window.electron.macroBuilderUpdateStep(builderData, stepId, updates);
        setBuilderData(updatedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update step");
      }
    },
    [builderData]
  );

  // Remove step
  const removeStep = useCallback(
    async (stepId: string) => {
      if (!builderData) return;

      try {
        const updatedData = await window.electron.macroBuilderRemoveStep(builderData, stepId);
        setBuilderData(updatedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to remove step");
      }
    },
    [builderData]
  );

  // Move step
  const moveStep = useCallback(
    async (stepId: string, direction: "up" | "down") => {
      if (!builderData) return;

      try {
        const updatedData = await window.electron.macroBuilderMoveStep(builderData, stepId, direction);
        setBuilderData(updatedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to move step");
      }
    },
    [builderData]
  );

  // Duplicate step
  const duplicateStep = useCallback(
    async (stepId: string) => {
      if (!builderData) return;

      try {
        const updatedData = await window.electron.macroBuilderDuplicateStep(builderData, stepId);
        setBuilderData(updatedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to duplicate step");
      }
    },
    [builderData]
  );

  // Update macro properties
  const updateMacroProperties = useCallback(
    (updates: Partial<Pick<MacroBuilderData, "name" | "description" | "enabled" | "keybinding" | "repeat">>) => {
      if (!builderData) return;

      setBuilderData((prevData) =>
        prevData
          ? {
              ...prevData,
              ...updates,
            }
          : null
      );
    },
    [builderData]
  );

  // Save macro
  const saveMacro = useCallback(
    async (existingMacroId?: string): Promise<MacroOperationResult> => {
      if (!builderData) {
        return { success: false, error: "No builder data to save" };
      }

      return await window.electron.macroBuilderSaveMacro(builderData, existingMacroId);
    },
    [builderData]
  );

  // Add template
  const addTemplate = useCallback(
    async (templateName: string) => {
      if (!builderData) return;

      try {
        const updatedData = await window.electron.macroBuilderAddTemplate(builderData, templateName);
        setBuilderData(updatedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add template");
      }
    },
    [builderData]
  );

  // Load templates
  const loadTemplates = useCallback(async () => {
    try {
      const templatesData = await window.electron.macroBuilderGetTemplates();
      setTemplates(templatesData);
    } catch (err) {
      console.error("Failed to load templates:", err);
    }
  }, []);

  // Initialize
  useEffect(() => {
    loadTemplates();

    if (initialMacroId) {
      loadMacro(initialMacroId);
    } else {
      createNew();
    }
  }, [initialMacroId, loadMacro, createNew, loadTemplates]);

  return {
    builderData,
    templates,
    loading,
    error,
    actions: {
      createNew,
      loadMacro,
      addStep,
      updateStep,
      removeStep,
      moveStep,
      duplicateStep,
      updateMacroProperties,
      saveMacro,
      addTemplate,
      loadTemplates,
    },
  };
}
