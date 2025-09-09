import { useEffect, useState, type ReactNode } from "react";

type ModalProps = {
  id: string;
  title: string;
  body: string | ReactNode;
  confirmButtonText?: string;
  confirmAction: (inputValue?: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  showInput?: boolean;
  inputPlaceholder?: string;
  inputDefaultValue?: string;
  inputValue?: string;
  onInputChange?: (value: string) => void;
};

function Modal({
  id,
  title,
  body,
  confirmButtonText,
  confirmAction,
  isOpen,
  setIsOpen,
  showInput = false,
  inputPlaceholder = "Enter value",
  inputDefaultValue = "",
  inputValue,
  onInputChange,
}: ModalProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [internalInputValue, setInternalInputValue] = useState(inputDefaultValue);

  const currentInputValue = inputValue !== undefined ? inputValue : internalInputValue;
  const handleInputChange = onInputChange || setInternalInputValue;

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setInternalInputValue(inputDefaultValue);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, inputDefaultValue]);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    if (showInput) {
      confirmAction(currentInputValue);
    } else {
      confirmAction();
    }
    setIsOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleConfirm();
    }
    if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <>
      {shouldRender && (
        <dialog
          id={id}
          className={`fixed inset-0 z-50 flex items-center w-full h-full justify-center bg-black/50 ${
            isVisible ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
          onClick={handleBackdropClick}
        >
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4 relative z-999">
            <h3 className="font-bold text-lg text-white mb-4">{title}</h3>
            {typeof body === "string" ? <p className="py-4 text-gray-300">{body}</p> : body}

            {showInput && (
              <div className="form-control w-full mt-4">
                <input
                  type="text"
                  placeholder={inputPlaceholder}
                  className="input input-bordered w-full bg-gray-700 text-white border-gray-600 focus:border-primary"
                  value={currentInputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button className="px-4 py-2 btn btn-error" onClick={handleCancel}>
                Cancel
              </button>
              <button className="px-4 py-2 btn btn-info" onClick={handleConfirm}>
                {confirmButtonText || "Confirm"}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default Modal;
