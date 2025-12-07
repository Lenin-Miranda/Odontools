import { useState } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Crear producto con imagen
  const createProduct = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      console.log("📤 Enviando producto al backend...");

      // Verificar si hay imagen en FormData
      const hasImage =
        formData.has("image") && formData.get("image") instanceof File;

      if (hasImage) {
        console.log("🖼️ Imagen detectada, enviando como FormData");
        // Enviar FormData directamente (multer lo procesará)
        // NO establecer Content-Type, el navegador lo hace automáticamente con boundary
      } else {
        console.log("📝 Sin imagen, enviando como FormData normal");
        // Aunque no haya imagen, enviamos como FormData para consistencia
      }

      const response = await fetch("http://localhost:3001/api/products", {
        method: "POST",
        credentials: "include", // Envía cookies automáticamente
        body: formData, // Enviar FormData directamente
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error del backend:", errorText);
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log("✅ Producto creado exitosamente:", result);

      // Actualizar lista local de productos
      setProducts((prev) => [...prev, result.product]);

      return { success: true, data: result };
    } catch (err) {
      console.error("❌ Error en createProduct:", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar producto con imagen
  const updateProduct = async (id, formData) => {
    setLoading(true);
    setError(null);

    try {
      // Validar que el ID existe y no es undefined
      if (!id || id === "undefined" || id === undefined) {
        throw new Error("ID de producto inválido para actualización");
      }

      console.log(`📝 Actualizando producto con ID: ${id}`);
      console.log(`📤 Actualizando producto ${id}...`);

      // Verificar si hay imagen nueva
      const hasImage =
        formData.has("image") && formData.get("image") instanceof File;

      if (hasImage) {
        console.log("🖼️ Nueva imagen detectada para actualización");
      } else {
        console.log("📝 Actualizando sin cambiar imagen");
      }

      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: "PUT",
        credentials: "include", // Envía cookies automáticamente
        body: formData, // Enviar FormData directamente
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error al actualizar:", errorText);
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log("✅ Producto actualizado exitosamente:", result);

      // Actualizar lista local de productos (usar _id de MongoDB)
      setProducts((prev) =>
        prev.map((product) =>
          product._id === id || product.id === id ? result.product : product
        )
      );

      return { success: true, data: result };
    } catch (err) {
      console.error("❌ Error en updateProduct:", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Eliminar producto
  const deleteProduct = async (id) => {
    setLoading(true);
    setError(null);

    try {
      // Validar que el ID existe y no es undefined
      if (!id || id === "undefined" || id === undefined) {
        throw new Error("ID de producto inválido");
      }

      console.log(`🗑️ Eliminando producto con ID: ${id}`);

      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: "DELETE",
        credentials: "include", // Envía cookies automáticamente
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el producto");
      }

      // Actualizar lista local de productos (usar _id de MongoDB)
      setProducts((prev) =>
        prev.filter((product) => product._id !== id && product.id !== id)
      );

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Obtener un producto por ID
  const fetchProductById = async (id) => {
    setLoading(true);
    setError(null);

    try {
      // Validar que el ID existe y no es undefined
      if (!id || id === "undefined" || id === undefined) {
        throw new Error("ID de producto inválido para consulta");
      }

      console.log(`🔍 Obteniendo producto con ID: ${id}`);

      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        credentials: "include", // Envía cookies automáticamente
      });

      if (!response.ok) {
        throw new Error("Error al obtener el producto");
      }

      const result = await response.json();
      console.log("📦 Producto obtenido:", result);

      return { success: true, data: result };
    } catch (err) {
      console.error("❌ Error en fetchProductById:", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Obtener todos los productos
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/api/products", {
        credentials: "include", // Envía cookies automáticamente
      });

      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }

      const result = await response.json();
      console.log("📦 Productos obtenidos:", result);

      // Tu backend devuelve { success: true, products: [...] }
      setProducts(result.products || []);

      return { success: true, data: result };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Función para crear FormData desde un objeto
  const createFormData = (productData) => {
    const formData = new FormData();

    // Agregar campos de texto
    Object.keys(productData).forEach((key) => {
      if (
        key !== "image" &&
        key !== "images" &&
        productData[key] !== null &&
        productData[key] !== undefined
      ) {
        formData.append(key, productData[key]);
      }
    });

    // Agregar imagen principal si existe
    if (productData.image && productData.image instanceof File) {
      formData.append("image", productData.image);
    }

    // Agregar múltiples imágenes si existen
    if (productData.images && Array.isArray(productData.images)) {
      productData.images.forEach((img) => {
        if (img instanceof File) {
          formData.append("images", img);
        }
      });
    }

    return formData;
  };

  // Eliminar una imagen específica de la galería de un producto
  const deleteProductImage = async (productId, imageUrl) => {
    setLoading(true);
    setError(null);

    try {
      if (!productId || productId === "undefined" || productId === undefined) {
        throw new Error("ID de producto inválido");
      }

      if (!imageUrl) {
        throw new Error("URL de imagen requerida");
      }

      console.log(`🗑️ Eliminando imagen del producto ${productId}:`, imageUrl);

      const response = await fetch(
        `http://localhost:3001/api/products/${productId}/image`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error al eliminar la imagen del producto"
        );
      }

      const result = await response.json();
      console.log("✅ Imagen eliminada exitosamente");

      // Actualizar el producto en la lista local
      setProducts((prev) =>
        prev.map((product) =>
          product._id === productId || product.id === productId
            ? result.product
            : product
        )
      );

      return { success: true, data: result.product };
    } catch (err) {
      console.error("❌ Error al eliminar imagen:", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
    fetchProductById,
    createFormData,
    deleteProductImage,
    setProducts, // Para actualizar manualmente la lista
    setError, // Para limpiar errores manualmente
  };
};
