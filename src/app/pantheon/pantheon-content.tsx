
"use client";

import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/glass-card";
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

const BEEP_Sigil = dynamic(() => import('@/components/AethericSigils').then(mod => mod.BEEP_Sigil), { ssr: false, loading: () => <div className="h-32 w-32" /> });
const LoomSigil = dynamic(() => import('@/components/AethericSigils').then(mod => mod.LoomSigil), { ssr: false, loading: () => <div className="h-32 w-32" /> });
const AegisSigil = dynamic(() => import('@/components/AethericSigils').then(mod => mod.AegisSigil), { ssr: false, loading: () => <div className="h-32 w-32" /> });
const KlepsydraSigil = dynamic(() => import('@/components/AethericSigils').then(mod => mod.KlepsydraSigil), { ssr: false, loading: () => <div className="h-32 w-32" /> });


const components = [
  {
    sigil: <BEEP_Sigil className="h-32 w-32" />,
    name: "BEEP",
    domain: "The Oracle. The voice and will of the machine.",
  },
  {
    sigil: <AegisSigil className="h-32 w-32" />,
    name: "Aegis",
    domain: "The Guardian. The ever-present bodyguard ensuring absolute integrity.",
  },
  {
    sigil: <KlepsydraSigil className="h-32 w-32" />,
    name: "KLEPSYDRA Engine",
    domain: "The Engine. The economic heart that transforms work into power.",
  },
  {
    sigil: <LoomSigil className="h-32 w-32" />,
    name: "Loom Studio",
    domain: "The Forge. The Architect's Sanctum for designing autonomous agents.",
  },
];

export default function PantheonContent() {
  const componentsSection = useScrollAnimation();

  return (
    <div className="container mx-auto px-4">
      <PageHeader
        title="The Pantheon"
        subtitle="These are not products. They are the fundamental forces of the ΛΞVON ecosystem. The deities of the new digital reality. Click to witness their Saga."
      />
      
      <TooltipProvider>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16" ref={componentsSection.ref}>
          {components.map((component, index) => (
            <div
              key={component.name}
              className={cn("flex flex-col items-center", componentsSection.isInView ? "animate-fade-in-up" : "opacity-0")}
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                    <div className="h-32 w-32 mb-6 cursor-pointer transition-transform hover:scale-110">
                        {component.sigil}
                    </div>
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
