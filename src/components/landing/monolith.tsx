
"use client";

import * as React from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Html } from '@react-three/drei';
import * as THREE from 'three';
import { sections } from './section';
import { SaaSParticles } from './saas-particles';
import { LambdaXiVONIcon } from '@/components/icons';

export function Monolith() {
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
