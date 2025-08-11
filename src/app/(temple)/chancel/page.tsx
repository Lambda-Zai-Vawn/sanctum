
"use client";

import type { Metadata } from 'next';
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/glass-card";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const pacts = [
    {
        name: "The Initiate's Pact",
        price: "A Vow of Attention",
        description: "Begin your pilgrimage. Access the core OS and wield a limited number of Agent Actions per month. Witness the silence of true automation.",
        features: [
            "Core ΛΞVON OS Access",
            "Limited Agent Actions",
            "Basic Agentic Mythware™",
            "Scriptorium Access"
        ],
        cta: "Begin the Whisper"
    },
    {
        name: "The Sovereign's Pact",
        price: "A Monthly Tribute",
        description: "Ascend to true command. Wield vast agentic power, access the Obelisk Marketplace, and earn the right to the Sovereign's Sigil.",
        features: [
            "Unlimited Agent Actions",
            "Full Agentic Mythware™ Suite",
            "Obelisk Marketplace Access",
            "Priority Access to The Sovereign's Sigil"
        ],
        cta: "Declare Your Sovereignty"
    }
]

export default function ChancelPage() {
    const pactsSection = useScrollAnimation();

  return (
    <div className="container mx-auto px-4">
      <PageHeader
        title="The Chancel"
        subtitle="This is the final realm. The altar where a visitor can choose to become an Initiate. The Rite of Invocation begins here."
      />

      <section ref={pactsSection.ref} className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pacts.map((pact, index) => (
                 <div
                    key={pact.name}
                    className={cn(pactsSection.isInView ? "animate-fade-in-up" : "opacity-0")}
                    style={{ animationDelay: `${200 + index * 150}ms` }}
                >
                    <GlassCard className="p-8 h-full flex flex-col">
                        <h3 className="font-headline text-3xl font-semibold text-glow mb-2 text-center">{pact.name}</h3>
                        <p className="font-headline text-lg text-primary text-center mb-4">{pact.price}</p>
                        <p className="text-foreground/80 text-center flex-grow">{pact.description}</p>
                        <ul className="my-8 space-y-3">
                            {pact.features.map(feature => (
                                <li key={feature} className="flex items-center gap-3">
                                    <Check className="h-5 w-5 text-accent" />
                                    <span className="text-foreground/90">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Button size="lg" className="font-headline text-lg w-full mt-auto">
                            {pact.cta}
                        </Button>
                    </GlassCard>
                </div>
            ))}
        </div>
      </section>

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
