import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative">
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* logo */}
        <div className="text-xl font-bold">Elevated Home Interior</div>

        {/* desktop links */}
        <div className="hidden md:flex md:space-x-8 items-center text-sm uppercase">
          <a href="#" className="group">About</a>
          <a href="#" className="group">Careers</a>
          <a href="#" className="group">People</a>
          <a href="#" className="group">Projects</a>
          <a href="#" className="group">Contact us</a>
        </div>

        {/* hamburger (mobile only) */}
        <div className="md:hidden">
          <button
            id="menu-btn"
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((s) => !s)}
            className={`hamburger z-40 relative w-6 h-6 flex items-center justify-center ${open ? "open" : ""}`}
          >
            <span className="hamburger-top block"></span>
            <span className="hamburger-middle block"></span>
            <span className="hamburger-bottom block"></span>
          </button>
        </div>
      </nav>

      {/* mobile menu - slides in/out */}
      <div
        id="menu"
        className={`fixed inset-0 z-30 bg-black text-white transition-transform duration-300 md:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{ minHeight: "100vh" }}
      >
        <div className="pt-24 pl-8 flex flex-col gap-6 uppercase text-lg">
          <a href="#" className="hover:text-pink-500" onClick={() => setOpen(false)}>About</a>
          <a href="#" className="hover:text-pink-500" onClick={() => setOpen(false)}>Careers</a>
          <a href="#" className="hover:text-pink-500" onClick={() => setOpen(false)}>People</a>
          <a href="#" className="hover:text-pink-500" onClick={() => setOpen(false)}>Projects</a>
          <a href="#" className="hover:text-pink-500" onClick={() => setOpen(false)}>Contact Us</a>
        </div>
      </div>
    </header>
  );
}
