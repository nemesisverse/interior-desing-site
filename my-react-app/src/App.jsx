import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
import Navbar2 from "./components/Navbar2";

import ContactUs from "./components/ContactUs";
import BlogCover from "./components/BlogCover";
import Blog from "./components/Blog";

// Ensure this file exists and contains the code I gave you in Solution 1
import ScrollToTop from "./components/ScrollToTop"; 

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ScrollToTop /> {/* <--- Added here */}
          <Navbar />
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
      ),
    },
    {
      path: "/Portfolio",
      element: (
        <>
          <ScrollToTop /> {/* <--- Added here */}
          <Navbar />
          <Portfolio1 />
          <PortfolioS1 />
          <Footer2 />
        </>
      ),
    },
    {
      path: "/contactus",
      element: (
        <>
          <ScrollToTop /> {/* <--- Added here */}
          <Navbar2 />
          <ContactUs />
          <Footer2 />
        </>
      ),
    },
    {
      path: "/blog",
      element: (
        <>
          <ScrollToTop /> {/* <--- Added here */}
          <Navbar />
          <BlogCover />
          <Blog />
          <Footer2 />
        </>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}