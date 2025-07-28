import prueba from "../../assets/perfil_01.jpg";
import "./Header.css";

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
            <button className="header__hero-button header__hero-button_type-l">
              Comprar Ahora
            </button>
            <button className="header__hero-button header__hero-button_type-r">
              Ver Catalogo
            </button>
          </div>
        </div>
        <div className="header__image-container">
          <img className="header__image" src={prueba} />
        </div>
      </header>
    </>
  );
}
