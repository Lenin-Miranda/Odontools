import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiHeart,
  FiTrash2,
  FiShoppingCart,
  FiSearch,
  FiStar,
  FiFilter,
  FiArrowLeft,
} from "react-icons/fi";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";
import useConfirm from "../hooks/useConfirm";
import "./UserFavoritesPage.css";

const UserFavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const { confirmState, showConfirm, closeConfirm } = useConfirm();

  // Simulación de productos favoritos (en producción vendría de una API)
  useEffect(() => {
    const loadFavorites = () => {
      // Simular carga desde localStorage o API
      const mockFavorites = [
        {
          id: 1,
          name: "Espejo Dental Profesional",
          price: 25.99,
          category: "espejos",
          image: "/api/placeholder/200/200",
          rating: 4.8,
          inStock: true,
          addedDate: "2024-01-15",
        },
        {
          id: 2,
          name: "Pinzas de Precisión",
          price: 45.5,
          category: "pinzas",
          image: "/api/placeholder/200/200",
          rating: 4.9,
          inStock: true,
          addedDate: "2024-01-10",
        },
        {
          id: 3,
          name: "Sonda Periodontal",
          price: 32.75,
          category: "sondas",
          image: "/api/placeholder/200/200",
          rating: 4.7,
          inStock: false,
          addedDate: "2024-01-05",
        },
      ];

      setTimeout(() => {
        setFavorites(mockFavorites);
        setFilteredFavorites(mockFavorites);
        setLoading(false);
      }, 1000);
    };

    loadFavorites();
  }, []);

  // Filtrar y buscar favoritos
  useEffect(() => {
    let filtered = favorites;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (filterCategory !== "all") {
      filtered = filtered.filter((item) => item.category === filterCategory);
    }

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return a.price - b.price;
        case "rating":
          return b.rating - a.rating;
        case "date":
          return new Date(b.addedDate) - new Date(a.addedDate);
        default:
          return 0;
      }
    });

    setFilteredFavorites(filtered);
  }, [favorites, searchTerm, filterCategory, sortBy]);

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const addToCart = (product) => {
    // Implementar lógica para agregar al carrito
    console.log("Agregado al carrito:", product);
    // Aquí se conectaría con el hook useCart
  };

  const clearAllFavorites = () => {
    showConfirm({
      title: "Limpiar favoritos",
      message: "¿Estás seguro de que quieres eliminar todos los favoritos?",
      confirmText: "Eliminar todos",
      cancelText: "Cancelar",
      type: "danger",
      onConfirm: () => {
        setFavorites([]);
      },
    });
  };

  const categories = [
    { value: "all", label: "Todas las categorías" },
    { value: "espejos", label: "Espejos" },
    { value: "pinzas", label: "Pinzas" },
    { value: "sondas", label: "Sondas" },
    { value: "instrumentos", label: "Instrumentos" },
  ];

  if (loading) {
    return (
      <div className="user-favorites-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando tus favoritos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-favorites-page">
      <div className="user-favorites-container">
        {/* Header */}
        <div className="user-favorites-header">
          <div className="header-top">
            <Link to="/" className="back-button">
              <FiArrowLeft />
              Volver al inicio
            </Link>
          </div>

          <div className="header-content">
            <h1 className="user-favorites-title">
              <FiHeart />
              Mis Favoritos
            </h1>
            <p className="user-favorites-subtitle">
              {favorites.length}{" "}
              {favorites.length === 1
                ? "producto guardado"
                : "productos guardados"}
            </p>
          </div>

          {favorites.length > 0 && (
            <button className="clear-all-btn" onClick={clearAllFavorites}>
              <FiTrash2 />
              Limpiar todo
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <FiHeart className="empty-icon" />
            <h3>No tienes productos favoritos aún</h3>
            <p>
              Explora nuestra tienda y guarda los productos que más te gusten
              haciendo clic en el corazón.
            </p>
            <Link to="/products" className="btn btn--primary">
              <FiSearch />
              Explorar productos
            </Link>
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="favorites-filters">
              <div className="search-box">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Buscar en favoritos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="filter-box">
                <FiFilter className="filter-icon" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sort-box">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Ordenar por nombre</option>
                  <option value="price">Ordenar por precio</option>
                  <option value="rating">Ordenar por calificación</option>
                  <option value="date">Ordenar por fecha</option>
                </select>
              </div>
            </div>

            {/* Favorites Grid */}
            <div className="favorites-grid">
              {filteredFavorites.map((product) => (
                <div key={product.id} className="favorite-card">
                  <div className="favorite-image">
                    <img src={product.image} alt={product.name} />
                    {!product.inStock && (
                      <div className="out-of-stock-overlay">Sin stock</div>
                    )}
                  </div>

                  <div className="favorite-content">
                    <h3 className="favorite-name">{product.name}</h3>

                    <div className="favorite-rating">
                      <FiStar className="star-icon" />
                      <span>{product.rating}</span>
                    </div>

                    <div className="favorite-price">
                      ${product.price.toFixed(2)}
                    </div>

                    <div className="favorite-category">
                      Categoría: {product.category}
                    </div>

                    <div className="favorite-date">
                      Agregado:{" "}
                      {new Date(product.addedDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="favorite-actions">
                    <button
                      className={`add-to-cart-btn ${
                        !product.inStock ? "disabled" : ""
                      }`}
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                    >
                      <FiShoppingCart />
                      {product.inStock ? "Agregar al carrito" : "Sin stock"}
                    </button>

                    <button
                      className="remove-favorite-btn"
                      onClick={() => removeFavorite(product.id)}
                    >
                      <FiTrash2 />
                      Quitar de favoritos
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredFavorites.length === 0 && (
              <div className="no-results">
                <FiSearch className="no-results-icon" />
                <h3>No se encontraron resultados</h3>
                <p>Intenta con otros términos de búsqueda o filtros.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={confirmState.isOpen}
        onClose={closeConfirm}
        onConfirm={confirmState.onConfirm}
        title={confirmState.title}
        message={confirmState.message}
        confirmText={confirmState.confirmText}
        cancelText={confirmState.cancelText}
        type={confirmState.type}
        showCancel={confirmState.showCancel}
      />
    </div>
  );
};

export default UserFavoritesPage;
