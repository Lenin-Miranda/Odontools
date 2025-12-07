import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/UseCart";
import {
  FiShoppingCart,
  FiPackage,
  FiTag,
  FiArrowLeft,
  FiTruck,
  FiShield,
  FiRefreshCw,
} from "react-icons/fi";
import AOS from "aos";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Obtener todas las imágenes (principal + galería) usando useMemo para evitar recalculaciones
  const allImages = useMemo(() => {
    if (!product) return [];
    const images = [product.image, ...(product.images || [])].filter(Boolean);
    console.log("📸 Imágenes disponibles:", images);
    return images;
  }, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3001/api/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Producto no encontrado");
        }

        const data = await response.json();
        setProduct(data.product || data);
        setSelectedImageIndex(0); // Reset al cambiar de producto
        // Refrescar AOS después de cargar el producto
        setTimeout(() => {
          AOS.refresh();
        }, 100);
      } catch (err) {
        console.error("Error al cargar el producto:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      addToCart(product, quantity);
    }
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(product.stock, quantity + value));
    setQuantity(newQuantity);
  };

  if (loading) {
    return (
      <div className="product-detail__loading">
        <div className="product-detail__spinner"></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail__error">
        <FiPackage className="product-detail__error-icon" />
        <h2>Producto no encontrado</h2>
        <p>{error || "No se pudo cargar la información del producto"}</p>
        <button
          onClick={() => navigate("/products")}
          className="product-detail__back-btn"
        >
          <FiArrowLeft /> Volver a productos
        </button>
      </div>
    );
  }

  const discountedPrice = product.discount
    ? (product.price - product.price * 0.1).toFixed(2)
    : product.price.toFixed(2);

  const isOutOfStock = product.stock === 0;
  const isAlreadyInCart = isInCart(product._id || product.id);

  return (
    <div className="product-detail">
      <div className="product-detail__container">
        {/* Breadcrumb */}
        <div className="product-detail__breadcrumb" data-aos="fade-down">
          <button onClick={() => navigate("/")} className="breadcrumb__link">
            Inicio
          </button>
          <span className="breadcrumb__separator">/</span>
          <button
            onClick={() => navigate("/products")}
            className="breadcrumb__link"
          >
            Productos
          </button>
          <span className="breadcrumb__separator">/</span>
          <span className="breadcrumb__current">{product.name}</span>
        </div>

        <div className="product-detail__content">
          {/* Galería de imágenes */}
          <div className="product-detail__gallery" data-aos="fade-right">
            <div className="gallery__main">
              {isOutOfStock && (
                <div className="gallery__badge gallery__badge--out">
                  Agotado
                </div>
              )}
              {!isOutOfStock && product.discount && (
                <div className="gallery__badge gallery__badge--discount">
                  -10% OFF
                </div>
              )}
              <img
                src={allImages[selectedImageIndex] || product.image}
                alt={`${product.name} - Imagen ${selectedImageIndex + 1}`}
                className="gallery__main-image"
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwSDE1MFYyMDBIMjAwVjI1MEgyNTBWMjAwSDMwMFYxNTBIMjUwVjEwMEgyMDBWMTUwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4=";
                }}
              />
            </div>

            {/* Miniaturas - Solo mostrar si hay más de una imagen */}
            {allImages.length > 1 && (
              <div className="gallery__thumbnails">
                {allImages.map((img, index) => (
                  <div
                    key={`thumbnail-${index}-${img}`}
                    className={`gallery__thumbnail ${
                      selectedImageIndex === index ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log(`🖼️ Cambiando a imagen ${index}`);
                      setSelectedImageIndex(index);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - Miniatura ${index + 1}`}
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+PC9zdmc+";
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div
            className="product-detail__info"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="info__header">
              <div className="info__category">
                <FiTag />
                {product.category || product.categorie || "Sin categoría"}
              </div>
            </div>

            <h1 className="info__title">{product.name}</h1>

            <div
              className="info__price"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              {product.discount ? (
                <>
                  <span className="price__current">${discountedPrice}</span>
                  <span className="price__original">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="price__discount">Ahorras 10%</span>
                </>
              ) : (
                <span className="price__current">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <div className="info__stock">
              <FiPackage className="stock__icon" />
              {isOutOfStock ? (
                <span className="stock__text stock__text--out">Sin stock</span>
              ) : product.stock < 10 ? (
                <span className="stock__text stock__text--low">
                  ¡Solo quedan {product.stock} unidades!
                </span>
              ) : (
                <span className="stock__text stock__text--available">
                  En stock ({product.stock} disponibles)
                </span>
              )}
            </div>

            <p className="info__description">{product.description}</p>

            {/* Cantidad y botones */}
            {!isOutOfStock && (
              <div
                className="info__actions"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="actions__quantity">
                  <button
                    className="quantity__btn"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity__value">{quantity}</span>
                  <button
                    className="quantity__btn"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>

                <button
                  className={`actions__add-cart ${
                    isAlreadyInCart ? "in-cart" : ""
                  }`}
                  onClick={handleAddToCart}
                  disabled={isAlreadyInCart}
                >
                  <FiShoppingCart />
                  {isAlreadyInCart ? "En el carrito" : "Agregar al carrito"}
                </button>
              </div>
            )}

            {/* Características adicionales */}
            <div className="info__features">
              <div className="feature" data-aos="fade-up" data-aos-delay="500">
                <FiTruck className="feature__icon" />
                <div className="feature__text">
                  <strong>Envío gratis</strong>
                  <span>En compras mayores a $50</span>
                </div>
              </div>
              <div className="feature" data-aos="fade-up" data-aos-delay="600">
                <FiShield className="feature__icon" />
                <div className="feature__text">
                  <strong>Compra segura</strong>
                  <span>Garantía de 30 días</span>
                </div>
              </div>
              <div className="feature" data-aos="fade-up" data-aos-delay="700">
                <FiRefreshCw className="feature__icon" />
                <div className="feature__text">
                  <strong>Devoluciones</strong>
                  <span>Fáciles y gratuitas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
