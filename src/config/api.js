// Configuración de la API
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Helper para construir URLs de API
export const getApiUrl = (endpoint) => {
  // Asegurar que el endpoint comience con /
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_URL}${normalizedEndpoint}`;
};

export default API_URL;
