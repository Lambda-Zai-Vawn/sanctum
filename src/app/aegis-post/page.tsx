
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
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
            <div className="absolute top-0 left-0 -z-10 h-full w-full">
                <div className="absolute inset-0 -z-10 h-full w-full bg-aurora [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>
             <AegisPostContent />
        </div>
    );
}
