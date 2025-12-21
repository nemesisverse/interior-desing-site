import { useState, useEffect, useRef } from "react";
import logo from "../images/logo.svg";

export default function Navbar() {
  const [show, setShow] = useState(true);
  
  // 1. Tracks the scroll position of the PREVIOUS tick (for detecting direction)
  const lastScrollY = useRef(0);
  
  // 2. Tracks the point where we STARTED scrolling up (for measuring delta)
  const scrollUpOrigin = useRef(0);

  const controlNavbar = () => {
    const currentScrollY = window.scrollY;
    const innerHeight = window.innerHeight;
    const delta = 260; 

    // --- 1. Top of Page Logic ---
    if (currentScrollY < innerHeight) {
      setShow(true);
      // Keep refs in sync to prevent jumps when crossing the threshold
      lastScrollY.current = currentScrollY;
      scrollUpOrigin.current = currentScrollY;
      return;
    } 

    // --- 2. Direction Logic ---
    
    // IF SCROLLING DOWN (Current > Previous)
    if (currentScrollY > lastScrollY.current) {
      setShow(false); // Hide IMMEDIATELY
      
      // Reset the "Up Origin" to the current spot. 
      // This ensures that if you start scrolling up in the next moment, 
      // the measurement starts from here (the bottom).
      scrollUpOrigin.current = currentScrollY;
    } 
    
    // IF SCROLLING UP (Current < Previous)
    else {
      // We don't show immediately. We calculate the difference 
      // between where we started scrolling up vs where we are now.
      const diff = scrollUpOrigin.current - currentScrollY;

      if (diff > delta) {
        setShow(true);
        // Reset origin to avoid repeated triggers
        scrollUpOrigin.current = currentScrollY; 
      }
    }

    // Always update lastScrollY at the end to be ready for the next tick
    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    window.addEventListener("resize", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
      window.removeEventListener("resize", controlNavbar);
    };
  }, []);

  return (
    <div>
      <section id="Navbar">
        <div
          className={`fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md shadow-xl shadow-black/70 
          transition-transform duration-300 ease-in-out
          ${show ? "translate-y-0" : "-translate-y-full"}`}
        >
          <div className="container max-w-6xl mx-auto px-4 md:px-8">
            <nav className="flex items-center justify-between font-bold text-white text-lg h-24">
              <img src={logo} alt="Logo" className="w-auto h-12" />

              <div className="hidden font-ubuntu md:flex md:space-x-10">
                <div className="group inline-block">
                  <a href="#" className="relative inline-block text-white">
                    About Us
                    <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-blue-50 scale-x-0 origin-center transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                  </a>
                </div>

                <div className="group inline-block">
                  <a href="#" className="relative inline-block text-white">
                    Projects
                    <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-blue-50 scale-x-0 origin-center transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                  </a>
                </div>

                <div className="group inline-block">
                  <a href="#" className="relative inline-block text-white">
                    Services
                    <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-blue-50 scale-x-0 origin-center transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                  </a>
                </div>

                <div className="group inline-block">
                  <a href="#" className="relative inline-block text-white">
                    Contact Us
                    <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-blue-50 scale-x-0 origin-center transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
}