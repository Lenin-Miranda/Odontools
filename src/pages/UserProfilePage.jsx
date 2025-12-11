import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "../config/api";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiEdit3,
  FiSave,
  FiX,
  FiCamera,
  FiShield,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import "./UserProfilePage.css";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  });

  // Cargar información del usuario desde localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        const userInfo = JSON.parse(savedUser);
        setUser(userInfo);
        setFormData({
          name: userInfo.name || "",
          email: userInfo.email || "",
          phone: userInfo.phone || "",
          address: userInfo.address || "",
          biography: userInfo.biography || "",
          image: userInfo.image || "",
        });
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
        setMessage("Error al cargar la información del usuario");
        setMessageType("error");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Llamada a API con cookies
      const response = await fetch(getApiUrl(`/api/auth/profile`), {
        method: "PUT",
        credentials: "include", // Envía cookies automáticamente
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();

        // Actualizar localStorage
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const newUserData = { ...currentUser, ...formData };
        localStorage.setItem("currentUser", JSON.stringify(newUserData));

        setUser(newUserData);
        setIsEditing(false);
        setMessage("Información actualizada exitosamente");
        setMessageType("success");

        setTimeout(() => setMessage(""), 3000);
      } else {
        throw new Error("Error al actualizar la información");
      }
    } catch (error) {
      setMessage("Error al actualizar la información. Inténtalo de nuevo.");
      setMessageType("error");
      setTimeout(() => setMessage(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        bio: user.bio || "",
      });
    }
    setIsEditing(false);
    setMessage("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No disponible";
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!user) {
    return (
      <div className="user-profile-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando información del usuario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile-page">
      <div className="user-profile-container">
        {/* Header */}
        <div className="user-profile-header">
          <div className="user-profile-header-content">
            <h1 className="user-profile-title">
              <FiUser />
              Mi Información Personal
            </h1>
            <p className="user-profile-subtitle">
              Gestiona tu información personal y configuración de cuenta
            </p>
          </div>

          {!isEditing ? (
            <button
              className="btn btn--primary"
              onClick={() => setIsEditing(true)}
            >
              <FiEdit3 />
              Editar Perfil
            </button>
          ) : (
            <div className="edit-actions">
              <button className="btn btn--secondary" onClick={handleCancel}>
                <FiX />
                Cancelar
              </button>
              <button
                className="btn btn--primary"
                onClick={handleSave}
                disabled={loading}
              >
                <FiSave />
                {loading ? "Guardando..." : "Guardar"}
              </button>
            </div>
          )}
        </div>

        {/* Message */}
        {message && (
          <div className={`message message--${messageType}`}>
            <FiCheckCircle />
            {message}
          </div>
        )}

        <div className="user-profile-content">
          {/* Avatar Section */}
          <div className="user-profile-avatar-section">
            <div className="user-avatar-container">
              <div className="user-avatar-large">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <button className="avatar-edit-btn" disabled={!isEditing}>
                <FiCamera />
              </button>
            </div>
            <div className="user-basic-info">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <div className="user-badges">
                {user.isAdmin && (
                  <span className="user-badge admin">
                    <FiShield />
                    Administrador
                  </span>
                )}
                <span className="user-badge active">
                  <FiCheckCircle />
                  Cuenta Activa
                </span>
              </div>
            </div>
          </div>

          {/* Personal Information Form */}
          <div className="user-profile-form">
            <div className="form-section">
              <h3 className="form-section-title">
                <FiUser />
                Información Personal
              </h3>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">
                    <FiUser />
                    Nombre Completo
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Tu nombre completo"
                    />
                  ) : (
                    <div className="form-display-value">
                      {user.name || "No especificado"}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <FiMail />
                    Correo Electrónico
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="tu@email.com"
                    />
                  ) : (
                    <div className="form-display-value">{user.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <FiPhone />
                    Teléfono
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 234 567 8900"
                    />
                  ) : (
                    <div className="form-display-value">
                      {user.phone || "No especificado"}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="address">
                    <FiMapPin />
                    Dirección
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Tu dirección completa"
                    />
                  ) : (
                    <div className="form-display-value">
                      {user.address || "No especificada"}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="bio">
                  <FiUser />
                  Biografía
                </label>
                {isEditing ? (
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Cuéntanos un poco sobre ti..."
                  />
                ) : (
                  <div className="form-display-value bio">
                    {user.bio || "No has agregado una biografía aún."}
                  </div>
                )}
              </div>
            </div>

            {/* Account Information */}
            <div className="form-section">
              <h3 className="form-section-title">
                <FiShield />
                Información de Cuenta
              </h3>

              <div className="account-info-grid">
                <div className="account-info-item">
                  <FiCalendar className="account-info-icon" />
                  <div className="account-info-content">
                    <span className="account-info-label">Miembro desde</span>
                    <span className="account-info-value">
                      {formatDate(user.registrationDate || user.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="account-info-item">
                  <FiClock className="account-info-icon" />
                  <div className="account-info-content">
                    <span className="account-info-label">
                      Última actualización
                    </span>
                    <span className="account-info-value">
                      {formatDate(user.updatedAt || new Date())}
                    </span>
                  </div>
                </div>

                <div className="account-info-item">
                  <FiShield className="account-info-icon" />
                  <div className="account-info-content">
                    <span className="account-info-label">Tipo de cuenta</span>
                    <span className="account-info-value">
                      {user.isAdmin ? "Administrador" : "Usuario"}
                    </span>
                  </div>
                </div>

                <div className="account-info-item">
                  <FiCheckCircle className="account-info-icon active" />
                  <div className="account-info-content">
                    <span className="account-info-label">Estado</span>
                    <span className="account-info-value active">Activa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
