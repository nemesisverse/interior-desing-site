import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import KnowUs from "./components/KnowUs";
import Pproject1 from "./components/Project1";


import Project1 from "./components/Project1";
export default function App() {

  return (
    <div>
      <Navbar/>
      <div className="fixed top-0 left-0 w-full h-screen">
        <Hero />
      </div>
      
      <KnowUs/>
      <Pproject1/>
      <Pproject1/>
      <Pproject1/>
      
      
    </div>   
  );
}
