import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";

import { Link } from "react-scroll";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";
import SearchBar from "../Searchbar/SearchBar";

export default function NavBar({ toggleCart, children }) {
  const [windowsWidth, setWindowsWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <button to="home" className="navbar__title">
          OdonTools
        </button>
      </div>
      <ul className="navbar__list">
        <li className="navbar__list-item">
          <Link to="home">Inicio</Link>
        </li>
        <li className="navbar__list-item">
          <Link to="products">Productos</Link>
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
      <div className="navbar__search">
        <SearchBar />
        <button className="navbar__cart-button" onClick={toggleCart}>
          <FaShoppingCart />
        </button>
      </div>
      {children}
    </nav>
  ) : (
    <nav className="navbar">
      <div className="navbar__logo">
        <h1 className="navbar__title">OdonTools</h1>
      </div>
      <div className="navbar__search">
        <button className="navbar__cart-button" onClick={toggleCart}>
          <FaShoppingCart />
        </button>
        <button className="navbar__burger-button" onClick={toggleMenu}>
          {isMenuOpen === false ? (
            <FaBars />
          ) : (
            <AiOutlineClose style={{ fontSize: "20px" }} />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className={`navbar__modal`}>
          <ul className="navbar__list">
            <li className="navbar__list-item">
              <Link to="home">Inicio</Link>
            </li>
            <li className="navbar__list-item">
              <Link to="products">Productos</Link>
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
        </div>
      )}
      {children}
    </nav>
  );
}
