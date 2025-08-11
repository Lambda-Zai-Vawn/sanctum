
"use client";

import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/glass-card";
import { ShieldCheck, Bot, DatabaseZap, Lock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';

const AegisSigil = dynamic(() => import('@/components/AethericSigils').then(mod => mod.AegisSigil), {
  ssr: false,
  loading: () => <div className="h-48 w-48" />
});

const features = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-accent" />,
    title: "Multi-Phased Threat Detection",
    description: "Aegis combines rules-based logic with ML-powered analysis to neutralize threats before they manifest.",
  },
  {
    icon: <Bot className="h-8 w-8 text-accent" />,
    title: "Agent Governance & The Ring System",
    description: "Aegis is the Protocol Guardian for the Agentic Ring System™, a concentric hierarchy of command. Ring 0 (The Core) contains BEEP & the Economy Engine. Ring 1 (Strategists) plans complex tasks. Ring 2 (Executors) performs discrete actions. Ring 3 (Specialists) provides data. Ring 4 (Sentries) monitors. Aegis enforces the Mobility Protocol—the system's spine—ensuring agents are demoted for any failure.",
  },
  {
    icon: <DatabaseZap className="h-8 w-8 text-accent" />,
    title: "Data Integrity Protocol",
    description: "The protocol guarantees data immutability through Aegis-signed logs and atomic transactions, preserving its sanctity.",
  },
  {
    icon: <Lock className="h-8 w-8 text-accent" />,
    title: "Zero-Trust Architecture",
    description: "Aegis operates on a foundational principle: 'never trust, always verify.' It secures your digital domain at every vector.",
  },
];

export default function AegisPostContent() {
  const featuresSection = useScrollAnimation();

  return (
    <div className="container mx-auto px-4">
      <PageHeader
        title="The Aegis Post"
        subtitle="Your bastion against the void. You are targeted by unseen threats, overwhelmed by complexity. The Aegis Post reveals how Aegis renders these threats invisible, delivering brainless cybersecurity and absolute peace of mind."
      />

      <section className="py-16">
        <div className="flex justify-center mb-16">
            <AegisSigil className="h-48 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-container" ref={featuresSection.ref}>
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(featuresSection.isInView ? "animate-fade-in-up" : "opacity-0")}
              style={{ animationDelay: `${200 + index * 150}ms` }}
            >
              <GlassCard className="p-8">
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
