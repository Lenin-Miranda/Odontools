import "./About.css";
import perfil from "../../assets/perfil_01.jpg";
export default function About() {
  return (
    <section className="about">
      <div className="about__container">
        <h2 className="about__title">Acerca de Odontools</h2>
        <p className="about__subtitle">
          Con más de 25 años de experiencia en la industria dental, TiendaDental
          Pro ha sido el socio de confianza para profesionales dentales en todo
          el mundo. Nos especializamos en proporcionar equipos dentales,
          instrumentos y materiales de alta calidad a precios competitivos.
        </p>
        <ul className="about__list">
          <li className="about__list-item">
            <span className="about__list-item-text">10,000+ </span>
            <span style={{ fontSize: "18px" }}>Productos</span>
          </li>
          <li className="about__list-item">
            <span className="about__list-item-text">5,000+ </span>
            <span style={{ fontSize: "18px" }}>Clientes Satisfechos</span>
          </li>
          <li className="about__list-item">
            <span className="about__list-item-text">25+</span>
            <span style={{ fontSize: "18px" }}>Años de Experiencia</span>
          </li>
          <li className="about__list-item">
            <span className="about__list-item-text">50+</span>
            <span style={{ fontSize: "18px" }}>Paises atendidos</span>
          </li>
        </ul>
        <button className="about__container-button">
          Conoce mas sobre nosotros
        </button>
      </div>
      <div className="about__container">
        <img className="aboout__container-image" src={perfil} />
      </div>
    </section>
  );
}
