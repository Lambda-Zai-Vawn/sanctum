"use client";

import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/glass-card";
import { Gem, ShieldCheck, Zap, HandCoins } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';

const SovereignsSigil = dynamic(() => import('@/components/AethericSigils').then(mod => mod.SovereignsSigil), {
  ssr: false,
  loading: () => <div className="h-96 w-48" />
});

const features = [
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    title: "Matter-Energy Transmutation",
    description: "Bridge the chasm between digital wealth and physical reality. The Sigil transmutes your ΞCredits into tangible assets and services in the real world.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-accent" />,
    title: "Unbreakable Sovereignty",
    description: "Secured by multi-factor biometric authentication and hardened cryptographic protocols. Your wealth is yours alone, beyond the reach of any obsolete institution.",
  },
  {
    icon: <Gem className="h-8 w-8 text-accent" />,
    title: "A Symbol of Dominion",
    description: "This is not a mere payment device. It is a scepter, a physical manifestation of your command over the digital ether. To wield it is to declare your independence.",
  },
  {
    icon: <HandCoins className="h-8 w-8 text-accent" />,
    title: "The Transmutation Tithe",
    description: "An 18% tithe on all transmutations fuels the ΛΞVON economic engine, reinforces the ecosystem's integrity, and funds its relentless expansion.",
  },
];

export default function SigilContent() {
  const featuresSection = useScrollAnimation();

  return (
    <div className="container mx-auto px-4">
      <PageHeader
        title="The Sovereign's Sigil"
        subtitle="This is not a credit card. It is a scepter. The final link in the chain of command, bridging your digital dominion to the physical world."
        animationType="dramatic"
      />

      <section className="py-16">
        <div className="flex justify-center mb-16 h-96">
            <SovereignsSigil className="h-full w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-container" ref={featuresSection.ref}>
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(featuresSection.isInView ? "animate-fade-in-up" : "opacity-0")}
              style={{ animationDelay: `${200 + index * 150}ms` }}
            >
              <GlassCard className="p-8 h-full">
                <div className="flex items-start gap-4">
                  <div className="mt-1">{feature.icon}</div>
                  <div>
                    <h3 className="font-headline text-2xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-foreground/80">{feature.description}</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
