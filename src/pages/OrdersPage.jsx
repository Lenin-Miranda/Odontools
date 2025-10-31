import { useState } from "react";
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
} from "react-icons/fi";
import { ordersData } from "../data/ordersData";
import "./OrdersPage.css";

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtrar pedidos
  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Funciones para manejar acciones
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleEditOrder = (orderId) => {
    console.log("Edit order:", orderId);
    // Aquí irá la lógica de edición
  };

  const handleDeleteOrder = (orderId) => {
    console.log("Delete order:", orderId);
    // Aquí irá la lógica de eliminación
  };

  const handleExportOrders = () => {
    console.log("Export orders");
    // Aquí irá la lógica de exportación
  };

  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "status-completed";
      case "pending":
        return "status-pending";
      case "shipped":
        return "status-shipped";
      case "processing":
        return "status-processing";
      case "cancelled":
        return "status-cancelled";
      default:
        return "status-pending";
    }
  };

  // Función para traducir el estado
  const translateStatus = (status) => {
    switch (status) {
      case "completed":
        return "Completado";
      case "pending":
        return "Pendiente";
      case "shipped":
        return "Enviado";
      case "processing":
        return "Procesando";
      case "cancelled":
        return "Cancelado";
      default:
        return status;
    }
  };

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
            <h3>{ordersData.length}</h3>
            <p>Total Pedidos</p>
          </div>
        </div>

        <div className="orders-page__stat">
          <div className="orders-page__stat-icon orders-page__stat-icon--completed">
            <FiDollarSign />
          </div>
          <div className="orders-page__stat-info">
            <h3>{ordersData.filter((o) => o.status === "completed").length}</h3>
            <p>Completados</p>
          </div>
        </div>

        <div className="orders-page__stat">
          <div className="orders-page__stat-icon orders-page__stat-icon--pending">
            <FiCalendar />
          </div>
          <div className="orders-page__stat-info">
            <h3>{ordersData.filter((o) => o.status === "pending").length}</h3>
            <p>Pendientes</p>
          </div>
        </div>

        <div className="orders-page__stat">
          <div className="orders-page__stat-icon orders-page__stat-icon--revenue">
            <FiDollarSign />
          </div>
          <div className="orders-page__stat-info">
            <h3>
              $
              {ordersData
                .reduce((sum, order) => sum + order.total, 0)
                .toFixed(2)}
            </h3>
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
            <option value="pending">Pendientes</option>
            <option value="processing">Procesando</option>
            <option value="shipped">Enviados</option>
            <option value="completed">Completados</option>
            <option value="cancelled">Cancelados</option>
          </select>
        </div>
      </div>

      {/* Tabla de pedidos */}
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
                <tr key={order.id} className="orders-page__table-row">
                  <td className="orders-page__table-cell">
                    <span className="orders-page__order-number">
                      {order.orderNumber}
                    </span>
                  </td>
                  <td className="orders-page__table-cell">
                    <div className="orders-page__customer-info">
                      <span className="orders-page__customer-name">
                        {order.customerName}
                      </span>
                      <span className="orders-page__customer-email">
                        {order.customerEmail}
                      </span>
                    </div>
                  </td>
                  <td className="orders-page__table-cell">
                    <span className="orders-page__date">
                      {new Date(order.date).toLocaleDateString("es-ES")}
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
                      ${order.total.toFixed(2)}
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
                        onClick={() => handleEditOrder(order.id)}
                        title="Editar pedido"
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="orders-page__action-btn orders-page__action-btn--delete"
                        onClick={() => handleDeleteOrder(order.id)}
                        title="Eliminar pedido"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
              <h2>Detalles del Pedido {selectedOrder.orderNumber}</h2>
              <button
                className="orders-page__modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="orders-page__modal-body">
              <div className="orders-page__modal-section">
                <h3>Información del Cliente</h3>
                <p>
                  <strong>Nombre:</strong> {selectedOrder.customerName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedOrder.customerEmail}
                </p>
                <p>
                  <strong>Dirección:</strong>{" "}
                  {selectedOrder.shippingAddress.street},{" "}
                  {selectedOrder.shippingAddress.city},{" "}
                  {selectedOrder.shippingAddress.country}
                </p>
              </div>

              <div className="orders-page__modal-section">
                <h3>Productos</h3>
                <div className="orders-page__modal-items">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="orders-page__modal-item">
                      <span className="orders-page__modal-item-name">
                        {item.name}
                      </span>
                      <span className="orders-page__modal-item-quantity">
                        Cantidad: {item.quantity}
                      </span>
                      <span className="orders-page__modal-item-price">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="orders-page__modal-section">
                <h3>Resumen</h3>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(selectedOrder.date).toLocaleDateString("es-ES")}
                </p>
                <p>
                  <strong>Estado:</strong>{" "}
                  <span
                    className={`orders-page__status ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {translateStatus(selectedOrder.status)}
                  </span>
                </p>
                <p>
                  <strong>Total:</strong> ${selectedOrder.total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
