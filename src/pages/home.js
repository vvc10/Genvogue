'use client'

import { Canvas, useThree } from '@react-three/fiber'
import { Environment, OrbitControls, PresentationControls } from '@react-three/drei'
import { Button } from "../app/components/ui/button"
import { useState, Suspense } from 'react'
import { ChevronLeft, ChevronRight, Paintbrush } from 'lucide-react'
import Link from 'next/link'
import MerchModel from '../app/components/LandMerchModel'
 import { Footer } from '../app/components/Footer'
import Image from 'next/image'


const merchDesigns = [
  { model: '/assets/3d/t_shirt.glb', thumbnail: '/assets/merch_cover/tshirt.png', merchType: 'T-shirt' },
  { model: '/assets/3d/cap.glb', thumbnail: '/assets/merch_cover/cap.png', merchType: 'Cap' },
  { model: '/assets/3d/hoodie.glb', thumbnail: '/assets/merch_cover/hoodie.webp', merchType: 'Hoodie' },
  { model: '/assets/3d/cup.glb', thumbnail: '/assets/merch_cover/cup_1.png', merchType: 'Mug' },
]

function CameraControls() {
  const { camera, gl } = useThree();
  return <OrbitControls camera={camera} gl={gl} />;
}

function Scene({ modelPath, selectedMerchType, designTexture }) {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1.5, 4], fov: 50 }} className="w-full h-full z-50">
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Suspense fallback={null}>
        <PresentationControls
          global
          zoom={0.8}
          rotation={[0, -Math.PI / 4, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >

          <group
            position={[-0.1, 0.1, 0]}
            scale={selectedMerchType === "T-shirt" ? 0.9 : 0.6}
            rotation={[0, 0.5, 0]}
          >
            <MerchModel
              modelPath={modelPath}
              color="blue"
              rotation={0.009}
              designTexture={designTexture}
            />
          </group>
        </PresentationControls>

        {/* Individual Controls for Each Model */}
        <CameraControls /> {/* For the entire canvas camera */}

        <Environment preset="city" />
      </Suspense>
    </Canvas>

  );
}


export default function Home() {
  const [currentProduct, setCurrentProduct] = useState(0)
  const [selectedMerchType, setSelectedMerchType] = useState("Hoodie");
  const [currentDesign, setCurrentDesign] = useState("Hoodie")
  // Get the model path for the selected merch type
  const currentModelPath = merchDesigns.find(design => design.merchType === selectedMerchType)?.model || "/default/path.glb";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed w-full z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-black/30">
        <Link href="/" className="text-[18px] font-bold">
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

      {/* Hero Section */}
      <section id='hero' className="h-screen relative flex md:flex-row flex-col pt-[10vh] md:pt-0">

        <div className=" inset-0 flex items-center justify-center w-[100%] md:w-[50%]">
          <div className="max-w-4xl mx-auto text-left space-y-8 p-6">
            <h1 className="text-6xl font-bold tracking-tighter">
          Wear your  thoughts. Think unique. Wear unique
            </h1>
            <p className="text-xl text-gray-400">
              Transform your ideas into stunning merchandise with our AI-powered merch design studio.
            </p>

            <Button className='bg-blue-800 text-[15px] px-2 py-2'>
              <Link href='/dashboard'>Launch GV Studio</Link>
            </Button>
          </div>
        </div>


        <div className="h-[100%] flex flex-col md:flex-row my-auto mx-0 bg-gray-900 w-[100%] md:w-[50%] opacity-55" style={{ backgroundImage: "url('/assets/images/image.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="w-[100%] h-[70%] md:h-[100%] md:w-[80%]">
            <Scene selectedMerchType={selectedMerchType} modelPath={currentModelPath} />
          </div>
          <div className='h-[30%] md:h-[100%] items-center'>

            {selectedMerchType !== "T-shirt" && (
              <Image
                src="/assets/merch_cover/tshirt_cover.png"
                alt="T-shirt"
                width={120}   // Set appropriate width
                height={300}  // Set appropriate height
                className="relative md:absolute mx-auto md:m-0 top-[0%] opacity-60 md:top-[38%] h-[15vh] md:h-[20vh] sm:h-[12vh] right-0 filter brightness-150 transition-all duration-300 hover:scale-75 cursor-pointer"
                onClick={() => setSelectedMerchType("T-shirt")}
              />
            )}

            {selectedMerchType !== "Hoodie" && (
              <Image
                src="/assets/merch_cover/hoodie_cover.png"
                alt="Hoodie"
                width={170}   // Set appropriate width
                height={300}  // Set appropriate height
                className="relative md:absolute mx-auto md:m-0 top-[0%] md:top-[38%] opacity-60 h-[15vh] md:h-[17vh] sm:h-[12vh] right-[1%] filter brightness-150 transition-all duration-300 hover:scale-75 cursor-pointer"
                onClick={() => setSelectedMerchType("Hoodie")}
              />
            )}


            {/* If you want to re-enable Cap and Mug options, use the same structure */}
            {/* {selectedMerchType !== "Cap" && (
  <Image
    src="/assets/merch_cover/cap_cover.png"
    alt="Cap"
    width={500}   // Set appropriate width
    height={300}  // Set appropriate height
    className="absolute top-[60%] h-[20vh] right-[20%] filter brightness-150 transition-all duration-300 hover:scale-75 cursor-pointer"
    onClick={() => setSelectedMerchType("Cap")}
  />
)} 
{selectedMerchType !== "Mug" && (
  <Image
    src="/assets/merch_cover/mug_cover.png"
    alt="Mug"
    width={500}   // Set appropriate width
    height={300}  // Set appropriate height
    className="absolute top-[80%] h-[20vh] right-[30%] filter brightness-150 transition-all duration-300 hover:scale-75 cursor-pointer"
    onClick={() => setSelectedMerchType("Mug")}
  />
)} */}

          </div>


        </div>

      </section>

      {/* Products Carousel */}

      <section id='designs' className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wider">Featured Designs</h2>
            <div className="flex space-x-4">
              <Button
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
              </Button>
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
                  alt={`Design ${index + 1}`}  // Add an alt tag for accessibility
                  width={180}   // Set the width (adjust according to your needs)
                  height={300}  // Set the height (adjust according to your needs)
                  className={`h-[60%] z-50 mx-auto mt-14 ${index === currentDesign ? 'opacity-100' : 'opacity-30'}`}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl sm:text-3xl font-semibold text-white opacity-90 hover:opacity-100 transition-opacity duration-300">
                    {design.merchType}
                  </h3>
                </div>
                <div className="absolute bottom-6 right-6 flex space-x-2">
                  <Button size="icon" variant="ghost" className="transition-transform transform hover:scale-110">
                    <Link href='/designboard'>  <Paintbrush className="h-5 w-5 text-white hover:text-primary" /></Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-white text-center mb-12">
            Why Choose GenVogue?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* First Feature */}
            <div className="transform transition duration-300 hover:scale-105 hover:bg-blue-900 p-8 rounded-lg shadow-xl bg-gray-900 relative">
              <h3 className="text-3xl font-medium text-white mb-4">AI-Powered Design</h3>
              <p className="text-gray-300 text-lg">
                Transform your ideas into professional designs with our advanced AI technology.
              </p>
            </div>

            {/* Second Feature */}
            <div className="transform transition duration-300 hover:scale-105 hover:bg-blue-900 p-8 rounded-lg shadow-xl bg-gray-900 relative">
              <h3 className="text-3xl font-medium text-white mb-4">Real-time 3D Preview</h3>
              <p className="text-gray-300 text-lg">
                See your designs come to life instantly with our interactive 3D preview.
              </p>
            </div>

            {/* Third Feature */}
            <div className="transform transition duration-300 hover:scale-105 hover:bg-blue-900 p-8 rounded-lg shadow-xl bg-gray-900 relative">
              <h3 className="text-3xl font-medium text-white mb-4">Custom Merchandise</h3>
              <p className="text-gray-300 text-lg">
                Create unique, personalized merchandise that stands out from the crowd.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold mb-8">Start Creating Today</h2>
          <p className="text-[16px] text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are revolutionizing merchandise design with AI
          </p>
          <Button className="bg-blue-800 z-50 cursor-pointer">
            <Link href='/dashboard'> Launch GV Studio </Link>
          </Button>

        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-10 z-10">
          <div className="w-[800px] h-[400px] bg-blue-500 rounded-full filter blur-3xl"></div>
        </div>


      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
