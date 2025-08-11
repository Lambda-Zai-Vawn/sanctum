
import type { Metadata } from 'next';
import ChancelContent from './chancel-content';

export const metadata: Metadata = {
    title: "The Chancel: The Call to Initiation",
    description: "This is the altar where a visitor can choose to become an Initiate. This is our pricing and sign-up, reimagined as a ritual.",
    openGraph: {
        title: "The Chancel: The Call to Initiation",
        description: "This is the altar where a visitor can choose to become an Initiate. This is our pricing and sign-up, reimagined as a ritual.",
    }
};

export default function ChancelPage() {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
            <div className="absolute top-0 left-0 -z-10 h-full w-full">
                <div className="absolute inset-0 -z-10 h-full w-full bg-aurora [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>
            <ChancelContent />
        </div>
    );
}
