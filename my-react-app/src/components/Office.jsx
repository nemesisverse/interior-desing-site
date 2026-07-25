import React, { useEffect, useRef, useState } from "react";

/* ─── Local image imports (src/images/office images/) ────────── */
import Off1  from "../images/office images/off1.png";
import Off2  from "../images/office images/off2.png";
import Off3  from "../images/office images/off3.png";
import Off4  from "../images/office images/off4.png";
import Off5  from "../images/office images/off5.png";
import Off6  from "../images/office images/off6.png";
import Off7  from "../images/office images/off7.png";
import Off8  from "../images/office images/off8.png";
import Off9  from "../images/office images/off9.png";
import Off10 from "../images/office images/off10.jpg";
import Off11 from "../images/office images/off11.png";
import Off12 from "../images/office images/off12.png";
import Off13 from "../images/office images/off13.png";
import Off14 from "../images/office images/off14.png";
import Off15 from "../images/office images/off15.jpg";

const OFF_IMAGES = [
  Off1,  Off2,  Off3,  Off4,  Off5,
  Off6,  Off7,  Off8,  Off9,  Off10,
  Off11, Off12, Off13, Off14, Off15,
];

/* ─── Office project data ────────────────────────────────────── */
const PROPERTIES = [
  { title: "The Executive Suite",   location: "Mumbai, India",      price: "$1.8M",  sqft: "4,200",  type: "Corporate HQ"     },
  { title: "Innovation Hub",        location: "Bangalore, India",   price: "$2.4M",  sqft: "6,800",  type: "Tech Campus"      },
  { title: "The Boardroom Tower",   location: "Delhi, India",       price: "$3.1M",  sqft: "8,500",  type: "Business Centre"  },
  { title: "Skyview Offices",       location: "Hyderabad, India",   price: "$1.5M",  sqft: "3,600",  type: "Co-working Space" },
  { title: "The Creative Loft",     location: "Pune, India",        price: "$0.9M",  sqft: "2,200",  type: "Studio Office"    },
  { title: "Prestige Workspaces",   location: "Chennai, India",     price: "$2.0M",  sqft: "5,100",  type: "Managed Office"   },
  { title: "The Corner Office",     location: "Kolkata, India",     price: "$1.2M",  sqft: "2,900",  type: "Boutique Office"  },
  { title: "Atlas Business Park",   location: "Ahmedabad, India",   price: "$2.8M",  sqft: "7,400",  type: "Business Park"    },
  { title: "Zenith Workplace",      location: "Gurgaon, India",     price: "$3.5M",  sqft: "9,200",  type: "Corporate Tower"  },
  { title: "The Design Studio",     location: "Jaipur, India",      price: "$0.7M",  sqft: "1,800",  type: "Creative Studio"  },
  { title: "Meridian Office Suites",location: "Noida, India",       price: "$1.6M",  sqft: "4,000",  type: "Office Suites"    },
  { title: "The Glass Pavilion",    location: "Surat, India",       price: "$2.2M",  sqft: "5,700",  type: "Modern Office"    },
  { title: "Nexus Workspaces",      location: "Chandigarh, India",  price: "$1.0M",  sqft: "2,500",  type: "Flex Office"      },
  { title: "Pinnacle Business Hub", location: "Coimbatore, India",  price: "$1.3M",  sqft: "3,200",  type: "Business Hub"     },
  { title: "The Open Floor",        location: "Kochi, India",       price: "$0.8M",  sqft: "2,100",  type: "Open Workspace"   },
];

const IMAGES = PROPERTIES.map((p, i) => ({
  ...p,
  id: i,
  src: OFF_IMAGES[i],
}));

/* ─── Carousel constants ─────────────────────────────────────── */
const TOTAL     = 15;
const ANGLE_DEG = 360 / TOTAL;   // 24° per image
const IMG_W     = 380;
const IMG_H     = 460;
const LERP      = 0.068;
const SCROLL_VH = 130;

/* ─── Component ──────────────────────────────────────────────── */
export default function Office() {
  const containerRef = useRef(null);
  const rafRef       = useRef(null);
  const smoothRef    = useRef(0);
  const targetRef    = useRef(0);

  const [radius,      setRadius]      = useState(450);
  const [screenW,     setScreenW]     = useState(1440);
  const [smoothFocus, setSmoothFocus] = useState(0);

  /* ── Viewport sync ────────────────────────────────────────── */
  useEffect(() => {
    const sync = () => {
      setRadius(Math.floor(window.innerHeight / 2));
      setScreenW(window.innerWidth);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  /* ── Scroll + RAF loop ────────────────────────────────────── */
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

  const isMobile = screenW < 768;
  const VH       = radius * 2;

  /* ════════════════════════════════════════════════════════════
     MOBILE — card-stack
     ════════════════════════════════════════════════════════════ */
  if (isMobile) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Anton&family=Cormorant+Garamond:wght@300;400&family=DM+Sans:wght@300;400&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
        `}</style>

        <div ref={containerRef} style={{ height: `${TOTAL * 100}vh` }}>
          <div style={{
            position: "sticky", top: 0,
            height: "100vh", overflow: "hidden",
            background: "#060508",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}>

            {/* ── Card stack ──────────────────────────────────── */}
            <div style={{ position: "relative", width: "88%", height: "68vh", marginBottom: 96 }}>
              {IMAGES.map((img, i) => {
                const val = i - smoothFocus;
                let yPx, sc, op;
                if (val < 0) {
                  yPx = val * VH * 1.15;
                  sc  = Math.max(0, 1 + val * 0.06);
                  op  = Math.max(0, 1 + val * 0.35);
                } else {
                  yPx = val * 38;
                  sc  = Math.max(0, 1 - val * 0.05);
                  op  = Math.max(0, 1 - val * 0.14);
                }

                return (
                  <div key={img.id} style={{
                    position: "absolute", inset: 0,
                    borderRadius: 14, overflow: "hidden",
                    transform: `translate3d(0,${yPx.toFixed(2)}px,0) scale(${sc.toFixed(4)})`,
                    opacity: op,
                    zIndex: 100 - i,
                    transformOrigin: "bottom center",
                    willChange: "transform, opacity",
                    boxShadow: "0 -6px 28px rgba(0,0,0,0.45)",
                  }}>
                    <img src={img.src} alt={img.title} draggable={false}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />

                    {/* Bottom fade */}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: "45%",
                      background: "linear-gradient(to top, rgba(6,5,8,0.82) 0%, transparent 100%)",
                    }} />

                    {/* Tab strip */}
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0,
                      height: 6, background: "rgba(255,255,255,0.08)",
                    }} />

                    {/* Counter badge only */}
                    <div style={{
                      position: "absolute", bottom: 16, left: 18,
                      display: "flex", alignItems: "center",
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
                    </div>

                    {/* Gold focus ring */}
                    {Math.abs(val) < 0.45 && (
                      <div style={{
                        position: "absolute", inset: -2,
                        borderRadius: 16,
                        border: `1.5px solid rgba(195,158,72,${((0.45 - Math.abs(val)) * 2).toFixed(3)})`,
                        pointerEvents: "none",
                      }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* ── Heading pinned at bottom ─────────────────────── */}
            <div style={{
              position: "absolute", bottom: 36,
              left: 0, right: 0, textAlign: "center",
              zIndex: 200, pointerEvents: "none", userSelect: "none",
            }}>
              <div style={{
                width: 36, height: 1.5,
                background: "rgba(195,158,72,0.75)",
                margin: "0 auto 10px",
              }} />
              <div style={{
                fontFamily: "'Anton', 'Impact', sans-serif",
                fontSize: 22, color: "rgba(255,255,255,0.88)",
                textTransform: "uppercase", letterSpacing: "0.06em", lineHeight: 1.2,
              }}>
                Office &amp; Workspaces
              </div>
              <div style={{
                width: "56%", height: 1,
                background: "rgba(255,255,255,0.1)",
                margin: "14px auto 0", overflow: "hidden",
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

  /* ════════════════════════════════════════════════════════════
     DESKTOP — circular ring carousel
     ════════════════════════════════════════════════════════════ */
  const layoutRadius  = radius;
  const layoutImgW    = IMG_W;
  const layoutImgH    = IMG_H;
  const circleCenterX = Math.round(
    Math.min(
      screenW * 0.42,
      screenW - layoutRadius - layoutImgW / 2 - 24
    )
  );

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

      <div ref={containerRef} style={{ height: `${TOTAL * SCROLL_VH}vh` }}>
        <div style={{
          position: "sticky", top: 0,
          height: "100vh", overflow: "hidden",
          background: "#060508",
        }}>

          {/* ── Ghost outline watermark ───────────────────────── */}
          <div style={{
            position: "absolute", left: -24, top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none", zIndex: 0,
            userSelect: "none", lineHeight: 0.88,
          }}>
            {["Office", "&", "Workspaces"].map((word, i) => (
              <div key={i} style={{
                fontFamily:       "'Anton', 'Impact', 'Arial Black', sans-serif",
                fontSize:         `${Math.round(radius * [0.30, 0.16, 0.20][i])}px`,
                color:            "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.05)",
                textTransform:    "uppercase",
                letterSpacing:    "-0.02em",
                display:          "block",
              }}>
                {word}
              </div>
            ))}
          </div>

          {/* ── Readable label above images ───────────────────── */}
          <div style={{
            position: "absolute", left: 44, top: "50%",
            transform: "translateY(-52%)",
            pointerEvents: "none", zIndex: 500,
            userSelect: "none", mixBlendMode: "screen", lineHeight: 1.02,
          }}>
            <div style={{
              width: 52, height: 1,
              background: "rgba(195,158,72,0.9)",
              marginBottom: 14,
            }} />
            {["Office", "&", "Workspaces"].map((word, i) => (
              <div key={i} style={{
                fontFamily:    "'Anton', 'Impact', 'Arial Black', sans-serif",
                fontSize:      `${Math.round(radius * [0.155, 0.09, 0.105][i])}px`,
                color:         i === 0
                  ? "rgba(255,255,255,0.95)"
                  : "rgba(255,255,255,0.72)",
                textTransform: "uppercase",
                letterSpacing: i === 0 ? "-0.01em" : "0.04em",
                display:       "block",
              }}>
                {word}
              </div>
            ))}
          </div>

          {/* ── Ambient glow ──────────────────────────────────── */}
          <div style={{
            position: "absolute",
            left: circleCenterX, top: "50%",
            transform: "translate(-50%, -50%)",
            width: layoutRadius * 2.8, height: layoutRadius * 2.8,
            background: "radial-gradient(circle, rgba(172,128,54,0.072) 0%, transparent 62%)",
            pointerEvents: "none",
          }} />

          {/* Right vignette */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 100% 50%, rgba(14,10,28,0.5) 0%, transparent 55%)",
            pointerEvents: "none",
          }} />

          {/* ── Guide rings ───────────────────────────────────── */}
          <div style={{
            position: "absolute",
            left: circleCenterX - (layoutRadius + 22), top: "50%",
            transform: "translateY(-50%)",
            width: (layoutRadius + 22) * 2, height: (layoutRadius + 22) * 2,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.030)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            left: circleCenterX - (layoutRadius - 22), top: "50%",
            transform: "translateY(-50%)",
            width: (layoutRadius - 22) * 2, height: (layoutRadius - 22) * 2,
            borderRadius: "50%",
            border: "1px solid rgba(172,128,54,0.048)",
            pointerEvents: "none",
          }} />

          {/* ── Images on the circle ──────────────────────────── */}
          {IMAGES.map((img, i) => {
            let dist = i - smoothFocus;
            const half = TOTAL / 2;
            dist = ((dist % TOTAL) + TOTAL) % TOTAL;
            if (dist > half) dist -= TOTAL;

            const angleDeg = dist * ANGLE_DEG;
            const angleRad = angleDeg * (Math.PI / 180);
            const xAbs = circleCenterX + layoutRadius * Math.cos(angleRad);
            const yPos = layoutRadius * Math.sin(angleRad);

            if (xAbs + layoutImgW / 2 < 0)      return null;
            if (xAbs - layoutImgW / 2 > screenW) return null;

            const absDist  = Math.abs(dist);
            const scale    = Math.max(0.35, 1 - absDist * 0.124);
            const opacity  = Math.max(0.08, 1 - absDist * 0.175);
            const blur     = Math.max(0, Math.min(5.5, absDist * 1.05 - 0.55));
            const zIndex   = Math.round(100 - absDist * 5);
            const tilt     = angleDeg * 0.088;
            const dimVal   = Math.min(0.75, absDist * 0.12);

            return (
              <div key={img.id} style={{
                position: "absolute",
                left: 0, top: "50%",
                width: layoutImgW, height: layoutImgH,
                transform: `translate(${(xAbs - layoutImgW / 2).toFixed(2)}px, calc(-50% + ${yPos.toFixed(2)}px)) scale(${scale.toFixed(4)}) rotate(${tilt.toFixed(3)}deg)`,
                opacity,
                filter: blur > 0.15 ? `blur(${blur.toFixed(2)}px)` : "none",
                zIndex,
                willChange: "transform, opacity",
              }}>
                <img
                  src={img.src} alt={img.title} draggable={false}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", borderRadius: 5,
                    display: "block", background: "#1a1620",
                  }}
                />

                {/* Dim overlay */}
                {dimVal > 0.02 && (
                  <div style={{
                    position: "absolute", inset: 0, borderRadius: 5,
                    background: `rgba(6,5,8,${dimVal.toFixed(3)})`,
                  }} />
                )}

                {/* Focus gold ring */}
                {absDist < 0.42 && (
                  <div style={{
                    position: "absolute", inset: -2, borderRadius: 7,
                    border: `1.5px solid rgba(195,158,72,${Math.max(0, (0.42 - absDist) * 2.4).toFixed(3)})`,
                    pointerEvents: "none",
                  }} />
                )}

                {/* Index badge on focused card */}
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

          {/* ── Vertical edge label ───────────────────────────── */}
          <div style={{
            position: "absolute", left: 22, top: "50%",
            transform: "translateY(-50%) rotate(-90deg)",
            transformOrigin: "center center",
            fontSize: 8, letterSpacing: "4px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.1)",
            fontFamily: "'DM Sans', sans-serif",
            whiteSpace: "nowrap",
          }}>
            Office Gallery&ensp;·&ensp;15 Properties
          </div>

        </div>
      </div>
    </>
  );
}