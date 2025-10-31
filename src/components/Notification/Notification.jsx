import { useEffect } from "react";
import "./Notification.css";

export default function Notification({
  show,
  message,
  type = "info",
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div
      className={`notification notification--${type} ${
        show ? "notification--show" : ""
      }`}
    >
      <div className="notification__content">
        <span className="notification__message">{message}</span>
        <button
          className="notification__close"
          onClick={onClose}
          aria-label="Cerrar notificación"
        >
          ×
        </button>
      </div>
    </div>
  );
}
