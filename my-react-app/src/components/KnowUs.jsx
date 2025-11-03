import React, { useEffect, useRef, useState } from "react";

export default function KnowUs() {
  const stickyRef = useRef(null);
  const wrapperRef = useRef(null);
  const [spacerHeight, setSpacerHeight] = useState(0);

  // animation refs
  const currentY = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    // 1) Quick sanity checks (logs if something likely to block scrolling)
    const html = document.documentElement;
    const body = document.body;
    if (getComputedStyle(html).overflow === "hidden" || getComputedStyle(body).overflow === "hidden") {
      console.warn("⚠️ html/body overflow is hidden — that will prevent scrolling.");
    }

    // 2) set a safe spacer: allows full scroll. We pick 3 viewports by default
    // so you can scroll hero -> overlay -> rest of page. Adjust multiplier if you need more/less.
    const heroHeight = window.innerHeight;
    const safeMultiplier = 3; // you can reduce (2) or increase (4+) as needed
    setSpacerHeight(heroHeight * safeMultiplier);

    // 3) animation loop (same lerp logic as before)
    let raf = null;
    let currentHeroHeight = heroHeight;
    currentY.current = currentHeroHeight;
    targetY.current = currentHeroHeight;

    const lerpFactor = 0.12;
    const speedFactor = 0.6;

    const tick = () => {
      currentY.current += (targetY.current - currentY.current) * lerpFactor;
      if (stickyRef.current) {
        stickyRef.current.style.transform = `translateY(${Math.round(currentY.current)}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      // move from heroHeight -> 0 as user scrolls (clamped)
      targetY.current = Math.max(currentHeroHeight - scrollY * speedFactor, 0);
    };

    const onResize = () => {
      currentHeroHeight = window.innerHeight;
      // keep things sane after resize
      currentY.current = Math.max(currentY.current, currentHeroHeight);
      targetY.current = Math.max(targetY.current, 0);
      // also update spacer so you can still scroll after resize
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

  return (
    <section ref={wrapperRef} id="knowus-wrapper" className="relative">
      {/* sticky overlay pinned to viewport; it does not change document height */}
      <div
        ref={stickyRef}
        id="knowus"
        className="sticky top-0 h-screen w-full z-[30] flex items-center justify-center bg-[#F3EEEA]"
        style={{
          transform: "translateY(100vh)", // initial position (JS will control it)
          willChange: "transform",
          pointerEvents: "auto",
        }}
      >
        <div className="container max-w-6xl mx-auto text-center px-6">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Who We Are</h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            This section moves up as you scroll, fully covering the Hero while preserving normal page scroll behavior.
          </p>
        </div>
      </div>

      {/* Dynamic spacer: this is what gives the page enough height to scroll fully.
          We default to 3× viewport height so you can scroll comfortably. */}
      <div
        aria-hidden
        style={{ height: spacerHeight }}
        className="w-full"
      />
    </section>
  );
}
