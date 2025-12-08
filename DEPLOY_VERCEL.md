# 🚀 Deploy en Vercel - OdoonTools

## ✅ Preparación Completada

El proyecto está listo para ser desplegado en Vercel. Todos los archivos necesarios han sido creados y configurados:

### Archivos de Configuración

- ✅ `vercel.json` - Configuración de rewrites para React Router
- ✅ `.env.example` - Template de variables de entorno
- ✅ `.env` - Variables de entorno locales (no se subirá a Git)
- ✅ `src/config/api.js` - Configuración centralizada de API

### Cambios Realizados

- ✅ Todas las URLs hardcodeadas (`http://localhost:3001`) han sido reemplazadas por `getApiUrl()`
- ✅ Build de producción exitoso (`npm run build`)
- ✅ Todos los archivos actualizados con imports de `getApiUrl`

---

## 📋 Pasos para el Deploy

### 1️⃣ Deploy del Backend (PRIMERO)

**⚠️ IMPORTANTE:** Debes desplegar el backend ANTES de desplegar el frontend en Vercel.

#### Opciones de hosting para el backend:

**Opción A: Render (Recomendado - Gratis)**

1. Ve a [render.com](https://render.com)
2. Crea una cuenta y conecta tu repositorio de GitHub
3. Selecciona "New Web Service"
4. Configura:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start` (o el comando que uses)
   - **Environment:** Node
5. Agrega las variables de entorno del backend (DB, JWT, etc.)
6. Haz clic en "Create Web Service"
7. **Guarda la URL del backend** (ej: `https://tu-backend.onrender.com`)

**Opción B: Railway**

1. Ve a [railway.app](https://railway.app)
2. Conecta tu repositorio del backend
3. Railway detectará automáticamente que es Node.js
4. Configura las variables de entorno
5. **Guarda la URL del backend**

**Opción C: Heroku**

1. Ve a [heroku.com](https://heroku.com)
2. Crea una nueva app
3. Conecta tu repositorio o usa Heroku CLI
4. Configura las variables de entorno
5. **Guarda la URL del backend**

#### Configurar CORS en el Backend

En tu backend, asegúrate de permitir el dominio de Vercel:

```javascript
// backend/server.js o similar
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173", // Desarrollo local
      "https://tu-app.vercel.app", // Tu dominio de Vercel
    ],
    credentials: true,
  })
);
```

---

### 2️⃣ Deploy del Frontend en Vercel

#### Paso 1: Subir a GitHub

```bash
git add .
git commit -m "Preparar proyecto para deploy en Vercel"
git push origin main
```

#### Paso 2: Configurar en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Haz clic en **"Add New Project"**
4. Selecciona tu repositorio de OdoonTools
5. Vercel detectará automáticamente que es un proyecto Vite

#### Paso 3: Configurar Variables de Entorno

En la sección "Environment Variables" de Vercel:

| Name           | Value                             |
| -------------- | --------------------------------- |
| `VITE_API_URL` | `https://tu-backend.onrender.com` |

⚠️ Reemplaza `https://tu-backend.onrender.com` con la URL real de tu backend del Paso 1.

#### Paso 4: Deploy

1. Haz clic en **"Deploy"**
2. Espera a que termine el build (1-3 minutos)
3. Vercel te dará una URL como: `https://odoontools.vercel.app`

---

## 🧪 Probar el Deploy

### Verificar que todo funciona:

1. **Abre tu app en Vercel:** `https://tu-app.vercel.app`
2. **Prueba el login/registro**
3. **Verifica que los productos cargan** desde el backend
4. **Prueba agregar al carrito**
5. **Revisa la consola del navegador** (F12) para ver si hay errores

### Si algo falla:

#### Error: "Failed to fetch" o "Network Error"

- ✅ Verifica que el backend esté funcionando
- ✅ Revisa que `VITE_API_URL` en Vercel sea correcto
- ✅ Confirma que CORS esté configurado en el backend

#### Error: "Unauthorized" o "Session expired"

- ✅ Verifica que las cookies estén habilitadas
- ✅ Revisa la configuración de `credentials: include`
- ✅ Asegúrate de que el backend tenga `credentials: true` en CORS

#### Páginas en blanco o 404

- ✅ Verifica que `vercel.json` existe y tiene las rewrites correctas
- ✅ Asegúrate de que el build fue exitoso en Vercel

---

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de cambios"
git push origin main
```

Vercel detectará automáticamente el push y hará un nuevo deploy.

---

## 📱 Dominio Personalizado (Opcional)

1. En Vercel, ve a tu proyecto
2. Ve a "Settings" → "Domains"
3. Agrega tu dominio personalizado
4. Sigue las instrucciones para configurar DNS
5. **No olvides actualizar CORS** en el backend con tu nuevo dominio

---

## 🛠️ Desarrollo Local

Para trabajar localmente después del deploy:

```bash
# 1. Asegúrate de tener .env con:
# VITE_API_URL=http://localhost:3001

# 2. Inicia el servidor de desarrollo
npm run dev

# 3. El proyecto correrá en http://localhost:5173
```

---

## 📊 Monitoreo

- **Vercel Dashboard:** Ver logs, analytics y errores
- **Backend logs:** Depende de tu plataforma (Render/Railway/Heroku)

---

## ✅ Checklist Final

Antes de considerar el deploy completo:

- [ ] Backend desplegado y funcionando
- [ ] URL del backend copiada
- [ ] CORS configurado en backend con dominio de Vercel
- [ ] Frontend desplegado en Vercel
- [ ] Variable `VITE_API_URL` configurada en Vercel
- [ ] Login funciona
- [ ] Productos cargan desde el backend
- [ ] Carrito funciona
- [ ] Checkout funciona
- [ ] Admin dashboard accesible (si eres admin)

---

## 🎉 ¡Listo!

Tu app está en producción. Comparte el link: `https://tu-app.vercel.app`

---

## 📞 Soporte

Si encuentras problemas:

1. Revisa los logs de Vercel (pestaña "Deployments")
2. Revisa los logs del backend
3. Abre la consola del navegador (F12) para ver errores JavaScript
4. Verifica que todas las variables de entorno estén correctas

---

## 🔐 Seguridad

⚠️ **NUNCA** subas el archivo `.env` a Git. Está en `.gitignore` por defecto.

Variables sensibles que NUNCA deben estar en el frontend:

- Claves secretas de JWT
- Contraseñas de base de datos
- API keys privadas

Todas estas deben estar SOLO en el backend.

---

_Última actualización: $(date)_
