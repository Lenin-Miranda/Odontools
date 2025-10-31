import { Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ProtectedRoute.css";

export default function ProtectedRoute({
  children,
  isLoggedIn,
  isAdmin,
  requireAdmin = false,
}) {
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  useEffect(() => {
    if (!isLoggedIn || (requireAdmin && !isAdmin)) {
      const timer = setInterval(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);

      const redirectTimer = setTimeout(() => {
        window.location.href = "/";
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(redirectTimer);
      };
    }
  }, [isLoggedIn, isAdmin, requireAdmin]);

  // Si se requiere estar logueado y no está logueado
  if (!isLoggedIn) {
    return (
      <div className="access-denied">
        <h2 className="access-denied__title">🔐 Acceso Denegado</h2>
        <p className="access-denied__message">
          Debes iniciar sesión para acceder a esta sección.
        </p>
        <p className="access-denied__countdown">
          Serás redirigido al inicio en {redirectCountdown} segundos...
        </p>
        <Link to="/" className="access-denied__button">
          Volver al Inicio Ahora
        </Link>
      </div>
    );
  }

  // Si se requiere ser admin y no es admin
  if (requireAdmin && !isAdmin) {
    return (
      <div className="access-denied">
        <h2 className="access-denied__title">🚫 Acceso Restringido</h2>
        <p className="access-denied__message">
          No tienes permisos de administrador para acceder a esta sección.
        </p>
        <p className="access-denied__countdown">
          Serás redirigido al inicio en {redirectCountdown} segundos...
        </p>
        <Link to="/" className="access-denied__button">
          Volver al Inicio Ahora
        </Link>
      </div>
    );
  }

  // Si pasa todas las validaciones, renderiza el componente
  return children;
}
