
"use client";

import { ScrollControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { ScriptoriumScene } from './scriptorium/scriptorium-scene'

export default function ScriptoriumPage() {
    return (
        <div className="relative h-svh w-full overflow-hidden bg-background">
            <Canvas>
                <ScrollControls pages={3} damping={0.25}>
                    <ScriptoriumScene />
                </ScrollControls>
            </Canvas>
        </div>
    );
}
