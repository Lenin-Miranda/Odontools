import "./Contact.css";
import { FaPhone, FaEnvelope, FaMap } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__container">
        <h2 className="contact__container-title">Ponte en Contacto</h2>
        <p className="contact__container-description">
          ¿Tienes preguntas sobre nuestros productos o necesitas asistencia?
          Nuestro equipo de expertos está aquí para ayudarte.
        </p>
        <ul className="contact__container-list">
          <li className="contact__container-list-item">
            <i className="contact__container-list-item-icon">
              <FaPhone />
            </i>
            <h3 className="contact__container-list-item-title">Telefono</h3>
            <p className="contact__container-list-item-text">
              +1 (234) 567 890
            </p>
            <span className="contact__container-list-item-text-subtitle">
              Lun-Vie 8AM-6PM EST
            </span>
          </li>
          <li className="contact__container-list-item">
            {" "}
            <i className="contact__container-list-item-icon">
              <FaEnvelope />
            </i>
            <h3 className="contact__container-list-item-title">
              Correo Electronico
            </h3>
            <p className="contact__container-list-item-text">
              info@tiendadental.com
            </p>
            <span className="contact__container-list-item-text-subtitle">
              Soporte 24/7
            </span>
          </li>
          <li className="contact__container-list-item">
            {" "}
            <i className="contact__container-list-item-icon">
              <FaMap />
            </i>
            <h3 className="contact__container-list-item-title">Direccion</h3>
            <p className="contact__container-list-item-text">
              123 Plaza Dental
            </p>
            <span className="contact__container-list-item-text-subtitle">
              Ciudad de México, CDMX 01000
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
