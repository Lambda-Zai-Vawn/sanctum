
"use client";

import * as React from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { sections } from './section';

export function SaaSParticles({ count = 200 }) {
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
