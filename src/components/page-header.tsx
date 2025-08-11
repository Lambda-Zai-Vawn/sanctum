
"use client";

import * as React from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

type PageHeaderProps = {
  /** The main title of the page header. */
  title: string;
  /** The subtitle displayed below the main title. */
  subtitle: string;
  /** Optional children to render below the subtitle. */
  children?: React.ReactNode;
  /** The type of animation to use for the header's appearance. */
  animationType?: 'fade' | 'dramatic';
};

/**
 * A standardized page header component with scroll-triggered animations.
 * It displays a title, subtitle, and an optional child content area.
 * The animation is activated when the component scrolls into view.
 * @param {PageHeaderProps} props - The props for the component.
 */
export function PageHeader({ title, subtitle, children, animationType = 'fade' }: PageHeaderProps) {
  const { ref, isInView } = useScrollAnimation();
  const animationClass = animationType === 'dramatic' ? 'animate-dramatic-zoom-in' : 'animate-fade-in-up';

  return (
    <header ref={ref} className="text-center py-16 md:py-24 overflow-hidden">
      <h1 className={cn(
          "font-headline text-4xl font-bold md:text-6xl lg:text-7xl text-glow", 
          isInView ? animationClass : 'opacity-0'
      )}>
        {title}
      </h1>
      <p className={cn(
        "mt-4 max-w-3xl mx-auto text-lg text-foreground/90", 
        isInView ? animationClass : 'opacity-0'
        )} style={{ animationDelay: '150ms' }}>
        {subtitle}
      </p>
      {children ? (
        <div 
          className={cn(
              "w-full",
              isInView ? animationClass : 'opacity-0'
          )}
          style={{ animationDelay: '300ms' }}
        >
          {children}
        </div>
      ) : (
         <div 
          className={cn(
              "mt-8 w-48 h-px mx-auto bg-gradient-to-r from-transparent via-accent to-transparent", 
              isInView ? animationClass : 'opacity-0'
          )}
          style={{ animationDelay: '300ms' }}
        />
      )}
    </header>
  );
}
