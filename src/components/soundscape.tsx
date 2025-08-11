"use client";

import * as React from 'react';

export function Soundscape() {
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [hasInteracted, setHasInteracted] = React.useState(false);

    React.useEffect(() => {
        const handleFirstInteraction = () => {
            setHasInteracted(true);
            document.removeEventListener('click', handleFirstInteraction);
        };

        document.addEventListener('click', handleFirstInteraction);

        return () => {
            document.removeEventListener('click', handleFirstInteraction);
        };
    }, []);

    React.useEffect(() => {
        if (hasInteracted && audioRef.current) {
            audioRef.current.play().catch(error => {
                console.error("Audio play failed:", error);
            });
        }
    }, [hasInteracted]);

    return (
        <audio ref={audioRef} loop preload="auto">
            <source src="/audio/sanctum-ambience.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
    );
}
