import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // "0, 0" means x and y coordinates (top left)
    window.scrollTo(0, 0);
  }, [pathname]); // This dependency array ensures it runs on every route change

  return null;
};

export default ScrollToTop;