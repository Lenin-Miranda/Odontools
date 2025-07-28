import Categories from "../Categories/Categories";

export default function Main({ children, categories, products }) {
  return (
    <main className="main">
      <Categories categories={categories} products={products} />
    </main>
  );
}
