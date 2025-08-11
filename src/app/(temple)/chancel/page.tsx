
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
    return <ChancelContent />;
}
