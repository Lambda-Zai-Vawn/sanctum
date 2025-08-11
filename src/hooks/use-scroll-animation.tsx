
"use client";

import { useState, useEffect, useRef } from 'react';

/**
 * @typedef ScrollAnimationResult
 * @property {React.RefObject<HTMLDivElement>} ref - A ref to be attached to the element you want to observe.
 * @property {boolean} isInView - A boolean state that is true if the element is in the viewport, otherwise false.
 */

/**
 * A custom hook that detects when a component scrolls into the viewport.
 * It uses the Intersection Observer API to efficiently track the visibility of an element.
 * Once the element is in view, it remains in that state.
 *
 * @returns {ScrollAnimationResult} An object containing the ref and the in-view state.
 */
export function useScrollAnimation() {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // If the element is intersecting the viewport, update the state and unobserve.
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
            }
        );

        observer.observe(element);

        return () => {
            if(element) {
              // Clean up the observer when the component unmounts.
              observer.unobserve(element);
            }
        };
    }, []);

    return { ref, isInView };
}
