import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import search from "../../assets/search.png";
import { Link } from "react-scroll";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";

export default function NavBar() {
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
        <h1 className="navbar__title">OdonTools</h1>
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
        <div className="navbar__search-icon-container">
          <img className="navbar__search-icon" src={search} alt="Search Icon" />
          <label className="navbar__search-label" htmlFor="search"></label>
          <input
            className="navbar__search-input"
            placeholder={`Buscar productos...`}
            type="text"
            id="search"
          ></input>
        </div>
        <button className="navbar__cart-button">
          <FaShoppingCart />
        </button>
      </div>
    </nav>
  ) : (
    <nav className="navbar">
      <div className="navbar__logo">
        <h1 className="navbar__title">OdonTools</h1>
      </div>
      <div className="navbar__search">
        <button className="navbar__cart-button">
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
    </nav>
  );
}
