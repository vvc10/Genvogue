"use client"

import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Text, Html, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { Slider } from "../app/components/ui/slider"
import { Input } from "../app/components/ui/input"
import { Button } from "../app/components/ui/button"
import { Paintbrush, Mic, Share2, Save, Undo, Redo, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import Image from 'next/image'

const API_TOKEN = "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"; // Make sure to keep this secure!
const apiEndpoint = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

// Simulated AI design generation function
const generateDesign = async (input) => {
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        inputs: input,
        negative_prompt: null,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob); // Return the URL to be used as texture
  } catch (error) {
    console.error("Error generating design:", error);
    return null;
  }
};

function TShirtModel({ color, rotation, designTexture, scale }) {
  const { scene } = useGLTF('/assets/3d/t_shirt.glb'); // Path to your model
  const groupRef = useRef();
  const backTexture = useRef(new THREE.TextureLoader().load(designTexture));

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(0, -4, 0); // Position model
      groupRef.current.scale.set(3.5, 3.5, 3.5); // Scale model
    }

    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          // Apply color to all parts
          child.material.color.set(color);
          
          // Apply design texture only to the "Back" part
          if (child.name === 'Back') { // Ensure this matches the name in your model
            child.material.map = backTexture.current;
            child.material.needsUpdate = true; // Update the material
          }
        }
      });
    }
  }, [scene, designTexture, color, scale]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotation; // Rotate model
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}




function PromptCapsule({ prompt, setPrompt, onSubmit }) {
  return (
 
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-10 p-2 w-[100vw] transform -translate-x-1/2"
      >
        <div className="bg-gray-900 shadow-2xl bg-opacity-50 backdrop-blur-lg w-[60%] mx-auto border-[1px] border-gray-800 rounded-[10px] p-2 flex items-center">
          <Input
            type="text"
            placeholder="Enter your design idea..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 rounded-[20px] bg-transparent border-none text-white placeholder-gray-400 focus:ring-0"
          />
          <Button onClick={() => console.log("Voice input activated")} className="ml-2 rounded-[20px] hover:opacity-50 text-white">
            <Mic className="h-4 w-4" />
          </Button>
          <Button onClick={onSubmit} className="ml-2 rounded-[20px] bg-black hover:opacity-50 text-white">
            <Paintbrush className="mr-2 h-4 w-4" /> Create
          </Button>
           
        </div>
      </motion.div>
    
  )
}

function DesignControls({ color, setColor, rotation, setRotation, zoom, setZoom }) {
  return (
    <div className="absolute top-10 left-10 bg-black bg-opacity-50 backdrop-blur-lg rounded-lg p-4">
      <div className="mb-4">
        <label className="text-white mb-2 block">Color</label>
        <div className="flex space-x-2">
          {['#FF6B6B', '#4ECDC4', '#45B7D1', '#F7FFF7', '#FF8C42'].map((clr) => (
            <button
              key={clr}
              className="w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110"
              style={{ backgroundColor: clr }}
              onClick={() => setColor(clr)}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="text-white mb-2 block">Rotation</label>
        <Slider
          value={[rotation]}
          onValueChange={(value) => setRotation(value[0])}
          max={0.1}
          step={0.001}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <label className="text-white mb-2 block">Zoom</label>
        <div className="flex justify-between">
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(zoom - 1, 2))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-white">{zoom.toFixed(1)}x</span>
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(zoom + 1, 10))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function DesignSuggestions({ designs, onSelect }) {
  return (
    <div className="absolute right-10 top-1/2 transform -translate-y-1/2 space-y-4">
      {designs.map((design, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="w-16 h-16 rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-blue-500"
          onClick={() => onSelect(design)}
        >
          <Image src={design} alt={`Suggestion ${index + 1}`} className="w-full h-full object-cover" />
        </motion.div>
      ))}
    </div>
  )
}

export default function AITShirtDesignLab() {
  const [color, setColor] = useState('#FF6B6B')
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(5)
  const [prompt, setPrompt] = useState('')
  const [designs, setDesigns] = useState([])
  const [designTexture, setDesignTexture] = useState('')
  const [mood, setMood] = useState(0.5)
  const [scale, setScale] = useState(1.5) // New state for model scaling

  const handlePromptSubmit = async () => {
    const newDesign = await generateDesign(prompt)
    setDesigns(prev => [...prev, newDesign])
    setDesignTexture(newDesign)
  }

  useEffect(() => {
    // Simulated mood-based environment changer
    document.body.style.setProperty('--mood-light', `hsl(${mood * 360}, 100%, 50%)`)
  }, [mood])

  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      {/* <div className="absolute inset-0 bg-[url('/assets/images/wireframebg.jpg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div> */}

      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <PerspectiveCamera makeDefault position={[0, 0, zoom]} />
        <TShirtModel color={color} rotation={rotation} designTexture={designTexture} scale={scale} />  {/* Pass scale here */}
        <OrbitControls enableZoom={false} />
        <Environment preset="studio" background />
      </Canvas>

      <PromptCapsule prompt={prompt} setPrompt={setPrompt} onSubmit={handlePromptSubmit} />
      <DesignControls color={color} setColor={setColor} rotation={rotation} setRotation={setRotation} zoom={zoom} setZoom={setZoom} />
      <DesignSuggestions designs={designs} onSelect={setDesignTexture} />

      <div className="absolute bottom-4 right-4 flex space-x-2">
        <Button variant="outline" size="icon">
          <Undo className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Redo className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Save className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute top-4 right-4">
        <Slider
          value={[mood]}
          onValueChange={(value) => setMood(value[0])}
          max={1}
          step={0.01}
          className="w-32"
        />
        <span className="text-sm text-white ml-2">Mood</span>
      </div>
    </div>
  )
}

