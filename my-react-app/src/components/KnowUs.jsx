import React, { useEffect, useRef, useState } from "react";
// Make sure this path is correct for your project structure
import img1 from "../images/Portfolio/shivi.png";

export default function KnowUs() {
  const stickyRef = useRef(null);
  const wrapperRef = useRef(null);
  const [spacerHeight, setSpacerHeight] = useState(0);

  // useRef value initialization for sticky scroll logic
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

  return (
    <>
      <section ref={wrapperRef} id="knowus-wrapper" className="relative">
        <div
          ref={stickyRef}
          id="knowus"
          className="sticky top-0 h-screen w-full bg-[#FDF8F2] overflow-hidden flex flex-col justify-center"
          style={stickyStyles}
        >
          {/* --- DESIGN START --- */}

          {/* 1. "HI, MY NAME IS" - Top Left */}
          <div className="absolute top-4 left-4 md:top-12 md:left-12 z-20">
            <h2 className="text-[#8B0000] font-bold text-sm md:text-3xl uppercase tracking-tight font-sans">
              Hi, My Name Is
            </h2>
          </div>

          {/* 2. BACKGROUND TEXT "NAME" */}
          <div className="absolute top-[8%] md:top-[10%] left-0 w-full text-center z-0 pointer-events-none select-none">
            <h1 className="text-[13vw] md:text-[10vw] leading-[0.8] font-serif text-[#9A0000] uppercase tracking-tighter scale-y-110">
              Shivangi Agarwal
            </h1>
          </div>

          {/* 3. MAIN CONTENT GRID */}
          <div className="container mx-auto h-full relative z-10 flex flex-col md:flex-row">
            
            {/* LEFT COLUMN: IMAGE & Label */}
            <div className="w-full h-[55%] md:h-full md:w-1/2 flex flex-col justify-end items-center md:items-start relative">
              
              {/* "(designer)" text */}
              <div className="absolute top-[20%] right-[5%] md:top-[35%] md:right-[-10%] z-20">
                <span className="text-[#8B0000] font-serif italic text-xl md:text-4xl font-light block">
                  *(designer)
                </span>
              </div>

              {/* The Person Image Container */}
              <div className="relative h-[90%] md:h-[95%] w-full flex justify-center md:justify-end overflow-hidden">
                <img
                  src={img1}
                  alt="co-founder portrait"
                  className="h-full object-cover grayscale contrast-110 object-top mask-image-gradient"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, black 85%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 85%, transparent 100%)",
                  }}
                />
              </div>
            </div>

            {/* RIGHT COLUMN: TEXT BLOCK & BUTTON */}
            <div className="w-full h-auto md:h-full md:w-1/2 flex flex-col justify-start md:justify-end pb-8 px-6 md:pb-24 md:pl-0 md:pr-12">
              <div className="md:max-w-lg ml-auto">
                {/* Paragraph */}
                <p className="text-[#8B0000] font-serif italic text-sm md:text-2xl leading-relaxed text-center md:text-left mb-6 md:mb-10">
                  I design thoughtful, functional interiors that balance aesthetics with everyday living. With a keen eye for detail and a passion for purposeful design, I transform spaces into environments that feel refined, comfortable, and uniquely personal.
                </p>

                {/* WhatsApp Button & Arrow */}
                <a
                  href="https://wa.me/919540777511"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start gap-4 md:gap-6 group cursor-pointer no-underline"
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
                    <path
                      d="M0 10H58M58 10L48 1M58 10L48 19"
                      strokeWidth="1.5"
                    />
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