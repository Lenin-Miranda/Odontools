// Configuración de la API
export const API_URL = import.meta.env.VITE_API_URL;

// Helper para construir URLs de API
export const getApiUrl = (endpoint) => {
  // Asegurar que el endpoint comience con /
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;
  return `${API_URL}${normalizedEndpoint}`;
};

// Helper para construir URLs de imágenes
export const getImageUrl = (imagePath) => {
  // Si no hay imagen, retornar null
  if (!imagePath) return null;

  // Si ya es una URL completa (http/https o data:), retornarla tal cual
  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://") ||
    imagePath.startsWith("data:")
  ) {
    return imagePath;
  }

  // Si es una ruta relativa, construir URL completa con el backend
  const normalizedPath = imagePath.startsWith("/")
    ? imagePath
    : `/${imagePath}`;
  return `${API_URL}${normalizedPath}`;
};

// Imagen placeholder cuando no hay imagen disponible
export const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDMwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjUgMTAwSDkwVjE0MEgxMjVWMTc1SDE2NVYxNDBIMjAwVjEwMEgxNjVWNzVIMTI1VjEwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHRLEHT4geDEHNTAiIHk9IjE4NSIgZmlsbD0iIzlDQTNBRiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iNTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Qcm9kdWN0bzwvdGV4dD4KPC9zdmc+";
