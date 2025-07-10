
"use client";

import * as React from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { LandingScene } from '@/components/landing/scene';
import { LandingFooter } from '@/components/landing/footer';

export default function HomeContent() {
  return (
    <div className="h-svh w-full bg-background">
      <Canvas>
        <ScrollControls pages={6} damping={0.2}>
          <LandingScene />
          <LandingFooter />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
