import { useEffect, useState } from "react";

type AppVersionProps = {
  isExpanded: boolean;
};

function AppVersion({ isExpanded }: AppVersionProps) {
  const [appVersion, setAppVersion] = useState("");

  useEffect(() => {
    const fetchAppVersion = () => {
      const version = window.electron.getAppVersion();
      setAppVersion(version);
    };

    fetchAppVersion();
  }, []);

  return (
    <div className="relative h-5 text-sm text-gray-400">
      {isExpanded ? (
        <span className={`absolute left-0 top-0 w-full`}>Current Version: {appVersion} stable-beta</span>
      ) : (
        <span className={`absolute left-0 top-0 w-full`}>v{appVersion}</span>
      )}
    </div>
  );
}

export default AppVersion;
