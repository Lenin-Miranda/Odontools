import { products } from "../../data/productsData";
import { useProducts } from "../../hooks/useProducts";
import ProductsCard from "../ProductsCard/ProductsCard";
import "./Products.css";
import { useEffect, useState } from "react";
import AOS from "aos";

export default function Products({ isFavorite, toggleFavorite }) {
  const {
    products: fetchedProducts,
    loading,
    error,
    fetchProducts,
  } = useProducts();

  useEffect(() => {
    const loadProducts = async () => {
      // Solo usar datos de la API, ignorar props hardcoded
      await fetchProducts();
      // Refrescar AOS después de cargar productos
      AOS.refresh();
    };

    loadProducts();
  }, [products]);

  // Usar solo los productos obtenidos de la API
  const displayProducts = fetchedProducts;

  // Filtrar solo productos que sean realmente favoritos/destacados
  const featuredProducts = displayProducts
    .filter((product) => {
      const productId = product.id || product._id;
      // Verificar si es favorito usando la función prop o las propiedades del producto
      return isFavorite
        ? isFavorite(productId)
        : product.isFavorite === true ||
            product.featured === true ||
            product.isFeatured === true;
    })
    .slice(0, 8); // Limitar a 8 productos destacados
  return (
    <section className="products" id="products">
      <div className="products__header" data-aos="fade-up">
        <h2 className="products__title">Productos Destacados</h2>
        <p className="products__description">
          Descubre nuestros equipos y suministros dentales más populares y mejor
          valorados
        </p>
      </div>

      {/* Manejo de estados */}
      {loading ? (
        <div className="products__loading">
          <div className="loading-spinner"></div>
          <p>Cargando productos destacados...</p>
        </div>
      ) : error ? (
        <div className="products__error">
          <p>Error al cargar productos: {error}</p>
          <button onClick={() => fetchProducts()} className="retry-button">
            Reintentar
          </button>
        </div>
      ) : featuredProducts.length === 0 ? (
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
        <ProductsCard products={featuredProducts} isFeatured={true} />
      )}
    </section>
  );
}
