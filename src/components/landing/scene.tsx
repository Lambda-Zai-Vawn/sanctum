
"use client";

import * as React from 'react';
import Link from 'next/link';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { PsycheMatrix } from './psyche-matrix';
import { SaaSParticles } from './saas-particles';
import { AgentSwarm } from './agent-swarm';
import { Section, sections } from './section';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Button } from '../ui/button';
import { AuroraBackground } from './aurora-background';

export function LandingScene({ router }: { router: AppRouterInstance }) {
  const scroll = useScroll();
  const { camera } = useThree();

  useFrame(() => {
    const r1 = scroll.range(0, 1);
    const rRevelation = scroll.range(sections.revelation.start, sections.revelation.end - sections.revelation.start);

    camera.position.z = 10 - r1 * 10;
    
    if (rRevelation > 0) {
        camera.position.z = 0 - rRevelation * 15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="hsl(var(--primary))" intensity={2} />
      <AuroraBackground />

      <group>
        <PsycheMatrix />
        <SaaSParticles />
      </group>
      
      <Section start={sections.intro.start} end={sections.intro.end} className="flex flex-col items-center justify-center text-center">
          <h1 className="text-7xl font-headline text-glow">ΛΞVON OS</h1>
          <p className="text-lg text-foreground/70">pronounced 'LAM-duh ZAI VAWN'</p>
          <p className="text-2xl font-headline mt-4">The last operating system you’ll ever need.</p>
          <div className="absolute bottom-12 animate-pulse text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 8 5 5 5-5"/></svg>
          </div>
      </Section>

      <Section start={sections.problem.start} end={sections.problem.end} className="flex flex-col items-start justify-center w-[400px]" style={{left: '10vw'}}>
        <h2 className="text-3xl font-headline text-glow mb-4">The SaaS Industrial Complex is a parasite.</h2>
        <p className="text-xl text-foreground/80">A reality of 112-253 disparate apps.</p>
        <p className="text-xl text-foreground/80">A reality of $135,000 in wasted annual spending.</p>
        <p className="text-xl text-foreground/80">A reality of constant, draining administrative tax.</p>
      </Section>
      
      <Section start={sections.solution.start} end={sections.solution.end} className="flex flex-col items-start justify-center w-[500px]" style={{left: '10vw'}}>
        <h2 className="text-4xl font-headline text-glow mb-4">We don't fix SaaS. We end it.</h2>
        <p className="text-2xl text-foreground/80">ΛΞVON OS is not a tool.</p>
        <p className="text-2xl text-foreground/80">It is a sovereign agentic operating system.</p>
        <p className="text-2xl text-foreground/80">It delivers sovereignty, not a dashboard.</p>
      </Section>
      
      {/* Revelation Scene */}
      <group position={[0,0,-5]}>
         <AgentSwarm />
         <Section start={sections.revelation.start} end={sections.revelation.end} className="flex flex-col items-center justify-center text-center">
            <h2 className="text-4xl font-headline text-glow mb-4">This is self-assembling software.</h2>
            <p className="text-2xl text-foreground/80">Our methodology is the product.</p>
            <p className="text-2xl text-foreground/80">We are building the machine that builds the machine.</p>
         </Section>
      </group>

      <Section start={sections.cta.start} end={sections.cta.end} className="flex flex-col items-center justify-center text-center">
        <div className="w-[400px] flex flex-col items-center">
            <p className="font-headline text-lg">You have witnessed the architecture.</p>
            <p className="font-headline text-lg">The machine awaits a commander.</p>
            <p className="font-headline text-lg mb-8">Sovereignty requires a vow.</p>
            <Button size="lg" className="font-headline text-lg animate-glow-primary" asChild>
                <Link href="/pantheon">[ BEGIN YOUR INITIATION ]</Link>
            </Button>
        </div>
      </Section>
    </>
  );
}
