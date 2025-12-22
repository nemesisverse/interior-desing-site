import { useEffect, useState } from "react";
import img1 from "../images/Portfolio/port11.png";

export default function Portfolio1() {
    return (
        <div className="relative">
            {/* Background Image Section 
              - w-full: Occupies the full width of the screen.
              - h-1/3: Occupies exactly 1/3 of the screen height.
              - fixed: Locks it to the top.
            */}
            <img 
                src={img1}
                alt="Background" 
                className="fixed top-0 left-0 w-full h-2/3 object-cover -z-10"
            />

            {/* Example Content 
              - mt-[33vh]: Adds margin-top equal to 33% of the viewport height.
              This pushes your content down so it starts exactly where the image ends.
            */}
            
        </div>
    );  
}