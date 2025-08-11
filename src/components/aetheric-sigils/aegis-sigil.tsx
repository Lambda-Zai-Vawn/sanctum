
"use client";

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * A reusable group that rotates its children on the X and Y axes, creating a consistent floating and turning animation for all sigils.
 * @param {React.PropsWithChildren} props - The component's props, which include the children to be rendered inside the rotating group.
 */
function RotatingGroup({ children }: React.PropsWithChildren<{}>) {
    const groupRef = useRef<THREE.Group>(null!);
    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.3;
            groupRef.current.rotation.x += delta * 0.2;
        }
    });
    return <group ref={groupRef}>{children}</group>;
}

/**
 * A shared, memoized material component for all sigils.
 * It creates a physically-based material with a metallic, slightly rough surface.
 * The emissive color pulses over time using `useFrame`, creating a living, energetic effect.
 */
const SigilMaterial = React.memo(() => {
    const materialRef = useRef<THREE.MeshStandardMaterial>(null);
    useFrame((state) => {
        if (materialRef.current) {
            // Smoothly pulsate the emissive intensity for a "living" feel
            materialRef.current.emissiveIntensity = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.2 + 0.6;
        }
    });

    return (
        <meshStandardMaterial 
            ref={materialRef}
            color="hsl(var(--accent))" 
            emissive="hsl(var(--primary))" 
            emissiveIntensity={0.6}
            metalness={0.9} 
            roughness={0.1} 
        />
    );
});
SigilMaterial.displayName = 'SigilMaterial';

const SharedSigilMaterial = <SigilMaterial />;

/**
 * The sigil for Aegis, the guardian and security protocol of ΛΞVON OS.
 * Represented by an octahedron, a platonic solid symbolizing strength, stability, and a shield-like structure.
 * This is a standalone component for better modularity and lazy-loading.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard div attributes.
 */
export function AegisSigil(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props}>
            <THREE.Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
                <ambientLight intensity={1.5} />
                <pointLight position={[5, 5, 5]} intensity={2} color="hsl(var(--primary))" />
                <pointLight position={[-5, -5, -5]} intensity={1} color="hsl(var(--accent))" />
                <React.Suspense fallback={null}>
                    <RotatingGroup>
                        <mesh>
                            <octahedronGeometry args={[1, 0]} />
                            {SharedSigilMaterial}
                        </mesh>
                    </RotatingGroup>
                </React.Suspense>
            </THREE.Canvas>
        </div>
    );
}
