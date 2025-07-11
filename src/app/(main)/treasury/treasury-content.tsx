"use client";

import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/glass-card";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { InteractiveObelisk } from "@/components/interactive-obelisk";
import { Award, Briefcase, GemIcon, SquareTerminal } from "lucide-react";

const Section = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const { ref, isInView } = useScrollAnimation();
    return (
        <section 
            ref={ref} 
            className={cn("my-12 transition-all duration-700", isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8', className)}
        >
            {children}
        </section>
    );
};

const transmutationItems = [
    { icon: <SquareTerminal className="h-6 w-6 text-accent"/>, title: "Acquire Instruments of the Craft", description: "Transmute Ξ into perpetual licenses for elite, sovereign-focused software and tools." },
    { icon: <GemIcon className="h-6 w-6 text-accent"/>, title: "Forge Physical Artifacts", description: "Commission custom, ΛΞVON-branded hardware—obsidian-cased servers, minimalist keyboards, hardware wallets." },
    { icon: <Briefcase className="h-6 w-6 text-accent"/>, title: "Retain Sovereign Counsel", description: "Convert winnings into one-on-one consultations with world-class experts in law, finance, and automation." },
    { icon: <Award className="h-6 w-6 text-accent"/>, title: "Claim A Seat in the Pantheon", description: "For titans: transmute an astronomical sum of Ξ into a token fraction of actual equity in ΛΞVON OS." },
];

export default function TreasuryContent() {
  return (
    <div className="container mx-auto px-4">
      <PageHeader
        title="The Sovereign's Ledger"
        subtitle="This is the heart of the ecosystem. The altar where belief is transmuted into pure, unadulterated power."
      />

      <div className="flex flex-col lg:flex-row items-center justify-center gap-16 py-16">
        <div className="lg:w-1/2 flex justify-center">
            <InteractiveObelisk />
        </div>
        <div className="lg:w-1/2 max-w-2xl mx-auto space-y-8">
            <Section>
                <GlassCard className="p-8">
                    <h2 className="font-headline text-2xl text-glow mb-4">Cash is a Relic. Sovereignty is the New Capital.</h2>
                    <p className="text-foreground/80">
                        You’ve been taught to chase cash—a depreciating asset issued by systems designed to control you. The SaaS tools you pay for are just digital landlords. This is the "SaaS Trap," and it’s a tax on your ambition. We have severed the leash. ΛΞVON OS operates on **ΞCredits (Ξ)**, the blood of the system and the fuel of automation.
                    </p>
                </GlassCard>
            </Section>

            <Section>
                <GlassCard className="p-8">
                    <h2 className="font-headline text-2xl text-glow mb-4">The Engine of Creation: The KLEPSYDRA Protocol</h2>
                    <p className="text-foreground/80">
                        Our economy is a precision-engineered system. The **KLEPSYDRA Engine** governs our economic pulse, architected for profitability and stability. For the Initiate, the **Sine-Rhythm Engine (SRE)** crafts a personal narrative of risk and reward. Every transaction is signed by **Aegis**, making the ledger immutable and the system incorruptible.
                    </p>
                </GlassCard>
            </Section>
            
            <Section>
                <GlassCard className="p-8">
                    <h2 className="font-headline text-2xl text-glow mb-4">The Path of the Initiate</h2>
                    <p className="text-foreground/80">
                        Fuel the **Obelisk of Genesis** with every Ξ spent, etching your legacy into its surface. Wage war on reality in **The Black Wager**, a system-wide ritual to bend the OS to your will. Amass enough power to unlock the final door: **The Grand Transmutation**.
                    </p>
                </GlassCard>
            </Section>
        </div>
      </div>
      
      <Section>
        <GlassCard className="p-8 md:p-12">
            <h2 className="font-headline text-3xl text-center text-glow mb-8">The Grand Transmutation</h2>
            <p className="text-center text-foreground/80 max-w-3xl mx-auto mb-12">
               The **Obelisk Marketplace** is the highest ritual of our economy. Here, abstract power becomes tangible. With enough Ξ, summon the **Proxy.Agent**, your personal concierge to the physical world, and command it to transmute your will into reality.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {transmutationItems.map(item => (
                    <div key={item.title} className="flex items-start gap-4">
                        {item.icon}
                        <div>
                            <h3 className="font-headline text-xl text-primary mb-1">{item.title}</h3>
                            <p className="text-foreground/70">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-12 border-t border-primary/20 pt-8">
                <h3 className="text-center font-headline text-2xl text-glow">The ΛΞVON Black Card</h3>
                <p className="text-center text-foreground/80 max-w-2xl mx-auto mt-2">
                    It bears no numbers, only a softly glowing Ξ symbol. It is not a credit card; it is a **Command Card**. Tapping it invokes the Proxy.Agent, ready to execute your will.
                </p>
            </div>
        </GlassCard>
      </Section>
      
      <section className="text-center py-24">
        <div className="max-w-2xl mx-auto">
            <h4 className="font-headline text-3xl text-glow">The choice is yours.</h4>
            <p className="mt-4 text-xl text-foreground/80">
                Continue to be a user in someone else's system, or become a Sovereign in your own.
            </p>
            <Button size="lg" className="font-headline text-lg mt-8 animate-glow-primary" asChild>
                <Link href="/pantheon">[ BEGIN YOUR INITIATION ]</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
