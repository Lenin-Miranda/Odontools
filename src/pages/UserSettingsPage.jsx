import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiSettings,
  FiUser,
  FiBell,
  FiLock,
  FiEye,
  FiEyeOff,
  FiSave,
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiMapPin,
  FiShield,
  FiTrash2,
  FiRefreshCw,
} from "react-icons/fi";
import "./UserSettingsPage.css";

const UserSettingsPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estados para formularios
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    birthDate: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
    weeklyNewsletter: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    allowDataCollection: false,
  });

  const [messages, setMessages] = useState({});

  // Cargar datos del usuario
  useEffect(() => {
    const loadUserData = () => {
      const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "{}"
      );
      setUser(currentUser);
      setProfileData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        address: currentUser.address || "",
        birthDate: currentUser.birthDate || "",
      });
      setLoading(false);
    };

    loadUserData();
  }, []);

  const showMessage = (type, message, section = "general") => {
    setMessages((prev) => ({
      ...prev,
      [section]: { type, message },
    }));

    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [section]: null,
      }));
    }, 3000);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      // Simular actualización (en producción sería una llamada a la API)
      const updatedUser = { ...user, ...profileData };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      setUser(updatedUser);

      showMessage("success", "Perfil actualizado correctamente", "profile");
    } catch (error) {
      showMessage("error", "Error al actualizar el perfil", "profile");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage("error", "Las contraseñas no coinciden", "password");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showMessage(
        "error",
        "La contraseña debe tener al menos 6 caracteres",
        "password"
      );
      return;
    }

    try {
      // Simular cambio de contraseña
      showMessage(
        "success",
        "Contraseña actualizada correctamente",
        "password"
      );
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      showMessage("error", "Error al cambiar la contraseña", "password");
    }
  };

  const handleNotificationUpdate = () => {
    showMessage(
      "success",
      "Preferencias de notificación actualizadas",
      "notifications"
    );
  };

  const handlePrivacyUpdate = () => {
    showMessage(
      "success",
      "Configuración de privacidad actualizada",
      "privacy"
    );
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer."
      )
    ) {
      if (
        window.confirm(
          "Esta acción eliminará permanentemente todos tus datos. ¿Continuar?"
        )
      ) {
        // Lógica para eliminar cuenta
        localStorage.clear();
        window.location.href = "/";
      }
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="settings-section">
            <div className="section-header">
              <h3>
                <FiUser />
                Información Personal
              </h3>
              <p>Actualiza tu información personal y de contacto</p>
            </div>

            <form onSubmit={handleProfileUpdate} className="settings-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Nombre completo</label>
                  <input
                    type="text"
                    id="name"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo electrónico</label>
                  <div className="input-with-icon">
                    <FiMail className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Teléfono</label>
                  <div className="input-with-icon">
                    <FiPhone className="input-icon" />
                    <input
                      type="tel"
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="birthDate">Fecha de nacimiento</label>
                  <input
                    type="date"
                    id="birthDate"
                    value={profileData.birthDate}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        birthDate: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="address">Dirección</label>
                <div className="input-with-icon">
                  <FiMapPin className="input-icon" />
                  <textarea
                    id="address"
                    rows="3"
                    value={profileData.address}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    placeholder="Ingresa tu dirección completa"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn--primary">
                  <FiSave />
                  Guardar cambios
                </button>
              </div>
            </form>

            {messages.profile && (
              <div className={`message message--${messages.profile.type}`}>
                {messages.profile.message}
              </div>
            )}
          </div>
        );

      case "security":
        return (
          <div className="settings-section">
            <div className="section-header">
              <h3>
                <FiLock />
                Seguridad
              </h3>
              <p>Cambia tu contraseña y gestiona la seguridad de tu cuenta</p>
            </div>

            <form onSubmit={handlePasswordChange} className="settings-form">
              <div className="form-group">
                <label htmlFor="currentPassword">Contraseña actual</label>
                <div className="password-input">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    id="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">Nueva contraseña</label>
                <div className="password-input">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirmar nueva contraseña
                </label>
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn--primary">
                  <FiLock />
                  Cambiar contraseña
                </button>
              </div>
            </form>

            {messages.password && (
              <div className={`message message--${messages.password.type}`}>
                {messages.password.message}
              </div>
            )}
          </div>
        );

      case "notifications":
        return (
          <div className="settings-section">
            <div className="section-header">
              <h3>
                <FiBell />
                Notificaciones
              </h3>
              <p>Controla qué notificaciones quieres recibir</p>
            </div>

            <div className="settings-form">
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Notificaciones por email</h4>
                    <p>
                      Recibe actualizaciones importantes por correo electrónico
                    </p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) =>
                        setNotificationSettings((prev) => ({
                          ...prev,
                          emailNotifications: e.target.checked,
                        }))
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Actualizaciones de pedidos</h4>
                    <p>Notificaciones sobre el estado de tus pedidos</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.orderUpdates}
                      onChange={(e) =>
                        setNotificationSettings((prev) => ({
                          ...prev,
                          orderUpdates: e.target.checked,
                        }))
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Promociones y ofertas</h4>
                    <p>
                      Recibe información sobre descuentos y ofertas especiales
                    </p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.promotions}
                      onChange={(e) =>
                        setNotificationSettings((prev) => ({
                          ...prev,
                          promotions: e.target.checked,
                        }))
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Boletín semanal</h4>
                    <p>Recibe nuestro newsletter con novedades y tips</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.weeklyNewsletter}
                      onChange={(e) =>
                        setNotificationSettings((prev) => ({
                          ...prev,
                          weeklyNewsletter: e.target.checked,
                        }))
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={handleNotificationUpdate}
                >
                  <FiSave />
                  Guardar preferencias
                </button>
              </div>
            </div>

            {messages.notifications && (
              <div
                className={`message message--${messages.notifications.type}`}
              >
                {messages.notifications.message}
              </div>
            )}
          </div>
        );

      case "privacy":
        return (
          <div className="settings-section">
            <div className="section-header">
              <h3>
                <FiShield />
                Privacidad
              </h3>
              <p>Controla la visibilidad de tu información personal</p>
            </div>

            <div className="settings-form">
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Perfil público</h4>
                    <p>Permite que otros usuarios vean tu perfil básico</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={privacySettings.profileVisible}
                      onChange={(e) =>
                        setPrivacySettings((prev) => ({
                          ...prev,
                          profileVisible: e.target.checked,
                        }))
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Mostrar email</h4>
                    <p>
                      Permite que tu correo electrónico sea visible para otros
                    </p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={privacySettings.showEmail}
                      onChange={(e) =>
                        setPrivacySettings((prev) => ({
                          ...prev,
                          showEmail: e.target.checked,
                        }))
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Mostrar teléfono</h4>
                    <p>Permite que tu número de teléfono sea visible</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={privacySettings.showPhone}
                      onChange={(e) =>
                        setPrivacySettings((prev) => ({
                          ...prev,
                          showPhone: e.target.checked,
                        }))
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Recopilación de datos</h4>
                    <p>Permite el uso de datos para mejorar la experiencia</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={privacySettings.allowDataCollection}
                      onChange={(e) =>
                        setPrivacySettings((prev) => ({
                          ...prev,
                          allowDataCollection: e.target.checked,
                        }))
                      }
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={handlePrivacyUpdate}
                >
                  <FiSave />
                  Guardar configuración
                </button>
              </div>
            </div>

            {messages.privacy && (
              <div className={`message message--${messages.privacy.type}`}>
                {messages.privacy.message}
              </div>
            )}
          </div>
        );

      case "danger":
        return (
          <div className="settings-section danger-section">
            <div className="section-header">
              <h3>
                <FiTrash2 />
                Zona de Peligro
              </h3>
              <p>Acciones irreversibles para tu cuenta</p>
            </div>

            <div className="danger-actions">
              <div className="danger-action">
                <div className="danger-info">
                  <h4>Eliminar cuenta</h4>
                  <p>
                    Elimina permanentemente tu cuenta y todos los datos
                    asociados. Esta acción no se puede deshacer.
                  </p>
                </div>
                <button
                  className="btn btn--danger"
                  onClick={handleDeleteAccount}
                >
                  <FiTrash2 />
                  Eliminar cuenta
                </button>
              </div>

              <div className="danger-action">
                <div className="danger-info">
                  <h4>Restablecer datos</h4>
                  <p>
                    Elimina todos tus pedidos, favoritos y preferencias. Tu
                    cuenta permanecerá activa.
                  </p>
                </div>
                <button className="btn btn--warning">
                  <FiRefreshCw />
                  Restablecer datos
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="user-settings-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando configuración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-settings-page">
      <div className="user-settings-container">
        {/* Header */}
        <div className="settings-header">
          <div className="header-top">
            <Link to="/" className="back-button">
              <FiArrowLeft />
              Volver al inicio
            </Link>
          </div>

          <div className="header-content">
            <h1 className="settings-title">
              <FiSettings />
              Configuración
            </h1>
            <p className="settings-subtitle">
              Administra tu cuenta y preferencias
            </p>
          </div>
        </div>

        <div className="settings-layout">
          {/* Sidebar */}
          <div className="settings-sidebar">
            <nav className="settings-nav">
              <button
                className={`settings-nav-item ${
                  activeTab === "profile" ? "active" : ""
                }`}
                onClick={() => setActiveTab("profile")}
              >
                <FiUser />
                Perfil
              </button>
              <button
                className={`settings-nav-item ${
                  activeTab === "security" ? "active" : ""
                }`}
                onClick={() => setActiveTab("security")}
              >
                <FiLock />
                Seguridad
              </button>
              <button
                className={`settings-nav-item ${
                  activeTab === "notifications" ? "active" : ""
                }`}
                onClick={() => setActiveTab("notifications")}
              >
                <FiBell />
                Notificaciones
              </button>
              <button
                className={`settings-nav-item ${
                  activeTab === "privacy" ? "active" : ""
                }`}
                onClick={() => setActiveTab("privacy")}
              >
                <FiShield />
                Privacidad
              </button>
              <button
                className={`settings-nav-item ${
                  activeTab === "danger" ? "active" : ""
                }`}
                onClick={() => setActiveTab("danger")}
              >
                <FiTrash2 />
                Zona de peligro
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="settings-content">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
