
"use client";

import * as React from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { useRouter } from 'next/navigation';
import { LandingScene } from '@/components/landing/scene';
import { MobileLanding } from '@/components/landing/mobile-landing';
import { useIsMobile } from '@/hooks/use-mobile';
import { Soundscape } from '@/components/soundscape';

export default function HomePage() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <>
      {isMobile ? (
        <MobileLanding />
      ) : (
        <div className="h-svh w-full bg-black">
           <Canvas>
              <ScrollControls pages={5} damping={0.2}>
                <LandingScene router={router} />
              </ScrollControls>
            </Canvas>
        </div>
      )}
      <Soundscape />
    </>
  );
}
