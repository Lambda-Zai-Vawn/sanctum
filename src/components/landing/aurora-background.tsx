
"use client";

import * as React from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AuroraShaderMaterial = shaderMaterial(
  // Uniforms
  {
    time: 0,
    uColor1: new THREE.Color(0x6A0DAD), // Imperial Purple
    uColor2: new THREE.Color(0x20B2AA), // Roman Aqua
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;

    void main() {
      vec2 p = vUv * 2.0 - 1.0;
      
      float R = 0.5;
      float G = 0.5;
      float B = 0.9;

      float r = p.x * p.x + p.y * p.y;
      float a = atan(p.y, p.x);

      R += 0.2 * sin(a * 3.0 + time * 0.5);
      G += 0.1 * sin(r * 2.0 - time * 0.8);
      B += 0.3 * sin(a * 5.0 + r * 2.0 + time);

      vec3 color = mix(uColor1, uColor2, G);
      color = mix(color, uColor1, R);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ AuroraShaderMaterial });

export function AuroraBackground() {
  const materialRef = React.useRef<any>();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh position={[0, 0, -10]} scale={[25, 15, 1]}>
      <planeGeometry args={[1, 1]} />
      <auroraShaderMaterial ref={materialRef} />
    </mesh>
  );
}
