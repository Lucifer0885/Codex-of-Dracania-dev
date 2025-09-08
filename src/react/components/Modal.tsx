import { useEffect, useState, type ReactNode } from "react";

type ModalProps = {
  id: string;
  title: string;
  body: string | ReactNode;
  confirmButtonText?: string;
  confirmAction: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function Modal({ id, title, body, confirmButtonText, confirmAction, isOpen, setIsOpen }: ModalProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    confirmAction();
    setIsOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
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
