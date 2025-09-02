import { useInventory } from "../hooks/useInventory";
import { Lock } from "lucide-react";

interface InventoryTabProps {
  tabIndex: number;
}

function InventoryTab({ tabIndex }: InventoryTabProps) {
  const { inventorySlots, toggleLock, isSlotLocked } = useInventory();

  const tabSlots = inventorySlots.filter((slot) => slot.tabIndex === tabIndex);

  const slotsByRow = Array.from({ length: 4 }, (_, row) =>
    tabSlots.filter((slot) => slot.row === row).sort((a, b) => a.column - b.column)
  );

  const handleSlotClick = (slotId: string) => {
    toggleLock(slotId);
  };

  return (
    <div className="flex flex-col gap-4">
      {slotsByRow.map((rowSlots, rowIndex) => (
        <div key={rowIndex} className="flex flex-row gap-4">
          {rowSlots.map((slot) => {
            const isLocked = isSlotLocked(slot.id);
            return (
              <div
                key={slot.id}
                onClick={() => handleSlotClick(slot.id)}
                className={`
                  border rounded-md w-20 h-20 cursor-pointer transition-all duration-200
                  flex items-center justify-center relative
                  ${isLocked ? "border-red-500 bg-red-100 dark:bg-red-900/20" : "border-gray-700 hover:border-gray-500"}
                `}
                title={isLocked ? "Click to unlock" : "Click to lock"}
              >
                {isLocked && (
                  <div className="absolute top-1 right-1">
                    <Lock className="w-4 h-4 text-red-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default InventoryTab;
