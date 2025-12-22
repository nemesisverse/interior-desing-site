import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import KnowUs from "./components/KnowUs";
import Project1 from "./components/Project1";
import Project2 from "./components/Project2";
import Project3 from "./components/Project3";
import Project4 from "./components/Project4";
import Footer from "./components/footer"; 
import Portfolio1 from "./components/Portfolio1";
import PortfolioS1 from "./components/PortfolioS1";
import Footer2 from "./components/footer2";

export default function App() {
  const router = createBrowserRouter([
        {
      path: "/",
      element:<>
      <Navbar/> 
      <div className="fixed top-0 left-0 w-full h-screen">
        <Hero />
      </div>
      <KnowUs />
      <Project1 />
      <Project2 />
      <Project3 />
      <Project4 />
      <Footer />  
      </>
      
    }
    ,
    {
      path: "/Portfolio",
      element:<><Navbar/><Portfolio1/><PortfolioS1/><Footer2/></>,
    },
    {

    }

  ]);
  return (
    <div>
      {/* <Navbar />

      <div className="fixed top-0 left-0 w-full h-screen">
        <Hero />
      </div>

      <KnowUs />
      <Project1 />
      <Project2 />
      <Project3 />
      <Project4 />
      <Footer /> */}

      <RouterProvider router={router} />
    </div>
  );
}
