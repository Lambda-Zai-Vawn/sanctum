
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
     return <PantheonContent />;
}
