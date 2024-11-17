import React from 'react'
const Navbar = () => {
    const GlowingButton = ({ children }) => (
        <button className="relative px-6 py-3 font-bold text-white rounded-lg group overflow-hidden">
            <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-purple-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-pink-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
            <span className="relative z-10">{children}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
        </button>
    )

    return (
        <div>
            <header className="sticky top-0 z-50 backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-700">
                <nav className="container mx-auto px-6 py-3">
                    <div className="flex justify-between items-center">
                        <a href="#" className="text-2xl font-bold">
                        GenVogue
                        </a>
                        <div className="hidden md:flex space-x-4">
                            <a href="#" className="hover:text-purple-400 transition duration-300">
                                Home
                            </a>
                            <a href="#" className="hover:text-purple-400 transition duration-300">
                                Products
                            </a>
                            <a href="#" className="hover:text-purple-400 transition duration-300">
                                Design Studio
                            </a>
                            <a href="#" className="hover:text-purple-400 transition duration-300">
                                About
                            </a>
                        </div>
                        <GlowingButton>
                            {/* <ShoppingCart className="inline-block mr-2" /> */}
                            Signin
                        </GlowingButton>
                    </div>
                </nav>
            </header>

        </div>
    )
}

export default Navbar
