import React, { useEffect, useRef, useState } from "react";

export default function KnowUs() {
  const stickyRef = useRef(null);
  const wrapperRef = useRef(null);
  const [spacerHeight, setSpacerHeight] = useState(0);
  const currentY = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
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
        stickyRef.current.style.transform = `translateY(${Math.round(currentY.current)}px)`;
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
      {/* Inject Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        #knowus * { box-sizing: border-box; }

        /* Noise grain texture overlay */
        #knowus::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
          opacity: 0.5;
        }

        /* Vertical marquee */
        @keyframes marqueeUp {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .marquee-track {
          animation: marqueeUp 18s linear infinite;
        }

        /* Diagonal line pattern */
        .diagonal-bg {
          background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 10px,
            rgba(139, 0, 0, 0.04) 10px,
            rgba(139, 0, 0, 0.04) 11px
          );
        }

        /* Fade-in animation */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up {
          animation: fadeUp 0.9s ease forwards;
        }
        .fade-up-d1 { animation-delay: 0.1s; opacity: 0; }
        .fade-up-d2 { animation-delay: 0.25s; opacity: 0; }
        .fade-up-d3 { animation-delay: 0.4s; opacity: 0; }
        .fade-up-d4 { animation-delay: 0.6s; opacity: 0; }

        /* Hover underline on button */
        .cta-btn::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #8B0000;
          transition: width 0.4s ease;
        }
        .cta-btn:hover::after { width: 100%; }

        /* Stat item hover */
        .stat-item {
          transition: transform 0.3s ease;
        }
        .stat-item:hover { transform: translateY(-4px); }

        /* Ornament dash */
        .ornament {
          display: inline-block;
          width: 32px;
          height: 1px;
          background: #8B0000;
          vertical-align: middle;
          margin-right: 10px;
        }
      `}</style>

      <section ref={wrapperRef} id="knowus-wrapper" className="relative">
        <div
          ref={stickyRef}
          id="knowus"
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ ...stickyStyles, background: "#FDF8F2", fontFamily: "'DM Sans', sans-serif" }}
        >

          {/* ── BACKGROUND LAYER ── */}
          {/* Giant ghost name */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
            style={{ top: "-4%" }}
          >
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(60px, 12vw, 160px)",
                fontWeight: 900,
                color: "transparent",
                WebkitTextStroke: "1px rgba(139,0,0,0.10)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                whiteSpace: "nowrap",
                userSelect: "none",
              }}
            >
              SHIVANGI AGARWAL
            </h1>
          </div>

          {/* Diagonal stripe block — left side accent */}
          <div
            className="diagonal-bg absolute left-0 top-0 h-full pointer-events-none z-0"
            style={{ width: "38%", opacity: 0.6 }}
          />

          {/* Thin vertical red rule */}
          <div
            className="absolute top-0 bottom-0 z-0"
            style={{ left: "38%", width: "1px", background: "rgba(139,0,0,0.12)" }}
          />

          {/* ── VERTICAL MARQUEE — left column ── */}
          <div
            className="absolute left-0 top-0 h-full overflow-hidden z-10"
            style={{ width: "38%" }}
          >
            {/* Top fade */}
            <div
              className="absolute top-0 left-0 right-0 z-20 pointer-events-none"
              style={{ height: "120px", background: "linear-gradient(to bottom, #FDF8F2, transparent)" }}
            />
            {/* Bottom fade */}
            <div
              className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
              style={{ height: "120px", background: "linear-gradient(to top, #FDF8F2, transparent)" }}
            />

            <div className="marquee-track flex flex-col items-center justify-start pt-16" style={{ gap: "0" }}>
              {/* Duplicate for seamless loop */}
              {[...Array(2)].map((_, di) => (
                <div key={di} className="flex flex-col items-center w-full" style={{ gap: "0" }}>
                  {[
                    { num: "10+", label: "Years Experience" },
                    { num: "235+", label: "Projects Delivered" },
                    { num: "235+", label: "Happy Clients" },
                    { num: "15+", label: "Design Awards" },
                    { num: "100%", label: "Client Satisfaction" },
                  ].map(({ num, label }, i) => (
                    <div
                      key={i}
                      className="w-full flex flex-col items-center justify-center stat-item"
                      style={{
                        padding: "clamp(20px, 3vw, 36px) 0",
                        borderBottom: "1px solid rgba(139,0,0,0.08)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontWeight: 700,
                          fontSize: "clamp(32px, 5vw, 60px)",
                          color: "#8B0000",
                          lineHeight: 1,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {num}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 300,
                          fontSize: "clamp(9px, 1.1vw, 13px)",
                          color: "#8B0000",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          marginTop: "6px",
                          opacity: 0.7,
                        }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT CONTENT PANEL ── */}
          <div
            className="absolute top-0 right-0 h-full flex flex-col justify-between z-10"
            style={{ left: "38%", padding: "clamp(24px,4vw,60px) clamp(24px,4vw,64px)" }}
          >

            {/* TOP: Label */}
            <div className="fade-up fade-up-d1 flex items-center" style={{ gap: "12px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "28px",
                  height: "1px",
                  background: "#8B0000",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(10px, 1.1vw, 13px)",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#8B0000",
                  opacity: 0.75,
                }}
              >
                Interior Designer & Co-Founder
              </span>
            </div>

            {/* MIDDLE: Name + Tag + Bio */}
            <div className="flex flex-col" style={{ gap: "clamp(16px, 2.5vw, 32px)", flex: 1, justifyContent: "center" }}>

              {/* "HI MY NAME IS" */}
              <p
                className="fade-up fade-up-d1"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(10px, 1vw, 13px)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#8B0000",
                  margin: 0,
                  opacity: 0.65,
                }}
              >
                Hi, My Name Is
              </p>

              {/* Name — stacked, editorial */}
              <div className="fade-up fade-up-d2" style={{ lineHeight: 0.88 }}>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 900,
                    fontSize: "clamp(36px, 6.5vw, 96px)",
                    color: "#1a0000",
                    margin: 0,
                    letterSpacing: "-0.03em",
                    display: "block",
                  }}
                >
                  Shivangi
                </h2>
                <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(8px,1.2vw,20px)" }}>
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 900,
                      fontSize: "clamp(36px, 6.5vw, 96px)",
                      color: "#1a0000",
                      margin: 0,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    Agarwal
                  </h2>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: "clamp(18px, 2.8vw, 42px)",
                      color: "#8B0000",
                      letterSpacing: "0",
                      opacity: 0.85,
                      paddingBottom: "4px",
                    }}
                  >
                    *(designer)
                  </span>
                </div>
              </div>

              {/* Decorative horizontal rule with flourish */}
              <div
                className="fade-up fade-up-d3"
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div style={{ flex: 1, height: "1px", background: "rgba(139,0,0,0.2)" }} />
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="9" r="3" fill="#8B0000" fillOpacity="0.35" />
                  <circle cx="9" cy="9" r="1.5" fill="#8B0000" fillOpacity="0.7" />
                </svg>
                <div style={{ flex: 1, height: "1px", background: "rgba(139,0,0,0.2)" }} />
              </div>

              {/* Bio paragraph */}
              <p
                className="fade-up fade-up-d3"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "clamp(14px, 1.8vw, 24px)",
                  lineHeight: 1.65,
                  color: "#3d0000",
                  margin: 0,
                  maxWidth: "520px",
                  opacity: 0.9,
                }}
              >
                I design thoughtful, functional interiors that balance aesthetics
                with everyday living. With a keen eye for detail and a passion for
                purposeful design, I transform spaces into environments that feel
                refined, comfortable, and uniquely personal.
              </p>

              {/* Skills tags */}
              <div className="fade-up fade-up-d4 flex flex-wrap" style={{ gap: "8px" }}>
                {["Residential", "Commercial", "Hospitality", "Space Planning", "Material Curation"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "clamp(9px, 0.85vw, 11px)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#8B0000",
                      border: "1px solid rgba(139,0,0,0.25)",
                      borderRadius: "100px",
                      padding: "5px 14px",
                      background: "rgba(139,0,0,0.04)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* BOTTOM: CTA */}
            <div className="fade-up fade-up-d4 flex items-center" style={{ gap: "clamp(16px,2vw,32px)" }}>
              <a
                href="https://wa.me/919540777511"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn"
                style={{
                  position: "relative",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(9px, 0.9vw, 12px)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#FDF8F2",
                  background: "#8B0000",
                  border: "none",
                  borderRadius: "100px",
                  padding: "clamp(10px,1.2vw,16px) clamp(20px,2.5vw,36px)",
                  textDecoration: "none",
                  transition: "background 0.3s ease, transform 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#6b0000";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "#8B0000";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Contact Our Team
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              {/* Social links */}
              <div style={{ display: "flex", gap: "clamp(12px,1.5vw,24px)", alignItems: "center" }}>
                {[
                  { label: "IN", href: "#" },
                  { label: "IG", href: "#" },
                  { label: "BE", href: "#" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(9px, 0.85vw, 11px)",
                      letterSpacing: "0.12em",
                      color: "#8B0000",
                      textDecoration: "none",
                      opacity: 0.6,
                      transition: "opacity 0.2s ease",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "0.6")}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Corner ornament — bottom right */}
          <svg
            className="absolute bottom-8 right-8 z-10 pointer-events-none"
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.18 }}
          >
            <path d="M60 0V60H0" stroke="#8B0000" strokeWidth="1" />
            <path d="M60 20V60H20" stroke="#8B0000" strokeWidth="1" />
            <path d="M60 40V60H40" stroke="#8B0000" strokeWidth="1" />
          </svg>

          {/* Corner ornament — top left */}
          <svg
            className="absolute top-8 left-8 z-10 pointer-events-none"
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.18 }}
          >
            <path d="M0 60V0H60" stroke="#8B0000" strokeWidth="1" />
            <path d="M0 40V0H40" stroke="#8B0000" strokeWidth="1" />
            <path d="M0 20V0H20" stroke="#8B0000" strokeWidth="1" />
          </svg>

        </div>

        <div aria-hidden style={{ height: spacerHeight }} className="w-full" />
      </section>
    </>
  );
}