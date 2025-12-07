import "./AdminDashboard.css";
import {
  FiBox,
  FiUsers,
  FiShoppingCart,
  FiDollarSign,
  FiPlus,
} from "react-icons/fi";
import { RiErrorWarningLine } from "react-icons/ri";
import ProductModal from "../ProductModal/ProductModal";
import { useProducts } from "../../hooks/useProducts";
import { useSales } from "../../hooks/useSales";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [modalMode, setModalMode] = useState("create"); // "create", "edit", "view"
  const navigate = useNavigate();

  // Hook personalizado para manejar productos (igual que DashboardProducts)
  const {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
  } = useProducts();

  // Hook para obtener pedidos
  const { sales, loading: salesLoading, fetchSales } = useSales();

  // useEffect para cargar productos y pedidos al montar el componente
  useEffect(() => {
    const loadData = async () => {
      await fetchProducts();
      await fetchSales();
    };

    loadData();
  }, []);

  // useEffect para actualizar productos de poco stock cuando cambie la lista de productos
  useEffect(() => {
    if (products.length > 0) {
      const lowStock = products.filter((product) => product.stock < 10);
      setLowStockProducts(lowStock);
    } else {
      setLowStockProducts([]);
    }
  }, [products]);

  const handleCreateProduct = async (formData) => {
    const result = await createProduct(formData);

    if (result.success) {
      setMessage("Producto creado exitosamente");
      setMessageType("success");
      setIsModalOpen(false);

      // Actualizar la lista de productos para refrescar estadísticas
      await fetchProducts();

      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage(result.error || "Error al crear el producto");
      setMessageType("error");

      setTimeout(() => setMessage(""), 5000);
    }
  };

  const handleCreateNewProduct = () => {
    setEditingProduct(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setModalMode("create");
  };

  // Función para traducir estados
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

  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    switch (status) {
      case "entregado":
        return "#10b981"; // Verde
      case "pendiente":
        return "#f59e0b"; // Naranja
      case "enviado":
        return "#3b82f6"; // Azul
      case "confirmado":
        return "#8b5cf6"; // Morado
      case "cancelado":
        return "#ef4444"; // Rojo
      default:
        return "#6b7280"; // Gris
    }
  };

  // Calcular ventas totales
  const totalSales = sales.reduce(
    (sum, sale) => sum + (sale.totalPrice || 0),
    0
  );

  // Contar pedidos totales
  const totalOrders = sales.length;

  // Obtener los últimos 5 pedidos
  const recentOrders = sales
    .sort((a, b) => new Date(b.saleDate) - new Date(a.saleDate))
    .slice(0, 5);

  return (
    <div className="admin__dashboard">
      <h1 className="admin__dashboard-title">Acciones Rapidas</h1>
      <p className="admin__dashboard-subtitle">
        Bienvenido al panel de administracion
      </p>
      <div className="admin__dashboard-buttons">
        <button
          className="admin__dashboard-button"
          onClick={handleCreateNewProduct}
        >
          <FiPlus style={{ marginRight: "8px" }} />
          Agregar Producto
        </button>
        <button
          className="admin__dashboard-button"
          onClick={() => navigate("/admin/products")}
        >
          Ver Productos
        </button>
      </div>

      {message && (
        <div
          className={`admin__dashboard-message admin__dashboard-message--${messageType}`}
        >
          {message}
        </div>
      )}

      <div className="admin__dashboard-stats">
        <div className="admin__dashboard-stat">
          <h2 className="admin__dashboard-stat-title">
            Ventas totales{" "}
            <span style={{ color: "#8d8d8dff" }}>
              <FiDollarSign />
            </span>
          </h2>
          <h3 className="admin__dashboard-stat-subtitle">
            ${salesLoading ? "..." : totalSales.toFixed(2)}
          </h3>
          <h3 className="admin__dashboard-stat-info">
            Numero total de ventas realizadas
          </h3>
        </div>
        <div className="admin__dashboard-stat">
          <h2 className="admin__dashboard-stat-title">
            Pedidos{" "}
            <span>
              <FiShoppingCart
                style={{ fontSize: "18px", color: "#8d8d8dff" }}
              />
            </span>
          </h2>
          <h3 className="admin__dashboard-stat-subtitle">
            {salesLoading ? "..." : totalOrders}
          </h3>
          <h3 className="admin__dashboard-stat-info">
            Numero total de pedidos realizados
          </h3>
        </div>
        <div className="admin__dashboard-stat">
          <h2 className="admin__dashboard-stat-title">
            Productos{" "}
            <span>
              <FiBox style={{ fontSize: "18px", color: "#8d8d8dff" }} />
            </span>
          </h2>
          <h3 className="admin__dashboard-stat-subtitle">
            {loading ? "..." : products.length}
          </h3>
          <h3 className="admin__dashboard-stat-info">
            Numero total de productos en el inventario
          </h3>
        </div>
        <div className="admin__dashboard-stat">
          <h2 className="admin__dashboard-stat-title">
            Stock Bajo{" "}
            <span>
              <RiErrorWarningLine
                style={{ fontSize: "18px", color: "#ff7b00ff" }}
              />
            </span>
          </h2>
          <h3
            className="admin__dashboard-stat-subtitle"
            style={{
              color: lowStockProducts.length > 0 ? "#ff7b00ff" : "#28a745",
            }}
          >
            {loading ? "..." : lowStockProducts.length}
          </h3>
          <h3 className="admin__dashboard-stat-info">
            Productos con stock menor a 10 unidades
          </h3>
        </div>
      </div>
      <div className="admin__dashboard-boards">
        <div className="admin__dashboard-board">
          <h2 className="admin__dashboard-board-title">Pedidos Recientes</h2>
          <p className="admin__dashboard-board-subtitle">
            Los últimos pedidos realizados
          </p>
          {salesLoading ? (
            <div className="admin__dashboard-loading">
              <p>Cargando pedidos...</p>
            </div>
          ) : recentOrders.length === 0 ? (
            <p className="admin__dashboard-empty">No hay pedidos recientes</p>
          ) : (
            <ul className="admin__dashboard-board-orders">
              {recentOrders.map((order) => {
                return (
                  <li key={order._id} className="admin__dashboard-board-order">
                    <div className="admin__dashboard-board-order-container">
                      <span className="admin__dashboard-board-order-text">
                        {order.user?.name || "Cliente desconocido"}
                      </span>
                      <span className="admin__dashboard-board-order-text">
                        {new Date(order.saleDate).toLocaleDateString("es-ES")}
                      </span>
                    </div>
                    <div className="admin__dashboard-board-order-container">
                      <span
                        className="admin__dashboard-board-order-text"
                        style={{ textAlign: "right" }}
                      >
                        ${order.totalPrice.toFixed(2)}
                      </span>
                      <span
                        className={`admin__dashboard-board-order-status admin__dashboard-board-order-status-${order.status}`}
                        style={{
                          width: "90px",
                          padding: "5px",
                          height: "28px",
                          backgroundColor: getStatusColor(order.status),
                          color: "#fff",
                          borderRadius: "50px",
                          fontSize: "12px",
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        {translateStatus(order.status)}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <button
            className="admin__dashboard-button"
            onClick={() => navigate("/admin/orders")}
          >
            Ver todos los pedidos
          </button>
        </div>
        <div className="admin__dashboard-board">
          <div className="admin__dashboard-board-header">
            <h2 className="admin__dashboard-board-title">
              <span>
                <RiErrorWarningLine style={{ color: "#ff7b00ff" }} />
              </span>{" "}
              Productos Con Poco Stock
            </h2>
          </div>
          <p className="admin__dashboard-board-subtitle">
            Productos que necesitan ser reabastecidos (Stock menor a 10)
          </p>

          {loading ? (
            <div className="admin__dashboard-loading">
              <p>Cargando productos...</p>
            </div>
          ) : error ? (
            <div className="admin__dashboard-error">
              <p>Error al cargar productos: {error}</p>
            </div>
          ) : lowStockProducts.length === 0 ? (
            <div className="admin__dashboard-no-low-stock">
              <p>✅ ¡Excelente! Todos los productos tienen stock suficiente</p>
            </div>
          ) : (
            <ul className="admin__dashboard-board-list">
              {lowStockProducts.map((product) => {
                return (
                  <li
                    key={product._id || product.id}
                    className="admin__dashboard-board-list-item"
                  >
                    <div className="admin__dashboard-board-list-item-header-container">
                      <h3 className="admin__dashboard-board-list-item-header">
                        {product.name}
                      </h3>
                      <span className="admin__dashboard-stock-warning">
                        <RiErrorWarningLine style={{ color: "#ff7b00ff" }} />{" "}
                        Stock crítico
                      </span>
                    </div>
                    <div className="admin__dashboard-board-list-item-text-container">
                      <p
                        className={`admin__dashboard-board-list-item-text ${
                          product.stock === 0
                            ? "out-of-stock"
                            : product.stock < 5
                            ? "very-low-stock"
                            : "low-stock"
                        }`}
                      >
                        Restantes: {product.stock}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <button
            className="admin__dashboard-button"
            onClick={() => navigate("/admin/products")}
          >
            Ver todos los productos ({lowStockProducts.length} con poco stock)
          </button>
        </div>
      </div>
      {/* Modal para crear productos - Mismo que DashboardProducts */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateProduct}
        product={editingProduct}
        isLoading={loading}
        mode={modalMode}
      />
    </div>
  );
}
