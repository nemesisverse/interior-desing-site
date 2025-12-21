import { useEffect, useState } from "react";
import img1 from "../animation_images/hero1.jpg";
import img2 from "../animation_images/hero2.png";
import img3 from "../animation_images/hero3.png";
import img4 from "../animation_images/hero4.png";

const images = [img1, img2, img3, img4];

const taglines = [
  "Timeless elegance for modern living.",
  "Crafting luxury lifestyles.",
  "Exquisite spaces, exclusively yours.",
  "The art of refined living.",
  "Luxury in every detail",
];

export default function Hero() {
  const [currentImg, setCurrentImg] = useState(0);
  
  // Text Animation States
  const [showWelcome, setShowWelcome] = useState(true); 
  const [taglineIndex, setTaglineIndex] = useState(0);  
  const [isTextVisible, setIsTextVisible] = useState(true); 

  // 1. Background Image Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // 2. Welcome Message Logic
  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      setIsTextVisible(false);
      setTimeout(() => {
        setShowWelcome(false);
        setIsTextVisible(true);
      }, 500); 
    }, 4000); 

    return () => clearTimeout(welcomeTimer);
  }, []);

  // 3. Tagline Loop Logic
  useEffect(() => {
    if (showWelcome) return; 

    const interval = setInterval(() => {
      setIsTextVisible(false);
      setTimeout(() => {
        setTaglineIndex((prev) => (prev + 1) % taglines.length);
        setIsTextVisible(true);
      }, 500); 
    }, 3000); 

    return () => clearInterval(interval);
  }, [showWelcome]);

  return (
    <div>
      {/* Import the Cursive Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');
      `}</style>

      <section id="hero">
        <div className="container max-w-6xl mx-auto h-screen">
          {/* Background Images Layer */}
          <div id="transition" className="absolute inset-0">
            {images.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-cover bg-center transform transition-all duration-[4000ms] ease-in-out ${
                  index === currentImg
                    ? index === 0
                      ? "opacity-100 -translate-y-3 scale-105"
                      : index === 1
                      ? "opacity-100 translate-y-3 scale-105"
                      : index === 2
                      ? "opacity-100 -translate-x-3 scale-105"
                      : "opacity-100 translate-x-3 scale-105"
                    : "opacity-0 translate-x-0 translate-y-0 scale-100"
                } `}
                style={{ backgroundImage: `url(${img})` }}
              >
                 {/* Dark Overlay */}
                 <div className="absolute inset-0 bg-black/40"></div>
              </div>
            ))}
          </div>

          {/* Content Layer */}
          <div className="relative z-20 container max-w-6xl mx-auto h-full flex flex-col items-center justify-center text-center px-4">
            
            <div
              className={`
                text-3xl md:text-5xl                   
                font-['Dancing_Script',_cursive]       
                text-white drop-shadow-lg 
                transform transition-all duration-500 ease-in-out 
                ${isTextVisible 
                  ? "opacity-100 translate-y-0 blur-0" 
                  : "opacity-0 translate-y-4 blur-sm"
                }
              `}
            >
              {showWelcome 
                ? "Welcome to Elevated Home Interio" 
                : taglines[taglineIndex]
              }
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}