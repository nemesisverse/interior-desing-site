import React from "react";
import img1 from "../images/Portfolio/sunlight.png";
import img2 from "../images/Portfolio/sunbed.png";
import img3 from "../images/Portfolio/spa.png";
import img4 from "../images/Portfolio/plantbed.png";

export default function Blog() {
  // Data: Biophilic Elements
  const natureElements = [
    { element: "Living Walls", theme: "bg-green-50 border-green-200", dot: "bg-green-600", title: "Vertical Gardens", desc: "More than just potted plants—living walls purify air and act as stunning, organic art pieces that breathe life into a room." },
    { element: "Natural Light", theme: "bg-amber-50 border-amber-200", dot: "bg-amber-400", title: "Sun Exposure", desc: "Optimising window treatments to flood spaces with daylight, boosting serotonin and resetting circadian rhythms." },
    { element: "Raw Timber", theme: "bg-orange-50 border-orange-200", dot: "bg-yellow-800", title: "Warmth & Texture", desc: "Using reclaimed wood or unpolished timber adds tactile warmth and a grounding, earthy connection to the forest." },
    { element: "Stone & Clay", theme: "bg-stone-100 border-stone-300", dot: "bg-stone-500", title: "Cool & Grounding", desc: "Travertine, terracotta, or slate introduce natural imperfections that synthetic materials simply cannot mimic." },
    { element: "Water Features", theme: "bg-cyan-50 border-cyan-200", dot: "bg-cyan-600", title: "Sound & Movement", desc: "Indoor fountains or aquariums introduce the soothing sound of flowing water, instantly lowering stress levels." },
    { element: "Curved Forms", theme: "bg-rose-50 border-rose-200", dot: "bg-rose-400", title: "Organic Architecture", desc: "Nature rarely builds in straight lines. Arched doorways and curved furniture mimic the softness of the natural world." },
  ];

  // Data: Room by Room Guide
  const roomGuides = [
    { room: "The Living Room", tip: "Layer textures using jute rugs and linen curtains. Introduce a large statement plant like a Fiddle Leaf Fig near the window to blur the line between indoors and outdoors." },
    { room: "The Bedroom", tip: "Focus on air purity. Snake Plants and Peace Lilies release oxygen at night. Stick to warm, dimmable lighting (2700K) to mimic the setting sun." },
    { room: "The Bathroom", tip: "Create a spa sanctuary. High humidity lovers like Ferns and Bamboo thrive here. Use river stones in the shower flooring for a tactile foot massage." },
  ];

  return (
    <section className="relative w-full min-h-screen bg-transparent pt-[50vh] pb-0">
      
      {/* Main Container */}
      <div className="w-full mx-auto bg-white text-gray-800 shadow-2xl relative z-10 mb-0">
        
        {/* Decorative Top Gradient Line */}
        <div className="h-2 w-full bg-gradient-to-r from-green-800 via-stone-400 to-green-800"></div>

        <div className="px-6 md:px-12 py-16 md:py-24">
          
          {/* Header Section */}
          <div className="mb-14 text-center border-b border-gray-100 pb-12">
            <span className="inline-block py-1 px-3 border border-stone-300 rounded-full text-xs font-semibold tracking-wider text-green-700 uppercase mb-6">
              Sustainable Living
            </span>
            <h1 className="text-4xl md:text-7xl font-serif font-medium text-gray-900 mb-8 leading-tight max-w-5xl mx-auto">
              Biophilic Design: <span className="italic text-stone-600">The Art of Bringing the Outdoors In</span>
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-400 text-sm uppercase tracking-widest font-medium">
              <span>December 28, 2025</span>
              <span>•</span>
              <span>8 Min Read</span>
            </div>
          </div>

          {/* Article Body */}
          <article className="prose prose-lg md:prose-xl prose-stone mx-auto text-gray-600 prose-headings:font-serif prose-headings:text-gray-900 prose-img:rounded-xl prose-img:shadow-lg">
            
            {/* Intro */}
            <p className="first-letter:text-7xl first-letter:font-serif first-letter:text-green-800 first-letter:mr-3 first-letter:float-left leading-relaxed">
              In an era where we spend 90% of our time indoors, the disconnect from nature has become palpable. Enter <strong>Biophilic Design</strong>—not just a trend, but a fundamental philosophy in modern architecture. It is the practice of weaving nature into the built environment, creating spaces that don't just look good, but actually make us <em>feel</em> healthier and more connected.
            </p>
            
            <p>
              For urban dwellers in bustling cities like <strong>Mumbai or Gurgaon</strong>, where concrete skylines dominate, creating a sanctuary that mimics the natural world is no longer a luxury; it is a necessity for mental well-being.
            </p>

            {/* Visual 1: Hero Image Placeholder */}
            <figure className="my-12">
              <img 
                src={img2} 
                alt="A sunlit living room filled with plants" 
                className="w-full object-cover h-[400px]"
              />
              <figcaption className="text-center text-sm text-gray-500 mt-4 italic">
                A perfect example of maximizing natural light and greenery in a modern living space.
              </figcaption>
            </figure>

            {/* Section: The Science */}
            <h2 className="text-3xl font-bold mt-12 mb-6">More Than Just Plants</h2>
            <p>
              Biophilia goes beyond simply placing a pot plant in the corner. It is about evolutionary biology. Humans have spent 99% of their history in nature; our bodies are hardwired to respond to natural cues.
            </p>

            {/* Styled Quote Box */}
            <div className="my-12 p-8 bg-green-50/50 border-l-4 border-green-600 rounded-r-xl">
              <h3 className="text-xl font-bold mt-0 mb-4 text-green-900">Why Go Biophilic?</h3>
              <p className="mb-4 text-sm md:text-base text-gray-700">
                Science suggests that integrating natural elements into interiors can drastically reduce cortisol (stress) levels. A biophilic home offers:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 list-none pl-0 my-0 text-sm md:text-base font-medium text-stone-700">
                <li className="flex items-center gap-2"><span>🌿</span> Improved Air Quality</li>
                <li className="flex items-center gap-2"><span>🧠</span> Enhanced Creativity & Focus</li>
                <li className="flex items-center gap-2"><span>🛌</span> Better Sleep Cycles</li>
                <li className="flex items-center gap-2"><span>🧘‍♀️</span> Lower Blood Pressure</li>
              </ul>
            </div>

            {/* Visual Grid: The 6 Pillars */}
            <div className="not-prose my-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2 text-center">The 6 Pillars of Nature</h2>
              <p className="text-center text-gray-500 mb-10">How top designers are rewilding modern interiors.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {natureElements.map((item, index) => (
                  <div key={index} className={`p-6 rounded-xl border ${item.theme} hover:shadow-lg transition-all duration-300 group`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-6 h-6 rounded-full shadow-sm ring-2 ring-white ${item.dot} group-hover:scale-110 transition-transform`}></div>
                      <h3 className="text-lg font-bold text-gray-900">{item.element}</h3>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{item.title}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Room by Room Guide - IMAGES ZOOMED IN HERE */}
            <div className="my-16">
               <h2 className="text-3xl font-bold mb-6">Bringing It Home: A Room-by-Room Guide</h2>
               <p className="mb-8">Not sure where to start? Here is how to subtly introduce biophilic concepts into different zones of your home.</p>
               
               {/* Visual 2: Room Collage - Zoomed In Effect added */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 not-prose">
                  {/* Image 1 Wrapper */}
                  <div className="rounded-xl shadow-md overflow-hidden h-80">
                    <img src={img4} alt="Bedroom" className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110" />
                  </div>
                  {/* Image 2 Wrapper */}
                  <div className="rounded-xl shadow-md overflow-hidden h-80">
                    <img src={img1} alt="Kitchen" className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110" />
                  </div>
                  {/* Image 3 Wrapper */}
                  <div className="rounded-xl shadow-md overflow-hidden h-80">
                    <img src={img2} alt="Bathroom" className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110" />
                  </div>
               </div>

               <div className="space-y-8">
                 {roomGuides.map((guide, idx) => (
                   <div key={idx} className="flex flex-col md:flex-row gap-4 md:items-start border-b border-gray-100 pb-6 last:border-0">
                      <span className="text-4xl font-serif text-gray-200 font-bold">0{idx + 1}</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mt-0 mb-2">{guide.room}</h3>
                        <p className="text-gray-600 m-0">{guide.tip}</p>
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Section: Lighting */}
            <div className="bg-stone-900 text-stone-200 p-8 md:p-12 rounded-2xl my-16 not-prose relative overflow-hidden">
               {/* Abstract decorative circle */}
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-stone-800 rounded-full opacity-50"></div>
               
               <h2 className="text-2xl md:text-3xl font-serif mb-4 text-white relative z-10">Don't Forget The Lighting</h2>
               <p className="text-stone-400 mb-6 max-w-2xl relative z-10">
                 Natural light is best, but when the sun goes down, your artificial lighting should mimic nature. Avoid harsh, cool-white LEDs (6000K) which signal "mid day" to your brain and disrupt sleep.
               </p>
               <div className="flex flex-col md:flex-row gap-6 relative z-10">
                 <div className="flex-1 bg-stone-800/50 p-4 rounded-lg border border-stone-700">
                    <span className="text-amber-400 font-bold block mb-1">Morning & Day</span>
                    <span className="text-sm text-stone-400">Cooler, brighter light to stimulate alertness (4000K).</span>
                 </div>
                 <div className="flex-1 bg-stone-800/50 p-4 rounded-lg border border-stone-700">
                    <span className="text-orange-400 font-bold block mb-1">Evening</span>
                    <span className="text-sm text-stone-400">Warm, dim light to trigger melatonin (2700K or lower).</span>
                 </div>
               </div>
            </div>

            {/* Conclusion */}
            <div className="mt-12 pt-10 border-t border-gray-100">
              <h2 className="text-3xl font-bold mb-4">A Return to Roots</h2>
              <p>
                True luxury today is silence, space, and nature. By embracing raw materials like unpolished marble, jute rugs, and reclaimed teak, we strip away the artificiality of modern life.
              </p>
              
              <p className="text-2xl font-serif italic text-gray-800 my-10 text-center leading-relaxed">
                "We do not just want to see nature; we want to be part of it. Your home should be the garden you retreat to."
              </p>

              <p>
                Whether you are redesigning a corporate office or a cozy apartment, remember: if you take care of nature within your walls, it will take care of you.
              </p>
            </div>
            
          </article>
        </div>
      </div>
    </section>
  );
}