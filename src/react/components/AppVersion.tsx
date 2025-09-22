import { useEffect, useState } from "react";

type AppVersionProps = {
  isExpanded: boolean;
};

function AppVersion({ isExpanded }: AppVersionProps) {
  const [appVersion, setAppVersion] = useState("");

  useEffect(() => {
    const fetchAppVersion = async () => {
      const version = await window.electron.getAppVersion();
      setAppVersion(version);
    };

    fetchAppVersion();
  }, []);

  return (
    <div className="relative h-5 text-sm text-gray-400">
      <span
        className={`absolute left-0 top-0 w-full transition-opacity duration-300 ${
          isExpanded ? "opacity-0" : "opacity-100"
        }`}
      >
        v{appVersion}
      </span>
      <span
        className={`absolute left-0 top-0 w-full transition-opacity duration-300 ${
          isExpanded ? "opacity-100" : "opacity-0"
        }`}
      >
        Current Version: {appVersion} stable-beta
      </span>
    </div>
  );
}

export default AppVersion;
