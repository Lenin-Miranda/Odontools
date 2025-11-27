import { useState, useEffect } from "react";
import { useCart } from "../../hooks/UseCart";
import { useSales } from "../../hooks/useSales";
import { IoClose } from "react-icons/io5";
import "./CheckoutModal.css";

export default function CheckoutModal({ isOpen, onClose, userInfo }) {
  const { cart, cartTotal, clearCart } = useCart();
  const { createSale, loading } = useSales();
  console.log("User Info in CheckoutModal:", userInfo);

  const [formData, setFormData] = useState({
    paymentMethod: "cash",
    shippingAddress: "",
    bankAccountName: "",
    bankAccountNumber: "",
  });

  const [step, setStep] = useState(1); // 1: Formulario, 2: Confirmación
  const [saleData, setSaleData] = useState(null);
  const [error, setError] = useState("");

  // ✅ Actualizar la dirección cuando userInfo cambie o cuando se abra el modal
  useEffect(() => {
    if (isOpen && userInfo?.address) {
      setFormData((prev) => ({
        ...prev,
        shippingAddress: userInfo.address,
      }));
    }
  }, [isOpen, userInfo]);

  // ✅ Calcular el total correctamente según el paso
  const shippingCost = cartTotal > 100 ? 0 : 10;
  const total =
    step === 2 && saleData
      ? saleData.totalPrice // Usar el total guardado en la venta
      : cartTotal + shippingCost; // Calcular solo en el paso 1

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validaciones
    if (!formData.shippingAddress.trim()) {
      setError("Por favor ingresa tu dirección de envío");
      return;
    }

    // Validar datos bancarios si es transferencia
    if (formData.paymentMethod === "transfer") {
      if (!formData.bankAccountName.trim()) {
        setError("Por favor ingresa el nombre del titular de la cuenta");
        return;
      }
      if (!formData.bankAccountNumber.trim()) {
        setError("Por favor ingresa el número de cuenta");
        return;
      }
    }

    try {
      // Crear la venta
      const salePayload = {
        paymentMethod: formData.paymentMethod,
        shippingAddress: formData.shippingAddress,
      };

      // Agregar datos bancarios si es transferencia
      if (formData.paymentMethod === "transfer") {
        salePayload.bankAccountName = formData.bankAccountName;
        salePayload.bankAccountNumber = formData.bankAccountNumber;
      }

      const result = await createSale(salePayload);

      if (result.success) {
        setSaleData(result.data);
        setStep(2); // Ir a confirmación

        // Limpiar el carrito
        clearCart();
      } else {
        setError(result.error || "Error al procesar el pedido");
      }
    } catch (err) {
      setError("Error al procesar el pedido. Inténtalo de nuevo.");
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      paymentMethod: "cash",
      shippingAddress: "",
      bankAccountName: "",
      bankAccountNumber: "",
    });
    setStep(1);
    setSaleData(null);
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="checkout-overlay" onClick={handleClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-header">
          <h2 className="checkout-title">
            {step === 1 ? "🛒 Finalizar Compra" : "✅ Pedido Confirmado"}
          </h2>
          <button className="checkout-close-btn" onClick={handleClose}>
            <IoClose />
          </button>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="checkout-form">
            {/* Resumen del pedido */}
            <div className="checkout-section">
              <h3 className="checkout-section-title">📦 Resumen del Pedido</h3>
              <div className="checkout-summary">
                <div className="checkout-summary-row">
                  <span>Subtotal ({cart.length} productos):</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="checkout-summary-row">
                  <span>Envío:</span>
                  <span className={shippingCost === 0 ? "free-shipping" : ""}>
                    {shippingCost === 0
                      ? "GRATIS 🎉"
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="checkout-summary-row total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Método de pago */}
            <div className="checkout-section">
              <h3 className="checkout-section-title">💳 Método de Pago</h3>
              <div className="checkout-payment-methods">
                <label className="payment-method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === "cash"}
                    onChange={handleChange}
                  />
                  <span>💵 Efectivo</span>
                </label>
                <label className="payment-method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transfer"
                    checked={formData.paymentMethod === "transfer"}
                    onChange={handleChange}
                  />
                  <span>🏦 Transferencia Bancaria</span>
                </label>
              </div>

              {/* Formulario de datos bancarios para transferencia */}
              {formData.paymentMethod === "transfer" && (
                <div className="bank-info-form">
                  <p className="bank-info-title">
                    📋 Datos de la cuenta desde donde realizarás la
                    transferencia:
                  </p>
                  <div className="bank-input-group">
                    <label htmlFor="bankAccountName">
                      Nombre del Titular *
                    </label>
                    <input
                      type="text"
                      id="bankAccountName"
                      name="bankAccountName"
                      value={formData.bankAccountName}
                      onChange={handleChange}
                      placeholder="Ej: Juan Pérez García"
                      className="checkout-input"
                      required
                    />
                  </div>
                  <div className="bank-input-group">
                    <label htmlFor="bankAccountNumber">
                      Número de Cuenta *
                    </label>
                    <input
                      type="text"
                      id="bankAccountNumber"
                      name="bankAccountNumber"
                      value={formData.bankAccountNumber}
                      onChange={handleChange}
                      placeholder="Ej: 1234567890123456"
                      className="checkout-input"
                      required
                    />
                  </div>
                  <p className="checkout-hint">
                    ⚠️ Tu pedido quedará en estado <strong>PENDIENTE</strong>{" "}
                    hasta que el administrador confirme el pago
                  </p>
                </div>
              )}
            </div>

            {/* Dirección de envío */}
            <div className="checkout-section">
              <h3 className="checkout-section-title">📍 Dirección de Envío</h3>
              <textarea
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                placeholder="Ingresa tu dirección completa (calle, número, colonia, ciudad, código postal)"
                className="checkout-textarea"
                rows="4"
                required
              />
              <p className="checkout-hint">
                📧 Recibirás la confirmación de tu pedido por correo electrónico
              </p>
            </div>

            {error && <div className="checkout-error">{error}</div>}

            <button
              type="submit"
              className="checkout-submit-btn"
              disabled={loading}
            >
              {loading ? "Procesando..." : "Confirmar Pedido"}
            </button>
          </form>
        ) : (
          <div className="checkout-success">
            <div className="success-icon">✅</div>
            <h3 className="success-title">¡Pedido Realizado Exitosamente!</h3>
            <p className="success-message">
              Tu pedido #{saleData?._id.slice(-8).toUpperCase()} ha sido
              recibido
            </p>

            <div className="success-details">
              <div className="success-row">
                <span>Total:</span>
                <span className="success-total">${total.toFixed(2)}</span>
              </div>
              <div className="success-row">
                <span>Método de pago:</span>
                <span>
                  {formData.paymentMethod === "cash"
                    ? "💵 Efectivo"
                    : "🏦 Transferencia Bancaria"}
                </span>
              </div>
              {formData.paymentMethod === "transfer" && (
                <>
                  <div className="success-row">
                    <span>Estado del pago:</span>
                    <span style={{ color: "#f59e0b", fontWeight: "600" }}>
                      ⏳ Pendiente de confirmación
                    </span>
                  </div>
                  <div className="success-note transfer-note">
                    <p>
                      � Tu pedido ha sido registrado con los siguientes datos
                      bancarios:
                    </p>
                    <p>
                      <strong>Titular:</strong> {formData.bankAccountName}
                    </p>
                    <p>
                      <strong>Cuenta:</strong> {formData.bankAccountNumber}
                    </p>
                    <p style={{ marginTop: "10px", fontSize: "0.9em" }}>
                      El administrador verificará tu transferencia y confirmará
                      tu pedido.
                    </p>
                  </div>
                </>
              )}
              <div className="success-row">
                <span>Tiempo de entrega:</span>
                <span>2-3 días hábiles</span>
              </div>
            </div>

            <div className="email-confirmation-note">
              <p className="success-note">
                📧 Se ha enviado un correo de confirmación a tu email con todos
                los detalles de tu pedido.
              </p>
              <p className="success-note">
                📬 También hemos notificado al administrador sobre tu orden.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="checkout-close-success-btn"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
