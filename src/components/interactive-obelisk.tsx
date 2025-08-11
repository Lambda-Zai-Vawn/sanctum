
"use client";

import * as React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Color } from 'three';

function Obelisk() {
  return (
    <group>
      {/* Main Shaft */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.4, 7, 4, 1]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.9} 
          roughness={0.2} 
        />
      </mesh>
      {/* Pyramidion */}
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

export function InteractiveObelisk() {
  return (
    <div 
      className="relative w-64 h-[40rem] flex items-center justify-center"
      data-ai-hint="futuristic obelisk"
    >
      <Canvas 
        camera={{ position: [0, 1, 8], fov: 50 }} 
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="hsl(var(--primary))" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="hsl(var(--accent))" />
        <React.Suspense fallback={null}>
            <Obelisk />
            <Environment preset="city" />
        </React.Suspense>
        <OrbitControls 
          autoRotate 
          autoRotateSpeed={0.3} 
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI * (2/3)}
        />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/20 to-transparent pointer-events-none" />
    </div>
  );
}
