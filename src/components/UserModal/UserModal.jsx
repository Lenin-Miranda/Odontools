import { Link } from "react-router-dom";
import "./UserModal.css";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import userAvatar from "../../assets/avatar.png";
import { CiHeart, CiUser, CiShoppingCart, CiDollar } from "react-icons/ci";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiShoppingBag,
  FiHeart,
  FiSettings,
  FiLogOut,
  FiDollarSign,
  FiClock,
  FiTrendingUp,
  FiShield,
} from "react-icons/fi";

export default function UserModal({
  isUserOpen,
  setIsUserOpen,
  user,
  onLogout,
}) {
  console.log("UserModal user:", user);

  // Función para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return "No disponible";
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Función para cerrar modal al hacer clic fuera
  const handleOverlayClick = (e) => {
    // Si se hace clic en el overlay (fondo del modal)
    if (e.target.classList.contains("user__modal")) {
      setIsUserOpen(false);
    }
  };

  // Función para cerrar modal con botón X
  const handleCloseModal = () => {
    setIsUserOpen(false);
  };

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isUserOpen) {
        setIsUserOpen(false);
      }
    };

    if (isUserOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isUserOpen, setIsUserOpen]);

  // Función para calcular estadísticas de usuario
  const getUserStats = () => {
    const orders = user?.orders || [];
    const totalOrders = orders.length;
    const totalSpent = orders.reduce(
      (sum, order) => sum + (order.price || 0),
      0
    );
    const favoriteProducts = user?.favorites?.length || 0;

    return {
      totalOrders,
      totalSpent: totalSpent.toFixed(2),
      favoriteProducts,
      memberSince: formatDate(user?.registrationDate || user?.createdAt),
    };
  };

  const stats = getUserStats();

  return (
    <div
      className={`user__modal ${isUserOpen ? "user__modal-open" : ""}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`user__modal-container ${
          isUserOpen ? "user__modal-container-open" : ""
        }`}
        onClick={(e) => e.stopPropagation()} // Prevenir que el clic en el contenido cierre el modal
      >
        {/* Header Fixed */}
        <div className="user__modal-header-fixed">
          <h2 className="user__modal-title">Mi Perfil</h2>
          <button
            className="user__modal-close-btn"
            type="button"
            onClick={handleCloseModal}
          >
            <AiOutlineClose />
          </button>
        </div>

        {/* Content Container */}
        <div className="user__modal-content">
          {/* User Info Section */}
          <div className="user__modal-user-info">
            <div className="user__modal-avatar-container">
              <img
                className="user__modal-avatar"
                src={userAvatar}
                alt="User Avatar"
              />
              <div className="user__modal-status-indicator active"></div>
            </div>
            <div className="user__modal-user-details">
              <h2 className="user__modal-username">
                {user?.name || "Usuario"}
              </h2>
              <p className="user__modal-email">
                <FiMail className="user__modal-detail-icon" />
                {user?.email || "usuario@ejemplo.com"}
              </p>
              {user?.phone && (
                <p className="user__modal-phone">
                  <FiPhone className="user__modal-detail-icon" />
                  {user.phone}
                </p>
              )}
              {user?.isAdmin && (
                <span className="user__modal-admin-badge">
                  <FiShield />
                  Administrador
                </span>
              )}
            </div>
          </div>

          {/* User Statistics */}
          <div className="user__modal-stats">
            <div className="user__modal-stat-card">
              <FiShoppingBag className="user__modal-stat-icon" />
              <div className="user__modal-stat-info">
                <span className="user__modal-stat-number">
                  {stats.totalOrders}
                </span>
                <span className="user__modal-stat-label">Pedidos</span>
              </div>
            </div>
            <div className="user__modal-stat-card">
              <FiDollarSign className="user__modal-stat-icon" />
              <div className="user__modal-stat-info">
                <span className="user__modal-stat-number">
                  ${stats.totalSpent}
                </span>
                <span className="user__modal-stat-label">Gastado</span>
              </div>
            </div>
            <div className="user__modal-stat-card">
              <FiHeart className="user__modal-stat-icon" />
              <div className="user__modal-stat-info">
                <span className="user__modal-stat-number">
                  {stats.favoriteProducts}
                </span>
                <span className="user__modal-stat-label">Favoritos</span>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="user__modal-info-section">
            <h3 className="user__modal-section-title">
              <FiUser />
              Información Personal
            </h3>
            <div className="user__modal-info-grid">
              <div className="user__modal-info-item">
                <FiCalendar className="user__modal-info-icon" />
                <div className="user__modal-info-content">
                  <span className="user__modal-info-label">Miembro desde</span>
                  <span className="user__modal-info-value">
                    {stats.memberSince}
                  </span>
                </div>
              </div>
              {user?.address && (
                <div className="user__modal-info-item">
                  <FiMapPin className="user__modal-info-icon" />
                  <div className="user__modal-info-content">
                    <span className="user__modal-info-label">Dirección</span>
                    <span className="user__modal-info-value">
                      {user.address}
                    </span>
                  </div>
                </div>
              )}
              <div className="user__modal-info-item">
                <FiTrendingUp className="user__modal-info-icon" />
                <div className="user__modal-info-content">
                  <span className="user__modal-info-label">Estado</span>
                  <span className="user__modal-info-value user__modal-status-active">
                    Activo
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="user__modal-section">
            <h3 className="user__modal-section-title">
              <FiSettings />
              Acciones Rápidas
            </h3>
            <ul className="user__modal-list">
              <li className="user__modal-item">
                <FiUser className="user__modal-item-icon" />
                <div className="user__modal-container-links">
                  <Link to="/profile" className="user__modal-link">
                    Editar Perfil
                  </Link>
                  <span className="user__modal-span">
                    Actualizar información personal
                  </span>
                </div>
              </li>

              <li className="user__modal-item">
                <FiShoppingBag className="user__modal-item-icon" />
                <div className="user__modal-container-links">
                  <Link to="/orders" className="user__modal-link">
                    Mis Pedidos
                  </Link>
                  <span className="user__modal-span">
                    {stats.totalOrders} pedidos realizados
                  </span>
                </div>
              </li>

              <li className="user__modal-item">
                <FiHeart className="user__modal-item-icon" />
                <div className="user__modal-container-links">
                  <Link to="/favorites" className="user__modal-link">
                    Favoritos
                  </Link>
                  <span className="user__modal-span">
                    {stats.favoriteProducts} productos guardados
                  </span>
                </div>
              </li>

              <li className="user__modal-item">
                <FiSettings className="user__modal-item-icon" />
                <div className="user__modal-container-links">
                  <Link to="/settings" className="user__modal-link">
                    Configuración
                  </Link>
                  <span className="user__modal-span">
                    Preferencias y privacidad
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Logout Button */}
          <div className="user__modal-logout-section">
            <button className="user__modal-btn" onClick={onLogout}>
              <FiLogOut />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
