import { Info } from "lucide-react";
import { useEffect, useState } from "react";

function UpdateAvailable() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = window.electron.updateMessage((msg) => {
      setMessage(msg);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {message && (
        <div className="flex items-center gap-2 py-2 mb-4 text-sm font-medium text-primary rounded-lg">
          <Info />
          <span>{message}</span>
        </div>
      )}
    </>
  );
}

export default UpdateAvailable;
