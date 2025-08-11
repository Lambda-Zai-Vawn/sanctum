
"use client";

import * as React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function PsycheMatrix({ showRealms }: { showRealms: boolean }) {
    const meshRef = React.useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        meshRef.current.rotation.y += delta * 0.1;
        meshRef.current.rotation.x += delta * 0.05;

        // Pulse the crystal when realms are shown
        const targetScale = showRealms ? 1.2 : 1.0;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        
        const material = meshRef.current.material as THREE.MeshPhysicalMaterial;
        material.ior = THREE.MathUtils.lerp(material.ior, showRealms ? 2.3 : 1.7, 0.1);
    });

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[1.5, 1]} />
            <meshPhysicalMaterial 
                roughness={0}
                transmission={1}
                thickness={1.5}
                ior={1.7}
                chromaticAberration={0.1}
                color={new THREE.Color("white")}
            />
        </mesh>
    )
}
