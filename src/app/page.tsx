
"use client";

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { PsycheMatrix } from '@/components/landing/psyche-matrix';
import Link from 'next/link';

const realms = [
  { name: 'The Scriptorium', path: '/scriptorium' },
  { name: 'The Pantheon', path: '/pantheon' },
  { name: 'The Aegis Post', path: '/aegis-post' },
  { name: 'The Chancel', path: '/chancel' },
];

export default function SanctumNexus() {
  const [showRealms, setShowRealms] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative h-svh w-full overflow-hidden bg-background" onDoubleClick={() => setShowRealms(true)}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={3} color="hsl(var(--primary))" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="hsl(var(--accent))" />

        <PsycheMatrix showRealms={showRealms} />
        
        <Text
          font="/fonts/Comfortaa-Bold.ttf"
          fontSize={1.5}
          position={[0, 1, 0]}
          color="hsl(var(--foreground))"
          anchorX="center"
          anchorY="middle"
          glowColor="hsl(var(--primary))"
          castShadow
        >
          ΛΞVON
        </Text>
        <Text
            font="/fonts/Lexend-Regular.ttf"
            fontSize={0.3}
            position={[0, 0, 0]}
            color="hsl(var(--foreground))"
            anchorX="center"
            anchorY="middle"
            maxWidth={5}
            textAlign="center"
        >
            The world is loud. We offer the silence of true automation.
        </Text>

        {showRealms && realms.map((realm, i) => (
            <Link key={realm.path} href={realm.path}>
                <Text
                    font="/fonts/Lexend-Medium.ttf"
                    fontSize={0.25}
                    position={[
                        (i - (realms.length - 1) / 2) * 2.5,
                        -2,
                        0
                    ]}
                    color={hovered === realm.path ? "hsl(var(--accent))" : "hsl(var(--foreground))"}
                    onPointerOver={() => setHovered(realm.path)}
                    onPointerOut={() => setHovered(null)}
                    glowColor="hsl(var(--accent))"
                >
                    [ {realm.name} ]
                </Text>
            </Link>
        ))}

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-center animate-fade-in-up">
            <p className="mt-4 text-xs max-w-2xl text-foreground/50">
              Double-click to awaken the realms.
            </p>
          </div>
      </div>
    </div>
  );
}
