import React from 'react';
import { Canvas } from '@react-three/fiber';

const ProductPreview = ({ color, gradient, text, textPosition, image, texture }) => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Add logic to apply gradient, text, image, and texture */}
    </Canvas>
  );
};

export default ProductPreview;
