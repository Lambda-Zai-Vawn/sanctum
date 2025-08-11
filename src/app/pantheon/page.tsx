
import type { Metadata } from 'next';
import PantheonContent from './pantheon-content';

export const metadata: Metadata = {
    title: "The Pantheon: Deities of the OS",
    description: "Behold the core systems of ΛΞVON OS, presented not as products, but as deities and fundamental forces within the ecosystem.",
    openGraph: {
        title: "The Pantheon: Deities of the OS",
        description: "Behold the core systems of ΛΞVON OS, presented not as products, but as deities and fundamental forces within the ecosystem.",
    }
};

export default function PantheonPage() {
     return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
            <div className="absolute top-0 left-0 -z-10 h-full w-full">
                <div className="absolute inset-0 -z-10 h-full w-full bg-aurora [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>
             <PantheonContent />
        </div>
    );
}
