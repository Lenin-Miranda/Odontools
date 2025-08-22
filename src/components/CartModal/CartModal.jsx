import "./CartModal.css";
import { FaTrash } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { useCart } from "../../hooks/UseCart";
import { IoClose } from "react-icons/io5";

export default function CartModal({ isCartOpen, cartItems, closeCart }) {
  const { addToCart, removeFromCart, deleteItem, cartTotal, totalQuantity } =
    useCart();

  return (
    // 🔹 overlay
    <div
      className={`cart__overlay ${isCartOpen ? "cart__overlay-open" : ""}`}
      onClick={closeCart} // si hago click en el fondo => cerrar
    >
      {/* 🔹 modal */}
      <div
        className={`cart__modal ${isCartOpen ? "cart__modal-open" : ""}`}
        onClick={(e) => e.stopPropagation()} // evita que cierre si hago click dentro
        style={{
          backgroundColor: "white",
          width: "400px",
          height: "100vh",
          overflowY: "auto",
          boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
        }}
      >
        <div className="cart__modal-container">
          <h1 className="cart__modal-container-title">Carrito de compras</h1>
          <p
            className="cart__modal-container-subtitle"
            style={{ fontWeight: "600", opacity: ".5" }}
          >
            {totalQuantity} Productos
          </p>
          <button className="cart___modal-container-btn" onClick={closeCart}>
            <IoClose style={{ fontWeight: "600", fontSize: "24px" }} />
          </button>
        </div>

        {/* tu lógica de cartItems aquí */}
        <div
          className="cart__modal-container-cards"
          style={cartItems.length === 0 ? {} : {}}
        >
          {cartItems.length === 0 ? (
            <div className="cart__modal-container-empty-card">
              <i className="cart__modal-container-cards-icon">
                {<FaShoppingCart />}
              </i>
              <h1 className="cart__modal-container-cards-title">
                Tu carrito esta vacio
              </h1>
              <button
                className="cart__modal-container-cards-button"
                onClick={closeCart}
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <ul className="cart__modal-container-list">
              {cartItems.map((item) => {
                return (
                  <li
                    className="cart__modal-container-list-item"
                    key={`${item.id}-${item.quantity}`}
                  >
                    {/* Imagen */}
                    <div className="cart__modal-container-list-item-l">
                      <img
                        className="cart__modal-container-list-item-l-image"
                        src={item.image}
                        alt={item.description}
                      />
                    </div>

                    {/* Info derecha */}
                    <div className="cart__modal-container-list-item-r">
                      <h3 className="cart__modal-container-list-item-r-title">
                        {item.description}
                      </h3>

                      <span className="cart__modal-container-list-item-r-categorie">
                        {item.categorie}
                      </span>

                      {/* Precio y eliminar */}
                      <div className="cart__modal-container-list-item-r-container">
                        <p className="cart__modal-container-list-item-r-container-price">
                          ${item.price.toFixed(2)}
                        </p>

                        <button
                          className="cart__modal-container-list-item-r-container-delete"
                          onClick={() => deleteItem(item.id)}
                        >
                          <FontAwesomeIcon
                            style={{ fontSize: "20px", color: "red" }}
                            icon={faTrashCan}
                          />
                        </button>
                      </div>

                      {/* Controles cantidad + subtotal */}
                      <div className="cart__modal-container-list-item-r-container">
                        <div className="cart__modal-container-list-item-r-container-increment">
                          <button
                            className="cart__modal-container-list-item-r-container-increment-button"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <FiMinus style={{ fontSize: "25px" }} />
                          </button>

                          <span className="cart__modal-container-list-item-r-container-increment-count">
                            {item.quantity}
                          </span>

                          <button
                            className="cart__modal-container-list-item-r-container-increment-button"
                            onClick={() => addToCart(item)}
                          >
                            <FiPlus style={{ fontSize: "25px" }} />
                          </button>
                        </div>

                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: "500",
                              textAlign: "right",
                              padding: "0 0 0 10px",
                              opacity: "0.5",
                            }}
                          >
                            Subtotal
                          </span>

                          <span style={{ fontSize: "16px", fontWeight: "600" }}>
                            ${item.subtotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart__modal-container-total">
            <div className="cart__modal-container-total-products">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="cart__modal-container-total-products-total">
                  Subtotal{" "}
                  <span style={{ fontWeight: "700", marginLeft: "2px" }}>
                    ({totalQuantity} Productos)
                  </span>
                </p>
                <p style={{ fontWeight: "600" }}>{cartTotal.toFixed(2)}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="cart__modal-container-total-products-total">
                  Envio
                </p>
                <p
                  style={
                    cartTotal > 100
                      ? { color: "#00c100", fontWeight: "700" }
                      : { color: "red", fontWeight: "700" }
                  }
                >
                  {cartTotal > 100 ? "Gratis" : "$10"}
                </p>
              </div>
            </div>
            <div className="cart__modal-container-payment">
              <div className="cart__modal-container-payment-total">
                {" "}
                <span style={{ fontWeight: "700", fontSize: "16" }}>Total</span>
                <span
                  style={{
                    fontWeight: "600",
                    color: "#0049f3",
                    fontSize: "24px",
                    letterSpacing: "0",
                  }}
                >
                  $
                  {cartTotal > 100
                    ? cartTotal.toFixed(2)
                    : cartTotal.toFixed(2) + 10}
                </span>
              </div>
              <div className="cart__modal-container-payment-buttons">
                <button className="cart__modal-container-payment-button">
                  Proceder al pago
                </button>
                <button
                  className="cart__modal-container-payment-button"
                  onClick={closeCart}
                  style={{
                    color: "#000",
                    backgroundColor: "#fff",
                    border: "1px solid ",
                  }}
                >
                  Continuar comprando
                </button>
              </div>
              <div className="cart__modal-container-payment-text">
                <div className="cart__modal-container-payment-dot"></div>
                <span style={{ opacity: "0.5", fontWeight: "600" }}>
                  Compra 100% segura y protegida
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
