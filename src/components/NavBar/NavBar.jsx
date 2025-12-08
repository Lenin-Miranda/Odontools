import "./NavBar.css";
import { FaShoppingCart } from "react-icons/fa";

import { Link } from "react-scroll";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import SearchBar from "../SearchBar/SearchBar";
import { useCart } from "../../hooks/UseCart";
import { CiUser } from "react-icons/ci";
import { useLocation } from "react-router-dom";

export default function NavBar({
  toggleCart,
  children,
  isLoggedIn,
  isAdmin,
  setIsLogginOpen,
  setIsSignUpOpen,
  setIsUserOpen,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalQuantity } = useCart();
  const [windowsWidth, setWindowsWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";

  const handleNavigation = (section) => {
    if (!isHomePage) {
      navigate("/", { state: { scrollTo: section } });
    }
  };

  const handleLogin = () => {
    setIsLogginOpen(true);
  };
  const handleSignUp = () => {
    setIsSignUpOpen(true);
  };

  const handleUserOpen = () => {
    setIsUserOpen(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowsWidth(window.innerWidth);
      // Close menu when resizing to desktop
      if (window.innerWidth >= 761 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return windowsWidth >= 761 ? (
    <nav className="navbar">
      <div className="navbar__logo">
        <NavLink to="/" className="navbar__title">
          OdonTools
        </NavLink>
      </div>
      <ul className="navbar__list">
        <li className="navbar__list-item">
          {isHomePage ? (
            <Link to="home" smooth={true} duration={500}>
              Inicio
            </Link>
          ) : (
            <NavLink to="/" style={{ textDecoration: "none" }}>
              Inicio
            </NavLink>
          )}
        </li>
        <li className="navbar__list-item">
          <NavLink style={{ textDecoration: "none" }} to="/products">
            Productos
          </NavLink>
        </li>
        <li className="navbar__list-item">
          {isHomePage ? (
            <Link to="categories" smooth={true} duration={500}>
              Categorias
            </Link>
          ) : (
            <NavLink
              to="/"
              style={{ textDecoration: "none" }}
              onClick={() => handleNavigation("categories")}
            >
              Categorias
            </NavLink>
          )}
        </li>
        <li className="navbar__list-item">
          {isHomePage ? (
            <Link to="about" smooth={true} duration={500}>
              Nosotros
            </Link>
          ) : (
            <NavLink
              to="/"
              style={{ textDecoration: "none" }}
              onClick={() => handleNavigation("about")}
            >
              Nosotros
            </NavLink>
          )}
        </li>
        <li className="navbar__list-item">
          {isHomePage ? (
            <Link to="contact" smooth={true} duration={500}>
              Contacto
            </Link>
          ) : (
            <NavLink
              to="/"
              style={{ textDecoration: "none" }}
              onClick={() => handleNavigation("contact")}
            >
              Contacto
            </NavLink>
          )}
        </li>
        {isAdmin && (
          <li className="navbar__list-item">
            <NavLink style={{ textDecoration: "none" }} to="/admin">
              Admin
            </NavLink>
          </li>
        )}
      </ul>
      {isLoggedIn ? (
        <div className="navbar__search">
          {location.pathname !== "/products" && <SearchBar />}
          <button
            className="navbar__user-button"
            type="button"
            onClick={handleUserOpen}
          >
            <CiUser />
          </button>
          <button className="navbar__cart-button" onClick={toggleCart}>
            <FaShoppingCart />
            <span className="navbar__cart-quantity">
              {totalQuantity > 99 ? "+99" : totalQuantity}
            </span>
          </button>
        </div>
      ) : (
        <div className="navbar__search">
          <button className="navbar__login-button" onClick={handleLogin}>
            Iniciar Sesion
          </button>
          <button className="navbar__signup-button" onClick={handleSignUp}>
            Registrate
          </button>
          <button
            className="navbar__cart-button"
            onClick={handleLogin}
            title="Inicia sesión para ver tu carrito"
            style={{ opacity: 0.6, cursor: "pointer" }}
          >
            <FaShoppingCart />
            <span className="navbar__cart-quantity">0</span>
          </button>
        </div>
      )}
      {children}
    </nav>
  ) : (
    <nav className="navbar">
      <div className="navbar__logo">
        <NavLink to="/" className="navbar__title">
          OdonTools
        </NavLink>
      </div>
      <div className="navbar__search">
        {isLoggedIn && (
          <button
            className="navbar__user-button"
            type="button"
            onClick={handleUserOpen}
          >
            <CiUser />
          </button>
        )}
        <button
          className="navbar__cart-button"
          onClick={isLoggedIn ? toggleCart : handleLogin}
          title={
            isLoggedIn ? "Ver carrito" : "Inicia sesión para ver tu carrito"
          }
          style={!isLoggedIn ? { opacity: 0.6 } : {}}
        >
          <FaShoppingCart />
          <span className="navbar__cart-quantity">
            {isLoggedIn ? (totalQuantity > 99 ? "+99" : totalQuantity) : 0}
          </span>
        </button>

        <button className="navbar__burger-button" onClick={toggleMenu}>
          {isMenuOpen === false ? (
            <FaBars />
          ) : (
            <AiOutlineClose style={{ fontSize: "20px" }} />
          )}
        </button>
      </div>

      <div
        className={`navbar__modal ${isMenuOpen ? "navbar__modal-open" : ""}`}
      >
        <ul className="navbar__list">
          <li className="navbar__list-item">
            {isHomePage ? (
              <Link to="home" smooth={true} duration={500} onClick={toggleMenu}>
                Inicio
              </Link>
            ) : (
              <NavLink
                to="/"
                style={{ textDecoration: "none" }}
                onClick={toggleMenu}
              >
                Inicio
              </NavLink>
            )}
          </li>
          <li className="navbar__list-item">
            <NavLink
              style={{ textDecoration: "none" }}
              to="/products"
              onClick={toggleMenu}
            >
              Productos
            </NavLink>
          </li>
          <li className="navbar__list-item">
            {isHomePage ? (
              <Link
                to="categories"
                smooth={true}
                duration={500}
                onClick={toggleMenu}
              >
                Categorias
              </Link>
            ) : (
              <NavLink
                to="/"
                style={{ textDecoration: "none" }}
                onClick={() => {
                  handleNavigation("categories");
                  toggleMenu();
                }}
              >
                Categorias
              </NavLink>
            )}
          </li>
          <li className="navbar__list-item">
            {isHomePage ? (
              <Link
                to="about"
                smooth={true}
                duration={500}
                onClick={toggleMenu}
              >
                Nosotros
              </Link>
            ) : (
              <NavLink
                to="/"
                style={{ textDecoration: "none" }}
                onClick={() => {
                  handleNavigation("about");
                  toggleMenu();
                }}
              >
                Nosotros
              </NavLink>
            )}
          </li>
          <li className="navbar__list-item">
            {isHomePage ? (
              <Link
                to="contact"
                smooth={true}
                duration={500}
                onClick={toggleMenu}
              >
                Contacto
              </Link>
            ) : (
              <NavLink
                to="/"
                style={{ textDecoration: "none" }}
                onClick={() => {
                  handleNavigation("contact");
                  toggleMenu();
                }}
              >
                Contacto
              </NavLink>
            )}
          </li>
          {isAdmin && (
            <li className="navbar__list-item">
              <NavLink
                style={{ textDecoration: "none" }}
                to="/admin"
                onClick={toggleMenu}
              >
                Admin
              </NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <>
              <li className="navbar__list-item">
                <button
                  className={`navbar__login-button ${
                    windowsWidth < 761 ? "small" : ""
                  }`}
                  onClick={() => {
                    handleLogin();
                    toggleMenu();
                  }}
                >
                  Iniciar Sesion
                </button>
              </li>
              <li className="navbar__list-item">
                <button
                  className={`navbar__signup-button ${
                    windowsWidth < 761 ? "small" : ""
                  }`}
                  onClick={() => {
                    handleSignUp();
                    toggleMenu();
                  }}
                >
                  Registrate
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      {children}
    </nav>
  );
}
