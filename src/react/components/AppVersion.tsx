import { useEffect, useState } from "react";

function AppVersion() {
  const [appVersion, setAppVersion] = useState("");

  useEffect(() => {
    const fetchAppVersion = async () => {
      const version = await window.electron.getAppVersion();
      setAppVersion(version);
    };

    fetchAppVersion();
  }, []);

  return <div className="text-xs text-gray-400">Current Version: {appVersion} stable-beta</div>;
}

export default AppVersion;
