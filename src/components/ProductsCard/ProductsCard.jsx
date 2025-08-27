import star from "../../assets/star.png";
import "./ProductsCard.css";
import { useCart } from "../../hooks/UseCart";
export default function ProductsCard({ products }) {
  const { addToCart, isInCart } = useCart();

  const productsList = products.map((product) => {
    return (
      <li className="products__list-item" key={product.id}>
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
        />
        <div className="products__list-container">
          <p className="products__list-categorie">{product.categorie}</p>
          <h3 className="products__list-name">{product.name}</h3>
          <div className="products__list-reviews">
            <img className="products__list-img" src={star} />
            <p className="products__list-reviews-count">
              {product.rating} ({product.reviews})
            </p>
          </div>
          <div className="products__list-price-container">
            {product.discount ? (
              <>
                <p className="products__list-price">
                  $
                  {parseFloat(
                    product.discountedPrice(product.price).toFixed(2)
                  )}
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
          >
            Agregar al carrito
          </button>
        </div>
      </li>
    );
  });
  return <ul className="products__list">{productsList}</ul>;
}
