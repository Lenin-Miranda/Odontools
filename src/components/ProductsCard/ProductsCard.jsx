import star from "../../assets/star.png";
import "./ProductsCard.css";
import { useCart } from "../../hooks/UseCart";
import { FiPackage } from "react-icons/fi";

export default function ProductsCard({ products, isFeatured = false }) {
  const { addToCart, isInCart } = useCart();

  // Si no hay productos, mostrar estado vacío
  if (!products || products.length === 0) {
    return (
      <div className="products__empty-state">
        <FiPackage className="products__empty-icon" />
        <h3>No se encontraron productos</h3>
        <p>Intenta ajustar los filtros o buscar con otros términos</p>
      </div>
    );
  }

  const productsList = products.map((product) => {
    return (
      <li className="products__list-item" key={product._id || product.id}>
        {product.stock === 0 ? (
          <span
            className="products__list-offer"
            style={{ backgroundColor: "#ccc", color: "#000" }}
          >
            Agotado
          </span>
        ) : product.discount ? (
          <span className="products__list-offer">Oferta</span>
        ) : null}
        <img
          className="products__list-image"
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.target.src =
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDMwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjUgMTAwSDkwVjE0MEgxMjVWMTc1SDE2NVYxNDBIMjAwVjEwMEgxNjVWNzVIMTI1VjEwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHRLEHT4geDEHNTAiIHk9IjE4NSIgZmlsbD0iIzlDQTNBRiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iNTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Qcm9kdWN0bzwvdGV4dD4KPC9zdmc+";
          }}
        />
        <div className="products__list-container">
          <p className="products__list-categorie">
            {product.category || product.categorie}
          </p>
          <h3 className="products__list-name">{product.name}</h3>
          <p className="products__list-description">
            {product.description?.length > 100
              ? `${product.description.substring(0, 100)}...`
              : product.description}
          </p>
          <div className="products__list-reviews"></div>
          <div className="products__list-price-container">
            {product.discount ? (
              <>
                <p className="products__list-price">
                  $
                  {parseFloat(product.price - (product.price * 0.1).toFixed(2))}
                </p>
                <p className="products__list-price products__list-price_type-discount">
                  ${product.price.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="products__list-price">
                ${product.price.toFixed(2)}
              </p>
            )}
          </div>

          <button
            className="products__list-button"
            onClick={() => {
              addToCart(product);
            }}
            disabled={product.stock === 0}
            style={{
              backgroundColor: product.stock === 0 ? "#ccc" : "#000",
              cursor: product.stock === 0 ? "not-allowed" : "pointer",
            }}
          >
            {product.stock === 0 ? "Agotado" : "Agregar al carrito"}
          </button>
        </div>
      </li>
    );
  });

  // Determinar clases CSS según cantidad de productos
  const getListClasses = () => {
    const baseClass = "products__list";

    // Si son productos destacados, usar la clase especial
    if (isFeatured) {
      return `${baseClass} featured-products`;
    }

    // Para otros casos (ProductsPage)
    if (products.length === 1) return `${baseClass} single-item`;
    if (products.length <= 3) return `${baseClass} few-items`;
    return baseClass;
  };

  return <ul className={getListClasses()}>{productsList}</ul>;
}
