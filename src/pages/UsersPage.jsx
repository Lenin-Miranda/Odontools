import { useState, useEffect } from "react";
import { useUsers } from "../hooks/useUsers";
import UserEditModal from "../components/UserEditModal/UserEditModal";
import {
  FiSearch,
  FiFilter,
  FiEdit3,
  FiTrash2,
  FiUser,
  FiMail,
  FiCalendar,
  FiShoppingBag,
  FiEye,
} from "react-icons/fi";
import "./UsersPage.css";

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [modalMode, setModalMode] = useState("edit");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Hook para manejar usuarios
  const { users, loading, error, fetchUsers, updateUser, deleteUser } =
    useUsers();

  // Cargar usuarios al montar el componente
  useEffect(() => {
    const loadUsers = async () => {
      await fetchUsers();
    };
    loadUsers();
  }, []);

  // Filtrar usuarios basado en búsqueda y filtros
  const filteredUsers = users.filter((user) => {
    const userId = user._id || user.id;
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userId?.toString().includes(searchTerm);

    const matchesFilter =
      filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const closeUserModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setModalMode("edit");
    setShowEditModal(true);
  };

  const handleUpdateUser = async (formData) => {
    if (!editingUser) return;

    const result = await updateUser(
      editingUser._id || editingUser.id,
      formData
    );

    if (result.success) {
      setMessage("Usuario actualizado exitosamente");
      setMessageType("success");
      setShowEditModal(false);
      setEditingUser(null);
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage(result.error || "Error al actualizar el usuario");
      setMessageType("error");
      setTimeout(() => setMessage(""), 5000);
    }
  };

  const handleDeleteUser = async (user) => {
    const userId = user._id || user.id;
    const userName = user.name;

    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar al usuario "${userName}"?`
      )
    ) {
      const result = await deleteUser(userId);

      if (result.success) {
        setMessage("Usuario eliminado exitosamente");
        setMessageType("success");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(result.error || "Error al eliminar el usuario");
        setMessageType("error");
        setTimeout(() => setMessage(""), 5000);
      }
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingUser(null);
    setModalMode("edit");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "#10b981";
      case "inactive":
        return "#ef4444";
      case "pending":
        return "#f59e0b";
      case "suspended":
        return "#8b5cf6";
      default:
        return "#6b7280";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Activo";
      case "inactive":
        return "Inactivo";
      case "pending":
        return "Pendiente";
      case "suspended":
        return "Suspendido";
      default:
        return "Desconocido";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES");
  };

  const calculateTotalSpent = (orders) => {
    if (!orders || !Array.isArray(orders)) return "0.00";
    return orders
      .reduce((total, order) => total + (order.price || 0), 0)
      .toFixed(2);
  };

  return (
    <div className="users-page">
      <div className="users-page__header">
        <h1 className="users-page__title">
          <FiUser className="users-page__title-icon" />
          Gestión de Usuarios
        </h1>
        <p className="users-page__subtitle">
          Administra y supervisa todos los usuarios registrados
        </p>
        {message && (
          <div className={`message message--${messageType}`}>{message}</div>
        )}
      </div>

      <div className="users-page__controls">
        <div className="users-page__search">
          <FiSearch className="users-page__search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre, email o ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="users-page__search-input"
          />
        </div>

        <div className="users-page__filter">
          <FiFilter className="users-page__filter-icon" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="users-page__filter-select"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
            <option value="pending">Pendientes</option>
            <option value="suspended">Suspendidos</option>
          </select>
        </div>
      </div>

      <div className="users-page__stats">
        <div className="users-stat">
          <div className="users-stat__value">{users.length}</div>
          <div className="users-stat__label">Total Usuarios</div>
        </div>
        <div className="users-stat">
          <div className="users-stat__value">
            {users.filter((u) => u.status === "active").length}
          </div>
          <div className="users-stat__label">Activos</div>
        </div>
        <div className="users-stat">
          <div className="users-stat__value">
            {users.filter((u) => u.status === "pending").length}
          </div>
          <div className="users-stat__label">Pendientes</div>
        </div>
        <div className="users-stat">
          <div className="users-stat__value">{filteredUsers.length}</div>
          <div className="users-stat__label">Filtrados</div>
        </div>
      </div>

      <div className="users-page__table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Fecha Registro</th>
              <th>Pedidos</th>
              <th>Total Gastado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="users-table__row">
                <td className="users-table__id">#{user._id}</td>
                <td className="users-table__user">
                  <div className="user-info">
                    <div className="user-info__avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info__details">
                      <div className="user-info__name">{user.name}</div>
                      <div className="user-info__role">
                        {user.role || "Cliente"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="users-table__email">{user.email}</td>
                <td className="users-table__status">
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(user.status) }}
                  >
                    {getStatusText(user.status)}
                  </span>
                </td>
                <td className="users-table__date">
                  {formatDate(user.registrationDate)}
                </td>
                <td className="users-table__orders">
                  <div className="orders-count">
                    <FiShoppingBag className="orders-count__icon" />
                    {user.orders?.length || 0}
                  </div>
                </td>
                <td className="users-table__total">
                  <span className="total-amount">
                    ${calculateTotalSpent(user.orders || [])}
                  </span>
                </td>
                <td className="actions-cell">
                  <button
                    className="view-btn"
                    onClick={() => handleViewUser(user)}
                  >
                    Ver
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditUser(user)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteUser(user)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="users-page__empty">
            <FiUser className="users-page__empty-icon" />
            <h3>No se encontraron usuarios</h3>
            <p>No hay usuarios que coincidan con los criterios de búsqueda.</p>
          </div>
        )}
      </div>

      {/* Modal de detalles de usuario */}
      {showUserModal && selectedUser && (
        <div className="user-modal-overlay" onClick={closeUserModal}>
          <div className="user-modal" onClick={(e) => e.stopPropagation()}>
            <div className="user-modal__header">
              <h2 className="user-modal__title">
                <FiUser className="user-modal__title-icon" />
                Detalles del Usuario
              </h2>
              <button className="user-modal__close" onClick={closeUserModal}>
                ×
              </button>
            </div>

            <div className="user-modal__content">
              <div className="user-modal__section">
                <h3 className="user-modal__section-title">
                  <FiUser className="user-modal__section-icon" />
                  Información Personal
                </h3>
                <div className="user-modal__info-grid">
                  <div className="user-modal__info-item">
                    <label>ID:</label>
                    <span>#{selectedUser.id}</span>
                  </div>
                  <div className="user-modal__info-item">
                    <label>Nombre:</label>
                    <span>{selectedUser.name}</span>
                  </div>
                  <div className="user-modal__info-item">
                    <label>Email:</label>
                    <span>{selectedUser.email}</span>
                  </div>
                  <div className="user-modal__info-item">
                    <label>Teléfono:</label>
                    <span>{selectedUser.phone || "No especificado"}</span>
                  </div>
                  <div className="user-modal__info-item">
                    <label>Rol:</label>
                    <span>{selectedUser.role || "Cliente"}</span>
                  </div>
                  <div className="user-modal__info-item">
                    <label>Estado:</label>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: getStatusColor(selectedUser.status),
                      }}
                    >
                      {getStatusText(selectedUser.status)}
                    </span>
                  </div>
                  <div className="user-modal__info-item">
                    <label>Fecha de Registro:</label>
                    <span>
                      <FiCalendar className="user-modal__info-icon" />
                      {formatDate(selectedUser.registrationDate)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="user-modal__section">
                <h3 className="user-modal__section-title">
                  <FiShoppingBag className="user-modal__section-icon" />
                  Historial de Pedidos ({selectedUser.orders?.length || 0})
                </h3>
                {selectedUser.orders && selectedUser.orders.length > 0 ? (
                  <div className="user-modal__orders">
                    {selectedUser.orders.map((order) => (
                      <div key={order.id} className="user-modal__order">
                        <div className="user-modal__order-id">#{order.id}</div>
                        <div className="user-modal__order-product">
                          {order.product}
                        </div>
                        <div className="user-modal__order-price">
                          ${order.price}
                        </div>
                      </div>
                    ))}
                    <div className="user-modal__total">
                      <strong>
                        Total gastado: $
                        {calculateTotalSpent(selectedUser.orders || [])}
                      </strong>
                    </div>
                  </div>
                ) : (
                  <p className="user-modal__no-orders">
                    Este usuario aún no ha realizado pedidos.
                  </p>
                )}
              </div>
            </div>

            <div className="user-modal__actions">
              <button className="user-modal__action-btn user-modal__action-btn--edit">
                <FiEdit3 />
                Editar Usuario
              </button>
              <button className="user-modal__action-btn user-modal__action-btn--delete">
                <FiTrash2 />
                Eliminar Usuario
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edición de usuario */}
      {showEditModal && editingUser && (
        <UserEditModal
          user={editingUser}
          mode={modalMode}
          onSave={handleUpdateUser}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default UsersPage;
