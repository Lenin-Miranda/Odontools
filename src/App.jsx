import { useState } from "react";
import NavBar from "./components/NavBar/Navbar";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { products } from "./data/productsData";
import { categories } from "./data/categoriesData";
import { Route, Routes } from "react-router";
import ProductsPage from "./pages/ProductsPage";
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

      <Routes>
        <Route path="/products" element={<ProductsPage />} />
        <Route
          path="/"
          element={
            <Main
              categories={categories}
              products={products}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
