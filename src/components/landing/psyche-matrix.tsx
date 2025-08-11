
"use client";

import * as React from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { sections } from './section';

export function PsycheMatrix() {
    const meshRef = React.useRef<THREE.Mesh>(null);
    const scroll = useScroll();

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        meshRef.current.rotation.y += delta * 0.1;
        meshRef.current.rotation.x += delta * 0.05;

        const solutionRange = scroll.range(sections.solution.start, sections.solution.end - sections.solution.start);
        const scale = 1 + solutionRange * 0.5;
        meshRef.current.scale.set(scale, scale, scale);

        const revelationRange = scroll.range(sections.revelation.start, sections.revelation.end - sections.revelation.start);
        if (revelationRange > 0) {
            meshRef.current.visible = false;
        } else {
            meshRef.current.visible = true;
        }
    });

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[1.5, 1]} />
            <meshPhysicalMaterial 
                roughness={0}
                transmission={1}
                thickness={1.5}
                ior={1.7}
                chromaticAberration={0.05}
                color={new THREE.Color("white")}
            />
        </mesh>
    )
}
