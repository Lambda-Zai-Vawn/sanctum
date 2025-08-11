
import type { Metadata } from 'next';
import AegisPostContent from './aegis-post-content';

export const metadata: Metadata = {
    title: "The Aegis Post: Security For Your Reality",
    description: "Aegis protects you from deception with the Phalanx Protocol and governs your AI workforce with the Agent Governance Protocol. This is security for the agentic age.",
    openGraph: {
        title: "The Aegis Post: Security For Your Reality",
        description: "Aegis protects you from deception with the Phalanx Protocol and governs your AI workforce with the Agent Governance Protocol. This is security for the agentic age.",
    }
};

export default function AegisPostPage() {
    return <AegisPostContent />;
}
