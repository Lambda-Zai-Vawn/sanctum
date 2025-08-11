
import type { Metadata } from 'next';
import AegisPostContent from './aegis-post-content';

export const metadata: Metadata = {
    title: "The Aegis Post: The Sentinel's Vow",
    description: "Our commitment to security and privacy, framed as The Sentinel's Vow. Discover our Zero-Trust architecture and the role of Aegis as the user's unblinking protector.",
    openGraph: {
        title: "The Aegis Post: The Sentinel's Vow",
        description: "Our commitment to security and privacy, framed as The Sentinel's Vow. Discover our Zero-Trust architecture and the role of Aegis as the user's unblinking protector.",
    }
};

export default function AegisPostPage() {
    return <AegisPostContent />;
}
