
"use client";
import * as React from 'react';
import { cn } from '@/lib/utils';

type GlassCardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
  /**
   * Disables the interactive 3D tilt effect on mouse move.
   * @default false
   */
  disableTilt?: boolean;
};

/**
 * A responsive, glassmorphic card component with an interactive 3D tilt effect.
 * It features a glowing border and a radial gradient that follows the mouse pointer on hover.
 * The tilt effect can be disabled via props.
 * @param {GlassCardProps} props - The props for the component.
 */
export function GlassCard({ children, className, disableTilt = false, ...props }: GlassCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  /**
   * Handles the mouse move event to update the card's visual effects.
   * Updates CSS custom properties for the radial gradient and applies a 3D rotation transform.
   * @param {React.MouseEvent<HTMLDivElement>} e - The mouse event.
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);

    if (!disableTilt) {
      const rotateX = (y / height - 0.5) * -15;
      const rotateY = (x / width - 0.5) * 15;
      cardRef.current.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }
  };

  /**
   * Resets the card's transform when the mouse leaves the component.
   */
  const handleMouseLeave = () => {
    if (!cardRef.current || disableTilt) return;
    cardRef.current.style.transform = 'perspective(2000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      className={cn('glass-card group', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
