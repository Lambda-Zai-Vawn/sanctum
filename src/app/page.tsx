
"use client";

import * as React from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, useScroll, Html } from '@react-three/drei';
import { useRouter } from 'next/navigation';
import { PsycheMatrix } from '@/components/landing/psyche-matrix';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Soundscape } from '@/components/soundscape';

function Content() {
    const scroll = useScroll();
    const router = useRouter();
    const [showRealms, setShowRealms] = React.useState(false);
    const [beepVisible, setBeepVisible] = React.useState(false);

    useScroll((state) => {
        // Show realms after scrolling past a certain point
        if (state.offset > 0.1 && !showRealms) {
            setShowRealms(true);
        }
        // Hide them if we scroll back up
        if (state.offset <= 0.1 && showRealms) {
            setShowRealms(false);
        }

        if(state.offset > 0.3 && !beepVisible) {
            setBeepVisible(true);
        }
        if(state.offset <= 0.3 && beepVisible) {
            setBeepVisible(false);
        }
    });

    const realms = [
        { name: "The Scriptorium", path: "/scriptorium", description: "Reveal the Doctrine" },
        { name: "The Pantheon", path: "/pantheon", description: "Behold the Ecosystem" },
        { name: "The Aegis Post", path: "/aegis-post", description: "Understand the Vow" },
        { name: "The Chancel", path: "/chancel", description: "Begin the Initiation" },
    ];

    return (
        <>
            <Html fullscreen>
                <div className="w-full h-full flex flex-col justify-center items-center pointer-events-none text-center p-8">
                     <div className={cn("transition-opacity duration-1000", showRealms ? "opacity-0" : "opacity-100")}>
                        <h1 className="text-2xl md:text-3xl font-headline text-foreground/80">
                            The world is loud.
                        </h1>
                        <h2 className="text-3xl md:text-4xl font-headline text-glow mt-2">
                            We offer the silence of true automation.
                        </h2>
                     </div>

                    <div className={cn("absolute bottom-12 transition-opacity duration-500", showRealms ? 'opacity-0' : 'opacity-100')}>
                        <p className="animate-pulse text-primary">Scroll to begin the pilgrimage</p>
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mt-2"><path d="m7 15 5 5 5-5"/><path d="m7 BEEP: "Where does your pilgrimage begin?"8 5 5 5-5"/></svg>
                    </div>
                    
                    <div className={cn("transition-opacity duration-1000", beepVisible ? "opacity-100" : "opacity-0")}>
                         <p className="text-xl md:text-2xl font-headline text-glow">
                           BEEP: "Where does your pilgrimage begin?"
                         </p>
                    </div>
                </div>

                <div className={cn("absolute inset-0 transition-opacity duration-1000 flex flex-wrap justify-center items-center gap-8 p-8", showRealms ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
                    {realms.map((realm, index) => (
                        <div key={realm.path} className="text-center pointer-events-auto">
                            <Button 
                                variant="outline" 
                                size="lg"
                                className="font-headline text-lg"
                                onClick={() => router.push(realm.path)}
                            >
                                {realm.name}
                            </Button>
                        </div>
                    ))}
                </div>
            </Html>
            <PsycheMatrix showRealms={showRealms} />
        </>
    );
}


export default function HomePage() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
        <div className="h-svh w-full bg-background flex justify-center items-center">
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
        </div>
    );
  }

  return (
    <>
      <div className="h-svh w-full bg-background">
         <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color="hsl(var(--primary))" />
            <pointLight position={[-10, -10, 10]} intensity={1.5} color="hsl(var(--accent))" />
            <ScrollControls pages={2} damping={0.2}>
              <Content />
            </ScrollControls>
          </Canvas>
      </div>
      <Soundscape />
    </>
  );
}
