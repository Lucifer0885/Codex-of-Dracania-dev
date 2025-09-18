import React, { useState, useEffect } from "react";
import { Monitor, AlertCircle, CheckCircle2 } from "lucide-react";

interface SellInventorySettingsProps {
  onPresetChange?: (presetName: string) => void;
}

const SellInventorySettings: React.FC<SellInventorySettingsProps> = ({ onPresetChange }) => {
  const [availablePresets, setAvailablePresets] = useState<InventoryLayoutPreset[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPresets();
  }, []);

  const loadPresets = async () => {
    try {
      setLoading(true);
      setError(null);

      const [presets, currentSelection] = await Promise.all([
        window.electron.getAvailablePresets(),
        window.electron.getSelectedPreset(),
      ]);

      setAvailablePresets(presets);
      setSelectedPreset(currentSelection);
    } catch (err) {
      setError(`Failed to load presets: ${err}`);
      console.error("Error loading presets:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePresetSelection = async (presetName: string) => {
    try {
      setError(null);
      await window.electron.setSelectedPreset(presetName);
      setSelectedPreset(presetName);
      onPresetChange?.(presetName);
    } catch (err) {
      setError(`Failed to save preset selection: ${err}`);
      console.error("Error saving preset:", err);
    }
  };

  const getPresetStatusIcon = (presetName: string) => {
    if (selectedPreset === presetName) {
      return <CheckCircle2 className="w-5 h-5 text-success" />;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Monitor className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Window Size Preset</h3>
        </div>
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Monitor className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Window Size Preset</h3>
      </div>

      <p className="text-sm text-base-content/70 mb-6">
        Select your game window size for accurate inventory positioning. The macro will use the preset coordinates to
        click on the correct inventory slots.
      </p>

      {error && (
        <div className="alert alert-error mb-4">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {!selectedPreset && (
        <div className="alert alert-warning mb-4">
          <AlertCircle className="w-4 h-4" />
          <span>Please select a window size preset before using the sell-inventory macro.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availablePresets.map((preset) => (
          <div
            key={preset.name}
            className={`card bg-base-200 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedPreset === preset.name ? "ring-2 ring-primary bg-primary/10" : "hover:bg-base-300"
            }`}
            onClick={() => handlePresetSelection(preset.name)}
          >
            <div className="card-body p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-base">{preset.name}</h4>
                  <p className="text-sm text-base-content/70">
                    {preset.windowWidth} × {preset.windowHeight}
                  </p>
                </div>
                {getPresetStatusIcon(preset.name)}
              </div>

              <div className="text-xs text-base-content/60 mt-2">
                <div>
                  First slot: ({preset.firstSlot.x}, {preset.firstSlot.y})
                </div>
                <div>
                  First tab: ({preset.firstTab.x}, {preset.firstTab.y})
                </div>
                <div>
                  Gaps: {preset.gaps.columnX}×{preset.gaps.rowY} (tab: {preset.gaps.tabX})
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPreset && (
        <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 className="w-4 h-4" />
            <span className="font-medium">Selected: {selectedPreset}</span>
          </div>
          <p className="text-sm text-base-content/70 mt-1">
            The sell-inventory macro will use this preset for positioning.
          </p>
        </div>
      )}
    </div>
  );
};

export default SellInventorySettings;
