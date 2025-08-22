import ProductsCard from "../ProductsCard/ProductsCard";
export default function Products({ products, isFavorite, toggleFavorite }) {
  const specialProducts = products.filter((product) => product.isFavorite);

  return (
    <section className="products" id="products">
      <div className="products__header">
        <h2 className="products__title">Productos Destacados</h2>
        <p className="products__description">
          Descubre nuestros equipos y suministros dentales mas populares y mejor
          valorados{" "}
        </p>
        <ul className="products__list">
          <ProductsCard products={specialProducts} />{" "}
        </ul>
      </div>
    </section>
  );
}
