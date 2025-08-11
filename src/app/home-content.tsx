
"use client";

import * as React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileLanding } from '@/components/landing/mobile-landing';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { LandingScene } from '@/components/landing/scene';
import { useRouter } from 'next/navigation';

export default function HomeContent() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-svh w-full bg-background" />; // Or a loading spinner
  }

  if (isMobile) {
    return <MobileLanding />;
  }

  return (
    <div className="h-svh w-full bg-background absolute top-0 left-0">
      <Canvas>
        <ScrollControls pages={6} damping={0.2}>
          <LandingScene router={router} />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
