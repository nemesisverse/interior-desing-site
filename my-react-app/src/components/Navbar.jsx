import logo from "../images/logo.svg";
export default function Navbar()
{
    return(
        <div>
            <section id = "Navbar" >
                <div  className=" container max-w-6xl mx-auto px-5 py-10 z-50 fixed bg-transparent">
                                    {/* item-center will align the content at the middle of container */}
                    <nav className="flex item-center justify-between font-bold text-white">
                    <img src={logo} alt="Logo" />

                    <div className="hidden  h-10 font-ubuntu md:flex md:space-x-9">
                        <div className="group">
                          <a href="">Projects</a>
                          <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
                        </div>
                        <div className="group">
                            <a href="">Projects</a>
                            <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
                        </div>
                        <div className="group">
                                    <a href="">Projects</a>
                                    <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
                        </div>
                        <div className="group">
                            <a href="">Projects</a>
                            <div className="mx-2 group-hover:border-b group-hover:border-blue-50"></div>
                        </div>
                    </div>
                    {/* hamburger button */}
                    </nav>
                    {/* to do mobile menu */}
                    
                </div>
            </section>
            
        </div>
    );
    
}