import { createContext, useContext, useState, useEffect } from "react";
import { handleAuthError, getAuthToken } from "../utils/auth";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [currentToken, setCurrentToken] = useState(
    localStorage.getItem("token")
  );

  // ✅ Cargar el carrito cuando cambie el token (login/logout)
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Si el token cambió, actualizar y recargar carrito
    if (token !== currentToken) {
      setCurrentToken(token);
      if (token) {
        fetchCart();
      } else {
        setCart([]); // Limpiar carrito si no hay token
      }
    } else if (token) {
      fetchCart(); // Cargar carrito inicial si hay token
    }
  }, [currentToken]);

  // ✅ Escuchar cambios en localStorage (login/logout desde otra pestaña o componente)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "token" || e.key === "authToken") {
        const newToken = localStorage.getItem("token");
        if (newToken !== currentToken) {
          setCurrentToken(newToken);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // También verificar cambios periódicamente (para cambios en la misma pestaña)
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (token !== currentToken) {
        setCurrentToken(token);
      }
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [currentToken]);

  const fetchCart = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        setCart([]);
        return;
      }

      const res = await fetch("http://localhost:3001/api/cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // ✅ Manejar error de autenticación
      if (handleAuthError(res)) {
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

  const addToCart = async (product) => {
    try {
      const token = getAuthToken();
      if (!token) {
        alert("Debes iniciar sesión para agregar productos al carrito");
        window.location.href = "/";
        return;
      }

      const res = await fetch("http://localhost:3001/api/cart/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });

      // ✅ Manejar error de autenticación
      if (handleAuthError(res)) {
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
      const token = getAuthToken();
      if (!token) return;

      const res = await fetch(`http://localhost:3001/api/cart/decrease/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // ✅ Manejar error de autenticación
      if (handleAuthError(res)) {
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
      const token = getAuthToken();
      if (!token) return;

      const res = await fetch("http://localhost:3001/api/cart/clear", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // ✅ Manejar error de autenticación
      if (handleAuthError(res)) {
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
      const token = getAuthToken();
      if (!token) return;

      const res = await fetch(`http://localhost:3001/api/cart/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // ✅ Manejar error de autenticación
      if (handleAuthError(res)) {
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
      const token = getAuthToken();
      if (!token) return;

      const res = await fetch(`http://localhost:3001/api/cart/increase/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // ✅ Manejar error de autenticación
      if (handleAuthError(res)) {
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
