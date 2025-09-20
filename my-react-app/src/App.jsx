import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <section id="hero">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="max-w-lg mt-32 mb-32 p-4 font-sans text-4xl uppercase border-2 md:p-10 md:m-32 md:mx-0 md:text-6xl text-white">
            Impressive Experience the deliver
          </div>
        </div>
      </section>

      {/* features section */}
      <section id="feature">
        <div className="relative container flex flex-col max-w-6xl mx-auto my-32 px-6 text-gray-900 md:flex-row md:px-0">
          <img src="./desktop/image-interactive.jpg" alt="Man wearing a VR headset" />
          <div className="text-center md:text-left pr-0 bg-white md:py-20 md:pl-20">
            <h2 className="max-w-lg mt-10 mb-6 font-sans text-4xl text-center text-gray-900 uppercase md:text-5xl md:mt-0 md:text-left">
              the leader in interactive vr
            </h2>
            <p className="max-w-md mx-auto md:mx-0">
              Lorem ipsum dolor sit amet ...
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
