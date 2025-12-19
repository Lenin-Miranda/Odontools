import ProductsCard from "../ProductsCard/ProductsCard";
import "./Products.css";
import { useEffect } from "react";
import AOS from "aos";
import { useNavigate } from "react-router-dom";

export default function Products({
  products = [],
  isFavorite,
  toggleFavorite,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.refresh();
  }, [products]);

  // Filtrar productos que son favoritos y limitar a 4
  const displayProducts = products
    .filter((product) => product.isFavorite === true)
    .slice(0, 4);

  return (
    <section className="products" id="products">
      <div className="products__container">
        <div className="products__header" data-aos="fade-up">
          <div className="products__header-badge">⭐ Destacados</div>
          <h2 className="products__title">
            Productos <span className="products__title-highlight">Premium</span>
          </h2>
          <p className="products__subtitle">
            Los equipos y suministros dentales más solicitados por profesionales
          </p>
        </div>

        {displayProducts.length === 0 ? (
          <div className="products__no-featured">
            <div className="products__no-featured-content">
              <div className="products__empty-icon">🌟</div>
              <h3>¡Próximamente productos destacados!</h3>
              <p>
                Estamos seleccionando cuidadosamente nuestros mejores productos
                para ti.
              </p>
            </div>
          </div>
        ) : (
          <>
            <ProductsCard products={displayProducts} isFeatured={true} />

            <div
              className="products__cta"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <button
                className="products__cta-button"
                onClick={() => navigate("/products")}
              >
                <span>Ver Todo el Catálogo</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
