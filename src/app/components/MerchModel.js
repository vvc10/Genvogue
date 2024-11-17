import React, { useRef, useEffect, Suspense } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';
import { Html } from '@react-three/drei';

const MerchModel = ({ modelPath, color, rotation, designTexture }) => {
  const meshRef = useRef();

  // Ensure modelPath is valid
  if (!modelPath || typeof modelPath !== 'string') {
    console.error('Invalid modelPath:', modelPath);
    return null; // Don't render anything if modelPath is invalid
  }

  // Use Suspense to handle the loading of the model
  const gltf = useLoader(GLTFLoader, modelPath);
  const loadedTexture = designTexture ? useLoader(TextureLoader, designTexture) : null;

  // Rotation animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotation;
    }
  });

  // Update color and texture when color or texture change
  useEffect(() => {
    if (gltf && gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(color);
          if (loadedTexture) {
            child.material.map = loadedTexture;
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [color, gltf, loadedTexture]);

  // Model scale and position logic
  const modelScale = modelPath.includes('cap.glb')
    ? [6.2, 6.2, 6.2]
    : modelPath.includes('cup.glb')
    ? [1.2, 1.2, 1.2]
    : [5, 5, 5];

  const modelPosition = modelPath.includes('cap.glb')
    ? [0, 5.8, 0]
    : modelPath.includes('cup.glb')
    ? [0, 6.5, 0]
    : [0, 0, 0];

  if (!gltf || !gltf.scene) {
    console.error('Failed to load the 3D model:', modelPath);
    return <Html center>Error loading model...</Html>;
  }

  return (
    <group ref={meshRef} position={modelPosition}>
      <primitive object={gltf.scene} scale={modelScale} />
    </group>
  );
};

const MerchModelWithSuspense = ({ modelPath, color, rotation, designTexture }) => (
  <Suspense fallback={<Html center>Loading model...</Html>}>
    <MerchModel modelPath={modelPath} color={color} rotation={rotation} designTexture={designTexture} />
  </Suspense>
);

export default MerchModelWithSuspense;
