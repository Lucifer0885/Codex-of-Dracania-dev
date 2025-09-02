import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface InventorySlot {
  id: string;
  tabIndex: number;
  row: number;
  column: number;
  isLocked: boolean;
}

interface InventoryContextType {
  inventorySlots: InventorySlot[];
  toggleLock: (slotId: string) => void;
  isSlotLocked: (slotId: string) => boolean;
  clearAllLocks: () => void;
  getLockedSlots: () => InventorySlot[];
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

interface InventoryProviderProps {
  children: ReactNode;
}

const INVENTORY_STORAGE_KEY = "dso-inventory-locks";

export function InventoryProvider({ children }: InventoryProviderProps) {
  const [inventorySlots, setInventorySlots] = useState<InventorySlot[]>([]);

  useEffect(() => {
    const initializeInventory = () => {
      const storedData = loadFromLocalStorage();
      const slots: InventorySlot[] = [];

      for (let tabIndex = 0; tabIndex < 9; tabIndex++) {
        for (let row = 0; row < 4; row++) {
          for (let column = 0; column < 7; column++) {
            const slotId = `${tabIndex}-${row}-${column}`;
            const storedSlot = storedData.find((slot) => slot.id === slotId);

            slots.push({
              id: slotId,
              tabIndex,
              row,
              column,
              isLocked: storedSlot?.isLocked || false,
            });
          }
        }
      }

      setInventorySlots(slots);
    };

    initializeInventory();
  }, []);

  useEffect(() => {
    if (inventorySlots.length > 0) {
      saveToLocalStorage(inventorySlots);
    }
  }, [inventorySlots]);

  const loadFromLocalStorage = (): InventorySlot[] => {
    try {
      const stored = localStorage.getItem(INVENTORY_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading inventory from localStorage:", error);
      return [];
    }
  };

  const saveToLocalStorage = (slots: InventorySlot[]) => {
    try {
      // Only save locked slots to reduce storage size
      const dataToSave = slots.filter((slot) => slot.isLocked);
      localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error("Error saving inventory to localStorage:", error);
    }
  };

  const toggleLock = (slotId: string) => {
    setInventorySlots((prevSlots) =>
      prevSlots.map((slot) => (slot.id === slotId ? { ...slot, isLocked: !slot.isLocked } : slot))
    );
  };

  const isSlotLocked = (slotId: string): boolean => {
    const slot = inventorySlots.find((slot) => slot.id === slotId);
    return slot?.isLocked || false;
  };

  const clearAllLocks = () => {
    setInventorySlots((prevSlots) => prevSlots.map((slot) => ({ ...slot, isLocked: false })));
  };

  const getLockedSlots = (): InventorySlot[] => {
    return inventorySlots.filter((slot) => slot.isLocked);
  };

  const contextValue: InventoryContextType = {
    inventorySlots,
    toggleLock,
    isSlotLocked,
    clearAllLocks,
    getLockedSlots,
  };

  return <InventoryContext.Provider value={contextValue}>{children}</InventoryContext.Provider>;
}

export { InventoryContext };
