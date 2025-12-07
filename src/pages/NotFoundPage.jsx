import { useNavigate } from "react-router-dom";
import {
  FiAlertCircle,
  FiHome,
  FiArrowLeft,
  FiSearch,
  FiShoppingBag,
} from "react-icons/fi";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoProducts = () => {
    navigate("/products");
  };

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        {/* Animated 404 */}
        <div className="not-found-animation">
          <div className="not-found-number">
            <span className="number-4">4</span>
            <span className="number-0">
              <FiAlertCircle className="zero-icon" />
            </span>
            <span className="number-4">4</span>
          </div>
        </div>

        {/* Content */}
        <div className="not-found-content">
          <h1 className="not-found-title">¡Oops! Página no encontrada</h1>
          <p className="not-found-description">
            Lo sentimos, la página que estás buscando no existe o ha sido
            movida.
          </p>
          <p className="not-found-subdescription">
            Puede que hayas escrito mal la dirección o que la página ya no esté
            disponible.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="not-found-actions">
          <button
            className="not-found-btn not-found-btn--primary"
            onClick={handleGoHome}
          >
            <FiHome />
            Ir al Inicio
          </button>
          <button
            className="not-found-btn not-found-btn--secondary"
            onClick={handleGoBack}
          >
            <FiArrowLeft />
            Volver Atrás
          </button>
          <button
            className="not-found-btn not-found-btn--tertiary"
            onClick={handleGoProducts}
          >
            <FiShoppingBag />
            Ver Productos
          </button>
        </div>

        {/* Quick Links */}
        <div className="not-found-links">
          <h3 className="not-found-links-title">
            <FiSearch />
            Enlaces útiles
          </h3>
          <div className="not-found-links-grid">
            <button onClick={() => navigate("/")} className="not-found-link">
              Inicio
            </button>
            <button
              onClick={() => navigate("/products")}
              className="not-found-link"
            >
              Productos
            </button>
            <button
              onClick={() => navigate("/orders")}
              className="not-found-link"
            >
              Mis Pedidos
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="not-found-link"
            >
              Mi Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
