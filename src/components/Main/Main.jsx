import Categories from "../Categories/Categories";
import Products from "../Products/Products";
import About from "../About/About";
import Contact from "../Contact/Contact";
import "./Main.css";
import Header from "../Header/Header";
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
      <Products isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
      <About />
      <Contact />
    </main>
  );
}
