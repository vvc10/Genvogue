import React from 'react'
import Link from 'next/link'
import { Button } from '../app/components/ui/button'
import { Footer } from '../app/components/Footer'

const about = () => {
  return (
    <div>
       <header className="fixed w-full z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-black/30">
        <Link href="/home" className="text-[18px] font-bold">
          GenVogue
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link href="/home" className="hover:text-primary">Home</Link>
          <Link href="/about" className="hover:text-primary">About</Link>
          <Link href="/designs" className="hover:text-primary">Designs</Link>
          {/* <Link href="#" className="hover:text-primary">Studio</Link> */}
        </nav>
        <Button variant="outline" className="border-gray-300 border-1 text-primary hover:bg-blue-600 hover:text-white">
          <a href='/dashboard'>Launch Studio</a>
        </Button>
      </header>

      <section className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto  my-8 px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-gradient-to-r from-blue-500 to-cyan-500">
            Welcome to GenVogue!
          </h2>
          <p className="mt-6 text-[16px] opacity-55 max-w-2xl mx-auto">
            At <span className="font-bold text-primary">GenVogue</span>, we believe that fashion is not just about wearing clothes; it’s about expressing your personality, your creativity, and your uniqueness. We are a cutting-edge platform that empowers individuals to design custom AI-generated merchandise, enabling you to bring your personal style to life with ease and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
            <p className="text-[16px] opacity-55">
              Our mission is to revolutionize the way people design and wear apparel. We are dedicated to providing a seamless, intuitive, and creative experience where anyone, regardless of their design skills, can generate stunning and personalized merch. Whether you're a content creator, a brand, or an individual looking for something exclusive, GenVogue allows you to create designs that truly reflect your individuality.
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
            <p className="text-[16px] opacity-55">
              We envision a world where fashion is accessible to everyone, and personal expression knows no bounds. With the power of AI and intuitive design tools, we aim to democratize fashion by making it easy for anyone to create, customize, and wear designs that speak to their essence.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold mb-4">Why Choose GenVogue?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-3">AI-Powered Design</h4>
              <p className="text-[16px] opacity-55">
                Using advanced AI algorithms, we bring your ideas to life by transforming your prompts into custom designs that are truly unique.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-3">3D Visualization</h4>
              <p className="text-[16px] opacity-55">
                Visualize your designs in real-time on 3D models, giving you the freedom to see every detail and make sure it’s perfect before you commit.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-3">Quality Merchandise</h4>
              <p className="text-[16px] opacity-55">
                All our designs are available on a range of high-quality apparel, including t-shirts, hoodies, and more, ensuring that your creations are made to last.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold mb-4">Join Us on Our Journey</h3>
          <p className="text-[16px] opacity-55 justify-center w-[80%] mx-auto">
            At GenVogue, we’re not just about creating designs; we’re about creating a community of like-minded individuals who want to push the boundaries of fashion and self-expression. Be part of our growing family, and let's redefine what it means to wear something truly unique.
          </p>
          <Button className="bg-blue-800 z-50 cursor-pointer mt-4">
          <a href='/dashboard'> Launch GV Studio </a>
          </Button>
        </div>
      </div>
    </section> 
    <Footer/>
    </div>
  )
}

export default about
