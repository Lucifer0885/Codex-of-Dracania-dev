type TargetNullInfo = {
  found: false;
  handle: null;
  title: string | null;
  className: string | null;
  error: string;
  timestamp: number;
};

type TargetWindowInfo = {
  found: boolean;
  handle: string | null;
  title: string | null;
  className: string | null;
  timestamp: number;
};

type TargetErrorInfo = {
  found: false;
  handle: null;
  title: string | null;
  className: string | null;
  error: string;
  timestamp: number;
};

type EventPayloadMapping = {
  "find-target-window": TargetWindowInfo | TargetErrorInfo | TargetNullInfo;
};

interface Window {
  electron: {
    findTargetWindow: () => Promise<TargetWindowInfo | TargetErrorInfo | TargetNullInfo>;
  };
}
