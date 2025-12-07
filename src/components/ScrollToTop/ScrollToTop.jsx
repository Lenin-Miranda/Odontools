import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // No hacer scroll si hay un scrollTo específico en el state
    if (!location.state?.scrollTo) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.state]);

  return null;
}
