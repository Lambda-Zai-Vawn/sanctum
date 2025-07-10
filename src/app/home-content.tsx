
"use client";

import * as React from 'react';
import { useRouter, type AppRouterInstance } from 'next/navigation';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { LandingScene } from '@/components/landing/scene';
import { LandingFooter } from '@/components/landing/footer';

export default function HomeContent() {
  const router = useRouter();
  return (
    <div className="h-svh w-full bg-background">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="hsl(var(--primary))" intensity={2} />
        <ScrollControls pages={6} damping={0.2}>
          <LandingScene router={router}/>
          <LandingFooter />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
