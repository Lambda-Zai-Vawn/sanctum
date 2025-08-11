
"use client";

import * as React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileLanding } from '@/components/landing/mobile-landing';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { LandingScene } from '@/components/landing/scene';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { CommandDialog } from '@/components/command-dialog';
import { Soundscape } from '@/components/soundscape';
import { Footer } from '@/components/footer';

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
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
            <div className="absolute top-0 left-0 -z-10 h-full w-full">
                <div className="absolute inset-0 -z-10 h-full w-full bg-aurora [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>
            <div className="relative z-0 flex min-h-screen flex-col">
                <Navigation />
                <main className="flex-grow">
                    <MobileLanding />
                </main>
                <Footer />
            </div>
            <CommandDialog />
            <Soundscape />
        </div>
    );
  }

  return (
    <div className="h-svh w-full bg-background absolute top-0 left-0">
        <Navigation />
        <CommandDialog />
        <Soundscape />
        <Canvas>
            <ScrollControls pages={6} damping={0.2}>
            <LandingScene router={router} />
            </ScrollControls>
        </Canvas>
    </div>
  );
}
