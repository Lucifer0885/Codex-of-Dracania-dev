# Inventory Management System

This inventory management system provides a complete solution for managing inventory slots with lock/unlock functionality and local storage persistence.

## Features

- ✅ **Lock/Unlock Slots**: Click on any inventory slot to lock or unlock it
- ✅ **Visual Feedback**: Locked slots have a red border and lock icon
- ✅ **Local Storage**: All lock states persist across app restarts
- ✅ **Multiple Tabs**: Supports 9 inventory tabs (8 regular + 1 premium)
- ✅ **Grid Layout**: 4 rows × 7 columns per tab (28 slots per tab)
- ✅ **Lock Counter**: Shows total locked slots with clear all option

## Components

### InventoryContext

The main context provider that manages all inventory state and provides functions for:

- `toggleLock(slotId)` - Toggle lock state of a slot
- `isSlotLocked(slotId)` - Check if a slot is locked
- `addItem(slotId, item)` - Add item to a slot
- `removeItem(slotId)` - Remove item from a slot
- `clearAllLocks()` - Remove all locks
- `getLockedSlots()` - Get all locked slots

### useInventory Hook

Custom hook for accessing inventory context. Must be used within an `InventoryProvider`.

### InventoryTab Component

Renders a single inventory tab with clickable slots. Props:

- `tabIndex: number` - The tab index (0-8)

### Inventory Page

Main page component that wraps everything in the `InventoryProvider` and renders all tabs.

## Usage

### Basic Setup

The inventory system is already integrated into your app. Just navigate to the Inventory page to start using it.

### Locking Slots

1. Click on any empty slot to lock it
2. Locked slots will show a red border and lock icon
3. Click again to unlock

### Viewing Locked Slots

- The counter at the top shows total locked slots
- Click "Clear All Locks" to remove all locks at once

### Data Persistence

- All lock states are automatically saved to localStorage
- Data persists across app restarts
- Storage key: `dso-inventory-locks`

## Interfaces

### InventorySlot

```typescript
interface InventorySlot {
  id: string;           // Format: "tabIndex-row-column"
  tabIndex: number;     // Tab index (0-8)
  row: number;          // Row index (0-3)
  column: number;       // Column index (0-6)
  isLocked: boolean;    // Lock state
  item?: {              // Optional item data
    name: string;
    type: string;
    rarity?: string;
  };
}
```

## Future Enhancements

You can extend this system by:

1. Adding drag & drop functionality
2. Implementing item management (add/remove items)
3. Adding search/filter capabilities
4. Exporting/importing inventory states
5. Adding different lock types or colors

## Local Storage Structure

The system stores only locked slots and slots with items to minimize storage usage:

```json
[
  {
    "id": "0-0-0",
    "tabIndex": 0,
    "row": 0,
    "column": 0,
    "isLocked": true,
    "item": {
      "name": "Example Item",
      "type": "weapon",
      "rarity": "legendary"
    }
  }
]
```
