import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "../images/logo.svg";

export default function Navbar2() {
  const [show, setShow] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const lastScrollY = useRef(0);
  const scrollUpOrigin = useRef(0);

  // --- CONFIGURATION ---
  const navLinks = [
    { name: "Home", link: "/" },
    { name: "Portfolio", link: "/Portfolio" },
    { name: "Blogs", link: "/services" },
    { name: "Career", link: "#contact" },
    { name: "Contact Us", link: "/contactus" }
  ];

  const controlNavbar = () => {
    const currentScrollY = window.scrollY;
    
    // If menu is open, do not hide navbar
    if (isOpen) return;

    const delta = 10; // Reduced delta for quicker reaction on scroll up

    // 1. SCROLL DOWN
    if (currentScrollY > lastScrollY.current) {
      // Hide immediately when scrolling down, even at the start
      // Added a small buffer (> 10) prevents flickering at absolute 0
      if (currentScrollY > 10) {
        setShow(false);
      }
      scrollUpOrigin.current = currentScrollY;
    } 
    // 2. SCROLL UP
    else {
      const diff = scrollUpOrigin.current - currentScrollY;
      // Show if we scrolled up more than delta or if we are at the very top
      if (diff > delta || currentScrollY < 10) {
        setShow(true);
        scrollUpOrigin.current = currentScrollY;
      }
    }

    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    window.addEventListener("resize", controlNavbar);
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

  return (
    <div>
      <section id="Navbar">
        <div
          className={`fixed top-0 left-0 w-full z-50 
          transition-transform duration-300 ease-in-out
          ${show ? "translate-y-0" : "-translate-y-full"}`}
        >
          {/* BACKGROUND SHEET */}
          <div
            className={`absolute top-0 left-0 w-full 
            transition-all duration-500 ease-in-out
            bg-black/50 backdrop-blur-md shadow-xl shadow-black/70
            ${isOpen ? "h-screen" : "h-14 md:h-16"}`} 
          ></div>
          {/* Height reduced to h-14 (mobile) and h-16 (desktop) */}

          {/* NAVBAR CONTENT */}
          <div className="container relative z-10 max-w-6xl mx-auto px-4 md:px-8">
            <nav className="flex items-center justify-between font-bold text-white h-14 md:h-16">
              {/* Logo */}
              <img src={logo} alt="Logo" className="w-auto h-6 md:h-8" /> 
              {/* Logo height reduced to fit container */}

              {/* Desktop Menu */}
              <div className="hidden font-ubuntu md:flex md:space-x-10 text-lg">
                {navLinks.map((item) => (
                  <div key={item.name} className="group inline-block">
                    <Link to={item.link} className="relative inline-block text-white">
                      {item.name}
                      <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-blue-50 scale-x-0 origin-center transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                    </Link>
                  </div>
                ))}
              </div>  

              {/* Hamburger Icon */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="group relative w-10 h-10 focus:outline-none flex justify-center items-center"
                  aria-label="Toggle menu"
                >
                  <div className="flex flex-col justify-between w-6 h-5 transform transition-all duration-300 origin-center overflow-hidden">
                    {/* Slightly smaller hamburger wrapper w-6 h-5 */}
                    <span
                      className={`${hamburgerLineClass} origin-center ${
                        isOpen ? "translate-y-[9px] rotate-45" : ""
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
                        isOpen ? "-translate-y-[9px] -rotate-45" : ""
                      }`}
                    />
                  </div>
                </button>
              </div>
            </nav>
          </div>

          {/* MOBILE MENU LINKS */}
          <div
            className={`md:hidden absolute top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none
            transition-opacity duration-300 ease-in-out
            ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0"}`}
          >
            <div className="flex flex-col items-center space-y-8 font-ubuntu text-2xl">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  onClick={handleLinkClick}
                  className="text-white hover:text-blue-300 transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute left-0 -bottom-2 h-[2px] w-full bg-blue-50 scale-x-0 origin-center transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}