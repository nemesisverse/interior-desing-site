import React, { useEffect, useRef, useState } from "react";
import img1 from "../images/Project1/pro11.png";
export default function ScrollSection({ 
  id = "section", 
  bgColor = "bg-green-100", 
  img1Color = "bg-blue-600",
  img2Color = "bg-purple-600",
  title = "Project Gallery"
}) {
  const stickyRef = useRef(null);
  const wrapperRef = useRef(null);
  const imagesContainerRef = useRef(null);

  const [spacerHeight, setSpacerHeight] = useState(0);

  // We only track the Image Animation now
  const imgCurrentY = useRef(0);
  const imgTargetY = useRef(0);

  useEffect(() => {
    let currentHeroHeight = window.innerHeight;

    // --- 1. CONFIGURATION ---
    // Speed: 0.9 = Natural feel
    const imgSpeedFactor = 0.9; 
    const lerpFactor = 0.1;

    // --- 2. CALCULATE SPACER ---
    // We only need spacer for the "Dead Zone" where images move.
    // Multiplier 4.5 gives enough scroll room for images to exit top.
    const scrollDistance = currentHeroHeight * 3.6; 
    
    // Total height = Viewport (to fill screen) + Scroll Distance
    setSpacerHeight(currentHeroHeight + scrollDistance);

    // --- 3. INITIAL POSITIONS ---
    // Images start pushed down below the viewport
    const imageStartPos = currentHeroHeight * 1.1; 
    
    imgCurrentY.current = imageStartPos;
    imgTargetY.current = imageStartPos;

    let raf = null;

    const tick = () => {
      // Smooth LERP Animation for Images ONLY
      imgCurrentY.current += (imgTargetY.current - imgCurrentY.current) * lerpFactor;
      
      if (imagesContainerRef.current) {
        imagesContainerRef.current.style.transform = `translateY(${Math.round(imgCurrentY.current)}px)`;
      }

      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (!wrapperRef.current) return;

      const windowScroll = window.scrollY || window.pageYOffset;
      const sectionTop = wrapperRef.current.offsetTop;
      
      // Calculate how far we have scrolled PAST the top of this section
      // When this is > 0, the section is stuck at the top of the screen.
      const relativeScroll = windowScroll - sectionTop;

      // Logic: 
      // 1. If relativeScroll < 0: We haven't reached the section (reset images).
      // 2. If relativeScroll > 0: Section is sticky, move images up.
      
      if (relativeScroll <= 0) {
        imgTargetY.current = imageStartPos;
      } else {
        // Move images up based on how far we've scrolled into the dead zone
        const newImgY = imageStartPos - (relativeScroll * imgSpeedFactor);
        imgTargetY.current = newImgY;
      }
    };

    const onResize = () => {
      currentHeroHeight = window.innerHeight;
      const p2 = currentHeroHeight * 4.5; 
      setSpacerHeight(currentHeroHeight + p2);
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

  return (
    // Wrapper is relative to hold the spacer
    // Removed z-index and negative margins to ensure standard flow (No Gap)
    <section ref={wrapperRef} className="relative w-full">
      
      {/* Sticky Container */}
      {/* This sits normally in flow, then sticks when it hits top */}
      <div
        id={id}
        ref={stickyRef}
        className={`sticky top-0 z-30 h-screen flex flex-col items-center justify-center ${bgColor} overflow-hidden`}
      >
        <div className="max-w-4xl text-center px-4 relative z-0">
          <h2 className="text-3xl font-semibold mb-4">{title}</h2>
          <p className="text-lg text-gray-700">
            Scroll down to see the projects rise.
          </p>
        </div>

        {/* --- IMAGE CONTAINER --- */}
        <div 
            ref={imagesContainerRef}
            className=" absolute top-0 left-0 w-full flex flex-col items-center gap-[50vh] flex-auto pointer-events-none z-10 "
            style={{ willChange: 'transform' }}
        >
            {/* Image 1 */}
            <div className={`  ${img1Color} shadow-2xl rounded-xl flex items-center justify-center  w-[82%]  h-[87vh] 
              bg-cover bg-center bg-no-repeat`}  style={{ backgroundImage: `url('${img1}')` }}>
                <span className="text-white text-4xl font-bold"></span>
            </div>

            {/* Image 2 */}
            <div className={`${img2Color} shadow-2xl rounded-xl flex items-center justify-center w-[82%]  h-[87vh] 
              bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `url('${img1}')` }}>
                <span className="text-white text-4xl font-bold"></span>
            </div>
        </div>

      </div>

      {/* Spacer creates the scrollable area below so the sticky content stays pinned */}
      {/* Logic: -100vh pulls the spacer up so it starts exactly where the sticky content starts */}
      <div style={{ height: spacerHeight, marginTop: '-100vh' }} aria-hidden="true" />
    </section>
  );
}