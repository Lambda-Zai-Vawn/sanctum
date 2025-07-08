
import type { Metadata } from 'next';
import PantheonContent from '../(main)/pantheon/pantheon-content';

export const metadata: Metadata = {
    title: "The Pantheon: Core Components of ΛΞVON OS",
    description: "Explore the Pantheon, the core instruments of the ΛΞVON OS: BEEP, Micro-Apps, Loom Studio, Aegis, and the KLEPSYDRA Engine. Discover the unified machine for digital sovereignty.",
    openGraph: {
        title: "The Pantheon: Core Components of ΛΞVON OS",
        description: "Explore the Pantheon, the core instruments of the ΛΞVON OS: BEEP, Micro-Apps, Loom Studio, Aegis, and the KLEPSYDRA Engine. Discover the unified machine for digital sovereignty.",
    }
};

export default function PantheonPage() {
    return <PantheonContent />;
}
