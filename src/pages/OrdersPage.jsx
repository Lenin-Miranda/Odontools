import { useState, useEffect } from "react";
import {
  FiShoppingCart,
  FiSearch,
  FiFilter,
  FiEye,
  FiEdit,
  FiTrash2,
  FiDownload,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiPackage,
} from "react-icons/fi";
import { useSales } from "../hooks/useSales";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";
import useConfirm from "../hooks/useConfirm";
import "./OrdersPage.css";

export default function OrdersPage() {
  const {
    sales,
    loading,
    error,
    fetchSales,
    updateSaleStatus,
    confirmSale,
    exportSalesToCSV,
  } = useSales();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { confirmState, showConfirm, showAlert, closeConfirm } = useConfirm();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  // Cargar ventas al montar el componente
  useEffect(() => {
    fetchSales();
  }, []);

  // Filtrar pedidos
  const filteredOrders = sales.filter((order) => {
    const customerName = order.user?.name || "N/A";
    const customerEmail = order.user?.email || "N/A";
    const orderId = order._id?.slice(-8).toUpperCase() || "";

    const matchesSearch =
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orderId.includes(searchTerm.toUpperCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Funciones para manejar acciones
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
    setIsEditingStatus(false);
  };

  const handleEditStatus = async () => {
    if (!newStatus || !selectedOrder) return;

    const result = await updateSaleStatus(selectedOrder._id, newStatus);

    if (result.success) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
      setIsEditingStatus(false);
      fetchSales(); // Recargar ventas
    } else {
      showAlert({
        title: "Error",
        message: "Error al actualizar el estado: " + result.error,
        type: "danger",
      });
    }
  };

  const handleConfirmSale = async () => {
    if (!selectedOrder) return;

    showConfirm({
      title: "Confirmar pago",
      message: `¿Confirmar el pago del pedido #${selectedOrder._id
        .slice(-8)
        .toUpperCase()}?\n\nEsto descontará el stock de los productos.`,
      confirmText: "Confirmar pago",
      cancelText: "Cancelar",
      type: "warning",
      onConfirm: async () => {
        const result = await confirmSale(selectedOrder._id);

        if (result.success) {
          setSelectedOrder({ ...selectedOrder, status: "paid" });
          showAlert({
            title: "Éxito",
            message: "Pago confirmado y stock descontado exitosamente",
            type: "success",
          });
          fetchSales(); // Recargar ventas
        } else {
          showAlert({
            title: "Error",
            message: "Error al confirmar el pago: " + result.error,
            type: "danger",
          });
        }
      },
    });
  };

  const handleExportOrders = async () => {
    const result = await exportSalesToCSV();
    if (!result.success) {
      showAlert({
        title: "Error",
        message: "Error al exportar: " + result.error,
        type: "danger",
      });
    }
  };

  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    switch (status) {
      case "entregado":
        return "status-completed";
      case "pendiente":
        return "status-pending";
      case "enviado":
        return "status-shipped";
      case "confirmado":
        return "status-processing";
      case "cancelado":
        return "status-cancelled";
      default:
        return "status-pending";
    }
  };

  // Función para traducir el estado
  const translateStatus = (status) => {
    switch (status) {
      case "entregado":
        return "Entregado";
      case "pendiente":
        return "Pendiente";
      case "enviado":
        return "Enviado";
      case "confirmado":
        return "Confirmado";
      case "cancelado":
        return "Cancelado";
      default:
        return status;
    }
  };

  // Calcular estadísticas
  const totalRevenue = sales
    .filter((order) => order.status === "entregado") // Solo pedidos entregados
    .reduce((sum, order) => sum + (order.totalPrice || 0), 0);
  const completedOrders = sales.filter((o) => o.status === "entregado").length;
  const pendingOrders = sales.filter((o) => o.status === "pendiente").length;
  const cancelledOrders = sales.filter((o) => o.status === "cancelado").length;

  if (loading && sales.length === 0) {
    return (
      <div className="orders-page">
        <div className="orders-page__loading">
          <FiPackage className="orders-page__loading-icon" />
          <p>Cargando pedidos...</p>
        </div>
      </div>
    );
  }

  if (error && sales.length === 0) {
    return (
      <div className="orders-page">
        <div className="orders-page__error">
          <p>❌ Error al cargar pedidos: {error}</p>
          <button onClick={fetchSales} className="orders-page__retry-btn">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-page__header">
        <div className="orders-page__title-section">
          <h1 className="orders-page__title">
            <FiShoppingCart />
            Gestión de Pedidos
          </h1>
          <p className="orders-page__subtitle">
            Administra y monitorea todos los pedidos de la tienda
          </p>
        </div>

        <button
          className="orders-page__export-btn"
          onClick={handleExportOrders}
        >
          <FiDownload />
          Exportar
        </button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="orders-page__stats">
        <div className="orders-page__stat">
          <div className="orders-page__stat-icon orders-page__stat-icon--total">
            <FiShoppingCart />
          </div>
          <div className="orders-page__stat-info">
            <h3>{sales.length}</h3>
            <p>Total Pedidos</p>
          </div>
        </div>

        <div className="orders-page__stat">
          <div className="orders-page__stat-icon orders-page__stat-icon--completed">
            <FiDollarSign />
          </div>
          <div className="orders-page__stat-info">
            <h3>{completedOrders}</h3>
            <p>Completados</p>
          </div>
        </div>

        <div className="orders-page__stat">
          <div className="orders-page__stat-icon orders-page__stat-icon--pending">
            <FiCalendar />
          </div>
          <div className="orders-page__stat-info">
            <h3>{pendingOrders}</h3>
            <p>Pendientes</p>
          </div>
        </div>

        <div className="orders-page__stat">
          <div className="orders-page__stat-icon orders-page__stat-icon--revenue">
            <FiDollarSign />
          </div>
          <div className="orders-page__stat-info">
            <h3>${totalRevenue.toFixed(2)}</h3>
            <p>Ingresos Totales</p>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="orders-page__filters">
        <div className="orders-page__search">
          <FiSearch />
          <input
            type="text"
            placeholder="Buscar por cliente, número de pedido o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="orders-page__search-input"
          />
        </div>

        <div className="orders-page__status-filter">
          <FiFilter />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="orders-page__status-select"
          >
            <option value="all">Todos los estados</option>
            <option value="pendiente">Pendientes</option>
            <option value="confirmado">Confirmados</option>
            <option value="enviado">Enviados</option>
            <option value="entregado">Entregados</option>
            <option value="cancelado">Cancelados</option>
          </select>
        </div>
      </div>

      {/* Tabla de pedidos (Desktop) */}
      <div className="orders-page__table-container">
        <table className="orders-page__table">
          <thead>
            <tr>
              <th>Número de Pedido</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="orders-page__no-results">
                  No se encontraron pedidos con los filtros aplicados
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id} className="orders-page__table-row">
                  <td className="orders-page__table-cell">
                    <span className="orders-page__order-number">
                      #{order._id.slice(-8).toUpperCase()}
                    </span>
                  </td>
                  <td className="orders-page__table-cell">
                    <div className="orders-page__customer-info">
                      <span className="orders-page__customer-name">
                        {order.user?.name || "N/A"}
                      </span>
                      <span className="orders-page__customer-email">
                        {order.user?.email || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="orders-page__table-cell">
                    <span className="orders-page__date">
                      {new Date(order.saleDate).toLocaleDateString("es-ES")}
                    </span>
                  </td>
                  <td className="orders-page__table-cell">
                    <span
                      className={`orders-page__status ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {translateStatus(order.status)}
                    </span>
                  </td>
                  <td className="orders-page__table-cell">
                    <span className="orders-page__total">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </td>
                  <td className="orders-page__table-cell">
                    <div className="orders-page__actions">
                      <button
                        className="orders-page__action-btn orders-page__action-btn--view"
                        onClick={() => handleViewOrder(order)}
                        title="Ver detalles"
                      >
                        <FiEye />
                      </button>
                      <button
                        className="orders-page__action-btn orders-page__action-btn--edit"
                        onClick={() => {
                          setSelectedOrder(order);
                          setNewStatus(order.status);
                          setIsEditingStatus(true);
                          setIsModalOpen(true);
                        }}
                        title="Cambiar estado"
                      >
                        <FiEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Cards de pedidos (Mobile) */}
      <div className="orders-page__card-container">
        {filteredOrders.length === 0 ? (
          <div className="orders-page__no-results">
            No se encontraron pedidos con los filtros aplicados
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order._id} className="orders-page__card">
              <div className="orders-page__card-header">
                <div className="orders-page__card-order-info">
                  <div className="orders-page__card-order-number">
                    #{order._id.slice(-8).toUpperCase()}
                  </div>
                  <div className="orders-page__card-date">
                    <FiCalendar />
                    {new Date(order.saleDate).toLocaleDateString("es-ES")}
                  </div>
                </div>
                <div className="orders-page__card-status-wrapper">
                  <span
                    className={`orders-page__status ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {translateStatus(order.status)}
                  </span>
                </div>
              </div>

              <div className="orders-page__card-body">
                <div className="orders-page__card-customer">
                  <div className="orders-page__card-label">
                    <FiUser />
                    Cliente
                  </div>
                  <div className="orders-page__card-customer-name">
                    {order.user?.name || "N/A"}
                  </div>
                  <div className="orders-page__card-customer-email">
                    {order.user?.email || "N/A"}
                  </div>
                </div>

                <div className="orders-page__card-total">
                  <div className="orders-page__card-label">
                    <FiDollarSign />
                    Total
                  </div>
                  <div className="orders-page__card-total-amount">
                    ${order.totalPrice.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="orders-page__card-footer">
                <button
                  className="orders-page__card-action-btn orders-page__card-action-btn--view"
                  onClick={() => handleViewOrder(order)}
                >
                  <FiEye />
                  Ver Detalles
                </button>
                <button
                  className="orders-page__card-action-btn orders-page__card-action-btn--edit"
                  onClick={() => {
                    setSelectedOrder(order);
                    setNewStatus(order.status);
                    setIsEditingStatus(true);
                    setIsModalOpen(true);
                  }}
                >
                  <FiEdit />
                  Editar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de detalles del pedido */}
      {isModalOpen && selectedOrder && (
        <div
          className="orders-page__modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="orders-page__modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="orders-page__modal-header">
              <h2>Pedido #{selectedOrder._id.slice(-8).toUpperCase()}</h2>
              <button
                className="orders-page__modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="orders-page__modal-body">
              {/* Información del Cliente */}
              <div className="orders-page__modal-section">
                <h3>👤 Información del Cliente</h3>
                <p>
                  <strong>Nombre:</strong> {selectedOrder.user?.name || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {selectedOrder.user?.email || "N/A"}
                </p>
                <p>
                  <strong>Teléfono:</strong>{" "}
                  {selectedOrder.customerPhone || "No proporcionado"}
                </p>
                <p>
                  <strong>Dirección:</strong> {selectedOrder.shippingAddress}
                </p>
                {selectedOrder.bankAccountName && (
                  <>
                    <p style={{ marginTop: "10px", fontWeight: "600" }}>
                      🏦 Datos Bancarios del Cliente:
                    </p>
                    <p>
                      <strong>Titular:</strong> {selectedOrder.bankAccountName}
                    </p>
                    <p>
                      <strong>Cuenta:</strong> {selectedOrder.bankAccountNumber}
                    </p>
                  </>
                )}
              </div>

              {/* Productos */}
              <div className="orders-page__modal-section">
                <h3>🛍️ Productos</h3>
                <div className="orders-page__modal-items">
                  {selectedOrder.products.map((item, index) => (
                    <div key={index} className="orders-page__modal-item">
                      <div className="orders-page__modal-item-info">
                        <span className="orders-page__modal-item-name">
                          {item.product?.name || "Producto eliminado"}
                        </span>
                        <span className="orders-page__modal-item-quantity">
                          Cantidad: {item.quantity}
                        </span>
                      </div>
                      <div className="orders-page__modal-item-prices">
                        <span className="orders-page__modal-item-unit-price">
                          ${item.priceAtSale.toFixed(2)} c/u
                        </span>
                        <span className="orders-page__modal-item-price">
                          ${item.subtotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Estado del Pedido */}
              <div className="orders-page__modal-section">
                <h3>📦 Estado del Pedido</h3>

                {/* Botón de confirmar pago para pedidos pendientes */}
                {selectedOrder.status === "pendiente" && !isEditingStatus && (
                  <div className="orders-page__confirm-payment">
                    <button
                      onClick={handleConfirmSale}
                      className="orders-page__modal-btn orders-page__modal-btn--confirm"
                      disabled={loading}
                    >
                      ✅{" "}
                      {loading
                        ? "Confirmando..."
                        : "Confirmar Pago y Descontar Stock"}
                    </button>
                    <p className="orders-page__confirm-hint">
                      Al confirmar, el estado cambiará a "Pagado" y se
                      descontará el stock automáticamente
                    </p>
                  </div>
                )}

                {isEditingStatus ? (
                  <div className="orders-page__modal-status-edit">
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="orders-page__status-select"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="confirmado">Confirmado</option>
                      <option value="enviado">Enviado</option>
                      <option value="entregado">Entregado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                    <div className="orders-page__modal-status-buttons">
                      <button
                        onClick={handleEditStatus}
                        className="orders-page__modal-btn orders-page__modal-btn--save"
                        disabled={loading}
                      >
                        {loading ? "Guardando..." : "Guardar"}
                      </button>
                      <button
                        onClick={() => setIsEditingStatus(false)}
                        className="orders-page__modal-btn orders-page__modal-btn--cancel"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="orders-page__modal-status-display">
                    <span
                      className={`orders-page__status ${getStatusColor(
                        selectedOrder.status
                      )}`}
                    >
                      {translateStatus(selectedOrder.status)}
                    </span>
                    <button
                      onClick={() => {
                        setIsEditingStatus(true);
                        setNewStatus(selectedOrder.status);
                      }}
                      className="orders-page__modal-btn orders-page__modal-btn--edit"
                    >
                      <FiEdit /> Cambiar Estado
                    </button>
                  </div>
                )}
              </div>

              {/* Resumen */}
              <div className="orders-page__modal-section">
                <h3>💰 Resumen</h3>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(selectedOrder.saleDate).toLocaleDateString(
                    "es-ES",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
                <p>
                  <strong>Método de Pago:</strong>{" "}
                  {selectedOrder.paymentMethod === "cash"
                    ? "💵 Efectivo"
                    : selectedOrder.paymentMethod === "card"
                    ? "💳 Tarjeta"
                    : "🏦 Transferencia"}
                </p>
                <p className="orders-page__modal-total">
                  <strong>Total:</strong> ${selectedOrder.totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={confirmState.isOpen}
        onClose={closeConfirm}
        onConfirm={confirmState.onConfirm}
        title={confirmState.title}
        message={confirmState.message}
        confirmText={confirmState.confirmText}
        cancelText={confirmState.cancelText}
        type={confirmState.type}
        showCancel={confirmState.showCancel}
      />
    </div>
  );
}
