import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";

import { Link } from "react-scroll";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import SearchBar from "../Searchbar/SearchBar";
import { useCart } from "../../hooks/UseCart";
import { CiUser } from "react-icons/ci";
import { useLocation } from "react-router-dom";

export default function NavBar({
  toggleCart,
  children,
  isLoggedIn,
  setIsLogginOpen,
  setIsSignUpOpen,
  setIsUserOpen,
}) {
  const location = useLocation();
  const { totalQuantity } = useCart();
  const [windowsWidth, setWindowsWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          <Link to="home">Inicio</Link>
        </li>
        <li className="navbar__list-item">
          <NavLink style={{ textDecoration: "none" }} to="/products">
            Productos
          </NavLink>
        </li>
        <li className="navbar__list-item">
          <Link to="categories">Categorias</Link>
        </li>
        <li className="navbar__list-item">
          <Link to="about">Nosotros</Link>
        </li>
        <li className="navbar__list-item">
          <Link to="contact">Contacto</Link>
        </li>
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
          <button className="navbar__cart-button" onClick={toggleCart}>
            <FaShoppingCart />
            <span className="navbar__cart-quantity">
              {totalQuantity > 99 ? "+99" : totalQuantity}
            </span>
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
            <Link to="home">Inicio</Link>
          </li>
          <li className="navbar__list-item">
            <NavLink style={{ textDecoration: "none" }} to="/products">
              Productos
            </NavLink>
          </li>
          <li className="navbar__list-item">
            <Link to="categories">Categorias</Link>
          </li>
          <li className="navbar__list-item">
            <Link to="about">Nosotros</Link>
          </li>
          <li className="navbar__list-item">
            <Link to="contact">Contacto</Link>
          </li>
          {!isLoggedIn && (
            <>
              {" "}
              <li className="navbar__list-item">
                <button
                  className={`navbar__login-button ${
                    windowsWidth < 761 ? "small" : ""
                  }`}
                  onClick={handleLogin}
                >
                  Iniciar Sesion
                </button>
              </li>
              <li className="navbar__list-item">
                <button
                  className={`navbar__signup-button ${
                    windowsWidth < 761 ? "small" : ""
                  }`}
                  onClick={handleSignUp}
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
