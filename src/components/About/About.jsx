import "./About.css";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__content">
        <div className="about__text-section" data-aos="fade-right">
          <div className="about__header">
            <div className="about__badge">🚀 Nuestra Historia</div>
            <h2 className="about__title">
              Tu Aliado en{" "}
              <span className="about__title-highlight">
                Equipamiento Dental
              </span>
            </h2>
            <p className="about__subtitle">
              Somos una tienda especializada en equipos y suministros dentales
              de alta calidad. Nuestro compromiso es ofrecer tecnología de
              vanguardia y productos profesionales que ayuden a elevar el
              estándar de tu práctica dental.
            </p>
          </div>

          <div className="about__values">
            <div
              className="about__value-card"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="about__value-icon about__value-icon--quality">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="about__value-title">Calidad Premium</h3>
              <p className="about__value-description">
                Productos certificados de marcas líderes en el sector dental
              </p>
            </div>

            <div
              className="about__value-card"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="about__value-icon about__value-icon--shipping">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h3 className="about__value-title">Envío Rápido</h3>
              <p className="about__value-description">
                Entrega segura y rastreable en todo el territorio nacional
              </p>
            </div>

            <div
              className="about__value-card"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="about__value-icon about__value-icon--support">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="about__value-title">Soporte Experto</h3>
              <p className="about__value-description">
                Asesoría profesional para elegir el mejor equipo
              </p>
            </div>
          </div>
        </div>

        <div
          className="about__features-section"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <div
            className="about__feature-card about__feature-card--large"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <div className="about__feature-icon-large">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <div className="about__feature-content">
              <div className="about__feature-number">500+</div>
              <div className="about__feature-label">Productos Disponibles</div>
              <p className="about__feature-text">
                Amplio catálogo de equipos e instrumentos dentales
              </p>
            </div>
          </div>

          <div
            className="about__feature-card"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            <div className="about__feature-icon-medium">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="about__feature-content">
              <div className="about__feature-number">100%</div>
              <div className="about__feature-label">
                Satisfacción Garantizada
              </div>
            </div>
          </div>

          <div
            className="about__feature-card"
            data-aos="zoom-in"
            data-aos-delay="500"
          >
            <div className="about__feature-icon-medium">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="about__feature-content">
              <div className="about__feature-number">24/7</div>
              <div className="about__feature-label">Atención al Cliente</div>
            </div>
          </div>

          <div
            className="about__feature-card"
            data-aos="zoom-in"
            data-aos-delay="600"
          >
            <div className="about__feature-icon-medium">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className="about__feature-content">
              <div className="about__feature-number">SSL</div>
              <div className="about__feature-label">Compra Segura</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
