import prueba from "../../assets/hero-image.png";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";

export default function Header({ children }) {
  return (
    <>
      {children}
      <header className="header" id="home">
        <div className="header__background">
          <img
            className="header__background-image"
            src={prueba}
            alt="Equipos dentales profesionales"
          />
          <div className="header__overlay"></div>
        </div>

        <div
          className="header__content"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div
            className="header__badge"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            Tecnología Dental de Vanguardia
          </div>

          <h1 className="header__title" data-aos="fade-up" data-aos-delay="300">
            Equipos y Suministros
            <span className="header__title-highlight">
              {" "}
              Dentales Profesionales
            </span>
          </h1>

          <p
            className="header__subtitle"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Materiales, instrumentos y tecnología dental de alta calidad
            <br />
            para clínicas y profesionales que buscan la excelencia
          </p>

          <div
            className="header__buttons"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <Link
              className="header__button header__button--primary"
              to="products"
              smooth={true}
              duration={500}
            >
              <span>Comprar Ahora</span>
              <svg
                className="header__button-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <NavLink
              to="/products"
              className="header__button header__button--secondary"
            >
              <span>Ver Catálogo</span>
            </NavLink>
          </div>

          <div
            className="header__features"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <div className="header__feature">
              <div className="header__feature-icon">🏆</div>
              <span>Calidad Premium</span>
            </div>
            <div className="header__feature">
              <div className="header__feature-icon">🚚</div>
              <span>Envío Rápido</span>
            </div>
            <div className="header__feature">
              <div className="header__feature-icon">💯</div>
              <span>Garantía Total</span>
            </div>
          </div>
        </div>

        <div
          className="header__scroll-indicator"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <Link to="products" smooth={true} duration={500}>
            <div className="header__scroll-mouse">
              <div className="header__scroll-wheel"></div>
            </div>
          </Link>
        </div>
      </header>
    </>
  );
}
