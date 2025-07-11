
"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/glass-card";
import { Award, Briefcase, GemIcon, SquareTerminal, CreditCard } from "lucide-react";

const transmutationItems = [
    { icon: <SquareTerminal className="h-6 w-6 text-accent"/>, title: "Acquire Instruments of the Craft", description: "Transmute Ξ into perpetual licenses for elite, sovereign-focused software and tools." },
    { icon: <GemIcon className="h-6 w-6 text-accent"/>, title: "Forge Physical Artifacts", description: "Commission custom, ΛΞVON-branded hardware—obsidian-cased servers, minimalist keyboards, hardware wallets." },
    { icon: <Briefcase className="h-6 w-6 text-accent"/>, title: "Retain Sovereign Counsel", description: "Convert winnings into one-on-one consultations with world-class experts in law, finance, and automation." },
    { icon: <Award className="h-6 w-6 text-accent"/>, title: "Claim A Seat in the Pantheon", description: "For titans: transmute an astronomical sum of Ξ into a token fraction of actual equity in ΛΞVON OS." },
];

export function Marketplace() {
  const { ref, isInView } = useScrollAnimation();
  return (
    <section ref={ref} className={cn("py-16 transition-opacity duration-1000", isInView ? 'opacity-100' : 'opacity-0')}>
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
            <div className="mt-12 border-t border-primary/20 pt-8 text-center">
                <div className="flex justify-center mb-4">
                  <CreditCard className="h-16 w-16 text-glow animate-pulse" />
                </div>
                <h3 className="font-headline text-2xl text-glow">The ΛΞVON Command Card</h3>
                <p className="text-foreground/80 max-w-2xl mx-auto mt-2">
                    It bears no numbers, only a softly glowing Ξ symbol. It is not a credit card; it is your scepter of command. Tapping it invokes the Proxy.Agent, ready to execute your will.
                </p>
            </div>
        </GlassCard>
      </section>
  )
}
