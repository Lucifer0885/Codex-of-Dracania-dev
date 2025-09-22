import Modal from "@components/Modal";
import { useState } from "react";
import { useUser } from "@hooks/useUser";
import { getFileNameFromPath } from "@utils/utils";
import { AvatarImage } from "@components/AvatarImage";
import { Check, Info } from "lucide-react";
import Toast from "@components/Toast";
import type { ToastType } from "@interfaces/Igeneral";

function Settings() {
  const { userInfo, loading, error, updateUserField, clearError, addAvatar, removeAvatar, selectAvatar } = useUser();
  const [newAvatarPath, setNewAvatarPath] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<ToastType>("info");

  const handleReset = async () => {
    await window.electron.resetConfig();
    window.location.reload();
  };

  const handleUserNameChange = async (newName: string) => {
    if (newName.trim()) {
      await updateUserField("name", newName.trim());
    }
  };

  const handleAddAvatar = async () => {
    if (newAvatarPath.trim()) {
      await addAvatar(newAvatarPath.trim());
      setNewAvatarPath("");
    }
  };

  const handleRemoveAvatar = async (path: string) => {
    if (userInfo && userInfo.avatars.length > 1) {
      await removeAvatar(path);
    } else {
      setErr("You must have at least one avatar");
    }
  };

  const handleSelectAvatar = async (path: string) => {
    await selectAvatar(path);
  };

  const handleFindWindow = async () => {
    const dso = await window.electron.findTargetWindow();
    setToastVisible(true);
    if (dso.found) {
      setToastMessage("Drakensang Online Found");
      console.log("Found window:", dso);
      setToastType("success");
    } else {
      setToastMessage("Drakensang Online Not Found");
      console.error("Drakensang Online Not Found");
      setToastType("error");
    }
  };

  return (
    <div className="flex flex-col gap-6 mt-10">
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-primary">User Settings</h2>

          {loading && <div className="text-gray-400">Loading user settings...</div>}

          {error && (
            <div className="alert alert-error mb-2">
              <span>{error}</span>
              <button className="btn btn-sm btn-ghost" onClick={clearError}>
                Dismiss
              </button>
            </div>
          )}

          {err && (
            <div className={`alert alert-error mb-2`}>
              <span>{err}</span>
              <button className="btn btn-sm btn-ghost" onClick={() => setErr(null)}>
                Dismiss
              </button>
            </div>
          )}

          {userInfo && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control flex gap-4">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  className="input file-input-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  defaultValue={userInfo.name}
                  onBlur={(e) => handleUserNameChange(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>

              <div className="form-control flex gap-4">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  className="select border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={userInfo.role}
                  onChange={() => setErr("You cannot change your role.")}
                >
                  <option value="player">Player</option>
                  <option value="developer">Developer</option>
                  <option value="contributor">Contributor</option>
                </select>
              </div>

              <div className="form-control md:col-span-2 flex flex-col gap-4">
                <label className="label">
                  <span className="label-text">Avatar Management</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userInfo.avatars.map((avatar, index) => (
                    <div
                      key={index}
                      className={`card bg-base-300 shadow-md border-2 ${
                        avatar.selected ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <div className="card-body p-4">
                        <div className="flex items-center gap-3">
                          <AvatarImage
                            path={avatar.path}
                            alt="Avatar"
                            size="lg"
                            className="border border-base-content/20"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-wrap">
                              {avatar.path === "default" ? "Default Avatar" : getFileNameFromPath(avatar.path)}
                            </p>
                          </div>
                          {avatar.selected && (
                            <span className="badge badge-primary badge-sm self-start">
                              <Check size={12} />
                            </span>
                          )}
                        </div>
                        <div className="card-actions justify-end mt-2">
                          {!avatar.selected && (
                            <button className="btn btn-sm btn-primary" onClick={() => handleSelectAvatar(avatar.path)}>
                              Select
                            </button>
                          )}
                          {userInfo.avatars.length > 1 && (
                            <button
                              className="btn btn-sm btn-outline btn-error"
                              onClick={() => handleRemoveAvatar(avatar.path)}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card bg-base-300 shadow-md">
                  <div className="card-body p-4">
                    <div className="flex gap-2 items-center mb-2">
                      <h3 className="card-title text-sm">Add New Avatar</h3>
                      <div
                        className="tooltip"
                        data-tip="If you're wondering why you need to add a path, I have decided to not store any data from the user for privacy reasons. What a better way to preserve security if the data never leaves your pc in the first place. This also means you need to re-add your custom avatar if you clear your data or switch devices."
                      >
                        <Info size={24} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent flex-1"
                        value={newAvatarPath}
                        onChange={(e) => setNewAvatarPath(e.target.value)}
                        placeholder="Enter avatar path or 'default' for built-in avatar"
                      />
                      <button className="btn btn-primary" onClick={handleAddAvatar} disabled={!newAvatarPath.trim()}>
                        Add
                      </button>
                    </div>
                    <p className="text-gray-400 text-xs mt-2">
                      Use "default" for the built-in avatar, or provide a path to your custom avatar image.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-secondary">Find Game Window</h2>
          <p className="text-gray-400 mb-4">
            If you launched the app before Drakensang Online, it is very likely that you will encounter issues. Click
            the button below to attach the app to game window.
          </p>
          <button className="btn btn-secondary w-fit" onClick={handleFindWindow}>
            Find Drakensang Online
          </button>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-error">Danger Zone</h2>
          <p className="text-gray-400 mb-4">These actions cannot be undone. Please be careful.</p>
          <button className="btn btn-error w-fit" onClick={() => setIsModalOpen(true)}>
            Reset All Settings
          </button>
        </div>
      </div>

      {toastVisible && <Toast message={toastMessage} type={toastType} onClose={() => setToastVisible(false)} />}

      <Modal
        id="reset_settings_modal"
        title="Reset Settings"
        body="Are you sure you want to reset all settings? This will delete all your configuration and cannot be undone."
        confirmButtonText="Reset"
        confirmAction={handleReset}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </div>
  );
}

export default Settings;
