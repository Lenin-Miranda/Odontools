import "./ProductsPage.css";
import search from "../assets/search.png";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import ProductsCard from "../components/ProductsCard/ProductsCard";
export default function ProductsPage({ items }) {
  const [isSearch, setIsSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [sortOption, setSortOption] = useState("Nombre A-Z");
  const [filterOption, setFilterOption] = useState("Todas");

  const filter = [
    { id: 1, name: "Todas" },
    { id: 2, name: "Equipos Dentales" },
    { id: 3, name: "Instrumentos" },
    { id: 4, name: "Materiales" },
    { id: 5, name: "Imagenologia" },
  ];
  const sort = [
    { id: 1, name: "Nombre A-Z" },
    { id: 2, name: "Precio: Menor a Mayor" },
    { id: 3, name: "Precio: Mayor a Menor" },
    { id: 4, name: "Mejor Valorados" },
  ];

  console.log(sortOption);

  return (
    <section className="products__page">
      <div className="products__searchbar">
        <div style={{ padding: " 0 20px", margin: "0 0 20px" }}>
          <h1 className="products__searchbar-title">Productos Dentales</h1>
          <p className="products__searchbar-subtitle">
            Explora nuestra amplia gama de equipos y suministros dentales
            profesionales
          </p>
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
              className={`products__searchbar-elements-list ${
                openMenu === "sort" ? "list-open" : ""
              }`}
              style={{ left: "220px" }}
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
          <ProductsCard products={items} />
        </div>
      </div>
    </section>
  );
}
