import { useNavigate } from "react-router-dom";
import "./Categories.css";

export default function Categories({ categories, onCategoryClick, products }) {
  const navigate = useNavigate();
  const limitedCategories =
    categories.length >= 4 ? categories.slice(0, 4) : categories;

  const handleCategoryClick = (categoryName) => {
    // Navegar a productos con el parámetro de categoría en la URL
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  const categoriesList = limitedCategories.map((category, index) => {
    const productCount = Array.isArray(products)
      ? products.filter(
          (product) =>
            product.category === category.name ||
            product.categorie === category.name
        ).length
      : 0;


    return (
      <li
        className="categories__list-item"
        key={category.id}
        onClick={() => handleCategoryClick(category.name)}
        style={{ cursor: "pointer" }}
      >
        {" "}
        <img
          className="categories__image"
          src={category.image}
          alt={category.name}
        />
        <h3 className="categories__name">{category.name}</h3>
        <p className="categories__description">{productCount}+ productos</p>
      </li>
    );
  });
  return (
    <section className="categories" id="categories">
      <div className="categories__header" data-aos="fade-up">
        <h2 className="categories__title">Comprar por categoria</h2>
        <p className="categories__description">
          Explora nuestra amplia gama de porductos dentales organizados por
          categoria
        </p>
        <ul className="categories__list">{categoriesList}</ul>
      </div>
    </section>
  );
}
