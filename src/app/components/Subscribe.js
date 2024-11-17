import React from 'react'
import { ChevronDown, ShoppingCart, Palette, Move, Star, ChevronLeft, ChevronRight, Zap, Cpu, VolumeX, Volume2 } from 'lucide-react'

const Subscribe = () => {
    const GlowingButton = ({ children, className = '' }) => (
        <button className={`relative px-6 py-3 font-bold text-white rounded-lg group overflow-hidden ${className}`}>
          <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-purple-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-pink-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
          <span className="relative z-10">{children}</span>
          <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Zap className="w-6 h-6 text-white" />
          </span>
        </button>
      )

  return (
    <div>
       <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-center">Join the Design Revolution</h2>
            <div className="max-w-md mx-auto">
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <GlowingButton className="w-full">Get Early Access</GlowingButton>
              </form>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Subscribe
