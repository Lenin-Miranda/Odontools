import { useState } from "react";

export default function useConfirm() {
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "Confirmar",
    cancelText: "Cancelar",
    type: "warning",
    showCancel: true,
    onConfirm: () => {},
  });

  const showConfirm = ({
    title = "Confirmar acción",
    message = "¿Estás seguro de realizar esta acción?",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    type = "warning",
    showCancel = true,
    onConfirm = () => {},
  }) => {
    return new Promise((resolve) => {
      setConfirmState({
        isOpen: true,
        title,
        message,
        confirmText,
        cancelText,
        type,
        showCancel,
        onConfirm: () => {
          onConfirm();
          resolve(true);
        },
      });
    });
  };

  const showAlert = ({
    title = "Notificación",
    message = "",
    confirmText = "Aceptar",
    type = "info",
  }) => {
    return showConfirm({
      title,
      message,
      confirmText,
      type,
      showCancel: false,
      onConfirm: () => {},
    });
  };

  const closeConfirm = () => {
    setConfirmState((prev) => ({ ...prev, isOpen: false }));
  };

  return {
    confirmState,
    showConfirm,
    showAlert,
    closeConfirm,
  };
}
