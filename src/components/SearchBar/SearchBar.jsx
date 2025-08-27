import search from "../../assets/search.png";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { products } from "../../data/productsData";
import "./SearchBar.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = products.filter((product) => {
      return product.name.toLowerCase().includes(value.toLowerCase());
    });

    setResults(filtered);
  };

  const handleSelect = (id) => {
    setQuery("");
    setResults([]);
    navigate(`/product/${id}`);
  };

  return (
    <div className="navbar__search-icon-container">
      <img className="navbar__search-icon" src={search} alt="Search Icon" />
      <label className="navbar__search-label" htmlFor="search"></label>
      <input
        className="navbar__search-input"
        placeholder={`Buscar productos...`}
        type="text"
        id="search"
        value={query}
        onChange={handleSearch}
      ></input>
      <div className="seachbar__container">
        {results.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelect(item.id)}
            className="searchbar__containter-products"
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
