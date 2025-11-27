// Utilidades de autenticación

export const handleAuthError = (response) => {
  if (response.status === 401) {
    // Token expirado o inválido
    console.warn("⚠️ Sesión expirada. Redirigiendo al login...");

    // Limpiar todo el localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("jwt");
    localStorage.removeItem("access_token");

    // Mostrar alerta al usuario
    alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");

    // Redirigir al login
    window.location.href = "/";

    return true;
  }
  return false;
};

export const getAuthToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("jwt") ||
    localStorage.getItem("access_token")
  );
};

export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("authToken");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("jwt");
  localStorage.removeItem("access_token");
};
