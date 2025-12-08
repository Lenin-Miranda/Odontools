// Utilidades de autenticación con Cookies
import { getApiUrl } from "../config/api";

const API_URL = "http://localhost:3001/api";

export const handleAuthError = async (response) => {
  if (response.status === 401) {
    // Token expirado o inválido
    console.warn("⚠️ Sesión expirada. Redirigiendo al login...");

    // Llamar al endpoint de logout para limpiar la cookie
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", // Importante para enviar cookies
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }

    // Limpiar datos de usuario del localStorage
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");

    // Mostrar alerta al usuario
    alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");

    // Redirigir al login
    window.location.href = "/";

    return true;
  }
  return false;
};

export const clearAuthData = async () => {
  // Llamar al endpoint de logout para limpiar la cookie
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }

  // Limpiar datos del localStorage
  localStorage.removeItem("currentUser");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("isAdmin");
};
