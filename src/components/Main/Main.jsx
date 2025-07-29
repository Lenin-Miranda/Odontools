import Categories from "../Categories/Categories";
import Products from "../Products/Products";
import "./Main.css";

export default function Main({
  children,
  categories,
  products,
  isFavorite,
  toggleFavorite,
}) {
  return (
    <main className="main">
      <Categories categories={categories} products={products} />
      <Products
        products={products}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
    </main>
  );
}
