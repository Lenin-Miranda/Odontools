import "./Products.css";
import { useState } from "react";
import star from "../../assets/star.png";
export default function Products({ products, isFavorite, toggleFavorite }) {
  const specialProducts = products.filter((product) => product.isFavorite);

  const productsList = specialProducts.map((product) => {
    return (
      <li className="products__list-item" key={product.id}>
        <span className="products__list-offer">Oferta</span>
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
            <p className="products__list-price">${product.price}</p>
            <p className="products__list-price products__list-price_type-discount">
              ${product.discountedPrice(Math.round(product.price))}
            </p>
          </div>

          <button className="products__list-button">Agregar al carrito</button>
        </div>
      </li>
    );
  });
  return (
    <section className="products" id="products">
      <div className="products__header">
        <h2 className="products__title">Productos Destacados</h2>
        <p className="products__description">
          Descubre nuestros equipos y suministros dentales mas populares y mejor
          valorados{" "}
        </p>
        <ul className="products__list">{productsList}</ul>
      </div>
    </section>
  );
}
