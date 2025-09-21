import { useEffect, useState } from "react";

type AppVersionProps = {
  isExpanded: boolean;
};

function AppVersion({ isExpanded }: AppVersionProps) {
  const [appVersion, setAppVersion] = useState("");
  const [appVersionText, setAppVersionText] = useState("");

  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => {
        setAppVersionText(isExpanded ? `Current Version: ${appVersion} stable-beta` : `v${appVersion}`);
      }, 300);
    } else {
      setAppVersionText(`v${appVersion}`);
    }
  }, [isExpanded, appVersion]);

  useEffect(() => {
    const fetchAppVersion = async () => {
      const version = await window.electron.getAppVersion();
      setAppVersion(version);
    };

    fetchAppVersion();
  }, []);

  return <div className="text-xs text-gray-400">{appVersionText}</div>;
}

export default AppVersion;
