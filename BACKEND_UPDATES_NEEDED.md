# Actualizaciones Necesarias en el Backend

## 1. Modelo de Sale (sale.js o sales.js)

Agregar los siguientes campos al esquema:

```javascript
const saleSchema = new mongoose.Schema({
  // ... campos existentes ...

  // Nuevos campos para transferencia bancaria
  bankAccountName: {
    type: String,
    required: false, // Solo requerido si paymentMethod === 'transfer'
  },
  bankAccountNumber: {
    type: String,
    required: false, // Solo requerido si paymentMethod === 'transfer'
  },

  // ... resto de campos ...
});
```

## 2. Controlador createSale (salesController.js)

El controlador ya está actualizado correctamente. Solo asegúrate de que capture los nuevos campos:

```javascript
exports.createSale = async (req, res) => {
  try {
    const {
      paymentMethod,
      shippingAddress,
      bankAccountName,    // ✅ Nuevo
      bankAccountNumber   // ✅ Nuevo
    } = req.body;

    // ... resto del código ...

    const newSale = await Sale.create({
      user: req.user.id,
      products: saleProducts,
      status: "pending",
      totalPrice,
      paymentMethod,
      shippingAddress,
      bankAccountName,     // ✅ Nuevo
      bankAccountNumber,   // ✅ Nuevo
    });

    // ... resto del código ...
  }
};
```

## 3. Validaciones Opcionales

Puedes agregar validación para asegurarte de que si el método de pago es "transfer", los datos bancarios sean obligatorios:

```javascript
if (paymentMethod === "transfer") {
  if (!bankAccountName || !bankAccountNumber) {
    return res.status(400).json({
      success: false,
      message: "Los datos bancarios son requeridos para transferencias",
    });
  }
}
```

## 4. Verificar Rutas

Asegúrate de que las rutas estén en el orden correcto (ya está hecho):

```javascript
// ✅ Confirmar venta (cambia a paid y descuenta stock) - solo admin
router.put("/:id/confirm", protect, isAdmin, confirmSale);

// ✅ Actualizar el estado de una venta (solo admin)
router.put("/:id/status", protect, isAdmin, updateSaleStatus);
```

## Resumen del Flujo

1. **Usuario crea pedido** → Estado: `pending` (stock NO descontado)

   - Si elige "Efectivo" → Queda pendiente hasta confirmación del admin
   - Si elige "Transferencia" → Se guardan datos bancarios y queda pendiente

2. **Admin confirma pago** → Endpoint: `PUT /api/sales/:id/confirm`

   - Estado cambia a: `paid`
   - Stock se descuenta automáticamente

3. **Admin cancela pedido** → Endpoint: `PUT /api/sales/:id/status` (status: cancelled)
   - Si el estado anterior era `paid`, el stock se restaura automáticamente

## Cambios Completados en Frontend ✅

1. ✅ Eliminada opción "Tarjeta de crédito"
2. ✅ Agregado formulario de datos bancarios para transferencias
3. ✅ Agregada función `confirmSale` en useSales.js
4. ✅ Agregado botón "Confirmar Pago" en OrdersPage (solo para pedidos pending)
5. ✅ Actualizado CheckoutModal con validaciones y flujo correcto
6. ✅ Agregados estilos CSS para todos los nuevos componentes
