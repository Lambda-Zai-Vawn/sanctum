
"use client";

import * as React from 'react';
import { type AppRouterInstance } from 'next/navigation';
import { useScroll, useThree } from '@react-three/drei';
import { Stars } from '@react-three/drei';
import { Monolith } from './monolith';
import { AgentSwarm } from './agent-swarm';
import { Section, sections } from './section';
import { CommandPrompt } from './command-prompt';

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
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Monolith />
      
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
        <CommandPrompt router={router} />
      </Section>
    </>
  );
}
