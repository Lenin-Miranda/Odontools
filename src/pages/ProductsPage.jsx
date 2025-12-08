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
  sortByRating,
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
    { id: 4, name: "Mejor valorados" },
  ];
  const sort = [
    { id: 1, name: "Nombre A-Z" },
    { id: 2, name: "Precio: Menor a Mayor" },
    { id: 3, name: "Precio: Mayor a Menor" },
    { id: 4, name: "Mejor valorados" },
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
    else if (filterOption === "Mejor valorados")
      filtered = filterByRatingAbove(filtered);

    if (sortOption === "Nombre A-Z") return sortByName(filtered);
    if (sortOption === "Precio: Menor a Mayor") return sortByPriceAsc(filtered);
    if (sortOption === "Precio: Mayor a Menor")
      return sortByPriceDesc(filtered);
    if (sortOption === "Mejor valorados") return sortByRating(filtered);

    return filtered;
  };

  const searchFunction = () => {
    const query = isSearch.toLowerCase();
    return products.filter((product) => {
      return product.name.toLowerCase().includes(query);
    });
  };

  return (
    <section className="products__page">
      <div className="products__searchbar">
        <div style={{ padding: " 0 20px", margin: "0 0 20px" }}>
          <h1 className="products__searchbar-title">Productos Dentales</h1>
          <p className="products__searchbar-subtitle">
            Explora nuestra amplia gama de equipos y suministros dentales
            profesionales
          </p>
          {categoryFilter && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "15px",
                padding: "10px 15px",
                backgroundColor: "#667eea",
                color: "white",
                borderRadius: "8px",
                fontSize: "0.95rem",
                fontWeight: "500",
              }}
            >
              <span>Filtrando por: {categoryFilter}</span>
              <button
                onClick={() => {
                  setCategoryFilter("");
                  window.history.pushState({}, "", "/products");
                }}
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  color: "white",
                  padding: "5px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                }}
              >
                ✕ Limpiar
              </button>
            </div>
          )}
        </div>
        <div className="products__searchbar-elements">
          <label
            htmlFor="search"
            className="products__searchbar-elements-label"
          >
            <img
              className="products__searchbar-elements-icon"
              src={search}
              alt="Search Icon"
            />
            <input
              className="products__searchbar-elements-input"
              placeholder={`Buscar productos...`}
              id="search"
              value={isSearch}
              onChange={(e) => setIsSearch(e.target.value)}
            ></input>
          </label>
          <div className="products__searchbar-elements-buttons">
            <button
              className="products__searchbar-elements-button"
              onClick={() =>
                setOpenMenu(openMenu === "filter" ? null : "filter")
              }
            >
              {filterOption} <IoIosArrowDown />
            </button>
            <button
              className="products__searchbar-elements-button"
              onClick={() => setOpenMenu(openMenu === "sort" ? null : "sort")}
            >
              {sortOption} <IoIosArrowDown />
            </button>
            <ul
              className={`products__searchbar-elements-list ${
                openMenu === "filter" ? "list-open" : ""
              }`}
            >
              {filter.map((item) => (
                <li
                  key={item.id}
                  className="products__searchbar-elements-list-item"
                >
                  {item.name === filterOption ? (
                    <FaCheck
                      style={{
                        position: "absolute",
                        fontSize: "10px",
                        left: "-12px",
                      }}
                    />
                  ) : (
                    ""
                  )}
                  <button
                    className="products__searchbar-elements-btn"
                    onClick={() => {
                      setFilterOption(item.name);
                      setOpenMenu(null);
                    }}
                  >
                    {" "}
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
            <ul
              className={`products__searchbar-elements-list products__searchbar-elements-list_type-sort ${
                openMenu === "sort" ? "list-open" : ""
              }`}
            >
              {sort.map((item) => (
                <li
                  key={item.id}
                  className={`products__searchbar-elements-list-item 
                }`}
                >
                  {item.name === sortOption ? (
                    <FaCheck
                      style={{
                        position: "absolute",
                        fontSize: "10px",
                        left: "-12px",
                      }}
                    />
                  ) : (
                    ""
                  )}
                  <button
                    className="products__searchbar-elements-btn"
                    onClick={() => {
                      setSortOption(item.name);
                      setOpenMenu(null);
                    }}
                  >
                    {" "}
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="products__searchbar-cards">
          {loading ? (
            <div className="products__loading">
              <p>Cargando productos...</p>
            </div>
          ) : message ? (
            <div className="products__error">
              <p>{message}</p>
            </div>
          ) : (
            <div className="products__filter-container">
              {/* Mostrar información de filtros activos */}
              {(isSearch ||
                filterOption !== "Todas" ||
                sortOption !== "Nombre A-Z") && (
                <div className="products__filter-info">
                  <p>
                    {getFilteredAndSortedProducts().length} producto(s)
                    encontrado(s)
                    {isSearch && ` para "${isSearch}"`}
                    {filterOption !== "Todas" && ` • Filtro: ${filterOption}`}
                    {sortOption !== "Nombre A-Z" && ` • Orden: ${sortOption}`}
                  </p>
                  {(isSearch || filterOption !== "Todas") && (
                    <button
                      className="products__clear-filters"
                      onClick={() => {
                        setIsSearch("");
                        setFilterOption("Todas");
                        setSortOption("Nombre A-Z");
                      }}
                    >
                      Limpiar filtros
                    </button>
                  )}
                </div>
              )}
              <ProductsCard products={getFilteredAndSortedProducts()} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
