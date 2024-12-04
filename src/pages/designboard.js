'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Html, PerspectiveCamera } from '@react-three/drei'
import { Button } from "../app/components/ui/button"
import { Input } from "../app/components/ui/input"
import { motion } from 'framer-motion'
import { ZoomIn, ZoomOut } from 'lucide-react'
import { MdOutlineRotateLeft } from "react-icons/md"
import MerchModel from '../app/components/MerchModel'
import Sidebar from '../app/components/Sidebar'
import { useRouter } from 'next/router'
import Image from 'next/image'

const merchDesigns = [
  { model: '/assets/3d/t_shirt.glb', thumbnail: '/assets/merch_cover/tshirt.png', merchType: 'T-shirt' },
  { model: '/assets/3d/cap.glb', thumbnail: '/assets/merch_cover/cap.png', merchType: 'Cap' },
  { model: '/assets/3d/hoodie.glb', thumbnail: '/assets/merch_cover/hoodie.webp', merchType: 'Hoodie' },
  { model: '/assets/3d/cup.glb', thumbnail: '/assets/merch_cover/cup_1.png', merchType: 'Mug' },
]




export default function DesignBoard() {

  const [rotation, setRotation] = useState(0)
  const [color, setColor] = useState('green')
  const [background, setBackground] = useState('linear-gradient(to right bottom, rgb(58 55 72 / 50%), #000000)')
  const [zoom, setZoom] = useState(5)
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [designTexture, setDesignTexture] = useState(null)
  const [selectedModel, setSelectedModel] = useState(merchDesigns[0].model)
  const [isUploading, setIsUploading] = useState();

  const { query } = useRouter(); // Access query params from the URL


  useEffect(() => {
    if (query.merchType) {
      const selected = merchDesigns.find(design => design.merchType.toLowerCase() === query.merchType.toLowerCase());
      if (selected) {
        setSelectedModel(selected.model); // Set model based on URL
      }
    } else {
      setSelectedModel(merchDesigns[0].model); // Default to the first model if no merchType in URL
    }
  }, [query.merchType]); // Re-run when the URL changes


  const handleModelSelect = (modelPath) => {
    setSelectedModel(modelPath)
  }



  const handlePromptSubmit = async (event) => {
    event.preventDefault();
    setIsGenerating(true);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      console.error("Failed to generate image");
      setIsGenerating(false);
      return;
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    setDesignTexture(imageUrl);
    setIsGenerating(false);
  };


  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = () => {
        setDesignTexture(reader.result); // reader.result is a base64 data URL
        setIsUploading(false);
      };
      reader.readAsDataURL(file); // Converts the file to a base64 data URL
    }
  };


  const [fileName, setFileName] = useState('Untitled Design');

  // Handle typing in the file name input
  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  // Placeholder function for share functionality
  const handleShare = () => {
    // Generate a shareable link with design parameters
    const designParams = {
      model: selectedModel,
      color: color,
      designTexture: designTexture ? designTexture : "default_texture", // Use a default texture if none is uploaded
      rotation: rotation,
      zoom: zoom,
    };

    // You can encode the parameters as query string or hash
    const queryString = new URLSearchParams(designParams).toString();
    const shareableLink = `${window.location.origin}/share?${queryString}`;

    // Copy the link to the clipboard
    navigator.clipboard.writeText(shareableLink).then(() => {
      alert(`Link copied to clipboard! Share it: ${shareableLink}`);
    }).catch((err) => {
      console.error('Error copying text: ', err);
    });
  };

  // Placeholder function for export/save functionality
  const handleExportSave = () => {
    alert(`File "${fileName}" saved/exported!`);
  };

  return (
    <>
      <div className="topbar z-50 w-full bg-transparent top-0 px-3 py-3 fixed flex justify-between items-center text-[15px]">
        {/* Logo/Brand Name */}
        <div className="w-1/4 relative left-2">
          <h2 className="font-bold text-white text-opacity-50 text-[15px]">GenVogue</h2>
        </div>

        {/* Editable File Name */}
        {/* <div className="w-1/2 flex justify-center text-[15px]">
        <input
          type="text"
          value={fileName}
          onChange={handleFileNameChange}
          placeholder="Untitled Design"
          className="bg-transparent text-[15px] text-center bg-gray-500 border-opacity-50 text-white text-lg placeholder-opacity-50 focus:outline-none focus:border-opacity-100 transition duration-300"
        />
      </div> */}

        {/* Buttons */}
        <div className="w-1/4 flex justify-end gap-4">
          <button
            onClick={handleShare}
            className="bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white py-1 px-4 rounded-lg transition-all duration-300 text-sm"
          >
            Share
          </button>
          {/* 
          <button
            onClick={handleExportSave}
            className="bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white py-1 px-4 rounded-lg transition-all duration-300 text-sm"
          >
            Save
          </button> */}

          <button
            onClick={handleExportSave}
            className="bg-green-600 bg-opacity-70 hover:bg-opacity-90 text-white py-1 px-4 rounded-[10px] transition-all duration-300 text-sm"
          >
            Export
          </button>
        </div>
      </div>



      <Sidebar color={color} setColor={setColor} background={background} setBackground={setBackground} onSelect={handleModelSelect} selectedModel={selectedModel} />

      <div className="h-screen w-full text-white overflow-hidden" style={{ background: background || 'linear-gradient(to bottom right, #333, #000)' }}>
        {/* <div
          className={`absolute inset-0 opacity-25 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]`}
        ></div> */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-2/3 h-4/5 bg-transparent bg-opacity-50 rounded-3xl overflow-hidden"
          >
            <div className="h-full flex flex-col">
              <div className="flex-1 relative">
                <Canvas>
                  <Suspense fallback={<Html center>Loading 3D model...</Html>}>
                    <PerspectiveCamera makeDefault position={[0, 6.5, zoom]} />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <MerchModel modelPath={selectedModel} color={color} rotation={rotation} designTexture={designTexture} />
                    <OrbitControls
                      target={[0, 6.2, 0]}
                      enableZoom={true}
                      enableRotate={true}
                      enablePan={false}
                    />
                    <Environment preset="studio" />
                  </Suspense>
                </Canvas>


              </div>
              <div className="flex flex-col items-center px-0 py-1 fixed bottom-4 right-4 top-[10vh] h-fit rounded-[10px] bg-gray-900 bg-opacity-70 backdrop-blur-md gap-4">
                <Button variant="secondary" size="icon" onClick={() => setZoom(Math.max(zoom - 1, 2))}>
                  <ZoomIn className="h-2 w-2" />
                </Button>
                <Button variant="secondary" size="icon" onClick={() => setZoom(Math.min(zoom + 1, 10))}>
                  <ZoomOut className="h-2 w-2" />
                </Button>
                <Button variant="secondary" size="icon" className="flex flex-col" onClick={() => setRotation(rotation === 0.01 ? 0 : 0.01)}>
                  <MdOutlineRotateLeft className="h-2 w-2" />
                </Button>
              </div>


              <div className="fixed bottom-4 left-0 rounded-[30px] mx-auto w-[100%]">
                <div className="flex flex-col gap-3 items-center w-[60%] mx-auto space-x-4 mb-4 p-3 rounded-[20px] bg-gray-900 bg-opacity-70 backdrop-blur-md">
                  <div className='flex flex-row w-[100%] gap-3'>

                    <Input
                      type="text"
                      placeholder="Enter your design idea..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="flex-1 bg-transparent border-1 border-gray-900 text-white placeholder-gray-600 focus:border-blue-900 transition-colors"
                    />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      ref={fileInputRef}
                    />
                    <Button
                      onClick={handleButtonClick}
                      className="imageuploadbtn bg-black text-white font-bold py-2 px-4 rounded-[50px] transition-colors cursor-pointer"
                    >
                      {isUploading ? "Uploading..." : "Upload"}
                    </Button>

                    <Button
                      onClick={handlePromptSubmit}
                      disabled={isGenerating}
                      className="bg-black hover:bg-green-700 text-white font-bold py-2 px-4 rounded-[50px] transition-colors"
                    >
                      {isGenerating ? "Generating..." : "Create"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {designTexture && (
              <div className="mt-4 p-4 bg-gray-900 rounded-md">
                <Image height={100} width={100} src={designTexture} alt="Generated Design" className="w-full h-auto rounded-md" />
              </div>
            )}

          </motion.div>
        </div>
      </div>

    </>

  )
}