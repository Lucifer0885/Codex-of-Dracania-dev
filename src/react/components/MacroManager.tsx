import React, { useState, useEffect } from "react";
import { useMacroStorage, useMacroBuilder } from "@hooks/useMacroManagement";
import Toast from "@components/Toast";
import Modal from "@components/Modal";
import { Settings2, AlertCircle } from "lucide-react";

interface StepEditorProps {
  step: MacroBuilderStep;
  index: number;
  onUpdate: (updates: Partial<MacroBuilderStep>) => void;
  onRemove: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDuplicate: () => void;
}

interface ConfirmModalState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
}

interface PromptModalState {
  isOpen: boolean;
  title: string;
  message: string;
  defaultValue: string;
  onConfirm: (value: string) => void;
}

interface ToastState {
  isOpen: boolean;
  type: "success" | "error" | "info" | "warning";
  message: string;
}

const MacroManager: React.FC = () => {
  const { macros, statistics, loading, error, actions } = useMacroStorage();

  const [selectedMacroId, setSelectedMacroId] = useState<string | null>(null);
  const [showBuilder, setShowBuilder] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const [confirmModal, setConfirmModal] = useState<ConfirmModalState>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const [promptModal, setPromptModal] = useState<PromptModalState>({
    isOpen: false,
    title: "",
    message: "",
    defaultValue: "",
    onConfirm: () => {},
  });

  const [promptValue, setPromptValue] = useState("");
  const [toast, setToast] = useState<ToastState>({
    isOpen: false,
    type: "success",
    message: "",
  });

  // Load selected preset on component mount
  useEffect(() => {
    const loadSelectedPreset = async () => {
      try {
        const preset = await window.electron.getSelectedPreset();
        setSelectedPreset(preset);
      } catch (error) {
        console.error("Error loading selected preset:", error);
      }
    };
    loadSelectedPreset();
  }, []);

  const showToast = (type: ToastState["type"], message: string) => {
    setToast({ isOpen: true, type, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isOpen: false }));
    }, 4000);
  };

  const handleCreateNew = () => {
    setSelectedMacroId(null);
    setShowBuilder(true);
  };

  const handleEditMacro = (macroId: string) => {
    setSelectedMacroId(macroId);
    setShowBuilder(true);
  };

  const handleToggleEnabled = async (macroId: string, enabled: boolean) => {
    const result = await actions.toggleMacroEnabled(macroId, enabled);
    if (!result.success && result.error) {
      showToast("error", `Error: ${result.error}`);
    }
  };

  const handleDeleteMacro = async (macroId: string) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Macro",
      message: "Are you sure you want to delete this macro? This action cannot be undone.",
      onConfirm: async () => {
        const result = await actions.deleteCustomMacro(macroId);
        if (!result.success && result.error) {
          showToast("error", `Error: ${result.error}`);
        } else {
          showToast("success", "Macro deleted successfully");
        }
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleCloneMacro = async (macroId: string, name: string) => {
    setPromptModal({
      isOpen: true,
      title: "Clone Macro",
      message: "Enter name for cloned macro:",
      defaultValue: `${name} (Copy)`,
      onConfirm: async (newName: string) => {
        if (newName.trim()) {
          const result = await actions.cloneDefaultMacro(macroId, newName.trim());
          if (!result.success && result.error) {
            showToast("error", `Error: ${result.error}`);
          } else {
            showToast("success", "Macro cloned successfully");
          }
        }
        setPromptModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
    setPromptValue(`${name} (Copy)`);
  };

  const handleExport = async () => {
    try {
      const result = await actions.exportCustomMacros();
      if (result.success && result.data) {
        const blob = new Blob([result.data as string], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "custom-macros.json";
        link.click();
        URL.revokeObjectURL(url);
        showToast("success", "Macros exported successfully");
      } else {
        showToast("error", `Export failed: ${result.error}`);
      }
    } catch (err) {
      showToast("error", `Export failed: ${err}`);
    }
  };

  const handleImport = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const text = await file.text();
          const result = await actions.importMacros(text);
          if (result.success) {
            const data = result.data as { imported: number; skipped: number; errors: string[] };
            showToast(
              "success",
              `Import complete: ${data.imported} imported, ${data.skipped} skipped${
                data.errors.length > 0 ? `\nWarnings: ${data.errors.join("\n")}` : ""
              }`
            );
          } else {
            showToast("error", `Import failed: ${result.error}`);
          }
        } catch (err) {
          showToast("error", `Import failed: ${err}`);
        }
      }
    };
    input.click();
  };

  if (showBuilder) {
    return (
      <MacroBuilder
        macroId={selectedMacroId}
        onClose={() => setShowBuilder(false)}
        onSave={() => {
          setShowBuilder(false);
          actions.loadMacros();
        }}
      />
    );
  }

  return (
    <div className="p-6">
      <div className="w-full max-w-7xl px-4 pb-4 border-b border-base-300 mb-6">
        <p className="text-lg text-error font-bold italic">
          All the macros here should be explicitly tested that they work as intended. Any issues should be reported to
          the maintainer. If any item is lost or sold unintentionally nor the maintainer is responsible neither you can
          contact Drakensang Online's support to recover them. Please make sure you understand how the macros work
          before using them.
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button onClick={handleCreateNew} className="btn btn-primary">
            Create New Macro
          </button>
        </div>
        <div className="flex gap-2">
          <button onClick={handleImport} className="btn btn-success">
            Import
          </button>
          <button onClick={handleExport} className="btn btn-accent" disabled={macros.customMacros.length === 0}>
            Export
          </button>
        </div>
      </div>

      {statistics && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="card bg-base-300 shadow-sm">
            <div className="card-body p-4">
              <div className="text-3xl font-semibold text-primary">{statistics.total}</div>
              <div className="text-sm text-base-content opacity-70">Total Macros</div>
            </div>
          </div>
          <div className="card bg-base-300 shadow-sm">
            <div className="card-body p-4">
              <div className="text-3xl font-semibold text-info">{statistics.custom}</div>
              <div className="text-sm text-base-content opacity-70">Custom Macros</div>
            </div>
          </div>
          <div className="card bg-base-300 shadow-sm">
            <div className="card-body p-4">
              <div className="text-3xl font-semibold text-success">{statistics.enabled}</div>
              <div className="text-sm text-base-content opacity-70">Enabled</div>
            </div>
          </div>
          <div className="card bg-base-300 shadow-sm">
            <div className="card-body p-4">
              <div className="text-3xl font-semibold text-warning">{statistics.withKeybindings}</div>
              <div className="text-sm text-base-content opacity-70">With Keybindings</div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-8">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      )}
      {error && <div className="alert alert-error mb-4">{error}</div>}

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold mb-4 text-primary">Default Macros</h2>
          <p className="text-base-content opacity-70">
            <span className="border border-info rounded-lg px-3 py-1 bg-base-300 text-info">Ctrl+Alt+X</span> To stop
            all running macros.
          </p>
        </div>
        <div className="grid gap-4">
          {macros.defaultMacros.map((macro) => (
            <div key={macro.id} className="card bg-base-200 border border-base-300">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="card-title text-lg">{macro.name}</h3>
                    {macro.description && (
                      <p className="text-base-content opacity-70 text-sm mt-1">{macro.description}</p>
                    )}
                    {(macro.id === "sell-inventory" || macro.id === "melt-inventory") && (
                      <div className="mt-2">
                        {selectedPreset ? (
                          <div className="flex items-center gap-2 text-sm">
                            <Settings2 className="w-4 h-4 text-info" />
                            <span className="text-base-content/70">
                              Using preset: <span className="font-semibold text-info">{selectedPreset}</span>
                            </span>
                          </div>
                        ) : (
                          <div className="alert alert-warning py-2 px-3">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-xs">
                              No preset selected. Configure in{" "}
                              <a href="/settings" className="link link-primary">
                                Settings
                              </a>
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="flex gap-2 mt-2">
                      <span
                        className={`badge badge-outline bg-base-300 ${macro.enabled ? "badge-success" : "badge-error"}`}
                      >
                        {macro.enabled ? "Enabled" : "Disabled"}
                      </span>
                      {macro.keybinding && (
                        <span className="badge badge-outline bg-base-300 badge-info">{macro.keybinding}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleEnabled(macro.id, !macro.enabled)}
                      className={`btn btn-outline btn-sm ${macro.enabled ? "btn-error" : "btn-success"}`}
                    >
                      {macro.enabled ? "Disable" : "Enable"}
                    </button>
                    {macro.actions.length > 0 && (
                      <button
                        onClick={() => handleCloneMacro(macro.id, macro.name)}
                        className="btn btn-outline btn-sm btn-info"
                      >
                        Clone
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex flex-col mb-4">
          <h2 className="text-xl font-semibold mb-4 text-primary">Custom Macros</h2>
          <p className="text-base-content opacity-70 text-sm">
            After creating or editing a macro, you need to restart the application for the macro to (re)register
          </p>
        </div>
        {macros.customMacros.length === 0 ? (
          <div className="card bg-base-200 border border-base-300">
            <div className="card-body text-center py-8">
              <p className="text-base-content opacity-70">
                No custom macros yet. Create your first macro to get started!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {macros.customMacros.map((macro) => (
              <div key={macro.id} className="card bg-base-200 border border-base-300">
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="card-title text-lg">{macro.name}</h3>
                      {macro.description && (
                        <p className="text-base-content opacity-70 text-sm mt-1">{macro.description}</p>
                      )}
                      <div className="flex gap-2 mt-2">
                        <span
                          className={`badge badge-outline bg-base-300  ${
                            macro.enabled ? "badge-success" : "badge-error"
                          }`}
                        >
                          {macro.enabled ? "Enabled" : "Disabled"}
                        </span>
                        {macro.keybinding && (
                          <span className="badge badge-outline bg-base-300 badge-info">{macro.keybinding}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleEnabled(macro.id, !macro.enabled)}
                        className={`btn btn-outline btn-sm ${macro.enabled ? "btn-error" : "btn-success"}`}
                      >
                        {macro.enabled ? "Disable" : "Enable"}
                      </button>
                      <button onClick={() => handleEditMacro(macro.id)} className="btn btn-sm btn-outline btn-primary">
                        Edit
                      </button>
                      <button onClick={() => handleDeleteMacro(macro.id)} className="btn btn-sm btn-error">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        id="confirm-modal"
        title={confirmModal.title}
        body={confirmModal.message}
        confirmButtonText="Confirm"
        confirmAction={confirmModal.onConfirm}
        isOpen={confirmModal.isOpen}
        setIsOpen={(isOpen: boolean) => setConfirmModal((prev) => ({ ...prev, isOpen }))}
      />

      <Modal
        id="prompt-modal"
        title={promptModal.title}
        body={promptModal.message}
        confirmButtonText="OK"
        confirmAction={() => promptModal.onConfirm(promptValue)}
        isOpen={promptModal.isOpen}
        setIsOpen={(isOpen: boolean) => setPromptModal((prev) => ({ ...prev, isOpen }))}
        showInput={true}
        inputPlaceholder="Enter value"
        inputValue={promptValue}
        onInputChange={setPromptValue}
      />

      {toast.isOpen && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
        />
      )}
    </div>
  );
};

interface MacroBuilderProps {
  macroId: string | null;
  onClose: () => void;
  onSave: () => void;
}

const MacroBuilder: React.FC<MacroBuilderProps> = ({ macroId, onClose, onSave }) => {
  const { builderData, templates, loading, error, actions } = useMacroBuilder(macroId || undefined);

  const [activeTab, setActiveTab] = useState<"basic" | "steps" | "templates">("basic");
  const [toast, setToast] = useState<ToastState>({
    isOpen: false,
    type: "success",
    message: "",
  });

  const [generalTipsCollapsed, setGeneralTipsCollapsed] = useState(true);

  const showToast = (type: ToastState["type"], message: string) => {
    setToast({ isOpen: true, type, message });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isOpen: false }));
    }, 4000);
  };

  const handleSave = async () => {
    if (!builderData) return;

    const result = await actions.saveMacro(macroId || undefined);
    if (result.success) {
      onSave();
    } else {
      showToast("error", `Save failed: ${result.error}`);
    }
  };

  if (loading || !builderData) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4">Loading macro builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">{macroId ? "Edit Macro" : "Create New Macro"}</h1>
        <div className="flex gap-2">
          <button onClick={handleSave} disabled={!builderData.isValid} className="btn btn-success">
            Save
          </button>
          <button onClick={onClose} className="btn btn-ghost">
            Cancel
          </button>
        </div>
      </div>

      {error && <div className="alert alert-error mb-4">{error}</div>}

      {builderData.errors.length > 0 && (
        <div className="alert alert-warning mb-4">
          <div>
            <h3 className="font-medium mb-2">Validation Errors:</h3>
            <ul className="list-disc list-inside text-sm">
              {builderData.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="tabs tabs-lift mb-6">
        <input
          type="radio"
          name="macro_tabs"
          className="tab"
          aria-label="Basic"
          checked={activeTab === "basic"}
          onChange={() => setActiveTab("basic")}
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="label">
                <span className="label-text">Macro Name *</span>
              </label>
              <input
                type="text"
                value={builderData.name}
                onChange={(e) => actions.updateMacroProperties({ name: e.target.value })}
                className="input w-full py-3 border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent flex-1"
                placeholder="Enter macro name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                value={builderData.description}
                onChange={(e) => actions.updateMacroProperties({ description: e.target.value })}
                className="textarea w-full textarea-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent flex-1"
                placeholder="Describe what this macro does"
                rows={3}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="label">
                <span className="label-text">Keybinding (optional)</span>
              </label>
              <input
                type="text"
                value={builderData.keybinding || ""}
                onChange={(e) => actions.updateMacroProperties({ keybinding: e.target.value || undefined })}
                className="input w-full py-3 border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent flex-1"
                placeholder="e.g., Ctrl+Alt+1"
              />
              <label className="label">
                <span className="label-text-alt">Format: Ctrl+Alt+Key, Shift+F1, etc.</span>
              </label>
            </div>

            <div className="flex flex-col gap-2">
              <label className="label">
                <span className="label-text">Repeat Count</span>
              </label>
              <input
                type="number"
                min="1"
                value={builderData.repeat}
                onChange={(e) => actions.updateMacroProperties({ repeat: parseInt(e.target.value) || 1 })}
                className="input w-full py-3 border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent flex-1"
              />
            </div>

            <div className="form-control flex items-start gap-2">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  checked={builderData.enabled}
                  onChange={(e) => actions.updateMacroProperties({ enabled: e.target.checked })}
                  className="checkbox checkbox-primary"
                />
              </label>
              <span className="label-text">Enable macro when saved</span>
            </div>
          </div>
        </div>

        <input
          type="radio"
          name="macro_tabs"
          className="tab"
          aria-label="Steps"
          checked={activeTab === "steps"}
          onChange={() => setActiveTab("steps")}
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Macro Steps</h3>
            <div className="flex gap-2">
              <button onClick={() => actions.addStep("keyboard-action")} className="btn btn-sm btn-primary">
                Add Key Press
              </button>
              <button onClick={() => actions.addStep("mouse-action")} className="btn btn-sm btn-success">
                Add Mouse Click
              </button>
              <button onClick={() => actions.addStep("wait")} className="btn btn-sm btn-warning">
                Add Wait
              </button>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-info/10 border border-info/20 mb-4">
            <input
              type="checkbox"
              checked={!generalTipsCollapsed}
              onChange={(e) => setGeneralTipsCollapsed(!e.target.checked)}
            />
            <div className="collapse-title text-info font-medium">💡 Macro Building Tips</div>
            <div className="collapse-content text-sm">
              <div className="space-y-1">
                <div>
                  <strong>Mouse Clicks:</strong> Use coordinates like <code>400,250</code> for the position
                </div>
                <div>
                  <strong>Keyboard:</strong> Use keys like <code>Q</code>, <code>Space</code>, <code>F1</code>,{" "}
                  <code>Ctrl</code>
                </div>
                <div>
                  <strong>Wait Times:</strong> Add delays between actions (recommended: 100-200ms)
                </div>
                <div>
                  <strong>Coordinates:</strong> Use screen capture tools or game overlays to find exact positions
                </div>
              </div>
            </div>
          </div>

          {builderData.steps.length === 0 ? (
            <div className="card bg-base-200 border border-base-300">
              <div className="card-body text-center py-8">
                <p className="text-base-content opacity-70">
                  No steps added yet. Add your first step to begin building your macro.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {builderData.steps.map((step, index) => (
                <StepEditor
                  key={step.id}
                  step={step}
                  index={index}
                  onUpdate={(updates) => actions.updateStep(step.id, updates)}
                  onRemove={() => actions.removeStep(step.id)}
                  onMoveUp={index > 0 ? () => actions.moveStep(step.id, "up") : undefined}
                  onMoveDown={
                    index < builderData.steps.length - 1 ? () => actions.moveStep(step.id, "down") : undefined
                  }
                  onDuplicate={() => actions.duplicateStep(step.id)}
                />
              ))}
            </div>
          )}
        </div>

        <input
          type="radio"
          name="macro_tabs"
          className="tab"
          aria-label="Templates"
          checked={activeTab === "templates"}
          onChange={() => setActiveTab("templates")}
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <h3 className="text-lg font-medium mb-4">Step Templates</h3>
          <p className="text-base-content opacity-70 mb-4">Click on a template to add its steps to your macro.</p>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(templates).map(([name, steps]) => (
              <div
                key={name}
                onClick={() => actions.addTemplate(name)}
                className="card bg-base-200 border border-base-300 cursor-pointer hover:bg-base-300 transition-colors"
              >
                <div className="card-body p-4">
                  <h4 className="card-title text-base">{name}</h4>
                  <div className="text-sm text-base-content opacity-70">
                    {steps.length} step{steps.length !== 1 ? "s" : ""}
                  </div>
                  <div className="text-xs text-base-content opacity-50 mt-2">
                    {steps.map((step) => `${step.type}: ${step.action}`).join(" → ")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast.isOpen && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
        />
      )}
    </div>
  );
};

const StepEditor: React.FC<StepEditorProps> = ({
  step,
  index,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
  onDuplicate,
}) => {
  const [helpCollapsed, setHelpCollapsed] = useState(true);

  return (
    <div className={`card border ${step.isValid ? "border-base-300 bg-base-200" : "border-error bg-error/10"}`}>
      <div className="card-body p-4">
        <div className="flex justify-between items-start mb-3">
          <h4 className="card-title text-base">
            Step {index + 1}: {step.type.replace("-", " ")}
          </h4>
          <div className="flex gap-1">
            {onMoveUp && (
              <button onClick={onMoveUp} className="btn btn-xs btn-ghost" title="Move up">
                ↑
              </button>
            )}
            {onMoveDown && (
              <button onClick={onMoveDown} className="btn btn-xs btn-ghost" title="Move down">
                ↓
              </button>
            )}
            <button onClick={onDuplicate} className="btn btn-xs btn-ghost" title="Duplicate">
              📋
            </button>
            <button onClick={onRemove} className="btn btn-xs btn-error" title="Remove">
              🗑️
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Action</span>
            </label>
            {step.type === "mouse-action" ? (
              <select
                value={step.action}
                onChange={(e) => onUpdate({ action: e.target.value })}
                className="select select-sm w-full border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent flex-1"
              >
                <option value="">Select action...</option>
                <option value="click">Left Click</option>
                <option value="right-click">Right Click</option>
                <option value="double-click">Double Click</option>
                <option value="middle-click">Middle Click</option>
                <option value="move">Move Mouse</option>
              </select>
            ) : step.type === "keyboard-action" ? (
              <select
                value={step.action}
                onChange={(e) => onUpdate({ action: e.target.value })}
                className="select select-sm w-full border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent flex-1"
              >
                <option value="">Select action...</option>
                <option value="key-press">Key Press</option>
                <option value="key-down">Key Down</option>
                <option value="key-up">Key Up</option>
              </select>
            ) : (
              <input
                type="text"
                value={step.action}
                onChange={(e) => onUpdate({ action: e.target.value })}
                className="input input-sm w-full border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent flex-1"
                placeholder="Action type"
                readOnly
              />
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Value</span>
            </label>
            <input
              type="text"
              value={step.value}
              onChange={(e) => onUpdate({ value: e.target.value })}
              className="input input-sm w-full border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent flex-1"
              placeholder={
                step.type === "keyboard-action"
                  ? "Key (e.g., Q, Space, F1)"
                  : step.type === "mouse-action"
                  ? "Coordinates (e.g., 400,250)"
                  : "Milliseconds (e.g., 1000)"
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Wait After (ms)</span>
            </label>
            <input
              type="number"
              min="0"
              value={step.wait}
              onChange={(e) => onUpdate({ wait: parseInt(e.target.value) || 0 })}
              className="input input-sm w-full border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent flex-1"
            />
          </div>
        </div>

        {(step.type === "mouse-action" || step.type === "keyboard-action" || step.type === "wait") && (
          <div className="collapse collapse-arrow bg-base-300/50 border border-base-300 mt-3">
            <input type="checkbox" checked={!helpCollapsed} onChange={(e) => setHelpCollapsed(!e.target.checked)} />
            <div className="collapse-title text-sm font-medium">ℹ️ Help for {step.type.replace("-", " ")}</div>
            <div className="collapse-content text-sm">
              {step.type === "mouse-action" && (
                <div>
                  <strong>Mouse Actions:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>
                      <code>click</code> - Left mouse button click
                    </li>
                    <li>
                      <code>right-click</code> - Right mouse button click
                    </li>
                    <li>
                      <code>double-click</code> - Double left mouse button click
                    </li>
                    <li>
                      <code>middle-click</code> - Middle mouse button click
                    </li>
                    <li>
                      <code>move</code> - Move mouse without clicking
                    </li>
                  </ul>
                  <div className="mt-2">
                    <strong>Coordinates:</strong> Enter as <code>x,y</code> (e.g., <code>400,250</code>)
                    <br />
                    Use screen measurement tools to find exact positions.
                  </div>
                </div>
              )}

              {step.type === "keyboard-action" && (
                <div>
                  <strong>Keyboard Actions:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>
                      <code>key-press</code> - Press and release key (most common)
                    </li>
                    <li>
                      <code>key-down</code> - Hold key down
                    </li>
                    <li>
                      <code>key-up</code> - Release held key
                    </li>
                  </ul>
                  <div className="mt-2">
                    <strong>Key Values:</strong> <code>Q</code>, <code>Space</code>, <code>F1</code>, <code>Ctrl</code>,{" "}
                    <code>Alt</code>, <code>Shift</code>, etc.
                  </div>
                </div>
              )}

              {step.type === "wait" && (
                <div>
                  <strong>Wait/Delay:</strong> Pause macro execution for specified time.
                  <br />
                  Recommended: 100-200ms between game actions for stability.
                </div>
              )}
            </div>
          </div>
        )}

        {step.errors.length > 0 && (
          <div className="mt-3">
            <ul className="list-disc list-inside text-sm text-error">
              {step.errors.map((error: string, i: number) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MacroManager;
