export const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <a href="https://iotkiit.in/">
                            <img src="/images/logo.webp" alt="Iot_Lab_Logo" className="h-[40px]" />
                        </a>
                    </div>

                    <div className="hidden md:flex items-center space-x-12">
                        {["About Us", "Resources", "Blog", "Contact Us"].map((linkText, index) => (
                            <a key={index} href="#" className="text-gray-600 hover:text-gray-900 relative group transition-colors">
                                {linkText}
                                <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-orange-500 transition-all group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-transform transform hover:scale-105">Get Started</button>
                </div>
            </div>
        </nav>
    );
};
