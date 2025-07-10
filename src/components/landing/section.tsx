
"use client";

import * as React from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Html } from '@react-three/drei';

export const sections = {
  intro: { start: 0, end: 0.15 },
  problem: { start: 0.20, end: 0.35 },
  solution: { start: 0.40, end: 0.55 },
  revelation: { start: 0.60, end: 0.80 },
  cta: { start: 0.85, end: 1.0 },
};

export function Section({ children, start, end, ...props }: any) {
  const ref = React.useRef<HTMLDivElement>(null);
  const scroll = useScroll();
  
  useFrame(() => {
    const r = scroll.range(start, end - start);
    if(ref.current) {
        ref.current.style.opacity = String(r);
        ref.current.style.pointerEvents = r > 0 ? 'auto' : 'none';
    }
  });

  return <Html ref={ref} portal={{current: scroll.fixed}} {...props}>{children}</Html>
}
