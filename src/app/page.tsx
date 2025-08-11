
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
import { InteractiveObelisk } from '@/components/interactive-obelisk';
import { PageHeader } from '@/components/page-header';
import Link from 'next/link';

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
      <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
        <div className="absolute top-0 left-0 -z-10 h-full w-full">
            <div className="absolute inset-0 -z-10 h-full w-full bg-aurora [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>
        <div className="container mx-auto px-4">
            <PageHeader
                title="The Nexus"
                subtitle="This is the central landing realm, the grand overview of ΛΞVON OS's core proposition, its ethos, and the relentless war it wages on digital friction. It is the first glimpse into the new reality."
                animationType="dramatic"
            />
            <main className="flex flex-col items-center">
                <InteractiveObelisk />

                <section id="initiate-portal" className="text-center py-24">
                  <h2 className="font-headline text-3xl text-glow mb-4">The Initiate Portal</h2>
                   <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
                        This is the direct call to action, compelling casual visitors to begin their journey towards sovereignty. This is the explicit pathway from the public Sanctum to the ΛΞVON OS application, where the actual Rite of Invocation (the transformative in-app onboarding) takes place.
                    </p>
                    <Button size="lg" className="font-headline text-lg mt-8 animate-glow-primary" asChild>
                        <Link href="/chancel">[ Begin Your Invocation ]</Link>
                    </Button>
                </section>

                <nav className="my-16">
                  <ul className="flex items-center justify-center gap-8 font-headline text-lg">
                    <li><Link href="/scriptorium" className="text-foreground/80 hover:text-primary hover:text-glow transition-all">[The Scriptorium]</Link></li>
                     <li><Link href="/pantheon" className="text-foreground/80 hover:text-primary hover:text-glow transition-all">[The Pantheon]</Link></li>
                      <li><Link href="/aegis-post" className="text-foreground/80 hover:text-primary hover:text-glow transition-all">[The Aegis Post]</Link></li>
                  </ul>
                </nav>

            </main>
        </div>
      </div>
      <Soundscape />
    </>
  );
}
