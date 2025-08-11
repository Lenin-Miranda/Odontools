import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__container-l">
          <ul className="footer__container-list">
            <li className="footer__container-list-item">
              <h3 className="footer__container-list-header">Odoontools</h3>
            </li>
            <li className="footer__container-list-item">
              Tu socio de confianza para equipos y suministros dentales.
            </li>
            <li className="footer__container-list-item">
              <div className="footer__container-list-item-social">
                <Link
                  to="https://facebook.com"
                  className="footer__container-list-item-social-links"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </Link>
                <Link
                  to="https://instagram.com"
                  className="footer__container-list-item-social-links"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Link>
                <Link
                  to="https://linkedin.com"
                  className="footer__container-list-item-social-links"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Link>
              </div>
            </li>
          </ul>
        </div>
        <div className="footer__container-r">
          <ul className="footer__container-list">
            <li className="footer__container-list-item">Productos</li>
            <li className="footer__container-list-item">
              <Link
                to="/productos"
                className="footer__container-list-item-link"
              >
                Equipos Dentales
              </Link>
            </li>
            <li className="footer__container-list-item">
              <Link
                to="/productos"
                className="footer__container-list-item-link"
              >
                Instrumentos
              </Link>
            </li>
            <li className="footer__container-list-item">
              <Link
                to="/productos"
                className="footer__container-list-item-link"
              >
                Materiales
              </Link>
            </li>
          </ul>
          <ul className="footer__container-list">
            <li className="footer__container-list-item">Soporte</li>
            <li className="footer__container-list-item">
              <Link to="/contacto" className="footer__container-list-item-link">
                Contacto
              </Link>
            </li>
            <li className="footer__container-list-item">
              <Link to="/soporte" className="footer__container-list-item-link">
                Soporte Técnico
              </Link>
            </li>
            <li className="footer__container-list-item">
              <Link to="/garantia" className="footer__container-list-item-link">
                Garantía
              </Link>
            </li>
          </ul>
          <ul className="footer__container-list">
            <li className="footer__container-list-item">Empresa</li>
            <li className="footer__container-list-item">
              <Link to="/nosotros" className="footer__container-list-item-link">
                Sobre Nosotros
              </Link>
            </li>
            <li className="footer__container-list-item">
              <Link to="/historia" className="footer__container-list-item-link">
                Historia
              </Link>
            </li>
            <li className="footer__container-list-item">
              <Link to="/equipo" className="footer__container-list-item-link">
                Nuestro Equipo
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__bottom-text">
          © 2024 Odoontools. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
