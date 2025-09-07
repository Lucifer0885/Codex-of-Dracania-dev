import Modal from "@components/Modal";
import { useState } from "react";

function Settings() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReset = async () => {
    await window.electron.resetConfig();
  };

  return (
    <div className="flex flex-col gap-4 mt-10">
      <div>
        <button className="btn btn-error" onClick={() => setIsModalOpen(true)}>
          Reset Settings
        </button>
      </div>
      <Modal
        id="reset_settings_modal"
        title="Reset Settings"
        body="Are you sure you want to reset all settings?"
        confirmButtonText="Reset"
        confirmAction={handleReset}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </div>
  );
}

export default Settings;
