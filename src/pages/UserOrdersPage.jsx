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
import "./UserOrdersPage.css";

const UserOrdersPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Cargar usuario y pedidos
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        const userInfo = JSON.parse(savedUser);
        setUser(userInfo);
        loadUserOrders(userInfo.id || userInfo._id);
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  // Simular carga de pedidos
  const loadUserOrders = async (userId) => {
    setLoading(true);
    try {
      // Simular datos de pedidos - en producción esto vendría de una API
      const mockOrders = [
        {
          id: "ORD-001",
          date: "2024-10-15T10:30:00Z",
          status: "delivered",
          total: 89.99,
          items: [
            { name: "Espejo Dental Premium", quantity: 2, price: 34.99 },
            { name: "Pinzas Quirúrgicas", quantity: 1, price: 20.01 },
          ],
          shipping: {
            address: "Calle Principal 123, Ciudad",
            method: "Express",
            trackingNumber: "TRK123456789",
          },
        },
        {
          id: "ORD-002",
          date: "2024-10-20T14:15:00Z",
          status: "pending",
          total: 156.5,
          items: [
            { name: "Kit Exploración Dental", quantity: 1, price: 125.0 },
            { name: "Guantes Látex (100 unidades)", quantity: 1, price: 31.5 },
          ],
          shipping: {
            address: "Calle Principal 123, Ciudad",
            method: "Standard",
            trackingNumber: "TRK987654321",
          },
        },
        {
          id: "ORD-003",
          date: "2024-10-25T09:45:00Z",
          status: "shipping",
          total: 245.75,
          items: [
            { name: "Lámpara LED Dental", quantity: 1, price: 199.99 },
            { name: "Desinfectante Profesional", quantity: 2, price: 22.88 },
          ],
          shipping: {
            address: "Calle Principal 123, Ciudad",
            method: "Express",
            trackingNumber: "TRK456789123",
          },
        },
      ];

      // Simular delay de API
      setTimeout(() => {
        setOrders(mockOrders);
        setFilteredOrders(mockOrders);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
      setLoading(false);
    }
  };

  // Filtrar pedidos
  useEffect(() => {
    let filtered = orders;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.items.some((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      case "delivered":
        return {
          icon: <FiCheckCircle />,
          text: "Entregado",
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
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    const deliveredOrders = orders.filter(
      (order) => order.status === "delivered"
    ).length;
    const pendingOrders = orders.filter((order) =>
      ["pending", "processing", "shipping"].includes(order.status)
    ).length;

    return { totalOrders, totalSpent, deliveredOrders, pendingOrders };
  };

  const stats = calculateOrderStats();

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
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
              <option value="processing">Procesando</option>
              <option value="shipping">Enviado</option>
              <option value="delivered">Entregado</option>
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
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <h3 className="order-id">Pedido {order.id}</h3>
                        <p className="order-date">
                          <FiCalendar />
                          {formatDate(order.date)}
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
                        <h4>Productos ({order.items.length})</h4>
                        <div className="items-list">
                          {order.items.slice(0, 2).map((item, index) => (
                            <div key={index} className="item-summary">
                              <span className="item-name">{item.name}</span>
                              <span className="item-quantity">
                                x{item.quantity}
                              </span>
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <div className="item-summary more">
                              <span>+{order.items.length - 2} más</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="order-summary">
                        <div className="order-total">
                          <FiDollarSign />
                          <span className="total-amount">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                        <button
                          className="view-order-btn"
                          onClick={() => viewOrderDetails(order)}
                        >
                          <FiEye />
                          Ver Detalles
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
                <h3>Detalles del Pedido {selectedOrder.id}</h3>
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
                      <strong>Fecha:</strong> {formatDate(selectedOrder.date)}
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
                      <strong>Número de seguimiento:</strong>{" "}
                      {selectedOrder.shipping.trackingNumber}
                    </div>
                    <div>
                      <strong>Método de envío:</strong>{" "}
                      {selectedOrder.shipping.method}
                    </div>
                  </div>
                </div>

                <div className="order-detail-section">
                  <h4>Productos</h4>
                  <div className="detailed-items">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="detailed-item">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">x{item.quantity}</span>
                        <span className="item-price">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="order-total-detail">
                    <strong>Total: ${selectedOrder.total.toFixed(2)}</strong>
                  </div>
                </div>

                <div className="order-detail-section">
                  <h4>Dirección de Envío</h4>
                  <p>{selectedOrder.shipping.address}</p>
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
