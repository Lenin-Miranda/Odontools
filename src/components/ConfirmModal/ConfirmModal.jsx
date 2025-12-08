import {
  AiOutlineClose,
  AiOutlineCheckCircle,
  AiOutlineWarning,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import "./ConfirmModal.css";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar acción",
  message = "¿Estás seguro de realizar esta acción?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  type = "warning", // "warning", "danger", "info", "success"
  showCancel = true,
}) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <AiOutlineCheckCircle className="confirm-modal__icon confirm-modal__icon--success" />
        );
      case "danger":
        return (
          <AiOutlineWarning className="confirm-modal__icon confirm-modal__icon--danger" />
        );
      case "info":
        return (
          <AiOutlineInfoCircle className="confirm-modal__icon confirm-modal__icon--info" />
        );
      default:
        return (
          <AiOutlineWarning className="confirm-modal__icon confirm-modal__icon--warning" />
        );
    }
  };

  return (
    <div className="confirm-modal-overlay" onClick={onClose}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <button className="confirm-modal__close" onClick={onClose}>
          <AiOutlineClose />
        </button>

        <div className="confirm-modal__content">
          {getIcon()}
          <h2 className="confirm-modal__title">{title}</h2>
          <p className="confirm-modal__message">{message}</p>
        </div>

        <div className="confirm-modal__actions">
          {showCancel && (
            <button
              className="confirm-modal__btn confirm-modal__btn--cancel"
              onClick={onClose}
            >
              {cancelText}
            </button>
          )}
          <button
            className={`confirm-modal__btn confirm-modal__btn--confirm confirm-modal__btn--${type}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
