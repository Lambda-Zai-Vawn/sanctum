
"use client";

import * as React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useScroll } from '@react-three/drei';
import * as THREE from 'three';

function Obelisk() {
  const meshRef = React.useRef<THREE.Group>(null!);
  const scroll = useScroll();

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.1;
    
    // Sigils pulse effect based on scroll
    const sigilMaterial = (meshRef.current.children[1] as THREE.Mesh).material as THREE.MeshStandardMaterial;
    const scrollOffset = scroll.offset;
    sigilMaterial.emissiveIntensity = 0.5 + Math.sin(scrollOffset * Math.PI * 4) * 0.5;
  });

  return (
    <group ref={meshRef}>
      {/* Main Shaft - Obsidian Black */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.4, 7, 4, 1]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          metalness={0.9} 
          roughness={0.2} 
        />
      </mesh>
      {/* Pyramidion - Glowing Tip */}
      <mesh position={[0, 3.25, 0]}>
        <coneGeometry args={[0.2, 0.5, 4]} />
        <meshStandardMaterial 
          color="hsl(var(--accent))"
          emissive="hsl(var(--primary))"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export function ObeliskCanvas() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas 
        camera={{ position: [0, 1, 8], fov: 50 }} 
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="hsl(var(--primary))" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="hsl(var(--accent))" />
        <React.Suspense fallback={null}>
            <Obelisk />
            <Environment preset="city" />
        </React.Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
