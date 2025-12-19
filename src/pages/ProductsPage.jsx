import "./ProductsPage.css";
import search from "../assets/search.png";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import ProductsCard from "../components/ProductsCard/ProductsCard";
import { useProducts } from "../hooks/useProducts.js";
import {
  sortByPriceAsc,
  sortByPriceDesc,
  sortByName,
} from "../utils/sortTypes/sortTypes";
import {
  filterOnSale,
  filterInStock,
  filterByRatingAbove,
  filterAll,
} from "../utils/filterTypes/filterTypes.js";

export default function ProductsPage({ items }) {
  const [searchParams] = useSearchParams();
  // ✅ Hook llamado DENTRO del componente
  const {
    fetchProducts,
    products: hookProducts,
    loading: hookLoading,
    error: hookError,
  } = useProducts();
  const [isSearch, setIsSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [sortOption, setSortOption] = useState("Nombre A-Z");
  const [filterOption, setFilterOption] = useState("Todas");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const filter = [
    { id: 1, name: "Todas" },
    { id: 2, name: "En stock" },
    { id: 3, name: "En oferta" },
  ];
  const sort = [
    { id: 1, name: "Nombre A-Z" },
    { id: 2, name: "Precio: Menor a Mayor" },
    { id: 3, name: "Precio: Mayor a Menor" },
  ];

  useEffect(() => {
    // Cargar productos al montar el componente SOLO UNA VEZ
    fetchProducts();
  }, []);

  // Leer parámetro de categoría de la URL
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setCategoryFilter(category);
    }
  }, [searchParams]);

  // Sincronizar productos del hook con estado local
  useEffect(() => {
    if (hookProducts.length > 0) {
      setProducts(hookProducts);
      setLoading(false);
    }
  }, [hookProducts]);

  // Manejar errores del hook
  useEffect(() => {
    if (hookError) {
      setMessage(hookError);
      setTimeout(() => setMessage(""), 3000);
      setLoading(false);
    }
  }, [hookError]);

  const getFilteredAndSortedProducts = () => {
    let filtered = searchFunction();

    // Filtrar por categoría si hay una seleccionada
    if (categoryFilter) {
      filtered = filtered.filter(
        (product) =>
          product.category === categoryFilter ||
          product.categorie === categoryFilter
      );
    }

    if (filterOption === "En stock") filtered = filterInStock(filtered);
    else if (filterOption === "En oferta") filtered = filterOnSale(filtered);

    if (sortOption === "Nombre A-Z") return sortByName(filtered);
    if (sortOption === "Precio: Menor a Mayor") return sortByPriceAsc(filtered);
    if (sortOption === "Precio: Mayor a Menor")
      return sortByPriceDesc(filtered);

    return filtered;
  };

  const searchFunction = () => {
    const query = isSearch.toLowerCase();
    return products.filter((product) => {
      return product.name.toLowerCase().includes(query);
    });
  };

  // Productos filtrados para usar en el JSX
  const filteredProducts = getFilteredAndSortedProducts();

  return (
    <section className="products__page">
      {/* Hero Section */}
      <div className="products__hero">
        <div className="products__hero-overlay"></div>
        <div className="products__hero-content">
          <div className="products__breadcrumb">
            <span>Inicio</span>
            <span className="products__breadcrumb-separator">/</span>
            <span className="products__breadcrumb-active">Productos</span>
          </div>
          <h1 className="products__hero-title">
            Catálogo de{" "}
            <span className="products__hero-title-highlight">Productos</span>
          </h1>
          <p className="products__hero-subtitle">
            Descubre nuestra selección de equipos y suministros dentales
            profesionales
          </p>

          {/* Search bar en el hero */}
          <div className="products__hero-search">
            <svg
              className="products__hero-search-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className="products__hero-search-input"
              placeholder="Buscar productos por nombre..."
              value={isSearch}
              onChange={(e) => setIsSearch(e.target.value)}
            />
            {isSearch && (
              <button
                className="products__hero-search-clear"
                onClick={() => setIsSearch("")}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filtros y Productos */}
      <div className="products__container">
        {/* Barra de filtros */}
        <div className="products__filters-bar">
          <div className="products__filters-left">
            <div className="products__filter-group">
              <span className="products__filter-label">Filtrar:</span>
              <div className="products__filter-chips">
                {filter.map((item) => (
                  <button
                    key={item.id}
                    className={`products__filter-chip ${
                      filterOption === item.name
                        ? "products__filter-chip--active"
                        : ""
                    }`}
                    onClick={() => setFilterOption(item.name)}
                  >
                    {item.name}
                    {filterOption === item.name && (
                      <FaCheck
                        style={{ marginLeft: "6px", fontSize: "12px" }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="products__filters-right">
            <div className="products__sort-dropdown">
              <button
                className="products__sort-button"
                onClick={() => setOpenMenu(openMenu === "sort" ? null : "sort")}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 6h18M7 12h10M11 18h2" />
                </svg>
                <span>{sortOption}</span>
                <IoIosArrowDown
                  className={openMenu === "sort" ? "rotate" : ""}
                />
              </button>
              {openMenu === "sort" && (
                <ul className="products__sort-menu">
                  {sort.map((item) => (
                    <li key={item.id} className="products__sort-menu-item">
                      <button
                        className={`products__sort-menu-button ${
                          sortOption === item.name ? "active" : ""
                        }`}
                        onClick={() => {
                          setSortOption(item.name);
                          setOpenMenu(null);
                        }}
                      >
                        {sortOption === item.name && (
                          <FaCheck
                            style={{ marginRight: "8px", fontSize: "12px" }}
                          />
                        )}
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Active filters badge */}
        {categoryFilter && (
          <div className="products__active-filters">
            <div className="products__active-filter-badge">
              <span>📌 Categoría: {categoryFilter}</span>
              <button
                onClick={() => {
                  setCategoryFilter("");
                  window.history.pushState({}, "", "/products");
                }}
                className="products__active-filter-remove"
              >
                ✕
              </button>
            </div>
          </div>
        )}
        {/* Results section */}
        <div className="products__results">
          {loading ? (
            <div className="products__loading">
              <div className="products__loading-spinner"></div>
              <p>Cargando productos...</p>
            </div>
          ) : message ? (
            <div className="products__error">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p>{message}</p>
            </div>
          ) : (
            <>
              {/* Results counter */}
              <div className="products__results-header">
                <div className="products__results-info">
                  <span className="products__results-count">
                    {filteredProducts.length}
                  </span>
                  <span className="products__results-text">
                    {filteredProducts.length === 1
                      ? "producto encontrado"
                      : "productos encontrados"}
                  </span>
                </div>
                {(isSearch || filterOption !== "Todas" || categoryFilter) && (
                  <button
                    className="products__clear-all"
                    onClick={() => {
                      setIsSearch("");
                      setFilterOption("Todas");
                      setCategoryFilter("");
                      window.history.pushState({}, "", "/products");
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    Limpiar todo
                  </button>
                )}
              </div>

              {/* Products grid */}
              <div className="products__grid-wrapper">
                {filteredProducts.length > 0 ? (
                  <ProductsCard products={filteredProducts} />
                ) : (
                  <div className="products__no-results">
                    <svg
                      width="80"
                      height="80"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                    <p>
                      No encontramos productos que coincidan con tu búsqueda
                    </p>
                    <button
                      onClick={() => {
                        setIsSearch("");
                        setFilterOption("Todas");
                        setCategoryFilter("");
                      }}
                      className="products__reset-button"
                    >
                      Limpiar filtros
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
