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
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import UserModal from "./components/UserModal/UserModal";
import DashboardProducts from "./pages/DashboardProducts";
import OrdersPage from "./pages/OrdersPage";
import UsersPage from "./pages/UsersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UserProfilePage from "./pages/UserProfilePage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserFavoritesPage from "./pages/UserFavoritesPage";
import UserSettingsPage from "./pages/UserSettingsPage";

function App() {
  // Estados principales
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Información del usuario logueado
  const [messageType, setMessageType] = useState(""); // "success" o "error"
  const [cartItems, setCartItems] = useState([]);
  const [isFavorite, setIsfavorite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLogginOpen, setIsLogginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const { cart, removeFromCart, clearCart } = useCart();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [isUserOpen, setIsUserOpen] = useState(false);

  // useEffect para verificar si hay un usuario logueado en localStorage al cargar la página
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    const savedLoginStatus = localStorage.getItem("isLoggedIn");
    const savedAdminStatus = localStorage.getItem("isAdmin");

    if (savedUser && savedLoginStatus === "true") {
      try {
        const userInfo = JSON.parse(savedUser); // ✅ Parsear el JSON
        setCurrentUser(userInfo); // ✅ Establecer el usuario
        setIsLoggedIn(true);
        setIsAdmin(savedAdminStatus === "true");
        console.log("Usuario restaurado desde localStorage:", userInfo);
      } catch (error) {
        console.error("Error al parsear datos del usuario:", error);
        // Limpiar localStorage si hay datos corruptos
        localStorage.removeItem("currentUser");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("isAdmin");
      }
    }
  }, []);

  useEffect(() => {
    const fetchCurrentUserData = async () => {
      const token =
        localStorage.getItem("token") || localStorage.getItem("authToken");
      const savedUser = localStorage.getItem("currentUser");

      if (!token || !savedUser) {
        console.log("No se encontró token o usuario en localStorage");
        return;
      }

      try {
        const userInfo = JSON.parse(savedUser);

        // Verificar que userInfo tenga un ID válido
        const userId = userInfo._id || userInfo.id;

        if (!userId) {
          console.error("No se encontró ID de usuario");
          return;
        }

        const res = await fetch(`http://localhost:3001/api/auth/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data.user);
          // Actualizar localStorage con los datos más recientes
          localStorage.setItem("currentUser", JSON.stringify(data.user));
        } else {
          console.error("Error al obtener datos del usuario:", res.status);
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    fetchCurrentUserData();
  }, []);

  // Función para guardar el login en localStorage
  const saveUserToStorage = (userInfo, isAdminUser = false, token = null) => {
    localStorage.setItem("currentUser", JSON.stringify(userInfo));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isAdmin", isAdminUser.toString());

    // Guardar token si existe
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("authToken", token); // Backup del token
    }
  };

  // Función para limpiar el localStorage (logout)
  const clearUserFromStorage = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsUserOpen(false);
    clearUserFromStorage();
    console.log("Sesión cerrada exitosamente");
  };

  const toggleFavorite = (productId) => {
    setIsfavorite((prev) => !prev);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Funciones auxiliares para manejar los modales y limpiar mensajes
  const openLoginModal = () => {
    setIsLogginOpen(true);
    setMessage(""); // Limpiar mensaje al abrir modal
  };

  const openSignUpModal = () => {
    setIsSignUpOpen(true);
    setMessage(""); // Limpiar mensaje al abrir modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logica para manejar el envio del formulario
    if (isSignUpOpen) {
      // REGISTRO: Enviar todos los campos (name, email, password)
      try {
        const response = await fetch(
          "http://localhost:3001/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // Envía name, email, password
          }
        );
        const data = await response.json();
        if (response.ok) {
          setIsSignUpOpen(false);
          setMessage("Registro exitoso. Por favor, inicia sesión.");
          setMessageType("success");
        } else {
          setMessage(data.message || "Error al registrar el usuario.");
          setMessageType("error");
        }
      } catch (error) {
        console.error("Error al registrar el usuario:", error);
        setMessage("Error al registrar el usuario. Inténtalo de nuevo.");
        setMessageType("error");
      }
    } else if (isLogginOpen) {
      // LOGIN: Solo enviar email y password (SIN name)
      try {
        const loginData = {
          email: formData.email,
          password: formData.password,
          // NO incluir name para login
        };

        const response = await fetch("http://localhost:3001/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData), // Solo email y password
        });
        const data = await response.json();

        if (response.ok) {
          setCurrentUser(data.user);
          setIsLoggedIn(true);
          setIsAdmin(data.user.isAdmin || false);
          setIsLogginOpen(false);
          setMessage("Inicio de sesión exitoso.");
          setMessageType("success");

          // Intentar diferentes nombres de token que el backend podría usar
          const possibleToken =
            data.token ||
            data.accessToken ||
            data.authToken ||
            data.jwt ||
            data.access_token;

          // Guardar en localStorage (incluyendo token)
          saveUserToStorage(
            data.user,
            data.user.isAdmin || false,
            possibleToken
          );
        } else {
          setMessage(data.message || "Error al iniciar sesion.");
          setMessageType("error");
        }
      } catch (error) {
        console.error("Error al iniciar sesion:", error);
        setMessage("Error al iniciar sesion. Inténtalo de nuevo.");
        setMessageType("error");
      }
    }
  };

  return (
    <div className="app">
      <NavBar
        toggleCart={toggleCart}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        setIsLogginOpen={openLoginModal}
        setIsSignUpOpen={openSignUpModal}
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
          user={currentUser}
          onLogout={handleLogout}
        />
      </NavBar>
      <ModalWithForm setIsClose={setIsLogginOpen} isOpen={isLogginOpen}>
        <h2 className="modal__form-title">Iniciar Sesion</h2>
        <label className="modal__form-label" htmlFor="login-email">
          Email
          <input
            id="login-email"
            name="email"
            value={formData.email}
            className="modal__form-input"
            placeholder="Email"
            onChange={handleChange}
          />
        </label>
        <label className="modal__form-label" htmlFor="login-password">
          Contraseña
          <input
            id="login-password"
            name="password"
            type="password"
            value={formData.password}
            className="modal__form-input"
            placeholder="Contraseña"
            autoComplete="on"
            onChange={handleChange}
          />
        </label>
        <button
          className="modal__form-submit-btn"
          type="submit"
          onClick={handleSubmit}
        >
          Iniciar Sesion
        </button>
        <button
          type="button"
          className="modal__form-switch-btn"
          onClick={() => {
            setIsLogginOpen(false);
            setIsSignUpOpen(true);
            setMessage(""); // Limpiar mensaje al cambiar de modal
          }}
        >
          ¿No tienes cuenta? Regístrate aquí
        </button>
        {message && (
          <span
            className={`modal__form-message ${
              message.includes("exitoso") ||
              message.includes("éxito") ||
              message.includes("success")
                ? "modal__form-message--success"
                : "modal__form-message--error"
            }`}
          >
            {message}
          </span>
        )}
      </ModalWithForm>
      <ModalWithForm setIsClose={setIsSignUpOpen} isOpen={isSignUpOpen}>
        <h2 className="modal__form-title">Registrate</h2>
        <label className="modal__form-label" htmlFor="name">
          Nombre
          <input
            id="name"
            name="name"
            value={formData.name}
            className="modal__form-input"
            placeholder="Nombre"
            onChange={handleChange}
          />
        </label>
        <label className="modal__form-label" htmlFor="signup-email">
          Email
          <input
            id="signup-email"
            name="email"
            value={formData.email}
            className="modal__form-input"
            placeholder="Email"
            onChange={handleChange}
          />
        </label>
        <label className="modal__form-label" htmlFor="signup-password">
          Contraseña
          <input
            id="signup-password"
            name="password"
            type="password"
            value={formData.password}
            className="modal__form-input"
            placeholder="Contraseña"
            autoComplete="on"
            onChange={handleChange}
          />
        </label>
        <button
          onClick={handleSubmit}
          className="modal__form-submit-btn"
          type="submit"
        >
          Registrate
        </button>
        <button
          type="button"
          className="modal__form-switch-btn"
          onClick={() => {
            setIsSignUpOpen(false);
            setIsLogginOpen(true);
            setMessage(""); // Limpiar mensaje al cambiar de modal
          }}
        >
          ¿Ya tienes cuenta? Inicia sesión aquí
        </button>
        {message && (
          <span
            className={`modal__form-message ${
              message.includes("exitoso") ||
              message.includes("éxito") ||
              message.includes("success")
                ? "modal__form-message--success"
                : "modal__form-message--error"
            }`}
          >
            {message}
          </span>
        )}
      </ModalWithForm>

      <Routes>
        {/* Rutas públicas con NavBar normal */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Main
                categories={categories}
                products={products}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
              />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <ProductsPage items={products} />
            </>
          }
        />

        {/* Rutas de usuario protegidas (requieren login) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              isAdmin={isAdmin}
              requireAdmin={false}
            >
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              isAdmin={isAdmin}
              requireAdmin={false}
            >
              <UserOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              isAdmin={isAdmin}
              requireAdmin={false}
            >
              <UserFavoritesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              isAdmin={isAdmin}
              requireAdmin={false}
            >
              <UserSettingsPage />
            </ProtectedRoute>
          }
        />

        {/* Rutas de admin protegidas con AdminLayout y AdminNavBar */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              isAdmin={isAdmin}
              requireAdmin={true}
            >
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<DashboardProducts />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route
            path="settings"
            element={<div>Configuración (próximamente)</div>}
          />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
