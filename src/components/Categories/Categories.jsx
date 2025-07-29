import "./Categories.css";

export default function Categories({ categories, onCategoryClick, products }) {
  const limitedCategories =
    categories.length >= 4 ? categories.slice(0, 4) : categories;

  const categoriesList = limitedCategories.map((category) => {
    return (
      <li className="categories__list-item" key={category.id}>
        {" "}
        <img
          className="categories__image"
          src={category.image}
          alt={category.name}
        />
        <h3 className="categories__name">{category.name}</h3>
        <p className="categories__description">
          {Array.isArray(products)
            ? products.filter((product) => product.categorie === category.name)
                .length
            : 0}
          + productos
        </p>
      </li>
    );
  });
  return (
    <section className="categories" id="categories">
      <div className="categories__header">
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
