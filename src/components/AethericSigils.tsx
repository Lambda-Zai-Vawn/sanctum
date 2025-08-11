
"use client";
import * as React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * A shared, memoized material component for all sigils.
 * It creates a physically-based material with a metallic, slightly rough surface.
 * The emissive color pulses over time to create a living, energetic effect.
 * This material is central to the "Ancient Roman Glass" and "Crystalline Glyphs" aesthetic.
 */
const SigilMaterial = React.memo(() => {
    const materialRef = React.useRef<THREE.MeshStandardMaterial>(null);
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


/**
 * A component that wraps a sigil's geometry and applies a continuous rotation animation.
 * @param {SigilAnimatorProps} props - The props for the component.
 * @param {React.ReactNode} props.children - The sigil geometry to be animated.
 */
type SigilAnimatorProps = {
  children: React.ReactNode;
};

const SigilAnimator = ({ children }: SigilAnimatorProps) => {
    const meshRef = React.useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.3;
            meshRef.current.rotation.x += delta * 0.2;
        }
    });

    return <group ref={meshRef}>{children}</group>;
}

const SharedSigilMaterial = <SigilMaterial />;

/**
 * The primary sigil representing the ΛΞVON brand itself.
 */
export function LambdaXiVON_Sigil(props: { className?: string }) {
    const shape = React.useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(-1, -1);
        s.lineTo(0, 1);
        s.lineTo(1, -1);
        s.lineTo(0.8, -1);
        s.lineTo(0, 0.6);
        s.lineTo(-0.8, -1);
        s.closePath();
        return s;
    }, []);

    const extrudeSettings = React.useMemo(() => ({
        steps: 1,
        depth: 0.2,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.05,
        bevelSegments: 2
    }), []);

    return (
        <group {...props}>
            <mesh scale={1.2}>
            <extrudeGeometry args={[shape, extrudeSettings]} />
            {SharedSigilMaterial}
        </mesh>
        </group>
    );
}

/**
 * The sigil for BEEP, the Behavioural Event and Execution Processor.
 * Represented by a wireframe-overlaid icosahedron, symbolizing its complex, multi-faceted intelligence.
 */
export function BEEP_Sigil(props: { className?: string }) {
    return (
        <group {...props}>
            <mesh>
                <icosahedronGeometry args={[1, 0]} />
                {SharedSigilMaterial}
            </mesh>
             <mesh>
                <icosahedronGeometry args={[1, 0]} />
                 <meshBasicMaterial wireframe color="hsl(var(--primary))" />
            </mesh>
        </group>
    );
}

/**
 * The sigil for Micro-Apps, the atomic units of utility in ΛΞVON OS.
 * Represented by a hexagonal cylinder, symbolizing a self-contained module.
 */
export function MicroAppsSigil(props: { className?: string }) {
    return (
        <group {...props}>
            <mesh>
                <cylinderGeometry args={[0.8, 0.8, 0.5, 6]} />
                {SharedSigilMaterial}
            </mesh>
        </group>
    );
}

/**
 * The sigil for Loom Studio, the Architect's Sanctum for designing agents.
 * Represented by a flat, square panel, symbolizing a canvas or blueprint.
 */
export function LoomSigil(props: { className?: string }) {
    return (
        <group {...props}>
            <mesh>
                <boxGeometry args={[1.5, 1.5, 0.2]} />
                {SharedSigilMaterial}
            </mesh>
             <mesh>
                <boxGeometry args={[1.5, 1.5, 0.2]} />
                <meshBasicMaterial wireframe color="hsl(var(--primary))" />
            </mesh>
        </group>
    );
}

/**
 * The sigil for Aegis, the guardian and security protocol of ΛΞVON OS.
 * Represented by an octahedron, a platonic solid symbolizing strength and stability.
 */
export function AegisSigil(props: { className?: string }) {
    return (
        <group {...props}>
            <mesh>
                <octahedronGeometry args={[1, 0]} />
                {SharedSigilMaterial}
            </mesh>
        </group>
    );
}

/**
 * The sigil for the KLEPSYDRA Engine, the economic heart of the system.
 * Represented by two cones joined at their apex, like an hourglass, symbolizing the flow of time and resources.
 */
export function KlepsydraSigil(props: { className?: string }) {
    return (
        <group {...props}>
            <mesh position={[0, 0.5, 0]}>
                <coneGeometry args={[0.8, 1, 4]} />
                {SharedSigilMaterial}
            </mesh>
            <mesh position={[0, -0.5, 0]} rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[0.8, 1, 4]} />
                {SharedSigilMaterial}
            </mesh>
        </group>
    );
}

/**
 * The sigil for the Pantheon, the collection of core system deities.
 * Represented by a dodecahedron, another platonic solid often associated with the universe or the whole.
 */
export function PantheonSigil(props: { className?: string }) {
    return (
        <group {...props}>
            <mesh>
                <dodecahedronGeometry args={[1, 0]} />
                {SharedSigilMaterial}
            </mesh>
        </group>
    );
}

/**
 * The sigil for the Armory Marketplace, the repository for Micro-Apps and Chaos Cards.
 * Represented by a complex Torus Knot, symbolizing a woven collection of powerful tools.
 */
export function ArmorySigil(props: { className?: string }) {
    return (
        <group {...props}>
            <mesh>
                <torusKnotGeometry args={[0.7, 0.2, 128, 16, 2, 3]} />
                {SharedSigilMaterial}
            </mesh>
        </group>
    );
}

/**
 * The sigil for the Obelisk Marketplace, where digital power becomes tangible.
 * Represented by a simple Torus, a ring symbolizing value and economy.
 */
export function ObeliskMarketplaceSigil(props: { className?: string }) {
    return (
        <group {...props}>
            <mesh>
                <torusGeometry args={[0.8, 0.3, 16, 100]} />
                {SharedSigilMaterial}
            </mesh>
        </group>
    );
}

/**
 * The sigil for the Sovereign's Sigil, the physical command card.
 * Represented by a scepter, a symbol of command and authority, with a glowing gem at its tip.
 */
export function SovereignsSigil(props: { className?: string }) {
    return (
        <group {...props}>
            <group>
                <mesh position={[0, -0.25, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 2.5, 8]} />
                     <meshStandardMaterial 
                        color="#222" 
                        metalness={0.95} 
                        roughness={0.2} 
                    />
                </mesh>
                <mesh position={[0, 1.25, 0]}>
                    <icosahedronGeometry args={[0.3, 0]} />
                    {SharedSigilMaterial}
                </mesh>
            </group>
        </group>
    );
}
