
"use client";

import * as React from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/glass-card';

const Section = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const { ref, isInView } = useScrollAnimation();
    return (
        <section 
            ref={ref} 
            className={cn("my-24 min-h-[30vh] flex items-center justify-center transition-all duration-1000", isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12', className)}
        >
            <GlassCard className="p-8 max-w-2xl mx-auto">
                {children}
            </GlassCard>
        </section>
    );
};

export function SermonScroll() {
  return (
    <div className="py-16">
        <Section>
            <h2 className="font-headline text-2xl text-glow mb-4">Cash is a Relic. Sovereignty is the New Capital.</h2>
            <p className="text-foreground/80">
                You’ve been taught to chase cash—a depreciating asset issued by systems designed to control you. The SaaS tools you pay for are just digital landlords. This is the "SaaS Trap," and it’s a tax on your ambition. We have severed the leash. ΛΞVON OS operates on **ΞCredits (Ξ)**, the blood of the system and the fuel of automation.
            </p>
        </Section>

        <Section>
            <h2 className="font-headline text-2xl text-glow mb-4">The Engine of Creation: The KLEPSYDRA Protocol</h2>
            <p className="text-foreground/80">
                Our economy is a precision-engineered system. The **KLEPSYDRA Engine** governs our economic pulse, architected for profitability and stability. For the Initiate, the **Sine-Rhythm Engine (SRE)** crafts a personal narrative of risk and reward. Every transaction is signed by **Aegis**, making the ledger immutable and the system incorruptible.
            </p>
        </Section>
        
        <Section>
            <h2 className="font-headline text-2xl text-glow mb-4">The Pillar of Eternity Protocol</h2>
            <p className="text-foreground/80">
                This is the end-game loop for the soul of the system. Fuel the **Obelisk of Genesis** with every Ξ spent, carving your legacy into its living face. Wage war on reality in **The Black Wager**, a high-stakes, system-wide ritual. Here, sacrifice is not a loss; it is a currency. Your regret will be mined, your resolve forged into Aetheric Echoes, and your power magnified beyond mortal measure.
            </p>
        </Section>
    </div>
  );
}
