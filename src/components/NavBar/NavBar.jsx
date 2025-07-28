import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import search from "../../assets/search.png";
import { Link } from "react-scroll";
export default function NavBar() {
  return (
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
  );
}
