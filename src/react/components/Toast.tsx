import { BadgeCheck } from "lucide-react";
import { useState, useEffect } from "react";

type ToastProps = {
  onClose: () => void;
  duration?: number;
  fadeDuration?: number;
};

function Toast({ onClose, duration = 2000, fadeDuration = 500 }: ToastProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), duration);
    const removeTimer = setTimeout(onClose, duration + fadeDuration);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, fadeDuration, onClose]);

  return (
    <div className={`toast ${fadeOut ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}>
      <div className="alert alert-info">
        <BadgeCheck className="h-6 w-6" />
        <span>Copied to clipboard</span>
      </div>
    </div>
  );
}

export default Toast;
