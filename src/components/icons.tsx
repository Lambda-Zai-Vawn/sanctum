
import { cn } from "@/lib/utils";
import { Canvas, useFrame } from "@react-three/fiber";
import * as React from "react";
import * as THREE from 'three';

const IconWrapper = ({ className, children, ...props }: React.HTMLAttributes<SVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("text-foreground", className)}
        {...props}
    >
        {children}
    </svg>
);

export const LambdaXiVONIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <IconWrapper viewBox="0 0 24 24" {...props}>
        <path d="M3.5 18.5 L12 5 L20.5 18.5 M6 14 L18 14" strokeWidth="2" />
        <path d="M10 12 L12 14.5 L14 12" strokeWidth="1.5" />
    </IconWrapper>
);

function Orb3DIcon({ state }: { state: 'open' | 'closed' }) {
    const groupRef = React.useRef<THREE.Group>(null!);
    const line1Ref = React.useRef<THREE.Mesh>(null!);
    const line2Ref = React.useRef<THREE.Mesh>(null!);

    useFrame((_, delta) => {
        groupRef.current.rotation.y += delta * 0.2;
        groupRef.current.rotation.x += delta * 0.1;

        const targetRotation = state === 'open' ? Math.PI / 4 : 0;
        
        if (line1Ref.current) {
            line1Ref.current.rotation.z = THREE.MathUtils.lerp(line1.current.rotation.z, targetRotation, 0.1);
        }
        if (line2Ref.current) {
            line2Ref.current.rotation.z = THREE.MathUtils.lerp(line2.current.rotation.z, -targetRotation, 0.1);
        }
    });
    
    return (
        <group ref={groupRef}>
            <mesh>
                <icosahedronGeometry args={[1.2, 0]} />
                 <meshStandardMaterial 
                    color="hsl(var(--accent))" 
                    emissive="hsl(var(--primary))" 
                    emissiveIntensity={0.6}
                    metalness={0.9} 
                    roughness={0.1} 
                    transparent
                    opacity={0.6}
                />
            </mesh>
            <group>
                <mesh ref={line1Ref}>
                    <boxGeometry args={[1, 0.1, 0.1]} />
                    <meshBasicMaterial color="white" toneMapped={false} />
                </mesh>
                <mesh ref={line2Ref}>
                    <boxGeometry args={[1, 0.1, 0.1]} />
                    <meshBasicMaterial color="white" toneMapped={false} />
                </mesh>
            </group>
        </group>
    )
}

export const OrbIcon = ({className, ...props}: React.HTMLAttributes<HTMLElement> & { 'data-state': 'open' | 'closed' }) => {
    return (
        <div className={className}>
             <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                <ambientLight intensity={1.5} />
                <pointLight position={[5, 5, 5]} intensity={2} color="hsl(var(--primary))" />
                <pointLight position={[-5, -5, -5]} intensity={1} color="hsl(var(--accent))" />
                <Orb3DIcon state={props['data-state']} />
            </Canvas>
        </div>
    )
};


export const ObeliskIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <IconWrapper viewBox="0 0 24 24" {...props}>
        <path d="M6 2h12l-2 20H8L6 2z" />
        <path d="M6 2L12 0l6 2" />
    </IconWrapper>
);

export const CanadianMapleLeafIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <IconWrapper viewBox="0 0 20 20" {...props}>
        <path fill="currentColor" d="M16.9,8.2l-6-2.7c-0.1,0-0.1-0.1-0.2-0.1H10h-0.2c-0.1,0-0.1,0-0.2,0.1l-6,2.7c-0.4,0.2-0.6,0.6-0.5,1 c0.2,0.4,0.6,0.6,1,0.5L8.5,8.4V11l-3.8,1.9c-0.4,0.2-0.6,0.6-0.5,1c0.2,0.4,0.6,0.6,1,0.5L9,12.3v2.4l-2.6,1.3 c-0.4,0.2-0.6,0.6-0.5,1c0.2,0.4,0.6,0.6,1,0.5l2.1-1.1V18h1v-1.9l2.1,1.1c0.4,0.2,0.8,0,1-0.5c0.2-0.4,0-0.8-0.5-1L11,14.7 V12.3l4.3,2.1c0.4,0.2,0.8,0,1-0.5c0.2-0.4,0-0.8-0.5-1L11.5,11V8.4l4.3,1.3c0.4,0.2,0.8,0,1-0.5C17.5,8.8,17.3,8.4,16.9,8.2z" />
    </IconWrapper>
);

export const ShatteredIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <IconWrapper viewBox="0 0 24 24" {...props}>
        <path d="m2 12 5.2 0" />
        <path d="m16.8 12 5.2 0" />
        <path d="m12 2 0 5.2" />
        <path d="m12 16.8 0 5.2" />
        <path d="m4.9 4.9 3.68 3.68" />
        <path d="m15.42 15.42 3.68 3.68" />
        <path d="m4.9 19.1 3.68-3.68" />
        <path d="m15.42 8.58 3.68-3.68" />
        <path d="m9 15 3-3" />
    </IconWrapper>
);

export const SkullIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <IconWrapper viewBox="0 0 24 24" {...props} fill="none">
        <path d="M12,2A10,10,0,0,0,2,12v4a4,4,0,0,0,4,4h1a1,1,0,0,0,1-1V17a1,1,0,0,1,2,0v2a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V17a1,1,0,0,1,2,0v2a1,1,0,0,0,1,1h1a4,4,0,0,0,4-4V12A10,10,0,0,0,12,2Z"/>
        <circle cx="8.5" cy="11.5" r="1"/>
        <circle cx="15.5" cy="11.5" r="1"/>
        <path d="M10 16.5l2-1.5 2 1.5"/>
    </IconWrapper>
);

export const ChainsIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <IconWrapper viewBox="0 0 24 24" {...props}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" />
    </IconWrapper>
);

/**
 * An icon representing a microphone, used for voice input controls.
 * It's a standard SVG icon wrapped for consistency.
 * @param {React.HTMLAttributes<SVGElement>} props - Standard SVG attributes.
 */
export const MicrophoneIcon = (props: React.HTMLAttributes<SVGElement>) => (
    <IconWrapper viewBox="0 0 24 24" {...props}>
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="23"></line>
        <line x1="8" y1="23" x2="16" y2="23"></line>
    </IconWrapper>
);
