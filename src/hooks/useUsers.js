import { useState } from "react";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener token de localStorage
  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("jwt") ||
      localStorage.getItem("access_token")
    );
  };

  // Obtener todos los usuarios
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();
      const headers = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch("http://localhost:3001/api/auth", {
        headers,
      });

      if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
      }

      const result = await response.json();
      console.log("🔍 Datos recibidos del backend:", result);

      // Ajustar según la estructura de respuesta del backend
      const usersData = result.users || result.data || result || [];
      console.log("👥 Usuarios procesados:", usersData);
      setUsers(usersData);

      return { success: true, data: result };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Obtener un usuario por ID
  const fetchUserById = async (id) => {
    setLoading(true);
    setError(null);

    try {
      if (!id || id === "undefined" || id === undefined) {
        throw new Error("ID de usuario inválido para consulta");
      }

      const token = getToken();
      const headers = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`http://localhost:3001/api/auth/${id}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error("Error al obtener el usuario");
      }

      const result = await response.json();

      return { success: true, data: result };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar usuario
  const updateUser = async (id, userData) => {
    setLoading(true);
    setError(null);

    try {
      if (!id || id === "undefined" || id === undefined) {
        throw new Error("ID de usuario inválido para actualización");
      }

      const token = getToken();
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`http://localhost:3001/api/auth/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const result = await response.json();

      // Actualizar lista local de usuarios
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id || user.id === id ? result.user || result : user
        )
      );

      return { success: true, data: result };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Eliminar usuario
  const deleteUser = async (id) => {
    setLoading(true);
    setError(null);

    try {
      if (!id || id === "undefined" || id === undefined) {
        throw new Error("ID de usuario inválido");
      }

      const token = getToken();
      const headers = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`http://localhost:3001/api/auth/${id}`, {
        method: "DELETE",
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el usuario");
      }

      // Actualizar lista local de usuarios
      setUsers((prev) =>
        prev.filter((user) => user._id !== id && user.id !== id)
      );

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    fetchUserById,
    updateUser,
    deleteUser,
    setUsers, // Para actualizar manualmente la lista
    setError, // Para limpiar errores manualmente
  };
};
