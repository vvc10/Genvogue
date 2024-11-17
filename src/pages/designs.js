import React from 'react'
import { ChevronLeft, ChevronRight, Play, Share2, Heart, PaintRoller, Paintbrush } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../app/components/ui/button'
import { useState } from 'react'
import Notice from '../app/components/Notice'
import { Footer } from '../app/components/Footer'
import Image from 'next/image'

const merchDesigns = [
    { model: '/assets/3d/t_shirt.glb', thumbnail: '/assets/merch_cover/tshirt.png', merchType: 'T-shirt' },
    { model: '/assets/3d/cap.glb', thumbnail: '/assets/merch_cover/cap.png', merchType: 'Cap' },
    { model: '/assets/3d/hoodie.glb', thumbnail: '/assets/merch_cover/hoodie.webp', merchType: 'Hoodie' },
    { model: '/assets/3d/cup.glb', thumbnail: '/assets/merch_cover/cup_1.png', merchType: 'Mug' },
]


const designs = () => {
    const [selectedMerchType, setSelectedMerchType] = useState("Hoodie");
    const [currentDesign, setCurrentDesign] = useState("Hoodie")
    // Get the model path for the selected merch type
    const currentModelPath = merchDesigns.find(design => design.merchType === selectedMerchType)?.model || "/default/path.glb";


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
                    <Link href='/dashboard'>Launch Studio</Link>
                </Button>
            </header>

            <section id='designs' className="py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center justify-between mb-12">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wider">Designs</h2>
                        <p>Featured</p>
                        <div className="flex space-x-4">
                            {/* <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentDesign((prev) => (prev - 1 + merchDesigns.length) % merchDesigns.length)}
                className="transition-transform transform hover:scale-110"
              >
                <ChevronLeft className="h-6 w-6 text-white hover:text-primary" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentDesign((prev) => (prev + 1) % merchDesigns.length)}
                className="transition-transform transform hover:scale-110"
              >
                <ChevronRight className="h-6 w-6 text-white hover:text-primary" />
              </Button> */}
                        </div>
                    </div>

                    {/* Responsive Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {merchDesigns.map((design, index) => (
                            <div
                                key={index}
                                className={`relative aspect-square bg-gray-800 rounded-lg overflow-hidden transition-transform duration-500 ease-in-out transform ${index === currentDesign
                                    ? 'scale-105 border-2 border-gradient-to-r from-blue-500 to-cyan-500 shadow-xl'
                                    : 'opacity-60'
                                    } hover:scale-105 hover:bg-blue-600 border-1 hover:border-blue-700 hover:shadow-2xl`}
                            >
                                <Image
                                    src={design.thumbnail}
                                    className={`h-[60%] z-50 mx-auto mt-14 ${index === currentDesign ? 'opacity-100' : 'opacity-30'}`}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-2xl sm:text-3xl font-semibold text-white opacity-90 hover:opacity-100 transition-opacity duration-300">
                                        {design.merchType}
                                    </h3>
                                </div>
                                <div className="absolute bottom-6 right-6 flex space-x-2">
                                    <Button size="icon" variant="ghost" className="transition-transform transform hover:scale-110">
                                        <a href='/designboard'>  <Paintbrush className="h-5 w-5 text-white hover:text-primary" /></a>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Notice />
            <Footer />
        </div>
    )
}

export default designs
