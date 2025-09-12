# Sell Inventory Macro Implementation

## Overview

The `sell-inventory` macro automatically sells items in the inventory by right-clicking each slot. It uses Windows API to send messages directly to the target application without moving the physical mouse cursor and dynamically adapts to any window size using percentage-based calculations.

## Key Features

- ✅ **Direct Windows API**: Uses `PostMessageW` to send clicks directly to target window (no mouse movement)
- ✅ **Always starts with first tab**: Clicks tab 0 initially to ensure consistent starting position
- ✅ **Stop all macros hotkey**: Press `Ctrl+Alt+X` to stop all running macros
- ✅ **Percentage-based positioning**: Works with any window size using calculated percentages
- ✅ **Locked slot support**: Automatically skips locked inventory slots

## How It Works

### 1. Dynamic Action Generation

The sell-inventory macro generates its actions dynamically at runtime based on:

- **Current window size**: Detected using `getTargetWindowSize()`
- **Locked slots**: Read from user configuration
- **Inventory layout**: Tabs, rows, and columns from config

### 2. Percentage-Based Position Calculations

The macro uses percentage-based calculations derived from your spreadsheet data to work with any window size:

```typescript
const INVENTORY_LAYOUT_PERCENTAGES = {
  rowStartY: 0.566, // inventory row 1 start Y position as % of window height
  columnStartX: 0.559, // inventory column 1 start X position as % of window width
  tabStartX: 0.501, // tab 1 X position as % of window width
  gapPerRowY: 0.074, // gap per row as % of window height
  gapPerColumnX: 0.074, // gap per column as % of window width
  gapPerTabX: 0.044, // gap per tab as % of window width
};
```

### 3. Execution Flow

> **Important**: The macro does NOT open/close inventory - it assumes inventory is already open

1. **For each tab (0-8)**:
   - If not first tab: Click on tab header (300ms wait)
   - **For each row (0-3)**:
     - **For each column (0-6)**:
       - Check if slot is locked → skip if locked
       - Right-click on slot position (150ms wait)

### 4. Position Calculation Logic

```typescript
export function calculateSlotPosition(
  tabIndex: number,
  row: number, 
  column: number,
  windowWidth: number,
  windowHeight: number
): InventorySlotPosition {
  // Calculate positions using percentages
  const baseX = Math.round(windowWidth * 0.559); // column start
  const baseY = Math.round(windowHeight * 0.566); // row start
  
  const gapX = Math.round(windowWidth * 0.074); // column gap
  const gapY = Math.round(windowHeight * 0.074); // row gap
  
  // Calculate final position
  const x = baseX + (column * gapX);
  const y = baseY + (row * gapY);
  
  return { x, y, tabIndex, row, column };
}
```

## Files Modified/Created

### Created Files

1. **`inventoryCalculations.ts`**: Core calculation logic for slot positions

### Modified Files

1. **`defaultMacros.ts`**: Updated sell-inventory macro with empty actions array
2. **`MacroExecution.ts`**: Added special handling for sell-inventory macro

### Removed Files

1. **`SellInventoryMacroService.ts`**: Removed unnecessary service layer

## Configuration

The macro respects these configuration settings:

- **Window size**: Automatically detected or uses config fallback
- **Locked slots**: Read from `config.user.inventory.lockedSlots`
- **Layout**: Uses `config.user.inventory.layout` (totalTabs, rowsPerTab, columnsPerRow)

## Usage

1. **Open inventory manually** (Press 'I' key)
2. **Set up locked slots**: Use the inventory UI to lock important items
3. **Run macro**: Press `Ctrl+Alt+F` or execute via macro manager
4. **Monitor execution**: Check console for debugging info

## Key Changes from Original Implementation

1. **No inventory open/close**: Assumes inventory is already open
2. **Percentage-based calculations**: Works with any window size, not just predefined ones
3. **Simplified architecture**: No service layer, direct integration in MacroExecution
4. **Corrected spreadsheet interpretation**: Uses proper column meanings from updated image

## Debugging

The macro includes console logging:

```console
Generated 248 sell actions for window 1920x1080
Locked slots: 4
```

## Future Improvements

1. **Visual feedback**: Show preview of click positions
2. **Confirmation dialog**: Ask before selling valuable items
3. **Custom sell patterns**: Allow users to define selling order
4. **Sell filters**: Only sell items of certain rarity/type
5. **Safety checks**: Verify cursor is over correct item before selling

## Notes

- All positions calculated as percentages of window size for universal compatibility
- User must manually open inventory before running the macro
- Tab positions calculated separately for clicking between tabs
- All positions are rounded to integers for precise clicking
- Based on corrected interpretation of spreadsheet columns
