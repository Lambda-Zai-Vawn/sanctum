
"use client";

import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/glass-card";
import { ShieldCheck, Bot, Fingerprint, LockKeyhole } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AegisSigil = dynamic(() => import('@/components/AethericSigils').then(mod => mod.AegisSigil), {
  ssr: false,
  loading: () => <div className="h-48 w-48" />
});

const features = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-accent" />,
    title: "The Sentinel's Vow",
    description: "We do not merely protect your data; we protect your reality. Our Zero-Trust architecture assumes threats are everywhere, rendering them inert before they can manifest.",
  },
  {
    icon: <Bot className="h-8 w-8 text-accent" />,
    title: "Agent Governance",
    description: "Aegis is the unassailable enforcer of our architectural law, ensuring every agent operates with unwavering loyalty and within its designated sphere of influence.",
  },
  {
    icon: <LockKeyhole className="h-8 w-8 text-accent" />,
    title: "Data Classification: Confidential & Sacred",
    description: "You dictate what is confidential and what is sacred. Aegis enforces these classifications with cryptographic certainty, making data breaches a concept of the old world.",
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
        subtitle="This is not a policy. It is a creed. Our commitment to security is absolute, woven into the very fabric of the OS. Here, we detail The Sentinel's Vow."
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
