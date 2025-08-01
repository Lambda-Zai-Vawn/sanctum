
"use client";

import * as React from 'react';
import { useScroll, Html } from '@react-three/drei';
import { LambdaXiVONIcon } from '@/components/icons';

export function LandingFooter() {
    const scroll = useScroll();
    const scrollToTop = () => {
        scroll.el.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Html as="footer" portal={{current: scroll.fixed}} className="w-full bottom-0 p-4 pointer-events-none">
            <div className="w-full text-center text-xs text-foreground/50 pointer-events-auto">
                <button onClick={scrollToTop} className="mb-4 text-primary hover:text-glow focus:outline-none">
                    <LambdaXiVONIcon className="h-10 w-10" style={{filter: 'drop-shadow(0 0 10px hsl(var(--primary)))'}} />
                </button>
                <div>
                  <p>ΛΞVON Inc | © 2025 | Terms of Sovereignty | Privacy Protocol</p>
                </div>
            </div>
        </Html>
    )
}
