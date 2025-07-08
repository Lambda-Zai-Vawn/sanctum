
import type { Metadata } from 'next';
import TreasuryContent from "../(main)/treasury/treasury-content";

export const metadata: Metadata = {
    title: "The Treasury: An Invitation to Forge the Post-SaaS Economy",
    description: "This is not an investment memo. This is a declaration of economic conquest. Discover the investment thesis for ΛΞVON OS and our path to market dominance.",
    openGraph: {
        title: "The Treasury: An Invitation to Forge the Post-SaaS Economy",
        description: "This is not an investment memo. This is a declaration of economic conquest. Discover the investment thesis for ΛΞVON OS and our path to market dominance.",
    }
};

export default function TreasuryPage() {
    return <TreasuryContent />;
}
