
"use client";

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { PsycheMatrix } from '@/components/landing/psyche-matrix';

const realms = [
  { name: 'The Scriptorium', path: '/scriptorium' },
  { name: 'The Pantheon', path: '/pantheon' },
  { name: 'The Aegis Post', path: '/aegis-post' },
  { name: 'The Chancel', path: '/chancel' },
];

export default function SanctumNexus() {
  const [showRealms, setShowRealms] = useState(false);

  return (
    <div className="relative h-svh w-full overflow-hidden bg-background">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={3} color="hsl(var(--primary))" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="hsl(var(--accent))" />

        <PsycheMatrix showRealms={showRealms} />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />

      </Canvas>
       <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-center animate-fade-in-up">
            <h1 className="font-headline text-6xl md:text-8xl text-glow">
              ΛΞVON
            </h1>
            <p className="mt-4 text-lg max-w-2xl text-foreground/80">
              The world is loud. We offer the silence of true automation.
            </p>
          </div>
      </div>
    </div>
  );
}
