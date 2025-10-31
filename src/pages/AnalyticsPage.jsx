import { useState, useEffect } from "react";
import {
  FiTrendingUp,
  FiUsers,
  FiShoppingBag,
  FiDollarSign,
  FiCalendar,
  FiBarChart,
  FiPieChart,
  FiActivity,
  FiTarget,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import { users } from "../data/clientsData";
import { ordersData } from "../data/ordersData";
import { products } from "../data/productsData";
import "./AnalyticsPage.css";

const AnalyticsPage = () => {
  const [timeFilter, setTimeFilter] = useState("7days");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  // Cálculos de métricas principales
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "active").length;
  const totalOrders = ordersData.length;
  const totalRevenue = ordersData.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = totalRevenue / totalOrders;

  // Datos para gráficos (simulados)
  const revenueData = [
    { month: "Ene", value: 12500 },
    { month: "Feb", value: 15200 },
    { month: "Mar", value: 18700 },
    { month: "Abr", value: 16800 },
    { month: "May", value: 22100 },
    { month: "Jun", value: 25400 },
    { month: "Jul", value: 28900 },
    { month: "Ago", value: 31200 },
    { month: "Sep", value: 27800 },
    { month: "Oct", value: 33500 },
  ];

  const categoryData = [
    { name: "Instrumentos Básicos", value: 35, color: "#3b82f6" },
    { name: "Equipos Especializados", value: 28, color: "#10b981" },
    { name: "Materiales", value: 20, color: "#f59e0b" },
    { name: "Consumibles", value: 17, color: "#ef4444" },
  ];

  const userGrowthData = [
    { month: "Ene", users: 125 },
    { month: "Feb", users: 142 },
    { month: "Mar", users: 168 },
    { month: "Abr", users: 195 },
    { month: "May", users: 223 },
    { month: "Jun", users: 251 },
    { month: "Jul", users: 278 },
    { month: "Ago", users: 305 },
    { month: "Sep", users: 332 },
    { month: "Oct", users: 365 },
  ];

  const topProducts = products.slice(0, 5).map((product, index) => ({
    ...product,
    sales: Math.floor(Math.random() * 50) + 10,
    revenue: (Math.floor(Math.random() * 50) + 10) * product.price,
  }));

  const getPercentageChange = (current, previous) => {
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="analytics-page">
      <div className="analytics-page__header">
        <div>
          <h1 className="analytics-page__title">
            <FiBarChart className="analytics-page__title-icon" />
            Analíticas y Reportes
          </h1>
          <p className="analytics-page__subtitle">
            Visión completa del rendimiento de tu negocio
          </p>
        </div>

        <div className="analytics-page__filters">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="analytics-filter"
          >
            <option value="7days">Últimos 7 días</option>
            <option value="30days">Últimos 30 días</option>
            <option value="3months">Últimos 3 meses</option>
            <option value="1year">Último año</option>
          </select>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="metrics-grid">
        <div className="metric-card metric-card--revenue">
          <div className="metric-card__icon">
            <FiDollarSign />
          </div>
          <div className="metric-card__content">
            <div className="metric-card__value">
              {formatCurrency(totalRevenue)}
            </div>
            <div className="metric-card__label">Ingresos Totales</div>
            <div className="metric-card__change metric-card__change--positive">
              <FiArrowUp />
              +12.5% vs mes anterior
            </div>
          </div>
        </div>

        <div className="metric-card metric-card--orders">
          <div className="metric-card__icon">
            <FiShoppingBag />
          </div>
          <div className="metric-card__content">
            <div className="metric-card__value">{totalOrders}</div>
            <div className="metric-card__label">Pedidos Totales</div>
            <div className="metric-card__change metric-card__change--positive">
              <FiArrowUp />
              +8.3% vs mes anterior
            </div>
          </div>
        </div>

        <div className="metric-card metric-card--users">
          <div className="metric-card__icon">
            <FiUsers />
          </div>
          <div className="metric-card__content">
            <div className="metric-card__value">{totalUsers}</div>
            <div className="metric-card__label">Usuarios Registrados</div>
            <div className="metric-card__change metric-card__change--positive">
              <FiArrowUp />
              +15.7% vs mes anterior
            </div>
          </div>
        </div>

        <div className="metric-card metric-card--avg">
          <div className="metric-card__icon">
            <FiTarget />
          </div>
          <div className="metric-card__content">
            <div className="metric-card__value">
              {formatCurrency(averageOrderValue)}
            </div>
            <div className="metric-card__label">Valor Promedio Pedido</div>
            <div className="metric-card__change metric-card__change--negative">
              <FiArrowDown />
              -3.2% vs mes anterior
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos principales */}
      <div className="charts-grid">
        {/* Gráfico de ingresos */}
        <div className="chart-card chart-card--large">
          <div className="chart-card__header">
            <h3 className="chart-card__title">
              <FiTrendingUp className="chart-card__title-icon" />
              Evolución de Ingresos
            </h3>
            <div className="chart-card__controls">
              <button className="chart-btn chart-btn--active">Ingresos</button>
              <button className="chart-btn">Pedidos</button>
              <button className="chart-btn">Usuarios</button>
            </div>
          </div>
          <div className="chart-container">
            <div className="bar-chart">
              {revenueData.map((item, index) => {
                const height =
                  (item.value / Math.max(...revenueData.map((d) => d.value))) *
                  100;
                return (
                  <div key={index} className="bar-chart__item">
                    <div
                      className="bar-chart__bar"
                      style={{ height: `${height}%` }}
                      title={`${item.month}: ${formatCurrency(item.value)}`}
                    ></div>
                    <div className="bar-chart__label">{item.month}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Gráfico de categorías */}
        <div className="chart-card">
          <div className="chart-card__header">
            <h3 className="chart-card__title">
              <FiPieChart className="chart-card__title-icon" />
              Ventas por Categoría
            </h3>
          </div>
          <div className="chart-container">
            <div className="pie-chart">
              {categoryData.map((item, index) => (
                <div key={index} className="pie-chart__item">
                  <div
                    className="pie-chart__color"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="pie-chart__info">
                    <div className="pie-chart__name">{item.name}</div>
                    <div className="pie-chart__value">{item.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sección de análisis detallado */}
      <div className="analysis-grid">
        {/* Top productos */}
        <div className="analysis-card">
          <div className="analysis-card__header">
            <h3 className="analysis-card__title">
              <FiTarget className="analysis-card__title-icon" />
              Productos Más Vendidos
            </h3>
          </div>
          <div className="top-products">
            {topProducts.map((product, index) => (
              <div key={product.id} className="top-product">
                <div className="top-product__rank">#{index + 1}</div>
                <div className="top-product__info">
                  <div className="top-product__name">{product.name}</div>
                  <div className="top-product__stats">
                    {product.sales} ventas • {formatCurrency(product.revenue)}
                  </div>
                </div>
                <div className="top-product__progress">
                  <div
                    className="top-product__progress-bar"
                    style={{ width: `${(product.sales / 50) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="analysis-card">
          <div className="analysis-card__header">
            <h3 className="analysis-card__title">
              <FiActivity className="analysis-card__title-icon" />
              Actividad Reciente
            </h3>
          </div>
          <div className="recent-activity">
            <div className="activity-item">
              <div className="activity-item__icon activity-item__icon--order">
                <FiShoppingBag />
              </div>
              <div className="activity-item__content">
                <div className="activity-item__text">Nuevo pedido #1234</div>
                <div className="activity-item__time">Hace 5 minutos</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-item__icon activity-item__icon--user">
                <FiUsers />
              </div>
              <div className="activity-item__content">
                <div className="activity-item__text">
                  Usuario registrado: Dr. García
                </div>
                <div className="activity-item__time">Hace 15 minutos</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-item__icon activity-item__icon--revenue">
                <FiDollarSign />
              </div>
              <div className="activity-item__content">
                <div className="activity-item__text">
                  Pago procesado: $250.00
                </div>
                <div className="activity-item__time">Hace 32 minutos</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-item__icon activity-item__icon--product">
                <FiTarget />
              </div>
              <div className="activity-item__content">
                <div className="activity-item__text">
                  Producto actualizado: Espejo Dental
                </div>
                <div className="activity-item__time">Hace 1 hora</div>
              </div>
            </div>
          </div>
        </div>

        {/* Crecimiento de usuarios */}
        <div className="analysis-card analysis-card--wide">
          <div className="analysis-card__header">
            <h3 className="analysis-card__title">
              <FiUsers className="analysis-card__title-icon" />
              Crecimiento de Usuarios
            </h3>
          </div>
          <div className="chart-container">
            <div className="line-chart">
              <div className="line-chart__grid">
                {userGrowthData.map((item, index) => {
                  const height =
                    (item.users /
                      Math.max(...userGrowthData.map((d) => d.users))) *
                    100;
                  return (
                    <div key={index} className="line-chart__item">
                      <div
                        className="line-chart__point"
                        style={{ bottom: `${height}%` }}
                        title={`${item.month}: ${item.users} usuarios`}
                      ></div>
                      <div className="line-chart__label">{item.month}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen ejecutivo */}
      <div className="executive-summary">
        <h3 className="executive-summary__title">
          <FiBarChart className="executive-summary__title-icon" />
          Resumen Ejecutivo
        </h3>
        <div className="executive-summary__content">
          <div className="summary-insight">
            <div className="summary-insight__icon">
              <FiTrendingUp />
            </div>
            <div className="summary-insight__text">
              <strong>Crecimiento sostenido:</strong> Los ingresos han aumentado
              un 12.5% respecto al mes anterior, impulsados principalmente por
              el incremento en ventas de equipos especializados.
            </div>
          </div>
          <div className="summary-insight">
            <div className="summary-insight__icon">
              <FiUsers />
            </div>
            <div className="summary-insight__text">
              <strong>Base de usuarios en expansión:</strong> Se registraron 32
              nuevos usuarios este mes, con una tasa de conversión del 68% de
              visitantes a usuarios registrados.
            </div>
          </div>
          <div className="summary-insight">
            <div className="summary-insight__icon">
              <FiTarget />
            </div>
            <div className="summary-insight__text">
              <strong>Oportunidad de mejora:</strong> El valor promedio de
              pedido ha disminuido un 3.2%. Considerar estrategias de upselling
              y bundles de productos.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
