import "./Contact.css";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";

export default function Contact() {
  const phoneNumber = "50587878071";
  const email = "cristofermunguia1588@gmail.com";
  const location = "Nindirí, Nicaragua";

  return (
    <section className="contact" id="contact">
      <div className="contact__content">
        <div className="contact__left" data-aos="fade-right">
          <div className="contact__header">
            <div className="contact__badge">📞 Contáctanos</div>
            <h2 className="contact__title">
              ¿Necesitas{" "}
              <span className="contact__title-highlight">Ayuda?</span>
            </h2>
            <p className="contact__subtitle">
              Estamos aquí para responder tus preguntas y ayudarte a encontrar
              los mejores equipos dentales para tu práctica.
            </p>
          </div>

          <div className="contact__cards">
            <div
              className="contact__card"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="contact__card-icon contact__card-icon--phone">
                <FaPhone />
              </div>
              <div className="contact__card-content">
                <h3 className="contact__card-title">Teléfono</h3>
                <p className="contact__card-text">{phoneNumber}</p>
                <span className="contact__card-subtitle">Lun-Sab 8AM-6PM</span>
              </div>
              <a
                href={`tel:${phoneNumber}`}
                className="contact__card-button"
                aria-label="Llamar"
              >
                <span>Llamar</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div
              className="contact__card"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="contact__card-icon contact__card-icon--email">
                <FaEnvelope />
              </div>
              <div className="contact__card-content">
                <h3 className="contact__card-title">Email</h3>
                <p className="contact__card-text contact__card-text--email">
                  {email}
                </p>
                <span className="contact__card-subtitle">Respuesta en 24h</span>
              </div>
              <a
                href={`mailto:${email}`}
                className="contact__card-button"
                aria-label="Enviar email"
              >
                <span>Enviar Email</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div
              className="contact__card"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="contact__card-icon contact__card-icon--location">
                <FaMapMarkerAlt />
              </div>
              <div className="contact__card-content">
                <h3 className="contact__card-title">Ubicación</h3>
                <p className="contact__card-text">{location}</p>
                <span className="contact__card-subtitle">
                  Envío a todo el país
                </span>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  location
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__card-button"
                aria-label="Ver mapa"
              >
                <span>Ver Mapa</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div
          className="contact__right"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <div className="contact__cta-card">
            <div className="contact__cta-icon">
              <FaWhatsapp />
            </div>
            <h3 className="contact__cta-title">¿Prefieres WhatsApp?</h3>
            <p className="contact__cta-text">
              Chatea con nosotros directamente y obtén respuestas inmediatas a
              tus consultas.
            </p>
            <a
              href={`https://wa.me/${phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__whatsapp-button"
            >
              <FaWhatsapp />
              <span>Abrir WhatsApp</span>
            </a>
          </div>

          <div className="contact__info-grid">
            <div
              className="contact__info-item"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <div className="contact__info-icon">⚡</div>
              <div className="contact__info-content">
                <h4 className="contact__info-title">Respuesta Rápida</h4>
                <p className="contact__info-description">
                  Contestamos en minutos
                </p>
              </div>
            </div>

            <div
              className="contact__info-item"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              <div className="contact__info-icon">🛡️</div>
              <div className="contact__info-content">
                <h4 className="contact__info-title">Asesoría Experta</h4>
                <p className="contact__info-description">
                  Profesionales capacitados
                </p>
              </div>
            </div>

            <div
              className="contact__info-item"
              data-aos="zoom-in"
              data-aos-delay="600"
            >
              <div className="contact__info-icon">💬</div>
              <div className="contact__info-content">
                <h4 className="contact__info-title">Soporte Completo</h4>
                <p className="contact__info-description">
                  Antes y después de la compra
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
