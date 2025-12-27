import React, { useEffect, useRef, useState } from "react";
// Make sure this path is correct for your project structure
import img1 from "../images/Portfolio/shivi.png";

export default function KnowUs() {
  const stickyRef = useRef(null);
  const wrapperRef = useRef(null);
  const [spacerHeight, setSpacerHeight] = useState(0);
  
  // Animation State
  const [isVisible, setIsVisible] = useState(false);

  // useRef value initialization
  const currentY = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (
      getComputedStyle(html).overflow === "hidden" ||
      getComputedStyle(body).overflow === "hidden"
    ) {
      console.warn(
        "KnowUs component: Detected overflow:hidden. This will break scrolling."
      );
    }

    const heroHeightStart = window.innerHeight;
    let currentHeroHeight = heroHeightStart;
    const safeMultiplier = 2.1;
    setSpacerHeight(heroHeightStart * safeMultiplier);

    currentY.current = currentHeroHeight;
    targetY.current = currentHeroHeight;

    const lerpFactor = 0.12;
    const speedFactor = 0.6;

    let raf = null;

    const tick = () => {
      currentY.current += (targetY.current - currentY.current) * lerpFactor;
      if (stickyRef.current) {
        stickyRef.current.style.transform = `translateY(${Math.round(
          currentY.current
        )}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const newTarget = Math.max(currentHeroHeight - scrollY * speedFactor, 0);
      targetY.current = newTarget;

      // Animation Trigger: 40% visible
      if (newTarget < currentHeroHeight * 0.6) {
        setIsVisible(true);
      }
    };

    const onResize = () => {
      currentHeroHeight = window.innerHeight;
      currentY.current = Math.max(currentY.current, currentHeroHeight);
      targetY.current = Math.max(targetY.current, 0);
      setSpacerHeight(currentHeroHeight * safeMultiplier);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const stickyStyles = {
    transform: "translateY(100vh)",
    willChange: "transform",
  };

  const baseTransition = "transition-all duration-1000 ease-out";
  const hiddenUp = "opacity-0 -translate-y-10";
  const hiddenDown = "opacity-0 translate-y-10";
  const visible = "opacity-100 translate-y-0 scale-100";

  return (
    <>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      <section ref={wrapperRef} id="knowus-wrapper" className="relative">
        <div
          ref={stickyRef}
          id="knowus"
          className="sticky top-0 h-screen w-full bg-[#FDF8F2] overflow-hidden flex flex-col justify-center"
          style={stickyStyles}
        >
          {/* --- DESIGN START --- */}

          {/* 1. "HI, MY NAME IS" - Top Left */}
          <div 
            className={`absolute top-4 left-4 md:top-12 md:left-12 z-20 ${baseTransition} delay-100 ${isVisible ? visible : hiddenUp}`}
          >
            <h2 className="text-[#8B0000] font-bold text-sm md:text-3xl uppercase tracking-tight font-sans">
              Hi, My Name Is
            </h2>
          </div>

          {/* 2. BACKGROUND TEXT "NAME" */}
          <div 
            className={`absolute top-[8%] md:top-[10%] left-0 w-full text-center z-0 pointer-events-none select-none ${baseTransition} duration-[1500ms] delay-0 ${isVisible ? visible : 'opacity-0 scale-105'}`}
          >
            {/* Adjusted font size for mobile (13vw) vs desktop (10vw) to ensure it fits/fills properly */}
            <h1 className="text-[13vw] md:text-[10vw] leading-[0.8] font-serif text-[#9A0000] uppercase tracking-tighter scale-y-110">
              Shivangi Agarwal
            </h1>
          </div>

          {/* 3. MAIN CONTENT GRID */}
          <div className="container mx-auto h-full relative z-10 flex flex-col md:flex-row">
            
            {/* LEFT COLUMN: IMAGE & Floating Label */}
            {/* On mobile, this takes 55% height. On Desktop, it takes full height but width 50% */}
            <div className="w-full h-[55%] md:h-full md:w-1/2 flex flex-col justify-end items-center md:items-start relative">
              
              {/* Floating "(designer)" text - Adjusted position for mobile */}
              <div 
                className={`absolute top-[20%] right-[5%] md:top-[35%] md:right-[-10%] z-20 ${baseTransition} delay-700 ${isVisible ? visible : hiddenDown}`}
              >
                <span className="text-[#8B0000] font-serif italic text-xl md:text-4xl font-light block animate-float">
                  *(designer)
                </span>
              </div>

              {/* The Person Image Container */}
              {/* Mobile: 90% of the 55% height wrapper. Desktop: 95% of full height. */}
              <div 
                className={`relative h-[90%] md:h-[95%] w-full flex justify-center md:justify-end overflow-hidden ${baseTransition} delay-300 ${isVisible ? visible : hiddenDown}`}
              >
                 <img
                  src={img1}
                  alt="co-founder portrait"
                  className="h-full object-cover grayscale contrast-110 object-top mask-image-gradient transition-transform duration-700 hover:scale-105"
                  style={{
                     maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                     WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                  }}
                />
              </div>
            </div>

            {/* RIGHT COLUMN: TEXT BLOCK & BUTTON */}
            {/* On mobile, this takes the remaining height (auto) and adds padding */}
            <div className="w-full h-auto md:h-full md:w-1/2 flex flex-col justify-start md:justify-end pb-8 px-6 md:pb-24 md:pl-0 md:pr-12">
              <div className="md:max-w-lg ml-auto">
                {/* Paragraph */}
                <p 
                  className={`text-[#8B0000] font-serif italic text-sm md:text-2xl leading-relaxed text-center md:text-left mb-6 md:mb-10 ${baseTransition} delay-500 ${isVisible ? visible : hiddenDown}`}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                  ipsum suspendisse ultrices gravida.
                </p>

                {/* WhatsApp Button & Arrow */}
                <a 
                  href="https://wa.me/919540777511" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center md:justify-start gap-4 md:gap-6 group cursor-pointer no-underline ${baseTransition} delay-700 ${isVisible ? visible : hiddenDown}`}
                >
                  <span className="border border-[#8B0000] text-[#8B0000] px-6 py-2 md:px-8 md:py-3 rounded-full uppercase tracking-widest text-xs md:text-sm font-semibold group-hover:bg-[#8B0000] group-hover:text-[#FDF8F2] transition-colors duration-300">
                    Contact Our Team
                  </span>
                  
                  <svg 
                    width="40" 
                    height="20" 
                    viewBox="0 0 60 20" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-[#8B0000] w-[40px] md:w-[60px] transform group-hover:translate-x-2 transition-transform duration-300"
                  >
                    <path d="M0 10H58M58 10L48 1M58 10L48 19" strokeWidth="1.5"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* --- DESIGN END --- */}
        </div>

        <div aria-hidden style={{ height: spacerHeight }} className="w-full" />
      </section>
    </>
  );
}