
"use client";
import * as React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SigilMaterial = React.memo(() => {
    const materialRef = React.useRef<THREE.MeshStandardMaterial>(null);
    useFrame((state) => {
        if (materialRef.current) {
            // Smoothly pulsate the emissive intensity
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


type SigilWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const SigilWrapper = ({ children, className }: SigilWrapperProps) => {
    return (
        <div className={className}>
            <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
                <ambientLight intensity={1.5} />
                <pointLight position={[5, 5, 5]} intensity={2} color="hsl(var(--primary))" />
                <pointLight position={[-5, -5, -5]} intensity={1} color="hsl(var(--accent))" />
                <SigilAnimator>
                    {children}
                </SigilAnimator>
            </Canvas>
        </div>
    );
}

const SharedSigilMaterial = <SigilMaterial />;

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
        <SigilWrapper {...props}>
             <mesh scale={1.2}>
                <extrudeGeometry args={[shape, extrudeSettings]} />
                {SharedSigilMaterial}
            </mesh>
        </SigilWrapper>
    );
}


export function BEEP_Sigil(props: { className?: string }) {
    return (
        <SigilWrapper {...props}>
            <mesh>
                <icosahedronGeometry args={[1, 0]} />
                {SharedSigilMaterial}
            </mesh>
             <mesh>
                <icosahedronGeometry args={[1, 0]} />
                 <meshBasicMaterial wireframe color="hsl(var(--primary))" />
            </mesh>
        </SigilWrapper>
    );
}

export function MicroAppsSigil(props: { className?: string }) {
    return (
        <SigilWrapper {...props}>
            <mesh>
                <cylinderGeometry args={[0.8, 0.8, 0.5, 6]} />
                {SharedSigilMaterial}
            </mesh>
        </SigilWrapper>
    );
}

export function LoomSigil(props: { className?: string }) {
    return (
        <SigilWrapper {...props}>
            <mesh>
                <boxGeometry args={[1.5, 1.5, 0.2]} />
                {SharedSigilMaterial}
            </mesh>
             <mesh>
                <boxGeometry args={[1.5, 1.5, 0.2]} />
                <meshBasicMaterial wireframe color="hsl(var(--primary))" />
            </mesh>
        </SigilWrapper>
    );
}

export function AegisSigil(props: { className?: string }) {
    return (
        <SigilWrapper {...props}>
            <mesh>
                <octahedronGeometry args={[1, 0]} />
                {SharedSigilMaterial}
            </mesh>
        </SigilWrapper>
    );
}

export function KlepsydraSigil(props: { className?: string }) {
    return (
        <SigilWrapper {...props}>
            <mesh position={[0, 0.5, 0]}>
                <coneGeometry args={[0.8, 1, 4]} />
                {SharedSigilMaterial}
            </mesh>
            <mesh position={[0, -0.5, 0]} rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[0.8, 1, 4]} />
                {SharedSigilMaterial}
            </mesh>
        </SigilWrapper>
    );
}

export function PantheonSigil(props: { className?: string }) {
    return (
        <SigilWrapper {...props}>
            <mesh>
                <dodecahedronGeometry args={[1, 0]} />
                {SharedSigilMaterial}
            </mesh>
        </SigilWrapper>
    );
}

export function ArmorySigil(props: { className?: string }) {
    return (
        <SigilWrapper {...props}>
            <mesh>
                <torusKnotGeometry args={[0.7, 0.2, 128, 16, 2, 3]} />
                {SharedSigilMaterial}
            </mesh>
        </SigilWrapper>
    );
}

export function ObeliskMarketplaceSigil(props: { className?: string }) {
    return (
        <SigilWrapper {...props}>
            <mesh>
                <torusGeometry args={[0.8, 0.3, 16, 100]} />
                {SharedSigilMaterial}
            </mesh>
        </SigilWrapper>
    );
}

export function SovereignsSigil(props: { className?: string }) {
    return (
        <SigilWrapper {...props}>
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
        </SigilWrapper>
    );
}
