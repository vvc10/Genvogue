'use client'

import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, Environment, PerspectiveCamera } from '@react-three/drei'
import { MdOutlineRotateLeft } from "react-icons/md"
import { Button } from "../app/components/ui/button"
import MerchModel from '../app/components/MerchModel'

export default function SharePage({ selectedModel, color, rotation, designTexture }) {
  const [zoom, setZoom] = useState(5)
  const [rotationState, setRotation] = useState(rotation)

  // Handle rotating the model
  const handleRotation = () => {
    setRotation(rotationState === 0.01 ? 0 : 0.01);
    setZoom('')
  }

  // Export the model (for now, just a placeholder)
  const handleExportSave = () => {
    alert(`Model "${selectedModel}" saved/exported!`);
  }

  // Log the props for debugging purposes
  console.log({ selectedModel, color, rotation, designTexture });

  return (
    <div className="h-screen w-full text-white overflow-hidden bg-black">
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <div className="w-2/3 h-4/5 bg-transparent bg-opacity-50 rounded-3xl overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="flex-1 relative">
              <Canvas>
                <Suspense fallback={<Html center>Loading 3D model...</Html>}>
                  <PerspectiveCamera makeDefault position={[0, 6.5, zoom]} />
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                  <MerchModel modelPath={selectedModel} color={color} rotation={rotationState} designTexture={designTexture} />
                  <OrbitControls target={[0, 6.2, 0]} enableZoom />
                  <Environment preset="studio" />
                </Suspense>
              </Canvas>
            </div>

            <div className="fixed bottom-4 right-4 flex gap-4">
              {/* Rotate button */}
              <Button onClick={handleRotation} className="bg-gray-800 hover:bg-opacity-90 text-white py-2 px-4 rounded-lg">
                <MdOutlineRotateLeft className="h-5 w-5" />
              </Button>

              {/* Export/Save button */}
              <Button onClick={handleExportSave} className="bg-gray-800 hover:bg-opacity-90 text-white py-2 px-4 rounded-lg">
                Export/Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
