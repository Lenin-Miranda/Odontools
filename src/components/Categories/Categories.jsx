import { useNavigate } from "react-router-dom";
import "./Categories.css";

export default function Categories({ categories, onCategoryClick, products }) {
  const navigate = useNavigate();
  const limitedCategories =
    categories.length >= 4 ? categories.slice(0, 4) : categories;

  const handleCategoryClick = (categoryName) => {
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
        className="categories__card"
        key={category.id}
        onClick={() => handleCategoryClick(category.name)}
        data-aos="fade-up"
        data-aos-delay={index * 100}
      >
        <div className="categories__card-inner">
          <img
            className="categories__card-image"
            src={category.image}
            alt={category.name}
          />
          <div className="categories__card-overlay"></div>

          <div className="categories__card-content">
            <div className="categories__card-badge">
              <svg
                className="categories__badge-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 7h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
              </svg>
              <span>{productCount}+</span>
            </div>

            <h3 className="categories__card-title">{category.name}</h3>

            <div className="categories__card-arrow">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </li>
    );
  });

  return (
    <section className="categories" id="categories">
      <div className="categories__container">
        <div className="categories__header" data-aos="fade-up">
          <div className="categories__header-badge">📦 Categorías</div>
          <h2 className="categories__title">Explora por Categoría</h2>
          <p className="categories__subtitle">
            Encuentra exactamente lo que necesitas navegando por nuestras
            categorías especializadas
          </p>
        </div>

        <ul className="categories__grid">{categoriesList}</ul>
      </div>
    </section>
  );
}
