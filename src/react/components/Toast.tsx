import { BadgeCheck, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

type ToastType = "success" | "error" | "info" | "warning";

type ToastProps = {
  message?: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
  fadeDuration?: number;
};

function Toast({
  message = "Copied to clipboard",
  type = "info",
  onClose,
  duration = 2000,
  fadeDuration = 500,
}: ToastProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), duration);
    const removeTimer = setTimeout(onClose, duration + fadeDuration);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, fadeDuration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <BadgeCheck className="h-6 w-6" />;
      case "error":
        return <AlertCircle className="h-6 w-6" />;
      case "warning":
        return <AlertTriangle className="h-6 w-6" />;
      case "info":
      default:
        return <Info className="h-6 w-6" />;
    }
  };

  const getAlertClass = () => {
    switch (type) {
      case "success":
        return "alert-success";
      case "error":
        return "alert-error";
      case "warning":
        return "alert-warning";
      case "info":
      default:
        return "alert-info";
    }
  };

  return (
    <div className={`toast ${fadeOut ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}>
      <div className={`alert ${getAlertClass()}`}>
        {getIcon()}
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Toast;
