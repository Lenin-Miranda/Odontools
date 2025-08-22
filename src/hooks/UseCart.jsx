import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
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
  };

  const removeFromCart = (id) => {
    setCart(
      (prev) =>
        prev
          .map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  subtotal: item.subtotal - item.price,
                }
              : item
          )
          .filter((item) => item.quantity > 0) // si quantity llega a 0, lo elimina
    );
  };
  const clearCart = () => setCart([]);

  const isInCart = (id) => cart.some((item) => item.id === id);

  const deleteItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.subtotal, 0);
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        deleteItem,
        totalQuantity,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
