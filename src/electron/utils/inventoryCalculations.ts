import { MacroStep } from "../interfaces/Imacro.js";
import type { InventoryLayoutPreset, InventorySlotPosition } from "../interfaces/Iinventory.js";
import { DEFAULT_INVENTORY_PRESETS } from "../constants/window-presets.js";

export function getInventoryPreset(windowWidth: number, windowHeight: number): InventoryLayoutPreset {
  // First try to find exact match
  const exactMatch = DEFAULT_INVENTORY_PRESETS.find(
    (preset) => preset.windowWidth === windowWidth && preset.windowHeight === windowHeight
  );

  if (exactMatch) {
    console.log(`[PRESET] Found exact match: ${exactMatch.name}`);
    return exactMatch;
  }

  // Find closest preset by total pixel difference
  let closestPreset = DEFAULT_INVENTORY_PRESETS[0];
  let smallestDiff =
    Math.abs(windowWidth - closestPreset.windowWidth) + Math.abs(windowHeight - closestPreset.windowHeight);

  for (const preset of DEFAULT_INVENTORY_PRESETS) {
    const diff = Math.abs(windowWidth - preset.windowWidth) + Math.abs(windowHeight - preset.windowHeight);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closestPreset = preset;
    }
  }

  return closestPreset;
}

export function calculateSlotPosition(
  tabIndex: number,
  row: number,
  column: number,
  windowWidth: number,
  windowHeight: number
): InventorySlotPosition {
  const preset = getInventoryPreset(windowWidth, windowHeight);

  // Calculate position based on preset values
  const x = preset.firstSlot.x + column * preset.gaps.columnX;
  const y = preset.firstSlot.y + row * preset.gaps.rowY;

  const result = {
    x: Math.round(x),
    y: Math.round(y),
    tabIndex,
    row,
    column,
  };

  return result;
}

export function calculateTabPosition(
  tabIndex: number,
  windowWidth: number,
  windowHeight: number
): { x: number; y: number } {
  const preset = getInventoryPreset(windowWidth, windowHeight);

  // Calculate tab position based on preset values
  const x = preset.firstTab.x + tabIndex * preset.gaps.tabX;
  const y = preset.firstTab.y;

  const result = {
    x: Math.round(x),
    y: Math.round(y),
  };

  return result;
}

export function getAvailablePresets(): InventoryLayoutPreset[] {
  return [...DEFAULT_INVENTORY_PRESETS];
}

export function addCustomPreset(preset: InventoryLayoutPreset): void {
  const existingIndex = DEFAULT_INVENTORY_PRESETS.findIndex(
    (p) => p.windowWidth === preset.windowWidth && p.windowHeight === preset.windowHeight
  );

  if (existingIndex >= 0) {
    DEFAULT_INVENTORY_PRESETS[existingIndex] = preset;
    console.log(`[PRESET] Updated existing preset for ${preset.windowWidth}x${preset.windowHeight}`);
  } else {
    DEFAULT_INVENTORY_PRESETS.push(preset);
    console.log(`[PRESET] Added new preset for ${preset.windowWidth}x${preset.windowHeight}`);
  }
}

export function createPresetTemplate(windowWidth: number, windowHeight: number, name?: string): InventoryLayoutPreset {
  return {
    windowWidth,
    windowHeight,
    name: name || `Custom ${windowWidth}x${windowHeight}`,
    firstSlot: {
      x: Math.round(windowWidth * 0.52), // Default to ~52% from left
      y: Math.round(windowHeight * 0.45), // Default to ~45% from top
    },
    firstTab: {
      x: Math.round(windowWidth * 0.51), // Default to ~51% from left
      y: Math.round(windowHeight * 0.39), // Default to ~39% from top (above inventory)
    },
    gaps: {
      tabX: Math.round(windowWidth * 0.043), // Default gap ratios
      columnX: Math.round(windowWidth * 0.073),
      rowY: Math.round(windowHeight * 0.129),
    },
  };
}

export function generateSellInventoryActions(
  windowWidth: number,
  windowHeight: number,
  lockedSlots: InventorySlotConfig[],
  totalTabs: number = 9,
  rowsPerTab: number = 4,
  columnsPerRow: number = 7
): MacroStep[] {
  const actions: MacroStep[] = [];

  const lockedSlotIds = new Set(lockedSlots.map((slot) => slot.id));

  const firstTabPosition = calculateTabPosition(0, windowWidth, windowHeight);
  actions.push({
    id: `click-tab-0-initial`,
    type: "mouse-action",
    action: "click",
    value: `${firstTabPosition.x},${firstTabPosition.y}`,
    wait: 500,
  });

  for (let tab = 0; tab < totalTabs; tab++) {
    if (tab > 0) {
      const tabPosition = calculateTabPosition(tab, windowWidth, windowHeight);
      actions.push({
        id: `click-tab-${tab}`,
        type: "mouse-action",
        action: "click",
        value: `${tabPosition.x},${tabPosition.y}`,
        wait: 300,
      });
    }

    for (let row = 0; row < rowsPerTab; row++) {
      for (let col = 0; col < columnsPerRow; col++) {
        const slotId = `${tab}-${row}-${col}`;

        if (lockedSlotIds.has(slotId)) {
          continue;
        }

        const position = calculateSlotPosition(tab, row, col, windowWidth, windowHeight);

        actions.push({
          id: `sell-${slotId}`,
          type: "mouse-action",
          action: "right-click",
          value: `${position.x},${position.y}`,
          wait: 150,
        });
      }
    }
  }

  return actions;
}
