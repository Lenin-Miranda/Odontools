import { useState } from "react";
import { getApiUrl } from "../config/api";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todos los usuarios
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(getApiUrl("/api/auth"), {
        credentials: "include", // Envía cookies automáticamente
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

      const response = await fetch(getApiUrl(`/api/auth/${id}`), {
        credentials: "include", // Envía cookies automáticamente
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

      const response = await fetch(getApiUrl(`/api/auth/${id}`), {
        method: "PUT",
        credentials: "include", // Envía cookies automáticamente
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const result = await response.json();

      // Actualizar lista local de usuarios
      setUsers((prev) =>
        prev.map((user) => {
          if (user._id === id || user.id === id) {
            // Combinar los datos actualizados con los datos existentes
            const updatedUser = result.user || result;
            return {
              ...user,
              ...updatedUser,
              // Asegurarse de que isAdmin esté actualizado
              isAdmin: updatedUser.isAdmin,
            };
          }
          return user;
        })
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

      const response = await fetch(getApiUrl(`/api/auth/${id}`), {
        method: "DELETE",
        credentials: "include", // Envía cookies automáticamente
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
