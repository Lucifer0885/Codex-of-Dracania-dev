import { useState } from "react";

function General() {
  const [error, setError] = useState<string | null>(null);
  const handleFindWindow = () => {
    console.log("Button clicked");
    try {
      window.electron.findTargetWindow().then((windowInfo) => {
        console.log("Found window:", windowInfo);
      });
    } catch (error) {
      console.error("Error finding window:", error);
      setError(`Error finding window: ${error}`);
    }
  };

  return (
    <>
      <div className="btn btn-soft btn-sm normal-case" onClick={handleFindWindow}>
        Find Window
      </div>
      {error && <div className="error">{error}</div>}
    </>
  );
}

export default General;
