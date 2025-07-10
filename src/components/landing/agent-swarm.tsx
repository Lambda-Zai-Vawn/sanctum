
"use client";

import * as React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function AgentSwarm({ count = 5000 }) {
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
