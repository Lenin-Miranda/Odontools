import { FiBox, FiPlus } from "react-icons/fi";

import { useState, useEffect } from "react";
import {
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSortAmountDown,
  FaSortAmountUp,
  FaRegClock,
} from "react-icons/fa";
import ProductModal from "../components/ProductModal/ProductModal";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";
import { useProducts } from "../hooks/useProducts";
import useConfirm from "../hooks/useConfirm";
import "./DashboardProducts.css";

export default function DashboardProducts() {
  // Estado para el ordenamiento
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" o "desc"
  // Función para cambiar el ordenamiento
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalMode, setModalMode] = useState("create"); // "create", "edit", "view"
  const { confirmState, showConfirm, closeConfirm } = useConfirm();

  // Hook personalizado para manejar productos
  const {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
    deleteProductImage,
  } = useProducts();

  // useEffect para cargar productos al montar el componente
  useEffect(() => {
    const loadProducts = async () => {
      const result = await fetchProducts();

      if (!result.success) {
        setMessage(result.error || "Error al cargar los productos");
        setMessageType("error");
        setTimeout(() => setMessage(""), 5000);
      }
    };

    loadProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateProduct = async (formData) => {
    const result = await createProduct(formData);

    if (result.success) {
      setMessage("Producto creado exitosamente");
      setMessageType("success");
      setIsModalOpen(false);
      await fetchProducts();

      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage(result.error || "Error al crear el producto");
      setMessageType("error");

      setTimeout(() => setMessage(""), 5000);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleViewProduct = (product) => {
    setEditingProduct(product);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleCreateNewProduct = () => {
    setEditingProduct(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleUpdateProduct = async (formData) => {
    if (!editingProduct) return;

    const result = await updateProduct(editingProduct._id, formData);

    if (result.success) {
      setMessage("Producto actualizado exitosamente");
      setMessageType("success");
      setIsModalOpen(false);
      setEditingProduct(null);

      // Refrescar la lista de productos
      await fetchProducts();

      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage(result.error || "Error al actualizar el producto");
      setMessageType("error");

      setTimeout(() => setMessage(""), 5000);
    }
  };

  const handleDeleteProduct = async (productId) => {
    showConfirm({
      title: "Eliminar producto",
      message:
        "¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.",
      confirmText: "Eliminar",
      cancelText: "Cancelar",
      type: "danger",
      onConfirm: async () => {
        const result = await deleteProduct(productId);

        if (result.success) {
          setMessage("Producto eliminado exitosamente");
          setMessageType("success");

          // Refrescar la lista de productos
          await fetchProducts();

          setTimeout(() => setMessage(""), 3000);
        } else {
          setMessage(result.error || "Error al eliminar el producto");
          setMessageType("error");

          setTimeout(() => setMessage(""), 5000);
        }
      },
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setModalMode("create");
  };

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      (product.sku && product.sku.toLowerCase().includes(term))
    );
  });

  // Ordenar productos filtrados
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    if (sortBy === "name" || sortBy === "category" || sortBy === "sku") {
      aValue = aValue ? aValue.toLowerCase() : "";
      bValue = bValue ? bValue.toLowerCase() : "";
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    } else if (sortBy === "createdAt") {
      // Ordenar por fecha de creación
      const dateA = new Date(aValue);
      const dateB = new Date(bValue);
      if (dateA < dateB) return sortOrder === "asc" ? -1 : 1;
      if (dateA > dateB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    } else {
      // numéricos
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    }
  });

  return (
    <div className="product__page-container">
      <div className="product__page-filter-container">
        <h2 className="product__page-filter-container-title">
          <span>
            <FiBox style={{ fontSize: "20px" }} />
          </span>{" "}
          Filtro de productos
        </h2>
        <label className="product__page-products-container-label">
          Buscar Producto:
          <input
            className="product__page-products-container-input"
            type="text"
            placeholder="Buscar producto..."
            onChange={handleSearchChange}
          />
        </label>
      </div>
      <div className="product__page-products-container">
        <div className="product__page-header">
          <div>
            <h2 className="product__page-products-container-title">
              Lista de Productos ({filteredProducts.length})
            </h2>
            <p className="product__page-products-container-subtitle">
              Gestiona tu inventario de productos dentales
            </p>
          </div>
          <button
            className="product__page-add-btn"
            onClick={handleCreateNewProduct}
          >
            <FiPlus />
            Agregar Producto
          </button>
        </div>
        <div className="product__page-sort-container">
          <button
            className={`product__page-sort-btn${
              sortBy === "name" ? " active" : ""
            }`}
            onClick={() => handleSort("name")}
            title="Ordenar por nombre"
          >
            Nombre{" "}
            {sortBy === "name" &&
              (sortOrder === "asc" ? <FaSortAlphaDown /> : <FaSortAlphaUp />)}
          </button>
          <button
            className={`product__page-sort-btn${
              sortBy === "price" ? " active" : ""
            }`}
            onClick={() => handleSort("price")}
            title="Ordenar por precio"
          >
            Precio{" "}
            {sortBy === "price" &&
              (sortOrder === "asc" ? <FaSortAmountDown /> : <FaSortAmountUp />)}
          </button>
          <button
            className={`product__page-sort-btn${
              sortBy === "stock" ? " active" : ""
            }`}
            onClick={() => handleSort("stock")}
            title="Ordenar por stock"
          >
            Stock{" "}
            {sortBy === "stock" &&
              (sortOrder === "asc" ? <FaSortAmountDown /> : <FaSortAmountUp />)}
          </button>
          <button
            className={`product__page-sort-btn${
              sortBy === "createdAt" && sortOrder === "desc" ? " active" : ""
            }`}
            onClick={() => {
              setSortBy("createdAt");
              setSortOrder("desc");
            }}
            title="Más recientes primero"
          >
            Más recientes <FaRegClock style={{ marginLeft: 4 }} />
          </button>
          <button
            className={`product__page-sort-btn${
              sortBy === "createdAt" && sortOrder === "asc" ? " active" : ""
            }`}
            onClick={() => {
              setSortBy("createdAt");
              setSortOrder("asc");
            }}
            title="Más antiguos primero"
          >
            Más antiguos{" "}
            <FaRegClock style={{ marginLeft: 4, transform: "scaleX(-1)" }} />
          </button>
        </div>

        {message && (
          <div
            className={`product__page-message product__page-message--${messageType}`}
          >
            {message}
          </div>
        )}

        {loading && (
          <div className="product__page-loading">
            <p>Cargando productos...</p>
          </div>
        )}

        {error && !loading && (
          <div className="product__page-message product__page-message--error">
            Error: {error}
          </div>
        )}

        {!loading && products.length === 0 && !error && (
          <div className="product__page-no-results">
            <p>No hay productos disponibles.</p>
            <p>
              ¡Agrega tu primer producto usando el botón "Agregar Producto"!
            </p>
          </div>
        )}

        {!loading && products.length > 0 && (
          <>
            {searchTerm.trim() === "" ? (
              <>
                {/* Tabla para desktop */}
                <div className="product__page-table-container">
                  <table className="product__page-table">
                    <thead className="product__page-table-header">
                      <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>SKU</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedProducts.map((product) => (
                        <tr
                          key={product._id}
                          className="product__page-table-row"
                        >
                          <td className="product__page-table-cell">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="product__page-table-img"
                            />
                          </td>
                          <td className="product__page-table-cell">
                            <span className="product__page-table-name">
                              {product.name}
                            </span>
                          </td>
                          <td className="product__page-table-cell">
                            <span className="product__page-table-category">
                              {product.category}
                            </span>
                          </td>
                          <td className="product__page-table-cell">
                            <span className="product__page-table-sku">
                              {product.sku || "Desconocido"}
                            </span>
                          </td>
                          <td className="product__page-table-cell">
                            <span className="product__page-table-price">
                              ${product.price.toFixed(2)}
                            </span>
                          </td>
                          <td className="product__page-table-cell">
                            <span
                              className={`product__page-table-stock ${
                                product.stock < 5 ? "low-stock" : ""
                              }`}
                            >
                              {product.stock}
                            </span>
                          </td>
                          <td className="product__page-table-cell">
                            <div className="product__page-table-actions">
                              <button
                                className="product__page-btn product__page-btn-view"
                                onClick={() => handleViewProduct(product)}
                              >
                                Ver
                              </button>
                              <button
                                className="product__page-btn product__page-btn-edit"
                                onClick={() => handleEditProduct(product)}
                              >
                                Editar
                              </button>
                              <button
                                className="product__page-btn product__page-btn-delete"
                                onClick={() => handleDeleteProduct(product._id)}
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Cards para móvil */}
                <div className="product__page-cards-container">
                  {sortedProducts.map((product) => (
                    <div key={product._id} className="product__page-card">
                      <div className="product__page-card-header">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="product__page-card-img"
                        />
                        <div className="product__page-card-info">
                          <div className="product__page-card-name">
                            {product.name}
                          </div>
                          <div className="product__page-card-category">
                            {product.category}
                          </div>
                        </div>
                      </div>

                      <div className="product__page-card-body">
                        <div className="product__page-card-price-stock">
                          <div className="product__page-card-price">
                            ${product.price.toFixed(2)}
                          </div>
                          <div
                            className={`product__page-card-stock ${
                              product.stock < 5 ? "low-stock" : ""
                            }`}
                          >
                            Stock: {product.stock}
                          </div>
                        </div>
                      </div>

                      <div className="product__page-card-actions">
                        <button
                          className="product__page-card-btn product__page-card-btn--view"
                          onClick={() => handleViewProduct(product)}
                        >
                          Ver
                        </button>
                        <button
                          className="product__page-card-btn product__page-card-btn--edit"
                          onClick={() => handleEditProduct(product)}
                        >
                          Editar
                        </button>
                        <button
                          className="product__page-card-btn product__page-card-btn--delete"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : filteredProducts.length === 0 ? (
              <p className="product__page-no-results">
                No se encontraron productos.
              </p>
            ) : (
              <>
                {/* Tabla de resultados filtrados para desktop */}
                <div className="product__page-table-container">
                  <table className="product__page-table">
                    <thead className="product__page-table-header">
                      <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>SKU</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedProducts.map((product) => (
                        <tr
                          key={product._id}
                          className="product__page-table-row"
                        >
                          <td className="product__page-table-cell">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="product__page-table-img"
                            />
                          </td>
                          <td className="product__page-table-cell">
                            <span className="product__page-table-name">
                              {product.name}
                            </span>
                          </td>
                          <td className="product__page-table-cell">
                            <span className="product__page-table-category">
                              {product.category}
                            </span>
                          </td>
                          <td className="product__page-table-cell">
                            <span className="product__page-table-sku">
                              {product.sku || "Desconocido"}
                            </span>
                          </td>
                          <td className="product__page-table-cell">
                            <span className="product__page-table-price">
                              ${product.price.toFixed(2)}
                            </span>
                          </td>
                          <td className="product__page-table-cell">
                            <span
                              className={`product__page-table-stock ${
                                product.stock < 5 ? "low-stock" : ""
                              }`}
                            >
                              {product.stock}
                            </span>
                          </td>
                          <td className="product__page-table-cell">
                            <div className="product__page-table-actions">
                              <button
                                className="product__page-btn product__page-btn-view"
                                onClick={() => handleViewProduct(product)}
                              >
                                Ver
                              </button>
                              <button
                                className="product__page-btn product__page-btn-edit"
                                onClick={() => handleEditProduct(product)}
                              >
                                Editar
                              </button>
                              <button
                                className="product__page-btn product__page-btn-delete"
                                onClick={() => handleDeleteProduct(product._id)}
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Cards de resultados filtrados para móvil */}
                <div className="product__page-cards-container">
                  {sortedProducts.map((product) => (
                    <div key={product._id} className="product__page-card">
                      <div className="product__page-card-header">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="product__page-card-img"
                        />
                        <div className="product__page-card-info">
                          <div className="product__page-card-name">
                            {product.name}
                          </div>
                          <div className="product__page-card-category">
                            {product.category}
                          </div>
                          <div className="product__page-card-sku">
                            <strong>SKU:</strong> {product.sku || "Desconocido"}
                          </div>
                        </div>
                      </div>

                      <div className="product__page-card-body">
                        <div className="product__page-card-price-stock">
                          <div className="product__page-card-price">
                            ${product.price.toFixed(2)}
                          </div>
                          <div
                            className={`product__page-card-stock ${
                              product.stock < 5 ? "low-stock" : ""
                            }`}
                          >
                            Stock: {product.stock}
                          </div>
                        </div>
                      </div>

                      <div className="product__page-card-actions">
                        <button
                          className="product__page-card-btn product__page-card-btn--view"
                          onClick={() => handleViewProduct(product)}
                        >
                          Ver
                        </button>
                        <button
                          className="product__page-card-btn product__page-card-btn--edit"
                          onClick={() => handleEditProduct(product)}
                        >
                          Editar
                        </button>
                        <button
                          className="product__page-card-btn product__page-card-btn--delete"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Modal para crear/editar productos */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={
          modalMode === "edit" ? handleUpdateProduct : handleCreateProduct
        }
        product={editingProduct}
        isLoading={loading}
        mode={modalMode}
        onDeleteImage={deleteProductImage}
      />

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
