
"use client";

import * as React from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';
import { LambdaXiVONIcon, ShatteredIcon } from '@/components/icons';
import { Button } from '../ui/button';
import Link from 'next/link';

const mobileSections = [
  {
    icon: <ShatteredIcon className="w-16 h-16 text-destructive mb-6" />,
    title: "The SaaS Industrial Complex is a parasite.",
    paragraphs: [
      "A reality of 112-253 disparate apps.",
      "A reality of $135,000 in wasted annual spending.",
      "A reality of constant, draining administrative tax.",
    ],
    textAlign: "text-left"
  },
  {
    icon: <LambdaXiVONIcon className="w-16 h-16 text-primary mb-6" />,
    title: "We don't fix SaaS. We end it.",
    paragraphs: [
      "ΛΞVON OS is not a tool.",
      "It is a sovereign agentic operating system.",
      "It delivers sovereignty, not a dashboard.",
    ],
    textAlign: "text-left"
  },
  {
    title: "This is self-assembling software.",
    paragraphs: [
      "Our methodology is the product.",
      "We are building the machine that builds the machine.",
    ],
    textAlign: "text-center"
  }
];

function MobileHero() {
    return (
        <div className="flex h-svh flex-col items-center justify-center text-center p-4">
            <LambdaXiVONIcon className="w-24 h-24 text-primary animate-pulse" style={{filter: 'drop-shadow(0 0 10px hsl(var(--primary)))'}} />
            <h1 className="text-5xl font-headline text-glow mt-4">ΛΞVON OS</h1>
            <p className="text-md text-foreground/70">pronounced 'LAM-duh ZAI VAWN'</p>
            <p className="text-xl font-headline mt-4">The last operating system you’ll ever need.</p>
            <div className="absolute bottom-12 animate-pulse text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 8 5 5 5-5"/></svg>
            </div>
        </div>
    )
}

function MobileSection({ icon, title, paragraphs, textAlign, children, className }: { icon?: React.ReactNode, title: string, paragraphs?: string[], textAlign?: string, children?: React.ReactNode, className?: string }) {
    const { ref, isInView } = useScrollAnimation();
    return (
        <section ref={ref} className={cn("min-h-[50vh] p-8 flex flex-col justify-center transition-opacity duration-1000", isInView ? 'opacity-100' : 'opacity-0', textAlign, className)}>
            {icon}
            <h2 className="text-3xl font-headline text-glow mb-4">{title}</h2>
            {paragraphs && paragraphs.map((p, i) => (
                <p key={i} className="text-lg text-foreground/80">{p}</p>
            ))}
            {children}
        </section>
    )
}

export function MobileLanding() {
  return (
    <div className="w-full bg-background">
      <MobileHero />

      {mobileSections.map((section, index) => (
        <MobileSection 
          key={index}
          icon={section.icon}
          title={section.title}
          paragraphs={section.paragraphs}
          textAlign={section.textAlign}
        />
      ))}
      
      <MobileSection title="You have witnessed the architecture." textAlign="text-center">
        <p className="text-lg text-foreground/80 mb-8">Sovereignty requires a vow.</p>
        <Button size="lg" className="font-headline text-lg animate-glow-primary self-center" asChild>
            <Link href="/pantheon">[ BEGIN YOUR INITIATION ]</Link>
        </Button>
      </MobileSection>
    </div>
  );
}
