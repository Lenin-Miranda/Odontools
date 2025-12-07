import ProductsCard from "../ProductsCard/ProductsCard";
import "./Products.css";
import { useEffect } from "react";
import AOS from "aos";

export default function Products({
  products = [],
  isFavorite,
  toggleFavorite,
}) {
  useEffect(() => {
    // Refrescar AOS cuando se cargan productos
    AOS.refresh();
  }, [products]);

  // Limitar a solo 4 productos para la landing page
  const displayProducts = products.slice(0, 4);

  return (
    <section className="products" id="products">
      <div className="products__header" data-aos="fade-up">
        <h2 className="products__title">Productos Destacados</h2>
        <p className="products__description">
          Descubre nuestros equipos y suministros dentales más populares y mejor
          valorados
        </p>
      </div>

      {/* Mostrar productos */}
      {displayProducts.length === 0 ? (
        <div className="products__no-featured">
          <div className="products__no-featured-content">
            <h3>🌟 ¡Próximamente productos destacados!</h3>
            <p>
              Estamos seleccionando cuidadosamente nuestros mejores productos
              para ti.
            </p>
            <p>
              Mientras tanto, puedes explorar todo nuestro catálogo en la
              sección de productos.
            </p>
          </div>
        </div>
      ) : (
        <ProductsCard products={displayProducts} isFeatured={true} />
      )}
    </section>
  );
}
