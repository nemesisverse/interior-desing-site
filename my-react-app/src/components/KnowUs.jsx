import Project1 from "./Project1";
import React, { useEffect, useRef, useState } from "react";

export default function KnowUs() {
  const stickyRef = useRef(null);
  const wrapperRef = useRef(null);
  const [spacerHeight, setSpacerHeight] = useState(0);

  // animation refs
  const currentY = useRef(0);
  const targetY = useRef(0);

  // when true we let the content beneath overlap (appear on top)
  const [allowOverlap, setAllowOverlap] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (getComputedStyle(html).overflow === "hidden" || getComputedStyle(body).overflow === "hidden") {
      console.warn(" html/body overflow is hidden — that will prevent scrolling.");
    }

    const heroHeightStart = window.innerHeight;
    let currentHeroHeight = heroHeightStart;
    const safeMultiplier = 2.1; // 2.1 if lerpFactor is require to put weightage in scroll multiply with  currentY.current += (targetY.current - currentY.current) 
    setSpacerHeight(heroHeightStart * safeMultiplier);

    currentY.current = currentHeroHeight; // start below viewport
    targetY.current =  currentHeroHeight;

    const lerpFactor = 0.12; // 0.12 official 
    const speedFactor = 0.6;

//const desiredScrollToTop = 1200; // how many px of scroll should bring overlay to top
//const speedFactor = currentHeroHeight / desiredScrollToTop; 
// now targetY reaches 0 when scrollY >= desiredScrollToTop

    

    let raf = null;

    const tick = () => {
      currentY.current += (targetY.current - currentY.current) * lerpFactor;

      if (stickyRef.current) {
        // translateY expects px; keep it smooth via currentY
        stickyRef.current.style.transform = `translateY(${Math.round(currentY.current)}px)`;
      }

      raf = requestAnimationFrame(tick);
    };

    // scroll handler updates targetY and toggles allowOverlap when overlay reached the top
    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      targetY.current = Math.max(currentHeroHeight - scrollY * speedFactor, 0);

      // If the overlay would be fully at top (targetY === 0), we allow overlap.
      // Equivalent condition: scrollY * speedFactor >= currentHeroHeight
      const shouldAllowOverlap = scrollY * speedFactor >= currentHeroHeight;
      // Only update state if changed (avoid re-renders)
      if (shouldAllowOverlap !== allowOverlap) {
        // use setTimeout zero to avoid React state during scroll event re-entrancy — optional but safe
        setAllowOverlap(shouldAllowOverlap);
      }
    };

    const onResize = () => {
      currentHeroHeight = window.innerHeight;
      // Keep positions sane after resize
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
    // intentionally include allowOverlap in deps? No — we read/set it via closure; setAllowOverlap handles updates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Inline styles that depend on allowOverlap
  const stickyStyles = {
    transform: "translateY(100vh)", // initial
    willChange: "transform",
    // when allowOverlap is true, make the overlay visually underlayed:
    zIndex: allowOverlap ? 0 : 30,
    pointerEvents: allowOverlap ? "none" : "auto", // allow clicks to pass to beneath content
  };

  return (
    <>
      <section ref={wrapperRef} id="knowus-wrapper" className="relative">
        <div
          ref={stickyRef}
          id="knowus"
          className="sticky top-0 h-screen w-full flex items-center justify-center bg-[#F3EEEA]"
          style={stickyStyles}
        >
          <div className="container max-w-6xl mx-auto text-center px-6">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Who We Are</h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              This section moves up as you scroll, fully covering the Hero while preserving normal page scroll behavior.
            </p>
          </div>
        </div>

        <div aria-hidden style={{ height: spacerHeight }} className="w-full" />
      </section>

      {/* Example section BELOW that should scroll *over* the overlay when allowOverlap === true.
          Important: give this section a higher stacking context (z-index) so it can appear above.
          Use relative + z-* or a utility class that gives higher z-index (e.g., z-40). */}
      <Project1 />
    </>
  );
}
