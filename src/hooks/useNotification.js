import { useState, useEffect } from "react";

export const useNotification = () => {
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "info", // 'success', 'error', 'warning', 'info'
  });

  const showNotification = (message, type = "info", duration = 3000) => {
    setNotification({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, duration);
  };

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  return {
    notification,
    showNotification,
    hideNotification,
  };
};
