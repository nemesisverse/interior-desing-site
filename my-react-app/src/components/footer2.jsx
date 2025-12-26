import React, { useEffect } from 'react';

export default function Footer2() {
  
  // --- FIX: PREVENT OVERSCROLL BOUNCE ---
  useEffect(() => {
    // This prevents the "rubber banding" effect where the footer lifts off the bottom
    // when you scroll past the end of the page.
    document.body.style.overscrollBehaviorY = 'none';
    document.documentElement.style.overscrollBehaviorY = 'none'; 

    // Cleanup: Restore default behavior when/if the component unmounts
    return () => {
      document.body.style.overscrollBehaviorY = 'auto';
      document.documentElement.style.overscrollBehaviorY = 'auto';
    };
  }, []);

  return (
    <footer className="relative bg-[#111111] text-white pt-20 pb-10 font-sans z-10">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        
        {/* --- LEFT SECTION: Contact & Socials --- */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold underline underline-offset-4 decoration-1 mb-6">
            MONICA KHANNA DESIGNS
          </h3>
          
          <div className="space-y-1 text-gray-200 text-base leading-relaxed">
            <p>Unit no GL 502, 5th Flr</p>
            <p>DLF CROSS POINT</p>
            <p>DLF City Phase IV, Sector 28</p>
            <p>Gurgaon, Haryana 122002</p>
            <p>India</p>
          </div>

          <p className="mt-4 text-gray-200">+91 9599732700</p>
          
          <a 
            href="mailto:info@monicakhannadesigns.com" 
            className="block text-gray-200 hover:text-white underline decoration-1 underline-offset-4"
          >
            info@monicakhannadesigns.com
          </a>

          {/* Social Icons */}
          <div className="flex items-center gap-5 mt-8">
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:opacity-80 transition-opacity"
            >
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:opacity-80 transition-opacity"
            >
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a 
              href="https://www.instagram.com/elevatedhomeinterio?igsh=MXFwdWpqZjUxNnFraA%3D%3D&utm_source=qrs" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:opacity-80 transition-opacity"
            >
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                 <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.495-.69-2.433-2.852-2.433-4.587 0-3.728 2.705-7.149 7.812-7.149 4.104 0 7.296 2.932 7.296 6.855 0 4.086-2.571 7.356-6.138 7.356-1.198 0-2.328-.62-2.716-1.356l-.736 2.795c-.266 1.017-.99 2.285-1.475 3.06 1.108.341 2.285.526 3.504.526 6.619 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z"/>
              </svg>
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:opacity-80 transition-opacity"
            >
               <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
               </svg>
            </a>
            <a 
              href="https://www.linkedin.com/company/elevatedhomeinterio/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:opacity-80 transition-opacity"
            >
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:opacity-80 transition-opacity"
            >
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                 <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* --- RIGHT SECTION: Vendor & Legal --- */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-gray-200 text-base leading-relaxed mb-6">
              <span className="font-bold text-white">VENDOR INQUIRY: </span>
              We are constantly looking for vendors and partners for our projects. We do not accept calls or texts at this time. Please send us your details at{" "}
              <a href="mailto:info@monicakhannadesigns.com" className="underline hover:text-white">
                info@monicakhannadesigns.com
              </a>{" "}
              and include ‘VENDOR’ in the subject so we don’t miss it. We will review your product line and get back to you as needed. Please send us only one email. Thank you.
            </p>
          </div>

          <div className="flex flex-col md:items-end space-y-2 mt-8 md:mt-0 text-sm">
             <div className="flex flex-col md:items-center space-y-2">
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="underline hover:text-gray-300"
                >
                  Terms and Condition
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="underline hover:text-gray-300"
                >
                  Privacy Policy
                </a>
             </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
}