import React, { useEffect, useRef, useState } from "react";

// Placeholder images
const imgFarmhouse = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=500";
const imgApartments = "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=500";
const imgHospitality = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=500";
const imgOffices = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=500";

const projects = [
  { title: "Farmhouse", img: imgFarmhouse, link: "#farmhouse" },
  { title: "Apartments", img: imgApartments, link: "#apartments" },
  { title: "Hospitality", img: imgHospitality, link: "#hospitality" },
  { title: "Offices", img: imgOffices, link: "#offices" },
];

export default function Portfolio1S1() {
  const stickyRef = useRef(null);
  const wrapperRef = useRef(null);
  const [spacerHeight, setSpacerHeight] = useState(0);

  // useRef value initialization
  const currentY = useRef(0);
  const targetY = useRef(0);
  const isDesktop = useRef(true); 

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (getComputedStyle(html).overflow === "hidden" || getComputedStyle(body).overflow === "hidden") {
      console.warn("KnowUs component: Detected overflow:hidden on html or body. This will break scrolling behavior.");
    }

    const checkIsDesktop = () => window.innerWidth >= 768; 

    // INITIAL SETUP
    isDesktop.current = checkIsDesktop();
    const heroHeightStart = window.innerHeight / 2;
    let currentHeroHeight = heroHeightStart;
    
    // Increased multiplier to 2.5 to accommodate taller content (since images are now wider/taller)
    const safeMultiplier = 1; 

    if (isDesktop.current) {
      setSpacerHeight(window.innerHeight * safeMultiplier);
    } else {
      setSpacerHeight(0);
    }

    currentY.current = currentHeroHeight;
    targetY.current = currentHeroHeight;

    const lerpFactor = 0.12;
    const speedFactor = 0.6;

    let raf = null;

    const tick = () => {
      // ONLY RUN ANIMATION ON DESKTOP
      if (isDesktop.current) {
        currentY.current += (targetY.current - currentY.current) * lerpFactor;
        if (stickyRef.current) {
          stickyRef.current.style.transform = `translateY(${Math.round(currentY.current)}px)`;
        }
        raf = requestAnimationFrame(tick);
      } else {
        // ON MOBILE: Reset transform so it flows naturally
        if (stickyRef.current) {
          stickyRef.current.style.transform = "none";
        }
      }
    };

    const onScroll = () => {
      if (!isDesktop.current) return;
      const scrollY = window.scrollY || window.pageYOffset;
      targetY.current = Math.max(currentHeroHeight - scrollY * speedFactor, 0);
    };

    const onResize = () => {
      isDesktop.current = checkIsDesktop();

      if (isDesktop.current) {
        // Desktop Logic
        currentHeroHeight = window.innerHeight / 2;
        const scrollY = window.scrollY || window.pageYOffset;
        targetY.current = Math.max(currentHeroHeight - scrollY * speedFactor, 0);
        setSpacerHeight(window.innerHeight * safeMultiplier);
        
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(tick);
      } else {
        // Mobile Logic
        setSpacerHeight(0);
        cancelAnimationFrame(raf);
        if (stickyRef.current) stickyRef.current.style.transform = "none";
      }
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
    <>
      <section ref={wrapperRef} id="knowus-wrapper" className="relative">
        <div
          ref={stickyRef}
          id="knowus"
          className="
            relative z-10 w-full flex flex-col items-center bg-white 
            px-4 pb-24 mt-[35vh] min-h-[70vh] rounded-t-[3rem] overflow-hidden
            md:rounded-none md:mt-0 md:justify-center md:py-24 md:sticky md:top-0 
            md:min-h-screen md:h-fit
          "
        >
          {/* Header */}
          {/* Changed max-w-2xl to max-w-6xl to match the new grid width */}
          <div className="mb-10 mt-8 md:mt-0 md:mb-20 text-center w-full max-w-6xl">
            <h2 className="text-xl md:text-sm font-semibold uppercase tracking-wider text-gray-900">
              Projects
            </h2>
          </div>

          {/* Grid Layout */}
          {/* CHANGES:
              1. max-w-2xl -> max-w-6xl: Makes the section much wider on desktop.
              2. gap-x-6 -> gap-x-12: Increases space between columns.
              3. gap-y-10 -> gap-y-16: Increases vertical space between rows.
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-6xl w-full">
            {projects.map((project, index) => (
              <div key={index} className="flex flex-col items-center group cursor-pointer w-full">
                {/* Image Container */}
                <div className="w-full aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-sm relative">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Title */}
                <h3 className="mt-6 text-sm font-bold text-gray-900 w-full text-center">
                  {project.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Spacer */}
        <div aria-hidden style={{ height: spacerHeight }} className="w-full" />
      </section>
    </>
  );
}