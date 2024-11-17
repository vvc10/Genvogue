import { Github, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-serif mb-2">AI Merch Designer</h2>
            <p className="text-gray-400">Revolutionizing merchandise design with AI</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">
              <Github size={24} />
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">
              <Twitter size={24} />
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">
              <Instagram size={24} />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} AI Merch Designer. All rights reserved.
        </div>
      </div>
    </footer>
  )
}