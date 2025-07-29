import { useState } from "react";
import NavBar from "./components/NavBar/Navbar";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import "./App.css";
import { products } from "./data/productsData";
import { categories } from "./data/categoriesData";
function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isFavorite, setIsfavorite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const toggleFavorite = (productId) => {
    setIsfavorite((prev) => !prev);
  };
  return (
    <div className="app">
      <Header>
        <NavBar />
      </Header>
      <Main
        categories={categories}
        products={products}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default App;
