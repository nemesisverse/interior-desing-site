import React, { useEffect, useRef, useState } from "react";

/* ─── Local image imports (src/images/Residential Image/) ───── */
import Rec1  from "../images/Residential Image/Rec1.png";
import Rec2  from "../images/Residential Image/Rec2.png";
import Rec3  from "../images/Residential Image/Rec3.png";
import Rec4  from "../images/Residential Image/Rec4.png";
import Rec5  from "../images/Residential Image/Rec5.png";
import Rec6  from "../images/Residential Image/Rec6.png";
import Rec7  from "../images/Residential Image/Rec7.png";
import Rec8  from "../images/Residential Image/Rec8.png";
import Rec9  from "../images/Residential Image/Rec9.jpg";
import Rec10 from "../images/Residential Image/Rec10.jpg";
import Rec11 from "../images/Residential Image/Rec11.png";
import Rec12 from "../images/Residential Image/Rec12.png";
import Rec13 from "../images/Residential Image/Rec13.png";
import Rec14 from "../images/Residential Image/Rec14.jpg";
import Rec15 from "../images/Residential Image/Rec15.jpg";
import Rec16 from "../images/Residential Image/Rec16.png";
import Rec17 from "../images/Residential Image/Rec17.png";
import Rec18 from "../images/Residential Image/Rec18.png";
import Rec19 from "../images/Residential Image/Rec19.png";
import Rec20 from "../images/Residential Image/Rec20.png";
import Rec21 from "../images/Residential Image/Rec21.png";

const REC_IMAGES = [
  Rec1,  Rec2,  Rec3,  Rec4,  Rec5,  Rec6,  Rec7,
  Rec8,  Rec9,  Rec10, Rec11, Rec12, Rec13, Rec14,
  Rec15, Rec16, Rec17, Rec18, Rec19, Rec20, Rec21,
];

/* ─── Property data ──────────────────────────────────────────── */
const PROPERTIES = [
  { title: "Sunset Ridge",       location: "Beverly Hills, CA",     price: "$8.2M",  beds: 6, baths: 7, sqft: "7,840"  },
  { title: "Ocean Crest",        location: "Malibu, CA",            price: "$12.5M", beds: 5, baths: 6, sqft: "6,200"  },
  { title: "Bellaire Manor",     location: "Bel Air, CA",           price: "$15.8M", beds: 8, baths: 9, sqft: "9,400"  },
  { title: "Palisades View",     location: "Pacific Palisades, CA", price: "$6.9M",  beds: 5, baths: 5, sqft: "5,600"  },
  { title: "Santa Ana Villa",    location: "Santa Monica, CA",      price: "$4.3M",  beds: 4, baths: 4, sqft: "3,800"  },
  { title: "Shore Retreat",      location: "Manhattan Beach, CA",   price: "$5.7M",  beds: 4, baths: 5, sqft: "4,200"  },
  { title: "Laguna Bluffs",      location: "Laguna Beach, CA",      price: "$9.1M",  beds: 6, baths: 6, sqft: "6,800"  },
  { title: "Emerald Hills",      location: "Rolling Hills, CA",     price: "$7.4M",  beds: 5, baths: 6, sqft: "6,100"  },
  { title: "Canyon Breeze",      location: "Topanga Canyon, CA",    price: "$3.8M",  beds: 4, baths: 3, sqft: "3,200"  },
  { title: "Point Dume Estate",  location: "Malibu, CA",            price: "$18.5M", beds: 7, baths: 8, sqft: "11,200" },
  { title: "Los Feliz Gem",      location: "Los Feliz, CA",         price: "$3.2M",  beds: 3, baths: 3, sqft: "2,800"  },
  { title: "Mulholland Heights", location: "Hollywood Hills, CA",   price: "$5.9M",  beds: 5, baths: 5, sqft: "4,800"  },
  { title: "Venice Modern",      location: "Venice, CA",            price: "$2.8M",  beds: 3, baths: 3, sqft: "2,400"  },
  { title: "Runyon View",        location: "Hollywood Hills, CA",   price: "$4.6M",  beds: 4, baths: 4, sqft: "3,600"  },
  { title: "Malibu Colony",      location: "Malibu, CA",            price: "$22.0M", beds: 6, baths: 7, sqft: "8,400"  },
  { title: "Silver Pines",       location: "Silver Lake, CA",       price: "$2.1M",  beds: 3, baths: 2, sqft: "2,100"  },
  { title: "Brentwood Classic",  location: "Brentwood, CA",         price: "$7.2M",  beds: 5, baths: 6, sqft: "5,900"  },
  { title: "Calabasas Estate",   location: "Calabasas, CA",         price: "$6.4M",  beds: 6, baths: 7, sqft: "7,200"  },
  { title: "Redondo Shores",     location: "Redondo Beach, CA",     price: "$3.5M",  beds: 4, baths: 4, sqft: "3,100"  },
  { title: "Palos Verdes Crown", location: "Palos Verdes, CA",      price: "$8.8M",  beds: 6, baths: 6, sqft: "7,600"  },
  { title: "La Jolla Vista",     location: "La Jolla, CA",          price: "$11.2M", beds: 5, baths: 6, sqft: "6,500"  },
];

const IMAGES = PROPERTIES.map((p, i) => ({
  ...p,
  id: i,
  src: REC_IMAGES[i],
}));

/* ─── Carousel constants ─────────────────────────────────────── */
const TOTAL     = 21;
const ANGLE_DEG = 360 / TOTAL;   // ≈ 17.143° per image
const IMG_W     = 380;           // image card width  (px)
const IMG_H     = 460;           // image card height (px)
const LERP      = 0.068;         // easing speed (lower = more cinematic lag)
const SCROLL_VH = 130;           // viewport-heights of scroll per image step

/* ─── Component ──────────────────────────────────────────────── */
export default function Residential() {
  const containerRef = useRef(null);
  const rafRef       = useRef(null);
  const smoothRef    = useRef(0);
  const targetRef    = useRef(0);

  /* radius = half of viewport height; screenW drives horizontal centering */
  const [radius,      setRadius]      = useState(450);
  const [screenW,     setScreenW]     = useState(1440);
  const [smoothFocus, setSmoothFocus] = useState(0);

  /* ── Keep radius + screenW synced to viewport ─────────────── */
  useEffect(() => {
    const sync = () => {
      setRadius(Math.floor(window.innerHeight / 2));
      setScreenW(window.innerWidth);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  /* ── Scroll listener + RAF animation loop ─────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      if (scrollable <= 0) return;
      targetRef.current = Math.max(0, Math.min(1, -top / scrollable)) * (TOTAL - 1);
    };

    const tick = () => {
      smoothRef.current += (targetRef.current - smoothRef.current) * LERP;
      setSmoothFocus(smoothRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /*
   * Circle geometry — centred layout
   * ─────────────────────────────────
   * circleCenterX   = screenW/2 − radius/2
   *   → visible arc midpoint lands exactly at screen centre
   *   → focus image  (angle 0°)  sits at screenW/2 + radius/2  (right of centre)
   *   → top/bottom   (angle ±90°) sit at screenW/2 − radius/2  (left of centre)
   *   → overall arc is horizontally balanced across the full viewport
   */
  const isMobile = screenW < 768;

  /* viewport height approximation (radius is already floor(vh/2)) */
  const VH = radius * 2;

  /* ════════════════════════════════════════════════════════════
     MOBILE LAYOUT — card-stack animation (à la PortfolioCardStack)
     Heading "Residential Villas & Flats" pinned at the bottom.
     ════════════════════════════════════════════════════════════ */
  if (isMobile) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Anton&family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
        `}</style>

        {/* Scroll driver — 100 vh per image */}
        <div ref={containerRef} style={{ height: `${TOTAL * 100}vh` }}>
          <div style={{
            position: "sticky", top: 0,
            height: "100vh", overflow: "hidden",
            background: "#060508",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}>

            {/* ── Card stack ─────────────────────────────────── */}
            <div style={{
              position: "relative",
              width: "88%",
              height: "68vh",
              marginBottom: 96, /* leave room for heading at bottom */
            }}>
              {IMAGES.map((img, i) => {
                const val = i - smoothFocus;

                let yPx, sc, op;
                if (val < 0) {
                  /* card scrolled past — fly upward */
                  yPx = val * VH * 1.15;
                  sc  = Math.max(0, 1 + val * 0.06);
                  op  = Math.max(0, 1 + val * 0.35);
                } else {
                  /* upcoming cards — stacked behind with peek offset */
                  yPx = val * 38;
                  sc  = Math.max(0, 1 - val * 0.05);
                  op  = Math.max(0, 1 - val * 0.14);
                }

                return (
                  <div
                    key={img.id}
                    style={{
                      position:        "absolute",
                      inset:           0,
                      borderRadius:    14,
                      overflow:        "hidden",
                      transform:       `translate3d(0, ${yPx.toFixed(2)}px, 0) scale(${sc.toFixed(4)})`,
                      opacity:         op,
                      zIndex:          100 - i,
                      transformOrigin: "bottom center",
                      willChange:      "transform, opacity",
                      boxShadow:       "0 -6px 28px rgba(0,0,0,0.45)",
                    }}
                  >
                    {/* Photo */}
                    <img
                      src={img.src} alt={img.title} draggable={false}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />

                    {/* Bottom fade for counter legibility */}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: "45%",
                      background: "linear-gradient(to top, rgba(6,5,8,0.82) 0%, transparent 100%)",
                    }} />

                    {/* Tab strip at top (mirrors PortfolioCardStack folder tab) */}
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0,
                      height: 6, background: "rgba(255,255,255,0.08)",
                    }} />

                    {/* Counter badge */}
                    <div style={{
                      position: "absolute", bottom: 16, left: 18,
                      display: "flex", alignItems: "center", gap: 10,
                    }}>
                      <span style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: 28, height: 28, borderRadius: "50%",
                        background: "rgba(255,255,255,0.12)",
                        backdropFilter: "blur(6px)",
                        fontSize: 10, fontWeight: 700,
                        color: "rgba(255,255,255,0.9)",
                        fontFamily: "'DM Sans', sans-serif",
                        letterSpacing: "1px",
                      }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span style={{
                        fontSize: 10, letterSpacing: "2px", textTransform: "uppercase",
                        color: "rgba(255,255,255,0.45)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}>
                        of {TOTAL}
                      </span>
                    </div>

                    {/* Gold focus ring on active card */}
                    {Math.abs(val) < 0.45 && (
                      <div style={{
                        position: "absolute", inset: -2,
                        borderRadius: 16,
                        border: `1.5px solid rgba(195,158,72,${(0.45 - Math.abs(val)) * 2})`,
                        pointerEvents: "none",
                      }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* ── Heading pinned at bottom ───────────────────── */}
            <div style={{
              position:   "absolute",
              bottom:     36,
              left:       0, right: 0,
              textAlign:  "center",
              zIndex:     200,
              pointerEvents: "none",
              userSelect: "none",
            }}>
              {/* Amber rule */}
              <div style={{
                width: 36, height: 1.5,
                background: "rgba(195,158,72,0.75)",
                margin: "0 auto 10px",
              }} />

              {/* Main heading */}
              <div style={{
                fontFamily:    "'Anton', 'Impact', sans-serif",
                fontSize:      22,
                color:         "rgba(255,255,255,0.88)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                lineHeight:    1.2,
              }}>
                Residential Villas &amp; Flats
              </div>

              {/* Progress bar */}
              <div style={{
                width: "56%", height: 1,
                background: "rgba(255,255,255,0.1)",
                margin: "14px auto 0",
                overflow: "hidden",
              }}>
                <div style={{
                  height: "100%",
                  width: `${((smoothFocus / (TOTAL - 1)) * 100).toFixed(1)}%`,
                  background: "rgba(195,158,72,0.7)",
                }} />
              </div>

              <div style={{
                marginTop: 8, fontSize: 8,
                letterSpacing: "3px", textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                Scroll to explore
              </div>
            </div>

          </div>
        </div>
      </>
    );
  }

  /*
   * Layout values — desktop only (mobile uses card-stack above)
   * circleCenterX is clamped so the focus image never overflows the right edge.
   * Pushing it toward screenW*0.42 shifts the ring rightward, closing the gap.
   */
  const layoutRadius  = radius;
  const layoutImgW    = IMG_W;
  const layoutImgH    = IMG_H;
  const circleCenterX = Math.round(
    Math.min(
      screenW * 0.42,                                     // target: 42 % of viewport
      screenW - layoutRadius - layoutImgW / 2 - 24        // hard cap: never overflow right
    )
  );

  /* ════════════════════════════════════════════════════════════
     DESKTOP LAYOUT — circular carousel
     ════════════════════════════════════════════════════════════ */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Cormorant+Garamond:wght@300;400&family=DM+Sans:ital,wght@0,300;0,400&display=swap');

        @keyframes panelReveal {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes lineExpand {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* Scroll-driving container — very tall to give scroll room */}
      <div ref={containerRef} style={{ height: `${TOTAL * SCROLL_VH}vh` }}>

        {/* Sticky viewport — stays fixed while scroll drives the animation */}
        <div style={{
          position: "sticky", top: 0,
          height: "100vh", overflow: "hidden",
          background: "#060508",
        }}>

          {/* ── Layer 1: Giant ghost outline — hidden on mobile ── */}
          {!isMobile && (
          <div style={{
            position:      "absolute",
            left:          -24,
            top:           "50%",
            transform:     "translateY(-50%)",
            pointerEvents: "none",
            zIndex:        0,
            userSelect:    "none",
            lineHeight:    0.88,
          }}>
            {["Residential", "Villas", "& Flats"].map((word, i) => (
              <div key={i} style={{
                fontFamily:       "'Anton', 'Impact', 'Arial Black', sans-serif",
                fontSize:         `${Math.round(radius * [0.26, 0.40, 0.22][i])}px`,
                color:            "transparent",
                WebkitTextStroke: `1px rgba(255,255,255,0.055)`,
                textTransform:    "uppercase",
                letterSpacing:    "-0.02em",
                display:          "block",
              }}>
                {word}
              </div>
            ))}
          </div>
          )}

          {/* ── Layer 2: Readable label — hidden on mobile ───────── */}
          {!isMobile && (
          <div style={{
            position:      "absolute",
            left:          44,
            top:           "50%",
            transform:     "translateY(-52%)",
            pointerEvents: "none",
            zIndex:        500,
            userSelect:    "none",
            mixBlendMode:  "screen",
            lineHeight:    1.02,
          }}>
            <div style={{
              width:        52,
              height:       1,
              background:   "rgba(195,158,72,0.9)",
              marginBottom: 14,
            }} />
            {["Residential", "Villas", "& Flats"].map((word, i) => (
              <div key={i} style={{
                fontFamily:    "'Anton', 'Impact', 'Arial Black', sans-serif",
                fontSize:      `${Math.round(radius * [0.115, 0.175, 0.095][i])}px`,
                color:         i === 1
                  ? "rgba(255,255,255,0.95)"
                  : "rgba(255,255,255,0.72)",
                textTransform: "uppercase",
                letterSpacing: i === 1 ? "-0.01em" : "0.04em",
                display:       "block",
              }}>
                {word}
              </div>
            ))}
          </div>
          )}

          {/* ── Ambient warm glow emanating from circle center ─── */}
          <div style={{
            position: "absolute",
            left: circleCenterX, top: "50%",
            transform: "translate(-50%, -50%)",
            width: layoutRadius * 2.8, height: layoutRadius * 2.8,
            background: "radial-gradient(circle, rgba(172,128,54,0.072) 0%, transparent 62%)",
            pointerEvents: "none",
          }} />

          {/* Cool vignette on the right edge */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 100% 50%, rgba(14,10,28,0.5) 0%, transparent 55%)",
            pointerEvents: "none",
          }} />

          {/* ── Full-circle guide rings ──────────────────────────── */}
          {/* Outer ring */}
          <div style={{
            position: "absolute",
            left:   circleCenterX - (layoutRadius + 22),
            top:    "50%",
            transform: "translateY(-50%)",
            width:  (layoutRadius + 22) * 2,
            height: (layoutRadius + 22) * 2,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.030)",
            pointerEvents: "none",
          }} />

          {/* Inner ring */}
          <div style={{
            position: "absolute",
            left:   circleCenterX - (layoutRadius - 22),
            top:    "50%",
            transform: "translateY(-50%)",
            width:  (layoutRadius - 22) * 2,
            height: (layoutRadius - 22) * 2,
            borderRadius: "50%",
            border: "1px solid rgba(172,128,54,0.048)",
            pointerEvents: "none",
          }} />

          {/* ── Images positioned on the circle ───────────────── */}
          {IMAGES.map((img, i) => {
            let dist = i - smoothFocus;
            const half = TOTAL / 2;
            dist = ((dist % TOTAL) + TOTAL) % TOTAL;
            if (dist > half) dist -= TOTAL;

            const angleDeg = dist * ANGLE_DEG;
            const angleRad = angleDeg * (Math.PI / 180);

            const xAbs = circleCenterX + layoutRadius * Math.cos(angleRad);
            const yPos = layoutRadius * Math.sin(angleRad);

            if (xAbs + layoutImgW / 2 < 0)       return null;
            if (xAbs - layoutImgW / 2 > screenW)  return null;

            const absDist = Math.abs(dist);

            /*
             * On mobile: softer falloff so more of the ring stays visible.
             * Images at the top/bottom (dist≈5.25) get opacity≈0.45 not 0.06.
             */
            const scaleFactor   = isMobile ? 0.07  : 0.124;
            const opacityFactor = isMobile ? 0.10  : 0.175;
            const blurFactor    = isMobile ? 0.65  : 1.05;
            const blurOffset    = isMobile ? 0.3   : 0.55;

            const scale   = Math.max(0.35, 1 - absDist * scaleFactor);
            const opacity = Math.max(0.08, 1 - absDist * opacityFactor);
            const blur    = Math.max(0, Math.min(4, absDist * blurFactor - blurOffset));
            const zIndex  = Math.round(100 - absDist * 5);
            const tilt    = angleDeg * 0.088;
            const dimVal  = Math.min(0.75, absDist * 0.12);

            return (
              <div
                key={img.id}
                style={{
                  position:   "absolute",
                  left:       0,
                  top:        "50%",
                  width:      layoutImgW,
                  height:     layoutImgH,
                  transform:  `translate(${(xAbs - layoutImgW / 2).toFixed(2)}px, calc(-50% + ${yPos.toFixed(2)}px)) scale(${scale.toFixed(4)}) rotate(${tilt.toFixed(3)}deg)`,
                  opacity,
                  filter:     blur > 0.15 ? `blur(${blur.toFixed(2)}px)` : "none",
                  zIndex,
                  willChange: "transform, opacity",
                }}
              >
                {/* Photo */}
                <img
                  src={img.src}
                  alt={img.title}
                  draggable={false}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    borderRadius: 5,
                    display: "block",
                    background: "#1a1620",
                  }}
                />

                {/* Depth dim overlay — darkens images away from focus */}
                {dimVal > 0.02 && (
                  <div style={{
                    position: "absolute", inset: 0,
                    borderRadius: 5,
                    background: `rgba(6,5,8,${dimVal.toFixed(3)})`,
                  }} />
                )}

                {/* Focus highlight ring — visible only on the centred image */}
                {absDist < 0.42 && (
                  <div style={{
                    position: "absolute", inset: -2,
                    borderRadius: 7,
                    border: `1.5px solid rgba(195,158,72,${Math.max(0, (0.42 - absDist) * 2.4).toFixed(3)})`,
                    pointerEvents: "none",
                  }} />
                )}

                {/* Subtle index badge on focused card */}
                {absDist < 0.5 && (
                  <div style={{
                    position: "absolute", bottom: 12, left: 13,
                    fontSize: 9, letterSpacing: "2.5px",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "'DM Sans', sans-serif",
                    textTransform: "uppercase",
                    opacity: Math.max(0, 1 - absDist * 2),
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                )}
              </div>
            );
          })}




          {/* ── Vertical label on left edge ───────────────────── */}
          <div style={{
            position:        "absolute",
            left:            22,
            top:             "50%",
            transform:       "translateY(-50%) rotate(-90deg)",
            transformOrigin: "center center",
            fontSize:        8,
            letterSpacing:   "4px",
            textTransform:   "uppercase",
            color:           "rgba(255,255,255,0.1)",
            fontFamily:      "'DM Sans', sans-serif",
            whiteSpace:      "nowrap",
          }}>
            Residential Gallery&ensp;·&ensp;21 Properties
          </div>

        </div>
      </div>
    </>
  );
}