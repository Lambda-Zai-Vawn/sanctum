
"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, useScroll, Html, Stars, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

import { LambdaXiVONIcon } from '@/components/icons';

// New component for the particle swarm
function AgentSwarm({ count = 5000 }) {
    const pointsRef = React.useRef<THREE.Points>(null);
    const { size } = useThree();
    const [points] = React.useState(() => {
        const positions = new Float32Array(count * 3);
        const p = new THREE.Vector3();
        for (let i = 0; i < count; i++) {
            // Distribute points in a spherical volume
            const r = Math.random() * 10 + 5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            p.setFromSphericalCoords(r, phi, theta);
            p.toArray(positions, i * 3);
        }
        return positions;
    });

    useFrame((state, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <Points ref={pointsRef} positions={points} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="hsl(var(--primary))"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </Points>
    );
}

// New component for the "parasite" SaaS particles
function SaaSParticles({ count = 200 }) {
    const pointsRef = React.useRef<THREE.Points>(null);
    const scroll = useScroll();

    const [positions] = React.useState(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos.set([
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 7,
                (Math.random() - 0.5) * 0.1,
            ], i * 3);
        }
        return pos;
    });
    
    const originalPositions = React.useMemo(() => new Float32Array(positions), [positions]);

    useFrame(() => {
        if (!pointsRef.current) return;
        
        const problemRange = scroll.range(sections.problem.start, sections.problem.end - sections.problem.start);
        (pointsRef.current.material as THREE.PointsMaterial).opacity = problemRange * 2;
        pointsRef.current.visible = problemRange > 0;

        const solutionRange = scroll.range(sections.solution.start, sections.solution.end - sections.solution.start);
        if (solutionRange > 0) {
            const pos = pointsRef.current.geometry.attributes.position;
            for (let i = 0; i < count; i++) {
                const x = THREE.MathUtils.lerp(pos.getX(i), 0, solutionRange * 0.2);
                const y = THREE.MathUtils.lerp(pos.getY(i), 0, solutionRange * 0.2);
                const z = THREE.MathUtils.lerp(pos.getZ(i), 0, solutionRange * 0.2);
                pos.setXYZ(i, x, y, z);
            }
            pos.needsUpdate = true;
            (pointsRef.current.material as THREE.PointsMaterial).opacity = Math.max(0, 1.0 - solutionRange * 2);
        } else if (problemRange <= 0) {
            pointsRef.current.geometry.attributes.position.array.set(originalPositions);
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
             <PointMaterial
                transparent
                color="#cc3333"
                size={0.08}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0}
            />
        </Points>
    );
}


const sections = {
  intro: { start: 0, end: 0.15 },
  problem: { start: 0.20, end: 0.35 },
  solution: { start: 0.40, end: 0.55 },
  revelation: { start: 0.60, end: 0.80 },
  cta: { start: 0.85, end: 1.0 },
};

function Monolith() {
  const monolithRef = React.useRef<THREE.Mesh>(null!);
  const scroll = useScroll();

  useFrame(() => {
    const revelationStart = sections.revelation.start;
    const progressToRevelation = scroll.offset / revelationStart;

    if (monolithRef.current) {
        (monolithRef.current.material as THREE.MeshPhysicalMaterial).opacity = Math.max(0, 1 - progressToRevelation * 1.5);
        monolithRef.current.visible = progressToRevelation < 0.9;
    }
  });

  return (
    <group>
        <mesh ref={monolithRef} position={[0, 0, 0]}>
            <boxGeometry args={[2.5, 8, 0.2]} />
            <meshPhysicalMaterial 
                roughness={0.1}
                transmission={0.9}
                thickness={1}
                ior={1.5}
                color="#111111"
                transparent
            />
        </mesh>
        <SaaSParticles />
        <group position={[0, 0, 0.11]}>
             <Html center>
                <div className="animate-pulse">
                    <LambdaXiVONIcon className="w-24 h-24 text-primary" style={{filter: 'drop-shadow(0 0 10px hsl(var(--primary)))'}} />
                </div>
             </Html>
        </group>
    </group>
  );
}

function Section({ children, start, end, ...props }: any) {
  const ref = React.useRef<HTMLDivElement>(null);
  const scroll = useScroll();
  
  useFrame(() => {
    const r = scroll.range(start, end - start);
    if(ref.current) {
        ref.current.style.opacity = String(r);
        ref.current.style.pointerEvents = r > 0 ? 'auto' : 'none';
    }
  });

  return <Html ref={ref} portal={{current: scroll.fixed}} {...props}>{children}</Html>
}

function CommandPrompt() {
  const [input, setInput] = React.useState('');
  const [typed, setTyped] = React.useState('');
  const router = useRouter();
  const placeholder = "Type INITIATE_RITE and press Enter";

  React.useEffect(() => {
    if(typed.length < placeholder.length) {
      const timeout = setTimeout(() => {
        setTyped(placeholder.slice(0, typed.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [typed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.toUpperCase() === 'INITIATE_RITE') {
      router.push('/docs#genesis-protocol');
    }
  };

  return (
    <div className="w-[400px]">
      <p className="font-headline text-lg">You have witnessed the architecture.</p>
      <p className="font-headline text-lg">The machine awaits a commander.</p>
      <p className="font-headline text-lg mb-4">Sovereignty requires a vow.</p>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center font-code text-base">
          <span className="text-primary">{'>'}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none ml-2 w-full"
            placeholder={typed}
            autoFocus
          />
        </div>
      </form>
    </div>
  );
}

function Scene() {
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
        <CommandPrompt/>
      </Section>
    </>
  );
}

function Footer() {
    const scroll = useScroll();
    const scrollToTop = () => {
        scroll.el.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Html portal={{current: scroll.fixed}} as="footer" className="w-full bottom-0 p-4">
            <div className="w-full text-center text-xs text-foreground/50">
                <p>
                    <button onClick={scrollToTop} className="mx-auto block mb-2 text-primary hover:text-glow focus:outline-none">
                        <LambdaXiVONIcon className="h-6 w-6" />
                    </button>
                    ΛΞVON Inc © 2025 | Terms of Sovereignty | Privacy Protocol
                </p>
            </div>
        </Html>
    )
}

export default function HomeContent() {
  return (
    <div className="h-svh w-full bg-background">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="hsl(var(--primary))" intensity={2} />
        <ScrollControls pages={6} damping={0.2}>
          <Scene />
          <Footer />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
