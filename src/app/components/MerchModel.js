import React, { useRef, useEffect, Suspense } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';
import { Html } from '@react-three/drei';

const MerchModel = ({ modelPath, color, rotation, designTexture }) => {
  const meshRef = useRef();

  // Early return if modelPath is invalid
  if (!modelPath || typeof modelPath !== 'string') {
    console.error('Invalid modelPath:', modelPath);
    return <Html center>Error: Invalid model path</Html>;
  }

  // Always call hooks unconditionally
  const gltf = useLoader(GLTFLoader, modelPath);
  const loadedTexture = designTexture ? useLoader(TextureLoader, designTexture) : null;

  // Rotation animation (called unconditionally)
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotation;
    }
  });

  // Update color and texture when color or texture change (called unconditionally)
  useEffect(() => {
    if (gltf?.scene) {
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

  // Model scale and position logic (always computed unconditionally)
  const getModelScaleAndPosition = () => {
    if (modelPath.includes('cap.glb')) return { scale: [6.2, 6.2, 6.2], position: [0, 5.8, 0] };
    if (modelPath.includes('cup.glb')) return { scale: [1.2, 1.2, 1.2], position: [0, 6.5, 0] };
    return { scale: [5, 5, 5], position: [0, 0, 0] }; // Default scale and position
  };

  const { scale, position } = getModelScaleAndPosition();

  // Early return if model failed to load
  if (!gltf?.scene) {
    console.error('Failed to load the 3D model:', modelPath);
    return <Html center>Error loading model...</Html>;
  }

  return (
    <group ref={meshRef} position={position}>
      <primitive object={gltf.scene} scale={scale} />
    </group>
  );
};

const MerchModelWithSuspense = (props) => (
  <Suspense fallback={<Html center>Loading model...</Html>}>
    <MerchModel {...props} />
  </Suspense>
);

export default MerchModelWithSuspense;
