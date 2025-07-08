
import type { Metadata } from 'next';
import AegisPostContent from '../(main)/aegis-post/aegis-post-content';

export const metadata: Metadata = {
    title: "The Aegis Post: AI-Powered Cybersecurity",
    description: "Discover Aegis, the brainless cybersecurity layer of ΛΞVON OS. Learn about our multi-phased threat detection, agent governance, and zero-trust architecture for absolute peace of mind.",
    openGraph: {
        title: "The Aegis Post: AI-Powered Cybersecurity",
        description: "Discover Aegis, the brainless cybersecurity layer of ΛΞVON OS. Learn about our multi-phased threat detection, agent governance, and zero-trust architecture for absolute peace of mind.",
    }
};

export default function AegisPostPage() {
    return <AegisPostContent />;
}
