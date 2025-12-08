import { useState, useRef, useEffect } from "react";
import { AiOutlineClose, AiOutlineUpload } from "react-icons/ai";
import { FiImage } from "react-icons/fi";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import useConfirm from "../../hooks/useConfirm";
import "./ProductModal.css";

export default function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  product = null,
  isLoading = false,
  mode = "create", // "create", "edit", "view"
  onDeleteImage = null, // Función para eliminar imágenes
}) {
  const [formData, setFormData] = useState({
    name: mode === "edit" || mode === "view" ? product?.name || "" : "",
    category: mode === "edit" || mode === "view" ? product?.category || "" : "",
    price: mode === "edit" || mode === "view" ? product?.price || "" : "",
    stock: mode === "edit" || mode === "view" ? product?.stock || "" : "",
    description:
      mode === "edit" || mode === "view" ? product?.description || "" : "",
    reviews: mode === "edit" || mode === "view" ? product?.reviews || 0 : 0,
    discount:
      mode === "edit" || mode === "view" ? product?.discount || false : false,
    isFavorite:
      mode === "edit" || mode === "view" ? product?.isFavorite || false : false,
    image: null,
    images: [], // Array para imágenes adicionales
  });

  const [imagePreview, setImagePreview] = useState(
    mode === "edit" || mode === "view" ? product?.image || null : null
  );
  const [additionalPreviews, setAdditionalPreviews] = useState(
    mode === "edit" || mode === "view" ? product?.images || [] : []
  );
  const [dragActive, setDragActive] = useState(false);
  const [dragActiveGallery, setDragActiveGallery] = useState(false);
  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const { confirmState, showConfirm, showAlert, closeConfirm } = useConfirm();

  // Actualizar el formulario cuando cambie el producto o el modo
  useEffect(() => {
    if (mode === "create") {
      // Limpiar formulario para crear nuevo producto
      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        reviews: 0,
        discount: false,
        isFavorite: false,
        image: null,
        images: [],
      });
      setImagePreview(null);
      setAdditionalPreviews([]);
    } else if ((mode === "edit" || mode === "view") && product) {
      // Cargar datos del producto para editar o ver
      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
        description: product.description || "",
        reviews: product.reviews || 0,
        discount: product.discount || false,
        isFavorite: product.isFavorite || false,
        image: null, // La imagen existente se maneja por separado
        images: [],
      });
      setImagePreview(product.image || null);
      setAdditionalPreviews(product.images || []);
    }
  }, [mode, product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (file) => {
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  // Manejar galería de imágenes adicionales
  const handleGalleryChange = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) =>
      file.type.startsWith("image/")
    );

    // Limitar a 4 imágenes adicionales
    const filesToAdd = validFiles.slice(0, 4 - formData.images.length);

    if (filesToAdd.length > 0) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...filesToAdd],
      }));

      // Crear previews
      const newPreviews = [];
      filesToAdd.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews.push(e.target.result);
          if (newPreviews.length === filesToAdd.length) {
            setAdditionalPreviews((prev) => [...prev, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleGallerySelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleGalleryChange(files);
    }
  };

  const handleGalleryDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActiveGallery(true);
    } else if (e.type === "dragleave") {
      setDragActiveGallery(false);
    }
  };

  const handleGalleryDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveGallery(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleGalleryChange(e.dataTransfer.files);
    }
  };

  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setAdditionalPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Eliminar imagen existente del servidor (para modo edit)
  const handleDeleteExistingImage = async (imageUrl) => {
    if (!onDeleteImage || !product || !product._id) {
      console.error("No se puede eliminar: falta onDeleteImage o product ID");
      return;
    }

    showConfirm({
      title: "Eliminar imagen",
      message: "¿Estás seguro de eliminar esta imagen de la galería?",
      confirmText: "Eliminar",
      cancelText: "Cancelar",
      type: "danger",
      onConfirm: async () => {
        const result = await onDeleteImage(product._id, imageUrl);
        if (result.success) {
          // Actualizar las previews locales removiendo la imagen eliminada
          setAdditionalPreviews((prev) =>
            prev.filter((img) => img !== imageUrl)
          );
        } else {
          console.error("❌ Error al eliminar imagen:", result.error);
          showAlert({
            title: "Error",
            message: "Error al eliminar la imagen: " + result.error,
            type: "danger",
          });
        }
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear FormData para enviar archivos
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("category", formData.category); // Cambiado a 'category'
    submitData.append("price", formData.price);
    submitData.append("stock", formData.stock);
    submitData.append("description", formData.description);
    submitData.append("reviews", formData.reviews);
    submitData.append("discount", formData.discount);
    submitData.append("isFavorite", formData.isFavorite);

    // Agregar imagen principal
    if (formData.image) {
      submitData.append("image", formData.image);
    }

    // Agregar imágenes adicionales
    if (formData.images && formData.images.length > 0) {
      formData.images.forEach((img) => {
        submitData.append("images", img);
      });
    }

    onSubmit(submitData);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      reviews: 0,
      discount: false,
      isFavorite: false,
      image: null,
      images: [],
    });
    setImagePreview(null);
    setAdditionalPreviews([]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="product-modal-overlay">
      <div className="product-modal">
        <div className="product-modal__header">
          <h2 className="product-modal__title">
            {mode === "create" && "Agregar Nuevo Producto"}
            {mode === "edit" && "Editar Producto"}
            {mode === "view" && "Detalles del Producto"}
          </h2>
          <button
            className="product-modal__close"
            onClick={handleClose}
            disabled={isLoading}
          >
            <AiOutlineClose />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="product-modal__form">
          {/* Upload de imagen */}
          <div className="product-modal__field">
            <label className="product-modal__label">Imagen del Producto</label>
            <div
              className={`product-modal__image-upload ${
                dragActive ? "drag-active" : ""
              } ${mode === "view" ? "read-only" : ""}`}
              onDragEnter={mode !== "view" ? handleDrag : undefined}
              onDragLeave={mode !== "view" ? handleDrag : undefined}
              onDragOver={mode !== "view" ? handleDrag : undefined}
              onDrop={mode !== "view" ? handleDrop : undefined}
              onClick={
                mode !== "view"
                  ? () => fileInputRef.current?.click()
                  : undefined
              }
            >
              {imagePreview ? (
                <div className="product-modal__image-preview">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="product-modal__preview-img"
                  />
                  <div className="product-modal__image-overlay">
                    <AiOutlineUpload size={24} />
                    <span>Cambiar imagen</span>
                  </div>
                </div>
              ) : (
                <div className="product-modal__upload-placeholder">
                  <FiImage size={48} />
                  <p>Arrastra una imagen aquí o haz click para seleccionar</p>
                  <span className="product-modal__upload-hint">
                    Formatos soportados: JPG, PNG, GIF (máx. 5MB)
                  </span>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="product-modal__file-input"
            />
          </div>

          {/* Galería de imágenes adicionales */}
          <div className="product-modal__field">
            <label className="product-modal__label">
              Imágenes Adicionales (Galería)
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "#666",
                  marginLeft: "0.5rem",
                }}
              >
                Máximo 4 imágenes
              </span>
            </label>

            {/* Drag and drop area para galería */}
            <div
              className={`product-modal__image-upload ${
                dragActiveGallery ? "drag-active" : ""
              } ${mode === "view" ? "read-only" : ""}`}
              style={{ minHeight: "120px" }}
              onDragEnter={mode !== "view" ? handleGalleryDrag : undefined}
              onDragLeave={mode !== "view" ? handleGalleryDrag : undefined}
              onDragOver={mode !== "view" ? handleGalleryDrag : undefined}
              onDrop={mode !== "view" ? handleGalleryDrop : undefined}
              onClick={
                mode !== "view"
                  ? () => galleryInputRef.current?.click()
                  : undefined
              }
            >
              {additionalPreviews.length === 0 ? (
                <div className="product-modal__upload-placeholder">
                  <FiImage size={36} />
                  <p>Arrastra imágenes adicionales aquí o haz click</p>
                  <span className="product-modal__upload-hint">
                    Máximo 4 imágenes para la galería
                  </span>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(100px, 1fr))",
                    gap: "0.75rem",
                    padding: "1rem",
                  }}
                >
                  {additionalPreviews.map((preview, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        aspectRatio: "1",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: "2px solid #e2e8f0",
                      }}
                    >
                      <img
                        src={preview}
                        alt={`Galería ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      {mode !== "view" && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Si es una URL (imagen existente), eliminar del servidor
                            if (
                              typeof preview === "string" &&
                              preview.startsWith("http")
                            ) {
                              handleDeleteExistingImage(preview);
                            } else {
                              // Si es una imagen nueva (no subida aún), solo remover localmente
                              removeGalleryImage(index);
                            }
                          }}
                          style={{
                            position: "absolute",
                            top: "4px",
                            right: "4px",
                            background: "rgba(239, 68, 68, 0.9)",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "24px",
                            height: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "bold",
                          }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  {additionalPreviews.length < 4 && mode !== "view" && (
                    <div
                      style={{
                        aspectRatio: "1",
                        border: "2px dashed #cbd5e1",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#94a3b8",
                        fontSize: "2rem",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </div>
                  )}
                </div>
              )}
            </div>
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleGallerySelect}
              className="product-modal__file-input"
            />
          </div>

          {/* Nombre */}
          <div className="product-modal__field">
            <label className="product-modal__label" htmlFor="product-name">
              Nombre del Producto *
            </label>
            <input
              id="product-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="product-modal__input"
              placeholder="Ej: Espejo Dental #5"
              minLength="3"
              maxLength="100"
              required={mode !== "view"}
              readOnly={mode === "view"}
            />
          </div>

          {/* Categoría */}
          <div className="product-modal__field">
            <label className="product-modal__label" htmlFor="product-category">
              Categoría *
            </label>
            <select
              id="product-category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="product-modal__select"
              required={mode !== "view"}
              disabled={mode === "view"}
            >
              <option value="">Seleccionar categoría</option>
              <option value="Instrumentos de Examen">
                Instrumentos de Examen
              </option>
              <option value="Instrumentos de Extracción">
                Instrumentos de Extracción
              </option>
              <option value="Instrumentos de Endodoncia">
                Instrumentos de Endodoncia
              </option>
              <option value="Instrumentos de Periodoncia">
                Instrumentos de Periodoncia
              </option>
              <option value="Instrumentos de Cirugía">
                Instrumentos de Cirugía
              </option>
              <option value="Materiales Dentales">Materiales Dentales</option>
            </select>
          </div>

          {/* Precio y Stock */}
          <div className="product-modal__row">
            <div className="product-modal__field">
              <label className="product-modal__label" htmlFor="product-price">
                Precio *
              </label>
              <input
                id="product-price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                className="product-modal__input"
                placeholder="0.00"
                required={mode !== "view"}
                readOnly={mode === "view"}
              />
            </div>
            <div className="product-modal__field">
              <label className="product-modal__label" htmlFor="product-stock">
                Stock *
              </label>
              <input
                id="product-stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleInputChange}
                className="product-modal__input"
                placeholder="0"
                required={mode !== "view"}
                readOnly={mode === "view"}
              />
            </div>
          </div>

          {/* Descripción */}
          <div className="product-modal__field">
            <label
              className="product-modal__label"
              htmlFor="product-description"
            >
              Descripción *
            </label>
            <textarea
              id="product-description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="product-modal__textarea"
              placeholder="Descripción detallada del producto (mínimo 10 caracteres)..."
              rows="4"
              minLength="10"
              maxLength="1000"
              required={mode !== "view"}
              readOnly={mode === "view"}
            />
          </div>

          {/* Reviews y Discount */}
          <div className="product-modal__row">
            <div className="product-modal__field">
              <label className="product-modal__label" htmlFor="product-reviews">
                Número de Reseñas
              </label>
              <input
                id="product-reviews"
                name="reviews"
                type="number"
                min="0"
                value={formData.reviews}
                onChange={handleInputChange}
                className="product-modal__input"
                placeholder="0"
                readOnly={mode === "view"}
              />
            </div>
            <div className="product-modal__field">
              <label
                className="product-modal__label"
                htmlFor="product-discount"
              >
                Descuento (%)
              </label>
              <input
                id="product-discount"
                name="discount"
                type="number"
                min="0"
                max="100"
                value={formData.discount}
                onChange={handleInputChange}
                className="product-modal__input"
                placeholder="0"
                readOnly={mode === "view"}
              />
              <small style={{ color: "#666", fontSize: "0.85rem" }}>
                Ingresa el porcentaje de descuento (0-100)
              </small>
            </div>
          </div>

          {/* Favorito */}
          <div className="product-modal__field">
            <label className="product-modal__label">
              <input
                name="isFavorite"
                type="checkbox"
                checked={formData.isFavorite}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isFavorite: e.target.checked,
                  }))
                }
                className="product-modal__checkbox"
                disabled={mode === "view"}
              />
              Marcar como favorito
            </label>
          </div>

          {/* Botones */}
          <div className="product-modal__actions">
            <button
              type="button"
              onClick={handleClose}
              className="product-modal__btn product-modal__btn--cancel"
              disabled={isLoading}
            >
              {mode === "view" ? "Cerrar" : "Cancelar"}
            </button>
            {mode !== "view" && (
              <button
                type="submit"
                className="product-modal__btn product-modal__btn--submit"
                disabled={isLoading}
              >
                {isLoading
                  ? "Guardando..."
                  : mode === "edit"
                  ? "Actualizar"
                  : "Crear Producto"}
              </button>
            )}
          </div>
        </form>
      </div>

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
