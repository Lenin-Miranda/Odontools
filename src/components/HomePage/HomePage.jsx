import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import Header from "../Header/Header";
import Main from "../Main/Main";

export default function HomePage({
  categories,
  products,
  isFavorite,
  toggleFavorite,
}) {
  const location = useLocation();

  useEffect(() => {
    // Si hay un estado de scrollTo, hacer scroll a esa sección
    if (location.state?.scrollTo) {
      // Esperar a que la página se renderice completamente
      const timer = setTimeout(() => {
        scroller.scrollTo(location.state.scrollTo, {
          smooth: true,
          duration: 500,
          offset: -80, // Ajuste para el navbar fijo
        });
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <>
      <Header />
      <Main
        categories={categories}
        products={products}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
    </>
  );
}
