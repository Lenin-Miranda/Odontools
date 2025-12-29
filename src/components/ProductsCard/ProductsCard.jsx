import star from "../../assets/star.png";
import "./ProductsCard.css";
import { useCart } from "../../hooks/UseCart";
import { FiPackage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ProductsCard({ products, isFeatured = false }) {
  const { addToCart, isInCart } = useCart();
  const navigate = useNavigate();

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

  const productsList = products.map((product, index) => {
    const productId = product._id || product.id;
    const isOutOfStock = product.stock === 0;
    const hasDiscount = product.discount > 0;

    return (
      <li className="products__list-item" key={productId} data-aos="fade-up">
        <div className="products__badges">
          {isOutOfStock ? (
            <span className="products__badge products__badge--sold-out">
              Agotado
            </span>
          ) : hasDiscount ? (
            <span className="products__badge products__badge--discount">
              -{product.discount}%
            </span>
          ) : null}

          {!isOutOfStock && index === 0 && (
            <span className="products__badge products__badge--popular">
              🔥 Popular
            </span>
          )}
        </div>

        <div
          className="products__list-clickable"
          onClick={() => navigate(`/products/${productId}`)}
        >
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
            <div className="products__list-header">
              <span className="products__list-categorie">
                {product.category || product.categorie}
              </span>
            </div>

            <h3 className="products__list-name">{product.name}</h3>

            <p className="products__list-description">
              {product.description?.length > 80
                ? `${product.description.substring(0, 80)}...`
                : product.description}
            </p>

            <div className="products__list-footer">
              <div className="products__list-price-container">
                {product.discount > 0 ? (
                  <>
                    <p className="products__list-price">
                      $
                      {(
                        product.price -
                        (product.price * product.discount) / 100
                      ).toFixed(2)}
                    </p>
                    <p className="products__list-price products__list-price--discount">
                      ${product.price.toFixed(2)}
                    </p>
                  </>
                ) : (
                  <p className="products__list-price">
                    ${product.price.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          className={`products__list-button ${
            isOutOfStock ? "products__list-button--disabled" : ""
          } ${isInCart(product) ? "products__list-button--added" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            if (!isOutOfStock && !isInCart(product)) {
              addToCart(product);
            }
          }}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? (
            <span>Agotado</span>
          ) : isInCart(product) ? (
            <span>Producto agregado</span>
          ) : (
            <>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span>Agregar al carrito</span>
            </>
          )}
        </button>
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
