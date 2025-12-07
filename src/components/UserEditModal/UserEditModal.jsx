import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiUser, FiMail, FiPhone, FiCalendar } from "react-icons/fi";
import "./UserEditModal.css";

export default function UserEditModal({
  isOpen,
  onClose,
  onSubmit,
  user = null,
  isLoading = false,
  mode = "edit", // "edit", "view"
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "cliente",
    status: "active",
  });

  // Actualizar el formulario cuando cambie el usuario o el modo
  useEffect(() => {
    if (user && (mode === "edit" || mode === "view")) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.isAdmin ? "admin" : user.role || "cliente",
        status: user.status || "active",
      });
    } else {
      // Limpiar formulario
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "cliente",
        status: "active",
      });
    }
  }, [user, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "view") return;

    // Validaciones básicas
    if (!formData.name.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    if (!formData.email.trim()) {
      alert("El email es obligatorio");
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Por favor ingresa un email válido");
      return;
    }

    // Preparar datos para el backend
    const dataToSend = {
      name: formData.name,
      email: formData.email,
      isAdmin: formData.role === "admin", // Convertir role a isAdmin
    };

    await onSubmit(dataToSend);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const isViewMode = mode === "view";
  const modalTitle = isViewMode ? "Detalles del Usuario" : "Editar Usuario";

  return (
    <div className="user-edit-modal-overlay" onClick={handleBackdropClick}>
      <div className="user-edit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="user-edit-modal__header">
          <h2 className="user-edit-modal__title">
            <FiUser className="user-edit-modal__title-icon" />
            {modalTitle}
          </h2>
          <button
            className="user-edit-modal__close"
            onClick={onClose}
            disabled={isLoading}
          >
            <AiOutlineClose />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="user-edit-modal__form">
          <div className="user-edit-modal__content">
            <div className="user-edit-modal__field-group">
              <div className="user-edit-modal__field">
                <label htmlFor="name" className="user-edit-modal__label">
                  <FiUser className="user-edit-modal__label-icon" />
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="user-edit-modal__input"
                  placeholder="Nombre completo del usuario"
                  required
                  disabled={isViewMode || isLoading}
                />
              </div>

              <div className="user-edit-modal__field">
                <label htmlFor="email" className="user-edit-modal__label">
                  <FiMail className="user-edit-modal__label-icon" />
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="user-edit-modal__input"
                  placeholder="email@ejemplo.com"
                  required
                  disabled={isViewMode || isLoading}
                />
              </div>
            </div>

            <div className="user-edit-modal__field-group">
              <div className="user-edit-modal__field">
                <label htmlFor="phone" className="user-edit-modal__label">
                  <FiPhone className="user-edit-modal__label-icon" />
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="user-edit-modal__input"
                  placeholder="+1 (555) 123-4567"
                  disabled={isViewMode || isLoading}
                />
              </div>

              <div className="user-edit-modal__field">
                <label htmlFor="role" className="user-edit-modal__label">
                  <FiUser className="user-edit-modal__label-icon" />
                  Rol
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="user-edit-modal__select"
                  disabled={isViewMode || isLoading}
                >
                  <option value="cliente">Cliente</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            </div>

            <div className="user-edit-modal__field-group">
              <div className="user-edit-modal__field">
                <label htmlFor="status" className="user-edit-modal__label">
                  <FiCalendar className="user-edit-modal__label-icon" />
                  Estado
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="user-edit-modal__select"
                  disabled={isViewMode || isLoading}
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                  <option value="pending">Pendiente</option>
                  <option value="suspended">Suspendido</option>
                </select>
              </div>
            </div>

            {user && (
              <div className="user-edit-modal__info">
                <div className="user-edit-modal__info-item">
                  <span className="user-edit-modal__info-label">ID:</span>
                  <span className="user-edit-modal__info-value">
                    #{user._id || user.id}
                  </span>
                </div>
                {user.registrationDate && (
                  <div className="user-edit-modal__info-item">
                    <span className="user-edit-modal__info-label">
                      Fecha de registro:
                    </span>
                    <span className="user-edit-modal__info-value">
                      {new Date(user.registrationDate).toLocaleDateString(
                        "es-ES"
                      )}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {!isViewMode && (
            <div className="user-edit-modal__footer">
              <button
                type="button"
                onClick={onClose}
                className="user-edit-modal__button user-edit-modal__button--cancel"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="user-edit-modal__button user-edit-modal__button--save"
                disabled={isLoading}
              >
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
