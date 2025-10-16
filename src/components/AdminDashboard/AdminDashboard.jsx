import "./AdminDashboard.css";
import ordersData from "../../data/ordersData";
import { FiBox, FiUsers, FiShoppingCart, FiDollarSign } from "react-icons/fi";
import { RiErrorWarningLine } from "react-icons/ri";

export default function AdminDashboard() {
  return (
    <div className="admin__dashboard">
      <h1 className="admin__dashboard-title">Acciones Rapidas</h1>
      <p className="admin__dashboard-subtitle">
        Bienvenido al panel de administracion
      </p>
      <div className="admin__dashboard-buttons">
        <button className="admin__dashboard-button">+ Agregar Producto</button>
        <button className="admin__dashboard-button">Ver Productos</button>
      </div>
      <div className="admin__dashboard-stats">
        <div className="admin__dashboard-stat">
          <h2 className="admin__dashboard-stat-title">
            Ventas totales{" "}
            <span style={{ color: "#8d8d8dff" }}>
              <FiDollarSign />
            </span>
          </h2>
          <h3 className="admin__dashboard-stat-subtitle">$40,000</h3>
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
          <h3 className="admin__dashboard-stat-subtitle">200</h3>
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
          <h3 className="admin__dashboard-stat-subtitle">200</h3>
          <h3 className="admin__dashboard-stat-info">
            Numero total de productos en el inventario
          </h3>
        </div>
        <div className="admin__dashboard-stat">
          <h2 className="admin__dashboard-stat-title">
            Usuarios{" "}
            <span>
              <FiUsers style={{ fontSize: "18px", color: "#8d8d8dff" }} />
            </span>
          </h2>
          <h3 className="admin__dashboard-stat-subtitle">150</h3>
          <h3 className="admin__dashboard-stat-info">
            Numero total de usuarios registrados
          </h3>
        </div>
      </div>
      <div className="admin__dashboard-boards">
        <div className="admin__dashboard-board">
          <h2 className="admin__dashboard-board-title">Pedidos Recientes</h2>
          <p className="admin__dashboard-board-subtitle">
            Los ultimos pedidos realizados
          </p>
          <ul className="admin__dashboard-board-orders">
            {ordersData.map((order) => {
              return (
                <li key={order.id} className="admin__dashboard-board-order">
                  <div className="admin__dashboard-board-order-container">
                    <span className="admin__dashboard-board-order-text">
                      {order.customer}
                    </span>
                    <span className="admin__dashboard-board-order-text">
                      {order.date}
                    </span>
                  </div>
                  <div className="admin__dashboard-board-order-container">
                    <span
                      className="admin__dashboard-board-order-text"
                      style={{ textAlign: "right" }}
                    >
                      ${order.total}
                    </span>
                    <span
                      className={`admin__dashboard-board-order-status admin__dashboard-board-order-status-${order.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      style={{
                        width: "90px",
                        padding: "5px",
                        height: "28px",
                        backgroundColor: "#000",
                        color: "#fff",
                        borderRadius: "50px",
                        fontSize: "12px",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
          <button className="admin__dashboard-button">
            Ver todos los pedidos
          </button>
        </div>
        <div className="admin__dashboard-board">
          <h2 className="admin__dashboard-board-title">
            <span>
              <RiErrorWarningLine style={{ color: "#ff7b00ff" }} />
            </span>{" "}
            Productos Con Poco Stock
          </h2>
        </div>
      </div>
    </div>
  );
}
