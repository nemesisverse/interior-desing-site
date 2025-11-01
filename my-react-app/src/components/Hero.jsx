import { useEffect, useState } from "react";
import img1 from "../animation_images/1.jpeg";
import img2 from "../animation_images/2.jpeg";
import img3 from "../animation_images/3.jpeg";
import img4 from "../animation_images/4.jpeg";

const images = [img1, img2, img3, img4];

export default function Hero() {
  const [current, setCurrent] = useState(0);

    // change image every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      //image ka index change
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div>
        <section id = "hero" >
                {/* max-w-6xl:widht according to screen /mx-auto:allign the whole container to center */}
                {/* h-screen:-it makes that element as tall as the entire visible browser window. */}
                {/* i used backgorund-size:cover; in css to cover whole container */}
                <div  className="container max-w-6xl mx-auto  h-screen   " >  
                  {/* Background Images Layer */}
                  <div  id="transition" className="absolute inset-0">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 bg-cover bg-center transform transition-all duration-[4000ms] ease-in-out ${
                          index === current
                            ? index === 0
                              ? "opacity-100 -translate-y-3 scale-105" // move up + zoom
                              : index === 1
                              ? "opacity-100 translate-y-3 scale-105"  // move down + zoom
                              : index === 2
                              ? "opacity-100 -translate-x-3 scale-105" // move left + zoom
                              : "opacity-100 translate-x-3 scale-105"  // move right + zoom
                            : "opacity-0 translate-x-0 translate-y-0 scale-100"
                        }`}
                        style={{ backgroundImage: `url(${img})` }}
                      />
                    ))}
                  </div>

                  
                  {/* Content Layer */}
                  <div className="relative z-10 container max-w-6xl mx-auto h-full flex items-center justify-center">
                    <h1 className="text-5xl font-bold text-white drop-shadow-lg">
                      Welcome to My Design Studio
                    </h1>
                  </div>
                </div>
        </section>
    </div>
  );
}
