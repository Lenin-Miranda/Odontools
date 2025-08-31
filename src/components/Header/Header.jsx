import prueba from "../../assets/tools/3exploradorEXD56.jpg";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";

export default function Header({ children }) {
  return (
    <>
      {children}
      <header className="header" id="home">
        <div className="header__hero">
          <h1 className="header__hero-title">
            Equipos y suministros Dentales Profesionales
          </h1>
          <p className="header__hero-subtitle">
            Tu socio de confianza para equipos dentales, instrumentos y
            materiales de alta calidad. Sirviendo a profesionales dentales con
            excelencia desde 1995.
          </p>
          <div className="header__hero-buttons-container">
            <Link
              className="header__hero-button header__hero-button_type-l"
              to="products"
              smooth={true}
              duration={500}
            >
              Comprar Ahora
            </Link>

            <NavLink
              to="/products"
              className="header__hero-button header__hero-button_type-r"
            >
              Ver Catalogo
            </NavLink>
          </div>
        </div>
        <div className="header__image-container">
          <img className="header__image" src={prueba} />
        </div>
      </header>
    </>
  );
}
