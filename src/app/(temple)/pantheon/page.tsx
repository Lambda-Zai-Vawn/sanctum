
"use client";

import { PageHeader } from "@/components/page-header";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Canvas } from "@react-three/fiber";
import * as React from 'react';
import * as THREE from 'three';
import { BEEP_Sigil, AegisSigil, KlepsydraSigil, LoomSigil, ArmorySigil, ObeliskMarketplaceSigil } from "@/components/AethericSigils";


const components = [
  {
    sigil: BEEP_Sigil,
    name: "BEEP",
    domain: "The Oracle. The voice and will of the machine.",
    position: [-4, 0, 0],
  },
  {
    sigil: AegisSigil,
    name: "Aegis",
    domain: "The Guardian. The ever-present bodyguard ensuring absolute integrity.",
    position: [-2, 0, 0],
  },
  {
    sigil: KlepsydraSigil,
    name: "KLEPSYDRA Engine",
    domain: "The Engine. The economic heart that transforms work into power.",
    position: [0, 0, 0],
  },
  {
    sigil: LoomSigil,
    name: "Loom Studio",
    domain: "The Forge. The Architect's Sanctum for designing autonomous agents.",
    position: [2, 0, 0],
  },
  {
    sigil: ArmorySigil,
    name: "Armory Marketplace",
    domain: "The Sanctified Repository for Micro-Apps and Chaos Cards.",
    position: [4, 0, 0],
  },
   {
    sigil: ObeliskMarketplaceSigil,
    name: "Obelisk Marketplace",
    domain: "The Vault of Manifested Sovereignty.",
    position: [6, 0, 0],
  },
];

export default function PantheonPage() {
  const componentsSection = useScrollAnimation();

  return (
    <div className="container mx-auto px-4">
      <PageHeader
        title="The Pantheon"
        subtitle="These are not products. They are the fundamental forces of the ΛΞVON ecosystem. The deities of the new digital reality. Click a sigil to learn more in the Scriptorium."
      />
      
      <TooltipProvider>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 py-16" ref={componentsSection.ref}>
          {components.map((component, index) => (
            <div
              key={component.name}
              className={cn("flex flex-col items-center", componentsSection.isInView ? "animate-fade-in-up" : "opacity-0")}
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                    <Link href="/scriptorium" className="h-32 w-32 mb-6 cursor-pointer transition-transform hover:scale-110 block">
                        <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
                            <ambientLight intensity={1.5} />
                            <pointLight position={[5, 5, 5]} intensity={2} color="hsl(var(--primary))" />
                            <pointLight position={[-5, -5, -5]} intensity={1} color="hsl(var(--accent))" />
                            <React.Suspense fallback={null}>
                                <component.sigil />
                            </React.Suspense>
                        </Canvas>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{component.domain}</p>
                </TooltipContent>
              </Tooltip>
              <h3 className="font-headline text-2xl font-semibold text-center text-glow">{component.name}</h3>
            </div>
          ))}
        </div>
       </TooltipProvider>

       <section className="text-center py-24">
        <div className="max-w-2xl mx-auto">
            <Button size="lg" className="font-headline text-lg mt-8 animate-glow-primary" asChild>
                <Link href="/">[ Return to the Nexus ]</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
