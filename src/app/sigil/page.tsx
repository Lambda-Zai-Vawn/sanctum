
import type { Metadata } from 'next';
import SigilContent from './sigil-content';

export const metadata: Metadata = {
    title: "The Sovereign's Sigil",
    description: "The Sovereign's Sigil: a scepter of command that bridges your digital dominion in ΛΞVON OS to the physical world.",
    openGraph: {
        title: "The Sovereign's Sigil: A Scepter of Command",
        description: "Discover the physical key to your digital sovereignty. The Sigil transmutes digital wealth into real-world power.",
    }
};

export default function SigilPage() {
    return <SigilContent />;
}
