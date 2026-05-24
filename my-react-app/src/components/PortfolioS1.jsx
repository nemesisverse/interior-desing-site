import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Placeholder images
const imgFarmhouse   = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=500";
const imgApartments  = "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=500";
const imgHospitality = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=500";
const imgOffices     = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=500";

const projects = [
  { title: "Residential",   img: imgFarmhouse,   link: "/residential", color: "bg-stone-100"  },
  { title: "Commercial",    img: imgApartments,  link: "#apartments",  color: "bg-slate-100"  },
  { title: "Hospitality",   img: imgHospitality, link: "#hospitality", color: "bg-orange-50"  },
  { title: "Space Planning",img: imgOffices,     link: "#offices",     color: "bg-zinc-100"   },
];

export default function PortfolioCardStack() {
  const containerRef = useRef(null);
  const cardsRef     = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId;

    const handleScroll = () => {
      if (!container) return;

      const rect         = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const scrollDist = rect.height - viewportHeight;
      const scrolled   = Math.max(0, -rect.top);
      let progress     = scrolled / scrollDist;
      progress         = Math.min(Math.max(progress, 0), 1);

      const totalCards    = projects.length;
      const rawActiveIndex = progress * (totalCards - 1);

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const val = index - rawActiveIndex;

        let yPos   = 0;
        let scale  = 1;
        let opacity = 1;

        if (val < 0) {
          yPos    = val * window.innerHeight * 1.2;
          scale   = 1 + (val * 0.05);
          opacity = 1 + (val * 0.2);
        } else {
          yPos    = val * 40;
          scale   = 1 - (val * 0.05);
          opacity = 1 - (val * 0.15);
        }

        card.style.transform = `translate3d(0, ${yPos}px, 0) scale(${Math.max(0, scale)})`;
        card.style.opacity   = Math.max(0, opacity);
        card.style.zIndex    = 100 - index;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="relative w-full bg-white">
      <div
        ref={containerRef}
        className="relative w-full h-[300vh] mt-[30vh]"
      >
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

          <h2 className="absolute top-8 text-sm md:text-base font-bold uppercase tracking-widest text-gray-400 z-50">
            Projects
          </h2>

          <div className="relative w-full max-w-4xl h-[70vh] flex items-center justify-center mt-12">
            {projects.map((project, index) => {
              /* ── Use <Link> for internal routes, <a> for hash anchors ── */
              const isInternal = project.link.startsWith("/");
              const CardWrapper = ({ children, className, style }) =>
                isInternal ? (
                  <Link
                    to={project.link}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className={className}
                    style={style}
                  >
                    {children}
                  </Link>
                ) : (
                  <a
                    href={project.link}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className={className}
                    style={style}
                  >
                    {children}
                  </a>
                );

              return (
                <CardWrapper
                  key={index}
                  className={`
                    absolute w-[90%] md:w-[80%] h-full
                    cursor-pointer group
                    rounded-t-3xl rounded-b-lg
                    shadow-[0_-5px_20px_rgba(0,0,0,0.1)]
                    border-t border-white/50
                    overflow-hidden origin-bottom
                    will-change-transform
                    ${project.color}
                  `}
                  style={{
                    transform: `translateY(${index * 40}px) scale(${1 - index * 0.05})`,
                    zIndex: 100 - index,
                  }}
                >
                  {/* Folder tab */}
                  <div className="w-full h-2 bg-black/5 mx-auto mb-4" />

                  <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                    {/* Left: Text */}
                    <div className="p-8 md:p-12 flex flex-col justify-between h-full relative z-10">
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-xs font-bold">
                            {index + 1}
                          </span>
                        </div>

                        <h3 className="text-3xl md:text-5xl font-serif text-gray-900 mb-4 leading-tight group-hover:text-blue-700 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-500 text-sm md:text-base max-w-xs leading-relaxed">
                          A curated space designed for modern living, focusing on aesthetics and functionality.
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-900 group-hover:text-blue-600 transition-colors pb-12">
                        Open Case Study
                        <span className="text-lg transition-transform group-hover:translate-x-1">↓</span>
                      </span>
                    </div>

                    {/* Right: Image */}
                    <div className="relative h-full w-full overflow-hidden">
                      <div className="absolute inset-0 bg-black/5 z-10 block md:hidden" />
                      <img
                        src={project.img}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </CardWrapper>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}