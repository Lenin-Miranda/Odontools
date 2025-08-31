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
import ModalWithForm from "./components/ModalWithForm/ModalWithForm";
import UserModal from "./components/UserModal/UserModal";
import { users } from "./data/clientsData";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [isFavorite, setIsfavorite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLogginOpen, setIsLogginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const { cart, removeFromCart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isUserOpen, setIsUserOpen] = useState(false);

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
      <NavBar
        toggleCart={toggleCart}
        isLoggedIn={isLoggedIn}
        setIsLogginOpen={setIsLogginOpen}
        setIsSignUpOpen={setIsSignUpOpen}
        setIsUserOpen={setIsUserOpen}
      >
        <CartModal
          isCartOpen={isCartOpen}
          cartItems={cart}
          closeCart={closeCart}
        >
          <ProductsCard products={products} />
        </CartModal>
        <UserModal
          isUserOpen={isUserOpen}
          setIsUserOpen={setIsUserOpen}
          user={users}
        />
      </NavBar>
      <ModalWithForm setIsClose={setIsLogginOpen} isOpen={isLogginOpen}>
        <h2 className="modal__form-title">Iniciar Sesion</h2>
        <label className="modal__form-label" htmlFor="login-email">
          Email
          <input
            id="login-email"
            value={formData.email}
            className="modal__form-input"
            placeholder="Email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </label>
        <label className="modal__form-label" htmlFor="login-password">
          Contraseña
          <input
            id="login-password"
            type="password"
            value={formData.password}
            className="modal__form-input"
            placeholder="Contraseña"
            autoComplete="on"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </label>
        <button className="modal__form-submit-btn" type="submit">
          Iniciar Sesion
        </button>
        <button
          type="button"
          className="modal__form-switch-btn"
          onClick={() => {
            setIsLogginOpen(false);
            setIsSignUpOpen(true);
          }}
        >
          ¿No tienes cuenta? Regístrate aquí
        </button>
      </ModalWithForm>
      <ModalWithForm setIsClose={setIsSignUpOpen} isOpen={isSignUpOpen}>
        <h2 className="modal__form-title">Registrate</h2>
        <label className="modal__form-label" htmlFor="name">
          Nombre
          <input
            id="name"
            value={formData.name}
            className="modal__form-input"
            placeholder="Nombre"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <label className="modal__form-label" htmlFor="signup-email">
          Email
          <input
            id="signup-email"
            value={formData.email}
            className="modal__form-input"
            placeholder="Email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </label>
        <label className="modal__form-label" htmlFor="signup-password">
          Contraseña
          <input
            id="signup-password"
            type="password"
            value={formData.password}
            className="modal__form-input"
            placeholder="Contraseña"
            autoComplete="on"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </label>
        <button className="modal__form-submit-btn" type="submit">
          Registrate
        </button>
        <button
          type="button"
          className="modal__form-switch-btn"
          onClick={() => {
            setIsSignUpOpen(false);
            setIsLogginOpen(true);
          }}
        >
          ¿Ya tienes cuenta? Inicia sesión aquí
        </button>
      </ModalWithForm>

      <Routes>
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
        <Route path="/products" element={<ProductsPage items={products} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
