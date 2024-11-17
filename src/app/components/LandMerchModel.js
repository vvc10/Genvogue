import React, { useRef, useEffect, Suspense } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';
import { Html } from '@react-three/drei';

const MerchModel = ({ modelPath, color, rotation, designTexture }) => {
  const meshRef = useRef();

  if (!modelPath || typeof modelPath !== 'string') {
    console.error('Invalid modelPath:', modelPath);
    return <Html center>Error: Invalid model path</Html>;
  }

  const gltf = useLoader(GLTFLoader, modelPath);
  const loadedTexture = designTexture ? useLoader(TextureLoader, designTexture) : null;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotation;
    }
  });

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

  const getModelScaleAndPosition = () => {
    if (modelPath.includes('cap.glb')) return { scale: [6.2, 6.2, 6.2], position: [0, 0, 0] };
    if (modelPath.includes('cup.glb')) return { scale: [1.2, 1.2, 1.2], position: [0, 0, 0] };
    return { scale: [4, 4, 4], position: [0, -5.5, 0] }; // Centered by default
  };

  const { scale, position } = getModelScaleAndPosition();

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