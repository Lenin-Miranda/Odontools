# API Documentation - OdonTools

## Overview

This documentation describes the data structure and internal APIs used in OdonTools. While the application currently works with static data, this documentation serves as a foundation for future backend implementations.

## Data Structure

### Products

```javascript
{
  id: number,                    // Unique product ID
  name: string,                  // Product name
  image: string,                 // Image URL
  description: string,           // Product description
  price: number,                 // Price in pesos
  discountedPrice: function,     // Function to calculate discounted price
  rating: number,                // Rating (0-5)
  reviews: number,               // Number of reviews
  discount: boolean,             // If it has active discount
  categorie: string,             // Product category
  isFavorite: boolean,           // If it's user's favorite
  isLiked: boolean,              // If user likes it
  stock: number                  // Inventory quantity
}
```

### Categories

```javascript
{
  id: number,                    // Unique category ID
  name: string,                  // Category name
  image: string,                 // Representative image URL
  description: string            // Category description
}
```

### Users

```javascript
{
  id: number,                    // Unique user ID
  name: string,                  // Full name
  email: string,                 // Unique email
  password: string,              // Password (hashed in production)
  avatar: string,                // Avatar URL
  role: string,                  // 'user' | 'admin'
  isActive: boolean,             // Account status
  createdAt: string,             // Registration date
  favorites: number[],           // Favorite product IDs
  cart: CartItem[]               // Cart items
}
```

### Cart Item

```javascript
{
  productId: number,             // Product ID
  quantity: number,              // Selected quantity
  addedAt: string                // Date added to cart
}
```

## Custom Hooks

### useCart

Hook to manage shopping cart state.

```javascript
const {
  cart, // Array of cart items
  totalQuantity, // Total quantity of items
  totalPrice, // Total price
  addToCart, // Function to add products
  removeFromCart, // Function to remove products
  updateQuantity, // Function to update quantity
  clearCart, // Function to clear cart
} = useCart();
```

#### useCart Methods

**addToCart(product, quantity = 1)**

- Adds a product to cart
- If exists, increments quantity
- Parameters:
  - `product`: Product object
  - `quantity`: Quantity to add (default: 1)

**removeFromCart(productId)**

- Completely removes a product from cart
- Parameters:
  - `productId`: ID of product to remove

**updateQuantity(productId, quantity)**

- Updates quantity of a specific product
- Parameters:
  - `productId`: Product ID
  - `quantity`: New quantity

**clearCart()**

- Completely empties the cart

## Components and Props

### ProductsCard

```javascript
<ProductsCard
  products={Array} // Array of products to display
  onAddToCart={Function} // Callback when adding to cart
  onToggleFavorite={Function} // Callback when marking favorite
/>
```

### CartModal

```javascript
<CartModal
  isCartOpen={Boolean} // Visibility control
  cartItems={Array} // Cart items
  closeCart={Function} // Function to close modal
  children={ReactNode} // Additional content
/>
```

### NavBar

```javascript
<NavBar
  toggleCart={Function} // Function to open/close cart
  isLoggedIn={Boolean} // Authentication state
  setIsLogginOpen={Function} // Login modal control
  setIsSignUpOpen={Function} // Signup modal control
  setIsUserOpen={Function} // User modal control
  children={ReactNode} // Additional content (modals)
/>
```

### SearchBar

```javascript
<SearchBar
  onSearch={Function} // Callback with search term
  placeholder={String} // Placeholder text
  className={String} // Additional CSS classes
/>
```

## Filters and Sorting

### Filter Types

```javascript
// By category
filterTypes.CATEGORY = "category";

// By price
filterTypes.PRICE_RANGE = "priceRange";

// By rating
filterTypes.RATING = "rating";

// By availability
filterTypes.IN_STOCK = "inStock";

// By discounts
filterTypes.ON_SALE = "onSale";
```

### Sort Types

```javascript
// By ascending price
sortTypes.PRICE_LOW_TO_HIGH = "priceLowToHigh";

// By descending price
sortTypes.PRICE_HIGH_TO_LOW = "priceHighToLow";

// By name A-Z
sortTypes.NAME_A_TO_Z = "nameAToZ";

// By name Z-A
sortTypes.NAME_Z_TO_A = "nameZToA";

// By rating
sortTypes.RATING = "rating";

// By newest
sortTypes.NEWEST = "newest";
```

## Application State

### Global State (App.jsx)

```javascript
{
  isAdmin: Boolean,              // User is administrator
  isLoggedIn: Boolean,           // User authenticated
  cartItems: Array,              // Cart items (legacy)
  isFavorite: Boolean,           // Favorites control
  isLiked: Boolean,              // Likes control
  isCartOpen: Boolean,           // Cart modal visible
  isLogginOpen: Boolean,         // Login modal visible
  isSignUpOpen: Boolean,         // Signup modal visible
  isUserOpen: Boolean,           // User modal visible
  formData: Object               // Form data
}
```

## Application Routes

### Public Routes

- `/` - Main page with featured products
- `/products` - Complete product catalog
- `/admin` - Administrator login page

### Admin Routes (Future)

- `/admin/dashboard` - Main panel
- `/admin/products` - Product management
- `/admin/users` - User management
- `/admin/orders` - Order management
- `/admin/settings` - Settings

## Available Categories

1. **Dental Brushes** - Manual and electric brushes
2. **Dental Floss** - Interdental cleaning products
3. **Mouthwash** - Rinses and mouthwashes
4. **Toothpaste** - Dental creams and cleaning products
5. **Whitening** - Teeth whitening products
6. **Orthodontics** - Braces and orthodontic products
7. **Prosthetics** - Dental prosthetic products
8. **Professional Tools** - Dental instruments

## Validations

### Registration Form

```javascript
{
  name: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    required: true,
    minLength: 6,
    maxLength: 20
  }
}
```

### Login Form

```javascript
{
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    required: true,
    minLength: 6
  }
}
```

## Status Codes (Future)

### Successful Responses

- `200` - OK - Successful request
- `201` - Created - Resource created successfully
- `204` - No Content - Successful deletion

### Client Errors

- `400` - Bad Request - Invalid data
- `401` - Unauthorized - Not authenticated
- `403` - Forbidden - No permissions
- `404` - Not Found - Resource not found
- `409` - Conflict - Conflict (duplicate email)

### Server Errors

- `500` - Internal Server Error - Internal error
- `503` - Service Unavailable - Service unavailable

## Development Notes

- All prices are in Colombian pesos (COP)
- Images are loaded from `assets/tools/` folder
- Current data is mock data for development
- Application is prepared for REST API integration
- JWT authentication recommended for production
- Consider implementing cache for better performance
- Prepared for future internationalization (i18n)

```javascript
{
  id: number,                    // ID único de la categoría
  name: string,                  // Nombre de la categoría
  image: string,                 // URL de la imagen representativa
  description: string            // Descripción de la categoría
}
```

### Usuarios

```javascript
{
  id: number,                    // ID único del usuario
  name: string,                  // Nombre completo
  email: string,                 // Email único
  password: string,              // Contraseña (hasheada en producción)
  avatar: string,                // URL del avatar
  role: string,                  // 'user' | 'admin'
  isActive: boolean,             // Estado de la cuenta
  createdAt: string,             // Fecha de registro
  favorites: number[],           // IDs de productos favoritos
  cart: CartItem[]               // Items en el carrito
}
```

### Item del Carrito

```javascript
{
  productId: number,             // ID del producto
  quantity: number,              // Cantidad seleccionada
  addedAt: string                // Fecha de agregado al carrito
}
```

## Hooks Personalizados

### useCart

Hook para gestionar el estado del carrito de compras.

```javascript
const {
  cart, // Array de items en el carrito
  totalQuantity, // Cantidad total de items
  totalPrice, // Precio total
  addToCart, // Función para agregar productos
  removeFromCart, // Función para quitar productos
  updateQuantity, // Función para actualizar cantidad
  clearCart, // Función para vaciar carrito
} = useCart();
```

#### Métodos del useCart

**addToCart(product, quantity = 1)**

- Agrega un producto al carrito
- Si ya existe, incrementa la cantidad
- Parámetros:
  - `product`: Objeto del producto
  - `quantity`: Cantidad a agregar (default: 1)

**removeFromCart(productId)**

- Remueve completamente un producto del carrito
- Parámetros:
  - `productId`: ID del producto a remover

**updateQuantity(productId, quantity)**

- Actualiza la cantidad de un producto específico
- Parámetros:
  - `productId`: ID del producto
  - `quantity`: Nueva cantidad

**clearCart()**

- Vacía completamente el carrito

## Componentes y Props

### ProductsCard

```javascript
<ProductsCard
  products={Array} // Array de productos a mostrar
  onAddToCart={Function} // Callback al agregar al carrito
  onToggleFavorite={Function} // Callback al marcar favorito
/>
```

### CartModal

```javascript
<CartModal
  isCartOpen={Boolean} // Control de visibilidad
  cartItems={Array} // Items del carrito
  closeCart={Function} // Función para cerrar modal
  children={ReactNode} // Contenido adicional
/>
```

### NavBar

```javascript
<NavBar
  toggleCart={Function} // Función para abrir/cerrar carrito
  isLoggedIn={Boolean} // Estado de autenticación
  setIsLogginOpen={Function} // Control modal de login
  setIsSignUpOpen={Function} // Control modal de registro
  setIsUserOpen={Function} // Control modal de usuario
  children={ReactNode} // Contenido adicional (modales)
/>
```

### SearchBar

```javascript
<SearchBar
  onSearch={Function} // Callback con término de búsqueda
  placeholder={String} // Texto placeholder
  className={String} // Clases CSS adicionales
/>
```

## Filtros y Ordenamiento

### Tipos de Filtro

```javascript
// Por categoría
filterTypes.CATEGORY = "category";

// Por precio
filterTypes.PRICE_RANGE = "priceRange";

// Por rating
filterTypes.RATING = "rating";

// Por disponibilidad
filterTypes.IN_STOCK = "inStock";

// Por descuentos
filterTypes.ON_SALE = "onSale";
```

### Tipos de Ordenamiento

```javascript
// Por precio ascendente
sortTypes.PRICE_LOW_TO_HIGH = "priceLowToHigh";

// Por precio descendente
sortTypes.PRICE_HIGH_TO_LOW = "priceHighToLow";

// Por nombre A-Z
sortTypes.NAME_A_TO_Z = "nameAToZ";

// Por nombre Z-A
sortTypes.NAME_Z_TO_A = "nameZToA";

// Por rating
sortTypes.RATING = "rating";

// Por más recientes
sortTypes.NEWEST = "newest";
```

## Estados de la Aplicación

### Estado Global (App.jsx)

```javascript
{
  isAdmin: Boolean,              // Usuario es administrador
  isLoggedIn: Boolean,           // Usuario autenticado
  cartItems: Array,              // Items del carrito (legacy)
  isFavorite: Boolean,           // Control de favoritos
  isLiked: Boolean,              // Control de likes
  isCartOpen: Boolean,           // Modal del carrito visible
  isLogginOpen: Boolean,         // Modal de login visible
  isSignUpOpen: Boolean,         // Modal de registro visible
  isUserOpen: Boolean,           // Modal de usuario visible
  formData: Object               // Datos de formularios
}
```

## Rutas de la Aplicación

### Rutas Públicas

- `/` - Página principal con productos destacados
- `/products` - Catálogo completo de productos
- `/admin` - Página de login de administrador

### Rutas de Admin (Futuras)

- `/admin/dashboard` - Panel principal
- `/admin/products` - Gestión de productos
- `/admin/users` - Gestión de usuarios
- `/admin/orders` - Gestión de pedidos
- `/admin/settings` - Configuraciones

## Categorías Disponibles

1. **Cepillos Dentales** - Cepillos manuales y eléctricos
2. **Hilo Dental** - Productos para limpieza interdental
3. **Enjuagues Bucales** - Enjuagues y colutorios
4. **Pastas Dentales** - Cremas dentales y productos de limpieza
5. **Blanqueamiento** - Productos para blanquear dientes
6. **Ortodoncia** - Productos para brackets y ortodoncia
7. **Prótesis** - Productos para prótesis dentales
8. **Herramientas Profesionales** - Instrumental odontológico

## Validaciones

### Formulario de Registro

```javascript
{
  name: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    required: true,
    minLength: 6,
    maxLength: 20
  }
}
```

### Formulario de Login

```javascript
{
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    required: true,
    minLength: 6
  }
}
```

## Códigos de Estado (Futuros)

### Respuestas Exitosas

- `200` - OK - Solicitud exitosa
- `201` - Created - Recurso creado exitosamente
- `204` - No Content - Eliminación exitosa

### Errores del Cliente

- `400` - Bad Request - Datos inválidos
- `401` - Unauthorized - No autenticado
- `403` - Forbidden - Sin permisos
- `404` - Not Found - Recurso no encontrado
- `409` - Conflict - Conflicto (email duplicado)

### Errores del Servidor

- `500` - Internal Server Error - Error interno
- `503` - Service Unavailable - Servicio no disponible

## Notas de Desarrollo

- Todos los precios están en pesos colombianos (COP)
- Las imágenes se cargan desde la carpeta `assets/tools/`
- Los datos actuales son mock data para desarrollo
- La aplicación está preparada para integración con API REST
- Se recomienda implementar autenticación JWT para producción
- Considerar implementar cache para mejorar performance
- Preparado para internacionalización (i18n) futura
