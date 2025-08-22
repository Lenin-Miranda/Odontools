import { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import "./App.css";
import { products } from "./data/productsData";
import { categories } from "./data/categoriesData";
import { Route, Routes } from "react-router";
import ProductsPage from "./pages/ProductsPage";
import CartModal from "./components/CartModal/CartModal";
import ProductsCard from "./components/ProductsCard/ProductsCard";
import espejoBlack from "./assets/tools/1espejoBLACKLINE.jpg";
import { useCart } from "./hooks/UseCart";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isFavorite, setIsfavorite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, removeFromCart, clearCart } = useCart();

  const toggleFavorite = (productId) => {
    setIsfavorite((prev) => !prev);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="app">
      <NavBar toggleCart={toggleCart}>
        <CartModal
          isCartOpen={isCartOpen}
          cartItems={cart}
          closeCart={closeCart}
        >
          <ProductsCard products={products} />
        </CartModal>
      </NavBar>

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
