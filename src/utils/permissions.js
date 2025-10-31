// utils/permissions.js

/**
 * Verifica si el usuario tiene los permisos necesarios
 * @param {Object} user - Información del usuario actual
 * @param {boolean} isLoggedIn - Si el usuario está logueado
 * @param {boolean} isAdmin - Si el usuario es administrador
 * @param {string} permission - Tipo de permiso requerido ('admin', 'user', 'guest')
 * @returns {boolean} - true si tiene permisos, false si no
 */
export const hasPermission = (user, isLoggedIn, isAdmin, permission) => {
  switch (permission) {
    case "admin":
      return isLoggedIn && isAdmin;
    case "user":
      return isLoggedIn;
    case "guest":
      return true;
    default:
      return false;
  }
};

/**
 * Verifica si el usuario puede acceder a una ruta específica
 * @param {string} route - Ruta a verificar
 * @param {boolean} isLoggedIn - Si el usuario está logueado
 * @param {boolean} isAdmin - Si el usuario es administrador
 * @returns {boolean} - true si puede acceder, false si no
 */
export const canAccessRoute = (route, isLoggedIn, isAdmin) => {
  const adminRoutes = [
    "/admin",
    "/admin/products",
    "/admin/orders",
    "/admin/users",
    "/admin/analytics",
    "/admin/settings",
  ];
  const userRoutes = ["/profile", "/orders", "/favorites"];

  if (adminRoutes.some((adminRoute) => route.startsWith(adminRoute))) {
    return isLoggedIn && isAdmin;
  }

  if (userRoutes.some((userRoute) => route.startsWith(userRoute))) {
    return isLoggedIn;
  }

  return true; // Rutas públicas
};

/**
 * Obtiene el mensaje de error apropiado para acceso denegado
 * @param {string} route - Ruta a la que se intenta acceder
 * @param {boolean} isLoggedIn - Si el usuario está logueado
 * @param {boolean} isAdmin - Si el usuario es administrador
 * @returns {Object} - Objeto con título y mensaje de error
 */
export const getAccessDeniedMessage = (route, isLoggedIn, isAdmin) => {
  const adminRoutes = ["/admin"];

  if (adminRoutes.some((adminRoute) => route.startsWith(adminRoute))) {
    if (!isLoggedIn) {
      return {
        title: "🔐 Acceso Denegado",
        message:
          "Debes iniciar sesión para acceder al panel de administración.",
      };
    } else if (!isAdmin) {
      return {
        title: "🚫 Acceso Restringido",
        message:
          "No tienes permisos de administrador para acceder a esta sección.",
      };
    }
  }

  if (!isLoggedIn) {
    return {
      title: "🔐 Acceso Denegado",
      message: "Debes iniciar sesión para acceder a esta sección.",
    };
  }

  return {
    title: "🚫 Acceso Restringido",
    message: "No tienes permisos para acceder a esta sección.",
  };
};
