const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                    <div className="flex items-center space-x-2">
                        <img src="/images/logo.webp" alt="Iot_Lab_Logo" className="h-10" />
                        <span className="font-semibold text-lg transition duration-300 ease-in-out hover:scale-105">&copy; 2024 IoT KIIT</span>
                    </div>

                    <div className="flex space-x-6 text-md">
                        {["About Us", "Resources", "Contact"].map((linkText, index) => (
                            <a key={index} href="#" className="text-white hover:text-gray-200 relative group transition-colors">
                                {linkText}
                                <span className="absolute bottom-[-2px] left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    <div className="flex space-x-5">
                        <a href="#" className="hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105" aria-label="Facebook">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22.675 0h-21.35c-.736 0-1.325.589-1.325 1.325v21.351c0 .735.589 1.324 1.325 1.324h11.494v-9.294h-3.124v-3.622h3.124v-2.672c0-3.1 1.891-4.792 4.651-4.792 1.323 0 2.463.099 2.795.143v3.24l-1.918.001c-1.505 0-1.797.715-1.797 1.764v2.316h3.591l-.467 3.621h-3.124v9.293h6.127c.736 0 1.325-.589 1.325-1.324v-21.351c0-.736-.589-1.325-1.325-1.325z" />
                            </svg>
                        </a>
                        <a href="#" className="hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105" aria-label="Twitter">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557a9.834 9.834 0 0 1-2.828.775 4.94 4.94 0 0 0 2.165-2.723 9.864 9.864 0 0 1-3.127 1.197 4.92 4.92 0 0 0-8.384 4.482c-4.084-.205-7.704-2.163-10.126-5.144a4.822 4.822 0 0 0-.664 2.475c0 1.708.87 3.213 2.188 4.099a4.902 4.902 0 0 1-2.229-.616v.061a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.224.084 4.935 4.935 0 0 0 4.604 3.419 9.869 9.869 0 0 1-6.102 2.102c-.396 0-.787-.023-1.17-.068a13.947 13.947 0 0 0 7.547 2.211c9.054 0 14.009-7.5 14.009-14.009 0-.213-.005-.426-.015-.637a9.936 9.936 0 0 0 2.457-2.548z" />
                            </svg>
                        </a>
                        <a href="#" className="hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-105" aria-label="LinkedIn">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.77 24 1.77 24h20.46c.96 0 1.77-.78 1.77-1.73V1.73C24 .77 23.23 0 22.23 0zM7.09 20.45H3.56V8.88h3.53v11.57zM5.32 7.38c-1.13 0-2.05-.92-2.05-2.06s.92-2.06 2.05-2.06c1.13 0 2.05.92 2.05 2.06s-.92 2.06-2.05 2.06zM20.45 20.45h-3.53v-5.81c0-1.39-.02-3.17-1.93-3.17-1.93 0-2.23 1.5-2.23 3.06v5.92h-3.53V8.88h3.39v1.58h.05c.47-.88 1.61-1.8 3.32-1.8 3.56 0 4.22 2.34 4.22 5.38v6.41z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
