import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface InventoryContextType {
  inventorySlots: InventorySlotConfig[];
  toggleLock: (slotId: string) => void;
  isSlotLocked: (slotId: string) => boolean;
  clearAllLocks: () => void;
  getLockedSlots: () => InventorySlotConfig[];
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

interface InventoryProviderProps {
  children: ReactNode;
}

export function InventoryProvider({ children }: InventoryProviderProps) {
  const [inventorySlots, setInventorySlots] = useState<InventorySlotConfig[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeInventory = async () => {
      console.log("Initializing inventory...");
      const storedData = await loadFromConfig();
      const slots: InventorySlotConfig[] = [];

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

      const lockedCount = slots.filter((slot) => slot.isLocked).length;
      console.log("Initialized with", lockedCount, "locked slots");
      setInventorySlots(slots);
      setIsInitialized(true);
    };

    initializeInventory();
  }, []);

  useEffect(() => {
    // Only save after initialization is complete and we have actual data
    if (isInitialized && inventorySlots.length > 0) {
      saveToConfig(inventorySlots);
    }
  }, [inventorySlots, isInitialized]);

  const loadFromConfig = async (): Promise<InventorySlotConfig[]> => {
    try {
      const config = await window.electron.getConfig();
      const lockedSlots = config.user.inventory.lockedSlots || [];
      console.log("Loading from config:", lockedSlots.length, "locked slots");
      return lockedSlots;
    } catch (error) {
      console.error("Error loading inventory from config:", error);
      return [];
    }
  };

  const saveToConfig = async (slots: InventorySlotConfig[]) => {
    try {
      // Only save locked slots to reduce storage size
      const dataToSave = slots.filter((slot) => slot.isLocked);
      console.log("Saving to config:", dataToSave.length, "locked slots");
      await window.electron.updateLockedSlots(dataToSave);
    } catch (error) {
      console.error("Error saving inventory to config:", error);
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

  const getLockedSlots = (): InventorySlotConfig[] => {
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
