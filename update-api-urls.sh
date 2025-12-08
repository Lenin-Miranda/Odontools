#!/bin/bash

# Script para actualizar todas las URLs de la API a usar la configuración centralizada

echo "🔄 Actualizando URLs de API en todos los archivos..."

# Archivos a actualizar
files=(
  "src/hooks/UseCart.jsx"
  "src/hooks/useSales.js"
  "src/hooks/useProducts.js"
  "src/hooks/useUsers.js"
  "src/App.jsx"
  "src/pages/ProductDetailPage.jsx"
  "src/pages/UserProfilePage.jsx"
  "src/components/CheckoutModal/CheckoutModal.jsx"
  "src/utils/auth.js"
)

# Reemplazar http://localhost:3001 con getApiUrl
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "📝 Actualizando $file..."
    
    # Mac usa sed -i '' mientras Linux usa sed -i
    if [[ "$OSTYPE" == "darwin"* ]]; then
      # macOS
      sed -i '' 's|"http://localhost:3001/api/|getApiUrl("/api/|g' "$file"
      sed -i '' 's|`http://localhost:3001/api/|getApiUrl(`/api/|g' "$file"
    else
      # Linux
      sed -i 's|"http://localhost:3001/api/|getApiUrl("/api/|g' "$file"
      sed -i 's|`http://localhost:3001/api/|getApiUrl(`/api/|g' "$file"
    fi
  else
    echo "⚠️  Archivo no encontrado: $file"
  fi
done

echo "✅ Actualización completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Revisar los cambios con: git diff"
echo "2. Asegúrate de agregar import { getApiUrl } from '../config/api' en cada archivo"
echo "3. Crear archivo .env con: VITE_API_URL=http://localhost:3001"
echo "4. Para producción, configura VITE_API_URL en Vercel con la URL de tu backend"
