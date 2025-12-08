import { createContext, useContext, useState, useEffect } from "react";
import { handleAuthError } from "../utils/auth";
import { getApiUrl } from "../config/api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // ✅ Cargar el carrito cuando el usuario esté logueado
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";

    // Si el estado de login cambió
    if (loggedIn !== isLoggedIn) {
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        fetchCart();
      } else {
        setCart([]); // Limpiar carrito si no hay sesión
      }
    } else if (loggedIn) {
      fetchCart(); // Cargar carrito inicial si hay sesión
    }
  }, [isLoggedIn]);

  // ✅ Escuchar cambios en localStorage (login/logout desde otra pestaña o componente)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "isLoggedIn") {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (loggedIn !== isLoggedIn) {
          setIsLoggedIn(loggedIn);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // También verificar cambios periódicamente (para cambios en la misma pestaña)
    const interval = setInterval(() => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (loggedIn !== isLoggedIn) {
        setIsLoggedIn(loggedIn);
      }
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [isLoggedIn]);

  const fetchCart = async () => {
    try {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!loggedIn) {
        setCart([]);
        return;
      }

      const res = await fetch(getApiUrl("/api/cart"), {
        method: "GET",
        credentials: "include", // Envía cookies automáticamente
        headers: {
          "Content-Type": "application/json",
        },
      });

      // ✅ Manejar error de autenticación
      if (await handleAuthError(res)) {
        setCart([]);
        return;
      }

      const data = await res.json();
      // ✅ El backend devuelve { success: true, cart: { items: [...] } }
      setCart(data.cart?.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart([]);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!loggedIn) {
        alert("Debes iniciar sesión para agregar productos al carrito");
        window.location.href = "/";
        return;
      }

      const res = await fetch(getApiUrl("/api/cart/add"), {
        method: "POST",
        credentials: "include", // Envía cookies automáticamente
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id, quantity }),
      });

      // ✅ Manejar error de autenticación
      if (await handleAuthError(res)) {
        return;
      }

      if (!res.ok) {
        throw new Error("Error adding to cart");
      }
      await fetchCart(); // Refrescar el carrito después de agregar
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  /*const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.subtotal + item.price,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          subtotal: product.price,
        },
      ];
    });
  }; */

  const removeFromCart = async (id) => {
    try {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!loggedIn) return;

      const res = await fetch(getApiUrl(`/api/cart/decrease/${id}`), {
        method: "POST",
        credentials: "include", // Envía cookies automáticamente
        headers: {
          "Content-Type": "application/json",
        },
      });

      // ✅ Manejar error de autenticación
      if (await handleAuthError(res)) {
        return;
      }

      if (!res.ok) {
        throw new Error("Error removing from cart");
      }
      await fetchCart();
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const clearCart = async () => {
    try {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!loggedIn) return;

      const res = await fetch(getApiUrl("/api/cart/clear"), {
        method: "DELETE",
        credentials: "include", // Envía cookies automáticamente
        headers: {
          "Content-Type": "application/json",
        },
      });

      // ✅ Manejar error de autenticación
      if (await handleAuthError(res)) {
        return;
      }

      if (!res.ok) {
        throw new Error("Error clearing cart");
      }
      await fetchCart();
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  const isInCart = (id) => cart.some((item) => item.product?._id === id);

  const deleteItem = async (id) => {
    try {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!loggedIn) return;

      const res = await fetch(getApiUrl(`/api/cart/${id}`), {
        method: "DELETE",
        credentials: "include", // Envía cookies automáticamente
        headers: {
          "Content-Type": "application/json",
        },
      });

      // ✅ Manejar error de autenticación
      if (await handleAuthError(res)) {
        return;
      }

      if (!res.ok) {
        throw new Error("Error deleting item");
      }
      await fetchCart();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const increaseQuantity = async (id) => {
    try {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!loggedIn) return;

      const res = await fetch(getApiUrl(`/api/cart/increase/${id}`), {
        method: "POST",
        credentials: "include", // Envía cookies automáticamente
        headers: {
          "Content-Type": "application/json",
        },
      });

      // ✅ Manejar error de autenticación
      if (await handleAuthError(res)) {
        return;
      }

      if (!res.ok) {
        throw new Error("Error increasing quantity");
      }
      await fetchCart();
    } catch (err) {
      console.error("Error increasing quantity:", err);
    }
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  );
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        clearCart,
        isInCart,
        deleteItem,
        fetchCart,
        totalQuantity,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
