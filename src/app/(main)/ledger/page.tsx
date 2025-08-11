
import type { Metadata } from 'next';
import LedgerContent from "./ledger-content";
import { ScrollControls } from '@react-three/drei';
import { ObeliskCanvas } from '@/components/ledger/obelisk-canvas';

export const metadata: Metadata = {
    title: "The Sovereign's Ledger: The Architecture of a New Economy",
    description: "This is not a vault; it is an engine. Discover the closed-loop economic reality of ΛΞVON OS, powered by ΞCredits and the KLEPSYDRA Protocol.",
    openGraph: {
        title: "The Sovereign's Ledger: The Architecture of a New Economy",
        description: "This is not a vault; it is an engine. Discover the closed-loop economic reality of ΛΞVON OS, powered by ΞCredits and the KLEPSYDRA Protocol.",
    }
};

export default function LedgerPage() {
    return (
        <div className="relative w-full h-full">
            <ObeliskCanvas />
            <div className="relative z-10">
                <LedgerContent />
            </div>
        </div>
    );
}
