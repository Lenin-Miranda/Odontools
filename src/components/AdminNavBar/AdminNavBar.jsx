import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiBarChart,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState } from "react";
import "./AdminNavBar.css";

export default function AdminNavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    // Aquí irá la lógica de logout cuando conectes el backend
    console.log("Logout admin");
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar__container">
        {/* Logo */}
        <div className="admin-navbar__logo">
          <NavLink to="/admin" className="admin-navbar__logo-link">
            <span className="admin-navbar__logo-icon">🦷</span>
            <span className="admin-navbar__logo-text">OdonTools Admin</span>
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <div className="admin-navbar__nav">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `admin-navbar__link ${
                isActive ? "admin-navbar__link--active" : ""
              }`
            }
            end
          >
            <FiHome />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `admin-navbar__link ${
                isActive ? "admin-navbar__link--active" : ""
              }`
            }
          >
            <FiBox />
            <span>Productos</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `admin-navbar__link ${
                isActive ? "admin-navbar__link--active" : ""
              }`
            }
          >
            <FiShoppingCart />
            <span>Pedidos</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `admin-navbar__link ${
                isActive ? "admin-navbar__link--active" : ""
              }`
            }
          >
            <FiUsers />
            <span>Usuarios</span>
          </NavLink>

          <NavLink
            to="/admin/analytics"
            className={({ isActive }) =>
              `admin-navbar__link ${
                isActive ? "admin-navbar__link--active" : ""
              }`
            }
          >
            <FiBarChart />
            <span>Analytics</span>
          </NavLink>
        </div>

        {/* User Menu */}
        <div className="admin-navbar__user">
          <NavLink
            to="/admin/settings"
            className="admin-navbar__user-btn"
            title="Configuración"
          >
            <FiSettings />
          </NavLink>

          <button
            onClick={handleLogout}
            className="admin-navbar__user-btn admin-navbar__logout"
            title="Cerrar Sesión"
          >
            <FiLogOut />
          </button>

          <NavLink
            to="/"
            className="admin-navbar__user-btn admin-navbar__home"
            title="Ir al sitio principal"
          >
            <FiHome />
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="admin-navbar__mobile-toggle"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`admin-navbar__mobile ${
          isMobileMenuOpen ? "admin-navbar__mobile--open" : ""
        }`}
      >
        <NavLink
          to="/admin"
          className="admin-navbar__mobile-link"
          onClick={() => setIsMobileMenuOpen(false)}
          end
        >
          <FiHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className="admin-navbar__mobile-link"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FiBox />
          <span>Productos</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className="admin-navbar__mobile-link"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FiShoppingCart />
          <span>Pedidos</span>
        </NavLink>

        <NavLink
          to="/admin/users"
          className="admin-navbar__mobile-link"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FiUsers />
          <span>Usuarios</span>
        </NavLink>

        <NavLink
          to="/admin/analytics"
          className="admin-navbar__mobile-link"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FiBarChart />
          <span>Analytics</span>
        </NavLink>

        <NavLink
          to="/admin/settings"
          className="admin-navbar__mobile-link"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FiSettings />
          <span>Configuración</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="admin-navbar__mobile-link admin-navbar__mobile-logout"
        >
          <FiLogOut />
          <span>Cerrar Sesión</span>
        </button>

        <NavLink
          to="/"
          className="admin-navbar__mobile-link"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FiHome />
          <span>Sitio Principal</span>
        </NavLink>
      </div>
    </nav>
  );
}
