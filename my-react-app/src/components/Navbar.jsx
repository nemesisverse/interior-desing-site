import logo from "../images/logo.svg";
export default function Navbar()
{
    return(
        <div>
            <section id = "Navbar">
                <div  className=" container max-w-6xl mx-auto px-5 py-10 md:px-0">
                    <nav className="flex item-center justify-between font-bold text-white">
                    <img src={logo} alt="Logo" />
                    </nav>
                </div>
            </section>
        </div>
    );
    
}