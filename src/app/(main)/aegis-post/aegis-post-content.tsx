
"use client";

import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/glass-card";
import { ShieldCheck, Bot, Fingerprint, MessageSquareWarning } from "lucide-react";
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
    title: "The Phalanx Protocol",
    description: "Aegis protects your perception of reality. Phishing is obsolete when there are no passwords to steal. Malicious links are inert because every critical action is a conversation, not a click.",
  },
  {
    icon: <Bot className="h-8 w-8 text-accent" />,
    title: "Agent Governance Protocol",
    description: "We tame the agentic swarm. Every agent functions with controlled autonomy, their behavior continuously monitored by Aegis for the slightest deviation to ensure unwavering loyalty. This is Human Oversight, canonized.",
  },
  {
    icon: <MessageSquareWarning className="h-8 w-8 text-accent" />,
    title: "Sentinel's Scrutiny",
    description: "Aegis performs real-time analysis of commands and conversations for signs of social engineering or manipulation *before* they can cause harm, shielding your intent.",
  },
  {
    icon: <Fingerprint className="h-8 w-8 text-accent" />,
    title: "The Final Vow",
    description: "For your most vital assets, a 'Final Vow' requires your unique biometric signature. This protocol makes you the ultimate, unforgeable gatekeeper to your digital dominion.",
  },
];

export default function AegisPostContent() {
  const featuresSection = useScrollAnimation();

  return (
    <div className="container mx-auto px-4">
      <PageHeader
        title="The Aegis Post"
        subtitle="Security for your reality. Aegis protects you from the world's deceptions, delivering absolute peace of mind through a shielded reality and an AI workforce governed by your command."
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
