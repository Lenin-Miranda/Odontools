# Solución Implementada: Manejo de Token Expirado (Error 401)

## Problema

Cuando un usuario vuelve después de un tiempo y el token JWT ha expirado, al intentar agregar productos al carrito u otras acciones, recibía un error 401 (Unauthorized) y la aplicación no lo manejaba correctamente.

## Solución Implementada

### 1. Utilidad de Autenticación (`src/utils/auth.js`)

Creado archivo con funciones utilitarias:

- **`handleAuthError(response)`**: Detecta errores 401, limpia el localStorage y redirige al login
- **`getAuthToken()`**: Obtiene el token de cualquier ubicación en localStorage
- **`clearAuthData()`**: Limpia todos los datos de autenticación

### 2. Actualización de `UseCart.jsx`

✅ Todas las funciones ahora manejan errores 401:

- `fetchCart()`
- `addToCart()`
- `removeFromCart()`
- `clearCart()`
- `deleteItem()`
- `increaseQuantity()`

### 3. Actualización de `useSales.js`

✅ Todas las funciones usan `getAuthToken()` en lugar de `getToken()`:

- `fetchSales()`
- `createSale()`
- `getSalesByUser()`
- `getSaleById()`
- `updateSaleStatus()`
- `confirmSale()`
- `exportSale()`
- `exportSalesToCSV()`
- `exportUserSalesToCSV()`

## Flujo Actual

1. **Usuario intenta una acción** (agregar al carrito, ver pedidos, etc.)
2. **Si el token expiró** → Backend responde con 401
3. **handleAuthError() detecta el 401**:
   - Limpia todo el localStorage
   - Muestra alerta: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente."
   - Redirige a la página de login (`/`)

## Beneficios

✅ **Experiencia de usuario mejorada**: El usuario sabe exactamente qué pasó
✅ **Seguridad**: Se limpia correctamente toda la información de sesión
✅ **Consistencia**: Todas las peticiones al backend manejan el error de la misma forma
✅ **Sin estados inconsistentes**: El carrito y otros datos se limpian correctamente

## Próximas Mejoras (Opcionales)

1. **Refresh Token**: Implementar renovación automática del token antes de que expire
2. **Modal personalizado**: En lugar de `alert()`, usar un modal más atractivo
3. **Persistencia de intención**: Recordar qué quería hacer el usuario para retomarlo después del login
4. **Timeout warning**: Avisar al usuario 5 minutos antes de que expire la sesión

## Testing

Para probar que funciona:

1. Iniciar sesión
2. Esperar a que el token expire (o eliminarlo manualmente del localStorage en DevTools)
3. Intentar agregar un producto al carrito
4. Debería mostrar la alerta y redirigir al login
