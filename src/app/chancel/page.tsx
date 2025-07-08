
import type { Metadata } from 'next';
import ChancelContent from '../(main)/chancel/chancel-content';

export const metadata: Metadata = {
    title: "The Chancel: Doctrine of an Autonomous Age",
    description: "Explore the Chancel, a sacred space for the radical visions and philosophical discourse fueling the age of autonomous workflows and Agentic Mythware™.",
    openGraph: {
        title: "The Chancel: Doctrine of an Autonomous Age",
        description: "Explore the Chancel, a sacred space for the radical visions and philosophical discourse fueling the age of autonomous workflows and Agentic Mythware™.",
    }
};

export default function ChancelPage() {
    return <ChancelContent />;
}
