
"use client";

import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/glass-card";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';
import { useCommand } from "@/hooks/use-command";
import { BEEP_Sigil } from "@/components/AethericSigils";

const LoomSigil = dynamic(() => import('@/components/AethericSigils').then(mod => mod.LoomSigil), { ssr: false, loading: () => <div className="h-16 w-16" /> });
const AegisSigil = dynamic(() => import('@/components/AethericSigils').then(mod => mod.AegisSigil), { ssr: false, loading: () => <div className="h-16 w-16" /> });
const KlepsydraSigil = dynamic(() => import('@/components/AethericSigils').then(mod => mod.KlepsydraSigil), { ssr: false, loading: () => <div className="h-16 w-16" /> });
const MicroAppsSigil = dynamic(() => import('@/components/AethericSigils').then(mod => mod.MicroAppsSigil), { ssr: false, loading: () => <div className="h-16 w-16" /> });
const PantheonSigil = dynamic(() => import('@/components/AethericSigils').then(mod => mod.PantheonSigil), { ssr: false, loading: () => <div className="h-48 w-48" /> });
const ArmorySigil = dynamic(() => import('@/components/AethericSigils').then(mod => mod.ArmorySigil), { ssr: false, loading: () => <div className="h-16 w-16" /> });
const ObeliskMarketplaceSigil = dynamic(() => import('@/components/AethericSigils').then(mod => mod.ObeliskMarketplaceSigil), { ssr: false, loading: () => <div className="h-16 w-16" /> });

const components = [
  {
    icon: <BEEP_Sigil className="h-16 w-16" />,
    name: "BEEP: Behavioural Event and Execution Processor",
    description: "The master orchestration agent. BEEP is the core intelligence of ΛΞVON OS, processing complex business workflows and executing tasks autonomously. It is the will of the sovereign, made manifest.",
  },
  {
    icon: <MicroAppsSigil className="h-16 w-16" />,
    name: "Micro-Apps",
    description: "Atomic units of utility. Summoned spirits. These are not static applications but on-demand tools manifested to perform specific tasks.",
  },
  {
    icon: <LoomSigil className="h-16 w-16" />,
    name: "Loom Studio",
    description: "The Architect's Sanctum. The forge. A powerful interface to design, observe, and debug the complex workflows that power your autonomous agents.",
  },
  {
    icon: <AegisSigil className="h-16 w-16" />,
    name: "Aegis",
    description: "Your always-on bodyguard. A vigilant security layer providing brainless, enterprise-grade protection for your entire digital domain.",
  },
  {
    icon: <KlepsydraSigil className="h-16 w-16" />,
    name: "KLEPSYDRA Engine",
    description: "The economic heart. The abacus of fates. It governs the flow of resources and transforms work into a compelling, strategic endeavor.",
  },
  {
    icon: <ArmorySigil className="h-16 w-16" />,
    name: "ΛΞVON Armory Marketplace",
    description: "The sanctified repository for Micro-Apps and Chaos Cards.",
  },
  {
    icon: <ObeliskMarketplaceSigil className="h-16 w-16" />,
    name: "Obelisk Marketplace",
    description: "The vault of manifested sovereignty for real-world asset transmutation.",
  }
];

export default function PantheonContent() {
  const componentsSection = useScrollAnimation();
  const { setOpen, setSearchTerm } = useCommand();

  const openCommandPaletteWithTerm = (term: string) => {
    setSearchTerm(term);
    setOpen(true);
  };

  return (
    <div className="container mx-auto px-4">
      <PageHeader
        title="The Pantheon"
        subtitle="Behold the instruments of your new domain. The old world is a maze of disparate tools. The Pantheon presents a unified vision, unveiling each instrument of sovereignty to show you the whole machine."
      />
      <div className="flex justify-center mb-16">
        <PantheonSigil className="h-48 w-48"/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16 perspective-container" ref={componentsSection.ref}>
        {components.map((component, index) => (
          <div
            key={component.name}
            className={cn(componentsSection.isInView ? "animate-fade-in-up" : "opacity-0")}
            style={{ animationDelay: `${200 + index * 100}ms` }}
          >
            <GlassCard className="flex flex-col p-8 h-full">
              <div className="flex justify-center mb-6 h-16 w-16 mx-auto">
                  {component.icon}
              </div>
              <h3 className="font-headline text-2xl font-semibold text-center mb-3 text-glow">{component.name}</h3>
              <p className="text-foreground/80 text-center flex-grow mb-6">{component.description}</p>
              <button 
                onClick={() => openCommandPaletteWithTerm(component.name)}
                className="inline-flex items-center justify-center text-accent font-bold group mt-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                <span className="transition-all group-hover:text-glow">Consult the Scriptorium</span>
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            </GlassCard>
          </div>
        ))}
      </div>
    </div>
  );
}
