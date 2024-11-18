import React, { useRef, useEffect, Suspense } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';
import { Html } from '@react-three/drei';

const MerchModel = ({ modelPath, color = 'white', rotation = 0.01, designTexture }) => {
  const meshRef = useRef();

  // Always load the 3D model
  const gltf = useLoader(GLTFLoader, modelPath);

  // Always load the texture (fallback to null if not provided)
  const loadedTexture = useLoader(TextureLoader, designTexture || '');

  // Apply rotation (always execute)
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotation;
    }
  });

  // Apply texture and color (always execute)
  useEffect(() => {
    if (gltf?.scene) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(color);
          child.material.map = loadedTexture || null;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [color, gltf, loadedTexture]);

  // Determine scale and position
  const getModelScaleAndPosition = () => {
    if (modelPath.includes('cap.glb')) return { scale: [6.2, 6.2, 6.2], position: [0, 5.8, 0] };
    if (modelPath.includes('cup.glb')) return { scale: [1.2, 1.2, 1.2], position: [0, 6.5, 0] };
    return { scale: [5, 5, 5], position: [0, 0, 0] }; // Default scale and position
  };

  const { scale, position } = getModelScaleAndPosition();

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
