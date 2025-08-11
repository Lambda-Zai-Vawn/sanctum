
"use client";

import * as React from 'react';

export function Soundscape() {
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [hasInteracted, setHasInteracted] = React.useState(false);

    React.useEffect(() => {
        const handleFirstInteraction = () => {
            setHasInteracted(true);
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
        };

        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('keydown', handleFirstInteraction);


        return () => {
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
        };
    }, []);

    React.useEffect(() => {
        if (hasInteracted && audioRef.current) {
            audioRef.current.volume = 0.3;
            audioRef.current.play().catch(error => {
                // Autoplay was prevented.
                console.info("Sanctum Soundscape: User interaction required to play audio.");
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
