
import type { Metadata } from 'next';
import LedgerContent from "./ledger-content";

export const metadata: Metadata = {
    title: "The Sovereign's Ledger: The Architecture of a New Economy",
    description: "This is not a vault; it is an engine. Discover the closed-loop economic reality of ΛΞVON OS, powered by ΞCredits and the KLEPSYDRA Protocol.",
    openGraph: {
        title: "The Sovereign's Ledger: The Architecture of a New Economy",
        description: "This is not a vault; it is an engine. Discover the closed-loop economic reality of ΛΞVON OS, powered by ΞCredits and the KLEPSYDRA Protocol.",
    }
};

export default function LedgerPage() {
    return <LedgerContent />;
}
