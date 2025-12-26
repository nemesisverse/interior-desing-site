import { useState } from "react";

export default function ContactUs() {
  // --- State Management ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '',
    customInterest: '', 
    phone: '',
    message: ''
  });

  // --- NEW: Loading State ---
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Start Loading
    setIsSubmitting(true);

    // Logic: Resolve the final interest value
    const finalInterest = formData.interest === 'other' 
      ? formData.customInterest 
      : formData.interest;

    // Prepare the data object
    const submissionData = {
      name: formData.name,
      email: formData.email,
      interest: finalInterest,
      phone: formData.phone,
      message: formData.message
    };

    try {
      // 2. Send POST request to your backend
      const response = await fetch('http://127.0.0.1:5001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (response.ok) {
        // Success Handling
        console.log("Saved to DB:", result);
        alert(`Message sent successfully! We'll contact you about: ${finalInterest}`);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          interest: '',
          customInterest: '',
          phone: '',
          message: ''
        });
      } else {
        // Error Handling
        alert("Failed to send message. Please try again.");
      }

    } catch (error) {
      console.error("Network Error:", error);
      alert("Error connecting to the server.");
    } finally {
      // 3. Stop Loading (runs whether success or fail)
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] font-sans text-gray-900 pb-20">
      
      {/* UPDATED PADDING: 
        Changed 'py-16' to 'pt-32 pb-16'. 
        'pt-32' adds 128px of space at the top, ensuring the fixed navbar doesn't cover the title.
      */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-16 lg:px-12">
        
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold mb-16 tracking-tight text-black">Get in touch</h1>

        {/* --- Top Section: Form & Contact Info --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Left: Contact Form (Spans 7 columns) */}
          <div className="lg:col-span-7">
            <h2 className="text-lg font-bold mb-2 text-black">Send a Message</h2>
            <p className="text-gray-500 text-sm mb-10 leading-relaxed">
              Please fill out the form below and our team will get back to you at the earliest.
            </p>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="w-full bg-transparent border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder-gray-800 font-semibold"
                    required
                  />
                  <label className="absolute -top-3 left-0 text-xs font-bold text-gray-900">Name</label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full bg-transparent border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder-gray-800 font-semibold"
                    required
                  />
                  <label className="absolute -top-3 left-0 text-xs font-bold text-gray-900">Email Address</label>
                </div>
              </div>

              {/* Row 2: Interest & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                
                {/* Interest Select */}
                <div className="relative">
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors font-semibold appearance-none text-gray-800"
                    required
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="design">Design</option>
                    <option value="development">Development</option>
                    <option value="marketing">Marketing</option>
                    <option value="other">Other</option>
                  </select>
                  <label className="absolute -top-3 left-0 text-xs font-bold text-gray-900">Interested In</label>
                  {/* Custom Arrow */}
                  <div className="absolute right-0 top-4 pointer-events-none">
                     <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="black" strokeWidth="1.5"/></svg>
                  </div>
                </div>

                {/* Phone Number Input */}
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*$/.test(val) && val.length <= 11) {
                            setFormData({ ...formData, phone: val });
                        }
                    }}
                    minLength={10} 
                    maxLength={11} 
                    pattern="[0-9]{10,11}" 
                    title="Please enter a valid 10 digit phone number"
                    placeholder="Phone Number"
                    className="w-full bg-transparent border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder-gray-800 font-semibold"
                  />
                  <label className="absolute -top-3 left-0 text-xs font-bold text-gray-900">Phone Number</label>
                </div>

                {/* CONDITIONAL INPUT: Other Interest */}
                {formData.interest === 'other' && (
                  <div className="relative md:col-span-2 animate-fadeIn"> 
                    <input
                      type="text"
                      name="customInterest"
                      value={formData.customInterest}
                      onChange={handleInputChange}
                      placeholder="Please specify your interest"
                      className="w-full bg-transparent border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder-gray-500 font-semibold italic"
                      required={formData.interest === 'other'} 
                      autoFocus
                    />
                    <label className="absolute -top-3 left-0 text-xs font-bold text-gray-900">Specify Other</label>
                  </div>
                )}
              </div>

              {/* Row 3: Message */}
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="1"
                  placeholder="Message"
                  className="w-full bg-transparent border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder-gray-800 font-semibold resize-none"
                ></textarea>
                <label className="absolute -top-3 left-0 text-xs font-bold text-gray-900">Message</label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting} 
                  className={`bg-black text-white pl-8 pr-6 py-3 rounded-sm text-sm font-semibold flex items-center gap-3 transition-colors ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Submit'} 
                  {!isSubmitting && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right: Contact Details */}
          <div className="lg:col-span-5 flex flex-col gap-10 lg:pl-16 pt-2">
            {/* Call Us */}
            <div>
              <h3 className="text-sm font-bold mb-3 text-black">Call Us</h3>
              <p className="text-gray-500 text-sm mb-3 leading-relaxed">
                Please contact us during office hours, between 9:30 a.m. and 6:00 p.m.

              </p>
              <a href="tel:9867672000" className="text-orange-400 font-semibold text-sm flex items-center hover:text-orange-600 transition-colors">
                
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                (986) 767-2000
              </a>
            </div>

            {/* Visit Us */}
            <div>
              <h3 className="text-sm font-bold mb-3 text-black">Visit Us</h3>
              <p className="text-gray-500 text-sm mb-3 leading-relaxed">
                Fusion Ufairia Mall, Office No F-139B, Sector 16B, Greater Noida, Ghaziabad, Uttar Pradesh, 201310
              </p>
              <a href="#" className="text-orange-400 font-semibold text-sm flex items-center hover:text-orange-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                Elevated Home Interio Fusion Ufairia Mall, 201310
              </a>
            </div>

            {/* Live Chat */}
            <div>
              <h3 className="text-sm font-bold mb-3 text-black">Live Chat</h3>
                <p className="text-gray-500 text-sm mb-3 leading-relaxed">
                Please contact us during office hours, between 9:30 a.m. and 6:00 p.m.
                </p>
              <a 
                href="https://wa.me/919540777511" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-400 font-semibold text-sm flex items-center hover:text-orange-600 transition-colors bg-transparent border-none p-0 cursor-pointer w-fit"
              >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Start Chat
              </a>
            </div>

          </div>
        </div>

        
        {/* --- Map Section --- */}
<div className="w-full h-[450px] bg-gray-100 rounded-sm overflow-hidden relative group">
  
  {/* 1. The Interactive Map Iframe */}
  <iframe 
    src="https://maps.google.com/maps?q=Fusion%20Ufairia%20Mall%2C%20Sector%2016B%2C%20Greater%20Noida%2C%20Uttar%20Pradesh%20201310&t=&z=13&ie=UTF8&iwloc=&output=embed"
    className="w-full h-full border-0 grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Fusion Ufairia Mall Location"
  ></iframe>

  {/* 2. Custom "Get Directions" Button Overlay (Optional but Recommended) */}
  <div className="absolute bottom-6 right-6 z-10">
    <a 
      href="https://www.google.com/maps/dir/?api=1&destination=Fusion+Ufairia+Mall,+Sector+16B,+Greater+Noida,+Uttar+Pradesh+201310"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all font-semibold text-sm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7" />
      </svg>
      Get Directions
    </a>
  </div>
  
  {/* Map Label Overlay (Your original design) */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:hidden transition-opacity duration-300">
    <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded text-gray-600 font-bold text-lg tracking-widest shadow-sm">
      VIEW MAP
    </span>
  </div>

</div>

      </main>
    </div>
  );
}