import { Info } from "lucide-react";
import { useEffect, useState } from "react";

type UpdateAvailableProps = {
  isExpanded: boolean;
};

function UpdateAvailable({ isExpanded }: UpdateAvailableProps) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = window.electron.updateMessage((msg) => {
      setMessage(msg);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {message &&
        (isExpanded ? (
          <div className="flex items-center gap-2 py-2 mb-4 text-sm font-medium text-primary rounded-lg">
            <Info />
            <span>{message}</span>
          </div>
        ) : (
          <div
            className="tooltip tooltip-right flex items-center gap-2 py-2 mb-4 text-sm font-medium text-primary rounded-lg justify-center"
            data-tip={message}
          >
            <Info />
          </div>
        ))}
    </>
  );
}

export default UpdateAvailable;
