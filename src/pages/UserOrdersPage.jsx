import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiShoppingBag,
  FiCalendar,
  FiDollarSign,
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiEye,
  FiDownload,
  FiSearch,
  FiFilter,
} from "react-icons/fi";
import { useSales } from "../hooks/useSales";
import "./UserOrdersPage.css";

const UserOrdersPage = () => {
  const navigate = useNavigate();
  const {
    sales,
    loading,
    error,
    getSalesByUser,
    getSaleById,
    exportUserSalesToCSV,
  } = useSales();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Cargar usuario y pedidos
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        const userInfo = JSON.parse(savedUser);
        setUser(userInfo);
        loadUserOrders();
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  // Cargar pedidos del usuario desde la API
  const loadUserOrders = async () => {
    const result = await getSalesByUser();
    if (result.success) {
      setOrders(result.data || []);
      setFilteredOrders(result.data || []);
    } else {
      console.error("Error al cargar pedidos:", result.error);
    }
  };

  // Filtrar pedidos
  useEffect(() => {
    let filtered = orders;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.products.some((item) =>
            item.product?.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filtrar por estado
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "pending":
        return {
          icon: <FiClock />,
          text: "Pendiente",
          color: "#f59e0b",
          bgColor: "#fef3c7",
        };
      case "processing":
        return {
          icon: <FiPackage />,
          text: "Procesando",
          color: "#3b82f6",
          bgColor: "#dbeafe",
        };
      case "shipping":
        return {
          icon: <FiTruck />,
          text: "Enviado",
          color: "#8b5cf6",
          bgColor: "#e9d5ff",
        };
      case "shipped":
        return {
          icon: <FiTruck />,
          text: "Enviado",
          color: "#8b5cf6",
          bgColor: "#e9d5ff",
        };
      case "completed":
        return {
          icon: <FiCheckCircle />,
          text: "Completado",
          color: "#10b981",
          bgColor: "#d1fae5",
        };
      case "cancelled":
        return {
          icon: <FiXCircle />,
          text: "Cancelado",
          color: "#ef4444",
          bgColor: "#fee2e2",
        };
      case "paid":
        return {
          icon: <FiDollarSign />,
          text: "Pagado",
          color: "#059669",
          bgColor: "#d1fae5",
        };
      default:
        return {
          icon: <FiClock />,
          text: "Desconocido",
          color: "#6b7280",
          bgColor: "#f3f4f6",
        };
    }
  };

  const calculateOrderStats = () => {
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const deliveredOrders = orders.filter(
      (order) => order.status === "completed"
    ).length;
    const pendingOrders = orders.filter((order) =>
      ["pending", "processing", "shipped"].includes(order.status)
    ).length;

    return { totalOrders, totalSpent, deliveredOrders, pendingOrders };
  };

  const stats = calculateOrderStats();

  // Ver detalles del pedido
  const viewOrderDetails = async (order) => {
    setLoadingDetail(true);
    const result = await getSaleById(order._id);
    if (result.success) {
      setSelectedOrder(result.data);
    } else {
      setSelectedOrder(order); // Fallback a los datos que ya tenemos
    }
    setShowOrderModal(true);
    setLoadingDetail(false);
  };

  // Exportar pedidos del usuario
  const handleExportOrders = async () => {
    const result = await exportUserSalesToCSV();
    if (!result.success) {
      alert("Error al exportar: " + result.error);
    }
  };

  if (!user) {
    return (
      <div className="user-orders-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando información...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-orders-page">
      <div className="user-orders-container">
        {/* Header */}
        <div className="user-orders-header">
          <div className="user-orders-header-content">
            <h1 className="user-orders-title">
              <FiShoppingBag />
              Mis Pedidos
            </h1>
            <p className="user-orders-subtitle">
              Revisa el estado y historial de todos tus pedidos
            </p>
          </div>
          <button
            className="export-orders-btn"
            onClick={handleExportOrders}
            disabled={loading || orders.length === 0}
          >
            <FiDownload />
            Exportar Pedidos
          </button>
        </div>

        {/* Statistics */}
        <div className="orders-stats">
          <div className="stat-card">
            <FiShoppingBag className="stat-icon" />
            <div className="stat-content">
              <span className="stat-number">{stats.totalOrders}</span>
              <span className="stat-label">Total Pedidos</span>
            </div>
          </div>
          <div className="stat-card">
            <FiDollarSign className="stat-icon" />
            <div className="stat-content">
              <span className="stat-number">
                ${stats.totalSpent.toFixed(2)}
              </span>
              <span className="stat-label">Total Gastado</span>
            </div>
          </div>
          <div className="stat-card">
            <FiCheckCircle className="stat-icon delivered" />
            <div className="stat-content">
              <span className="stat-number">{stats.deliveredOrders}</span>
              <span className="stat-label">Entregados</span>
            </div>
          </div>
          <div className="stat-card">
            <FiClock className="stat-icon pending" />
            <div className="stat-content">
              <span className="stat-number">{stats.pendingOrders}</span>
              <span className="stat-label">En Proceso</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="orders-filters">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar pedidos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-box">
            <FiFilter className="filter-icon" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos los estados</option>
              <option value="pending">Pendiente</option>
              <option value="paid">Pagado</option>
              <option value="processing">Procesando</option>
              <option value="shipped">Enviado</option>
              <option value="completed">Completado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="orders-content">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Cargando pedidos...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="empty-orders">
              <FiShoppingBag className="empty-icon" />
              <h3>No se encontraron pedidos</h3>
              <p>
                {searchTerm || statusFilter !== "all"
                  ? "No hay pedidos que coincidan con los filtros seleccionados."
                  : "Aún no has realizado ningún pedido. ¡Explora nuestros productos!"}
              </p>
            </div>
          ) : (
            <div className="orders-list">
              {filteredOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                return (
                  <div key={order._id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <h3 className="order-id">
                          Pedido #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        <p className="order-date">
                          <FiCalendar />
                          {formatDate(order.saleDate)}
                        </p>
                      </div>
                      <div className="order-status">
                        <span
                          className="status-badge"
                          style={{
                            backgroundColor: statusInfo.bgColor,
                            color: statusInfo.color,
                          }}
                        >
                          {statusInfo.icon}
                          {statusInfo.text}
                        </span>
                      </div>
                    </div>

                    <div className="order-body">
                      <div className="order-items">
                        <h4>Productos ({order.products.length})</h4>
                        <div className="items-list">
                          {order.products.slice(0, 2).map((item, index) => (
                            <div key={index} className="item-summary">
                              <span className="item-name">
                                {item.product?.name || "Producto eliminado"}
                              </span>
                              <span className="item-quantity">
                                x{item.quantity}
                              </span>
                            </div>
                          ))}
                          {order.products.length > 2 && (
                            <div className="item-summary more">
                              <span>+{order.products.length - 2} más</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="order-summary">
                        <div className="order-total">
                          <FiDollarSign />
                          <span className="total-amount">
                            ${order.totalPrice.toFixed(2)}
                          </span>
                        </div>
                        <button
                          className="view-order-btn"
                          onClick={() => viewOrderDetails(order)}
                          disabled={loadingDetail}
                        >
                          <FiEye />
                          {loadingDetail ? "Cargando..." : "Ver Detalles"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Order Detail Modal */}
        {showOrderModal && selectedOrder && (
          <div
            className="modal-overlay"
            onClick={() => setShowOrderModal(false)}
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>
                  Detalles del Pedido #
                  {selectedOrder._id.slice(-8).toUpperCase()}
                </h3>
                <button
                  className="modal-close"
                  onClick={() => setShowOrderModal(false)}
                >
                  ×
                </button>
              </div>

              <div className="modal-body">
                <div className="order-detail-section">
                  <h4>Información del Pedido</h4>
                  <div className="detail-grid">
                    <div>
                      <strong>Fecha:</strong>{" "}
                      {formatDate(selectedOrder.saleDate)}
                    </div>
                    <div>
                      <strong>Estado:</strong>
                      <span
                        className="status-badge"
                        style={{
                          backgroundColor: getStatusInfo(selectedOrder.status)
                            .bgColor,
                          color: getStatusInfo(selectedOrder.status).color,
                          marginLeft: "8px",
                        }}
                      >
                        {getStatusInfo(selectedOrder.status).icon}
                        {getStatusInfo(selectedOrder.status).text}
                      </span>
                    </div>
                    <div>
                      <strong>Método de pago:</strong>{" "}
                      {selectedOrder.paymentMethod === "cash"
                        ? "💵 Efectivo"
                        : selectedOrder.paymentMethod === "card"
                        ? "💳 Tarjeta"
                        : "🏦 Transferencia"}
                    </div>
                    <div>
                      <strong>Teléfono:</strong>{" "}
                      {selectedOrder.customerPhone || "No proporcionado"}
                    </div>
                  </div>
                </div>

                <div className="order-detail-section">
                  <h4>Productos</h4>
                  <div className="detailed-items">
                    {selectedOrder.products.map((item, index) => (
                      <div key={index} className="detailed-item">
                        <span className="item-name">
                          {item.product?.name || "Producto eliminado"}
                        </span>
                        <span className="item-quantity">x{item.quantity}</span>
                        <span className="item-price">
                          ${item.priceAtSale.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="order-total-detail">
                    <strong>
                      Total: ${selectedOrder.totalPrice.toFixed(2)}
                    </strong>
                  </div>
                </div>

                <div className="order-detail-section">
                  <h4>Dirección de Envío</h4>
                  <p>{selectedOrder.shippingAddress}</p>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="btn btn--secondary"
                  onClick={() => setShowOrderModal(false)}
                >
                  Cerrar
                </button>
                <button className="btn btn--primary">
                  <FiDownload />
                  Descargar Factura
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrdersPage;
