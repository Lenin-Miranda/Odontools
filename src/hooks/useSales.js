import { useState, useEffect } from "react";
import { handleAuthError } from "../utils/auth";

export const useSales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todas las ventas (Admin)
  const fetchSales = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/api/sales", {
        credentials: "include", // Envía cookies automáticamente
      });

      // ✅ Manejar error de autenticación
      if (await handleAuthError(response)) {
        setLoading(false);
        return { success: false, error: "Sesión expirada" };
      }

      if (!response.ok) {
        throw new Error("Error al obtener las ventas");
      }

      const result = await response.json();
      console.log("💰 Datos de ventas recibidos del backend:", result);
      setSales(result.sales || []);

      return { success: true, data: result.sales };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Crear una nueva venta (Checkout)
  const createSale = async (saleData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/api/sales", {
        method: "POST",
        credentials: "include", // Envía cookies automáticamente
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saleData),
      });

      // ✅ Manejar error de autenticación
      if (await handleAuthError(response)) {
        setLoading(false);
        return { success: false, error: "Sesión expirada" };
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear la venta");
      }

      const result = await response.json();
      console.log("✅ Venta creada:", result);

      return { success: true, data: result.sale };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Obtener ventas por usuario
  const getSalesByUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/api/sales/user", {
        credentials: "include", // Envía cookies automáticamente
      });

      // ✅ Manejar error de autenticación
      if (await handleAuthError(response)) {
        setLoading(false);
        return { success: false, error: "Sesión expirada" };
      }

      if (!response.ok) {
        throw new Error("Error al obtener las ventas del usuario");
      }

      const result = await response.json();
      console.log("📦 Órdenes del usuario:", result);
      setSales(result.sales || []);

      return { success: true, data: result.sales };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Obtener venta por ID
  const getSaleById = async (saleId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3001/api/sales/${saleId}`,
        {
          credentials: "include", // Envía cookies automáticamente
        }
      );

      // ✅ Manejar error de autenticación
      if (await handleAuthError(response)) {
        setLoading(false);
        return { success: false, error: "Sesión expirada" };
      }

      if (!response.ok) {
        throw new Error("Error al obtener la venta");
      }

      const result = await response.json();

      return { success: true, data: result.sale };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar estado de venta (Admin)
  const updateSaleStatus = async (saleId, status) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3001/api/sales/${saleId}/status`,
        {
          method: "PUT",
          credentials: "include", // Envía cookies automáticamente
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      // ✅ Manejar error de autenticación
      if (await handleAuthError(response)) {
        setLoading(false);
        return { success: false, error: "Sesión expirada" };
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el estado");
      }

      const result = await response.json();
      console.log("✅ Estado actualizado:", result);

      // Actualizar la lista local
      setSales((prev) =>
        prev.map((sale) => (sale._id === saleId ? { ...sale, status } : sale))
      );

      return { success: true, data: result.sale };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Confirmar venta y descontar stock (Admin)
  const confirmSale = async (saleId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3001/api/sales/${saleId}/status`,
        {
          method: "PUT",
          credentials: "include", // Envía cookies automáticamente
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "confirmado" }),
        }
      );

      // ✅ Manejar error de autenticación
      if (await handleAuthError(response)) {
        setLoading(false);
        return { success: false, error: "Sesión expirada" };
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al confirmar la venta");
      }

      const result = await response.json();
      console.log("✅ Venta confirmada y stock descontado:", result);

      // Actualizar la lista local
      setSales((prev) =>
        prev.map((sale) =>
          sale._id === saleId ? { ...sale, status: "confirmado" } : sale
        )
      );

      return { success: true, data: result.sale };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Exportar venta individual
  const exportSale = async (saleId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3001/api/sales/${saleId}/export`,
        {
          credentials: "include", // Envía cookies automáticamente
        }
      );

      // ✅ Manejar error de autenticación
      if (await handleAuthError(response)) {
        setLoading(false);
        return { success: false, error: "Sesión expirada" };
      }

      if (!response.ok) {
        throw new Error("Error al exportar la venta");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sale_${saleId}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      console.log("📄 Venta exportada exitosamente");

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Exportar todas las ventas a CSV (Admin)
  const exportSalesToCSV = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:3001/api/sales/csv-export",
        {
          credentials: "include", // Envía cookies automáticamente
        }
      );

      // ✅ Manejar error de autenticación
      if (await handleAuthError(response)) {
        setLoading(false);
        return { success: false, error: "Sesión expirada" };
      }

      if (!response.ok) {
        // Intentar obtener el mensaje de error del backend
        const errorData = await response.json().catch(() => null);
        const errorMessage =
          errorData?.message ||
          `Error ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sales_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      console.log("📊 Ventas exportadas a CSV exitosamente");

      return { success: true };
    } catch (err) {
      console.error("❌ Error al exportar ventas:", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Exportar ventas del usuario a CSV
  const exportUserSalesToCSV = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:3001/api/sales/user/csv-export",
        {
          credentials: "include", // Envía cookies automáticamente
        }
      );

      // ✅ Manejar error de autenticación
      if (await handleAuthError(response)) {
        setLoading(false);
        return { success: false, error: "Sesión expirada" };
      }

      if (!response.ok) {
        throw new Error("Error al exportar las ventas del usuario");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `my_orders_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      console.log("📊 Mis órdenes exportadas a CSV exitosamente");

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    sales,
    loading,
    error,
    fetchSales,
    createSale,
    getSalesByUser,
    getSaleById,
    updateSaleStatus,
    confirmSale,
    exportSale,
    exportSalesToCSV,
    exportUserSalesToCSV,
    setSales,
    setError,
  };
};
