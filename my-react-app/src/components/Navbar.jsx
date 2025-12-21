import { useState, useEffect, useRef } from "react";
import logo from "../images/logo.svg";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  
  // New state to track if we are at the top (Hero section)
  const [atHero, setAtHero] = useState(true);

  const lastScrollY = useRef(0);
  const scrollUpOrigin = useRef(0);

  const controlNavbar = () => {
    const currentScrollY = window.scrollY;
    const innerHeight = window.innerHeight;

    // 1. Update the 'atHero' state based on scroll position
    // If we are within the first screen height, we are at the hero.
    setAtHero(currentScrollY < innerHeight);

    if (isOpen) return;

    const delta = 140;

    if (currentScrollY < innerHeight) {
      setShow(true);
      lastScrollY.current = currentScrollY;
      scrollUpOrigin.current = currentScrollY;
      return;
    }

    if (currentScrollY > lastScrollY.current) {
      setShow(false);
      scrollUpOrigin.current = currentScrollY;
    } else {
      const diff = scrollUpOrigin.current - currentScrollY;
      if (diff > delta) {
        setShow(true);
        scrollUpOrigin.current = currentScrollY;
      }
    }
    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    window.addEventListener("resize", controlNavbar);
    // Trigger once on mount to check initial position
    controlNavbar(); 
    return () => {
      window.removeEventListener("scroll", controlNavbar);
      window.removeEventListener("resize", controlNavbar);
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const hamburgerLineClass = `h-[3px] w-full bg-white rounded-full transition-all duration-300 ease-in-out group-hover:bg-blue-300`;

  // Helper boolean to decide when to show the background
  // Show background if: The menu is OPEN -OR- We are NOT at the hero section
  const showBackground = isOpen || !atHero;

  return (
    <div>
      <section id="Navbar">
        <div
          className={`fixed top-0 left-0 w-full z-50 
          transition-transform duration-300 ease-in-out
          ${show ? "translate-y-0" : "-translate-y-full"}`}
        >
          {/* 2. UNIFIED BACKGROUND SHEET 
              Modified logic: 
              - If 'showBackground' is true: apply black background, blur, and shadow.
              - If false (at hero & closed): use 'bg-transparent' and no shadow/blur.
          */}
          <div
            className={`absolute top-0 left-0 w-full 
            transition-all duration-500 ease-in-out
            ${isOpen ? "h-screen" : "h-20 md:h-24"}
            ${
              showBackground
                ? "bg-black/50 backdrop-blur-md shadow-xl shadow-black/70"
                : "bg-transparent shadow-none backdrop-blur-none"
            }`}
          ></div>

          {/* 3. NAVBAR CONTENT */}
          <div className="container relative z-10 max-w-6xl mx-auto px-4 md:px-8">
            <nav className="flex items-center justify-between font-bold text-white h-20 md:h-24">
              {/* Logo */}
              <img src={logo} alt="Logo" className="w-auto h-10 md:h-12" />

              {/* Desktop Menu */}
              <div className="hidden font-ubuntu md:flex md:space-x-10 text-lg">
                {["About Us", "Projects", "Services", "Contact Us"].map(
                  (item) => (
                    <div key={item} className="group inline-block">
                      <a href="#" className="relative inline-block text-white">
                        {item}
                        <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-blue-50 scale-x-0 origin-center transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                      </a>
                    </div>
                  )
                )}
              </div>

              {/* Hamburger Icon */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="group relative w-10 h-10 focus:outline-none flex justify-center items-center"
                  aria-label="Toggle menu"
                >
                  <div className="flex flex-col justify-between w-7 h-6 transform transition-all duration-300 origin-center overflow-hidden">
                    <span
                      className={`${hamburgerLineClass} origin-center ${
                        isOpen ? "translate-y-[10px] rotate-45" : ""
                      }`}
                    />
                    <span
                      className={`${hamburgerLineClass} ${
                        isOpen
                          ? "opacity-0 -translate-x-full"
                          : "opacity-100"
                      }`}
                    />
                    <span
                      className={`${hamburgerLineClass} origin-center ${
                        isOpen ? "-translate-y-[10px] -rotate-45" : ""
                      }`}
                    />
                  </div>
                </button>
              </div>
            </nav>
          </div>

          {/* 4. MOBILE MENU LINKS */}
          <div
            className={`md:hidden absolute top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none
            transition-opacity duration-300 ease-in-out
            ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0"}`}
          >
            <div className="flex flex-col items-center space-y-8 font-ubuntu text-2xl">
              {["About Us", "Projects", "Services", "Contact Us"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    onClick={handleLinkClick}
                    className="text-white hover:text-blue-300 transition-colors relative group"
                  >
                    {item}
                    <span className="absolute left-0 -bottom-2 h-[2px] w-full bg-blue-50 scale-x-0 origin-center transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}