
"use client";

import * as React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useScroll } from '@react-three/drei';
import * as THREE from 'three';

function Obelisk() {
  const meshRef = React.useRef<THREE.Group>(null!);
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.1;
    
    const pyramidion = meshRef.current.children[1] as THREE.Mesh;
    if (pyramidion) {
        const material = pyramidion.material as THREE.MeshStandardMaterial;
        // Smoothly pulsate the emissive intensity
        material.emissiveIntensity = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.5 + 1.5;
    }
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
        <pointLight position={[-10, -10, 10]} intensity={1.5} color="hsl(var(--accent))" />
        <React.Suspense fallback={null}>
            <Obelisk />
            <Environment preset="city" />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
