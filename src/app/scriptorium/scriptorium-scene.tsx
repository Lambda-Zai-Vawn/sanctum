"use client";
import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll, Text, Scroll } from '@react-three/drei'

const CARDS = [
    {
        title: "The Nexus",
        content: "Your first strike for sovereignty. The grand overview of ΛΞVON OS's core proposition and its relentless war on digital friction.",
        link: "/"
    },
    {
        title: "The Pantheon",
        content: "Behold the instruments of your new domain. A showcase of the core components: BEEP, Aegis, and the KLEPSYDRA Engine.",
        link: "/pantheon"
    },
    {
        title: "The Aegis Post",
        content: "Your bastion against the void. A testament to the 'brainless cybersecurity' that renders complex threats invisible.",
        link: "/aegis-post"
    },
    {
        title: "The Chancel",
        content: "Where raw thought ignites empire. A sacred space for the profound philosophical discourse that fuels the age of autonomous workflows.",
        link: "/chancel"
    },
    {
        title: "The Scriptorium",
        content: "Where arcane knowledge becomes a weapon. The living scroll containing the intricate details of the ΛΞVON OS.",
        link: "/scriptorium"
    }
];


function Card({ ...props }) {
  const ref = useRef<THREE.Group>(null!)
  const scroll = useScroll()

  useFrame((state, delta) => {
    if (!ref.current) return;
    const y = scroll.delta * (scroll.pages - 1) * 50
    ref.current.rotation.y += delta * 0.1
    ref.current.rotation.x += delta * 0.2
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, -y, 4, delta)
  })
  
  return (
    <group ref={ref} {...props}>
      <mesh>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial 
            color="hsl(var(--secondary))"
            transparent 
            opacity={0.1}
            metalness={0.9}
            roughness={0.1}
        />
      </mesh>
    </group>
  )
}

export function ScriptoriumScene() {
  const { width, height } = useThree((state) => state.viewport)
  
  return (
    <>
    <ambientLight intensity={1} />
    <pointLight position={[10, 10, 10]} intensity={2} color="hsl(var(--primary))" />
    <pointLight position={[-10, -10, -10]} intensity={1} color="hsl(var(--accent))" />

    <Scroll>
      {CARDS.map((card, i) => (
        <group key={i} position={[THREE.MathUtils.randFloatSpread(width * 0.5), -height * i - height / 2, THREE.MathUtils.randFloatSpread(3)]}>
          <Card />
            <Text
                maxWidth={3}
                anchorX="center"
                anchorY="middle"
                fontSize={0.3}
                color="hsl(var(--primary))"
                font="/fonts/Comfortaa-Bold.ttf"
                position={[0, 0.5, 0.1]}
            >
                {card.title}
            </Text>
            <Text
                maxWidth={3.5}
                anchorX="center"
                anchorY="middle"
                fontSize={0.15}
                color="hsl(var(--foreground))"
                font="/fonts/Lexend-Regular.ttf"
                position={[0, -0.2, 0.1]}
                lineHeight={1.5}
                textAlign="center"
            >
                {card.content}
            </Text>
        </group>
      ))}
    </Scroll>
    </>
  )
}
