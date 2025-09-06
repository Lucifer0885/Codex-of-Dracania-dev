import { Package } from "lucide-react";
import InventoryTab from "@components/InventoryTab";
import { InventoryProvider } from "@context/InventoryContext";
import { useInventory } from "@hooks/useInventory";

function LockedSlotsCounter() {
  const { getLockedSlots, clearAllLocks } = useInventory();
  const lockedSlots = getLockedSlots();

  return (
    <div className="mb-4 p-4 bg-base-200 rounded-lg">
      <div className="flex justify-between items-center h-12">
        <span className="text-sm">
          Locked slots: <span className="font-bold text-primary">{lockedSlots.length}</span>
        </span>
        {lockedSlots.length > 0 && (
          <button onClick={clearAllLocks} className="btn btn-sm btn-outline btn-error">
            Clear All Locks
          </button>
        )}
      </div>
    </div>
  );
}

function InventoryContent() {
  return (
    <div className="mt-10 flex flex-col items-center gap-6">
      <div className="flex gap-4 items-center">
        <Package className="h-8 w-8 text-primary" />
        <h1 className="text-4xl text-primary font-bold">Inventory Management</h1>
      </div>

      <div className="max-w-2xl">
        <LockedSlotsCounter />

        <div className="tabs tabs-lift">
          <input type="radio" name="my_tabs_9" className="tab " aria-label="I" defaultChecked />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <InventoryTab tabIndex={0} />
          </div>

          <input type="radio" name="my_tabs_9" className="tab" aria-label="II" />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <InventoryTab tabIndex={1} />
          </div>

          <input type="radio" name="my_tabs_9" className="tab" aria-label="III" />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <InventoryTab tabIndex={2} />
          </div>

          <input type="radio" name="my_tabs_9" className="tab" aria-label="IV" />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <InventoryTab tabIndex={3} />
          </div>

          <input type="radio" name="my_tabs_9" className="tab" aria-label="V" />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <InventoryTab tabIndex={4} />
          </div>

          <input type="radio" name="my_tabs_9" className="tab" aria-label="VI" />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <InventoryTab tabIndex={5} />
          </div>

          <input type="radio" name="my_tabs_9" className="tab" aria-label="VII" />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <InventoryTab tabIndex={6} />
          </div>

          <input type="radio" name="my_tabs_9" className="tab" aria-label="VIII" />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <InventoryTab tabIndex={7} />
          </div>

          <input type="radio" name="my_tabs_9" className="tab" aria-label="Premium" />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <InventoryTab tabIndex={8} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Inventory() {
  return (
    <InventoryProvider>
      <InventoryContent />
    </InventoryProvider>
  );
}

export default Inventory;
