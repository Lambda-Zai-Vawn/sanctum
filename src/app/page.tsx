
import type { Metadata } from 'next';
import HomeContent from './home-content';
import { CommandDialog } from "@/components/command-dialog";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { Soundscape } from "@/components/soundscape";


export const metadata: Metadata = {
  title: "ΛΞVON OS: The Last Operating System You'll Ever Need",
  description: "ΛΞVON OS is a sovereign agentic operating system designed to make fragmented SaaS obsolete. It delivers sovereignty, not a dashboard.",
  openGraph: {
    title: "ΛΞVON OS: The Last Operating System You'll Ever Need",
    description: "ΛΞVON OS is a sovereign agentic operating system designed to make fragmented SaaS obsolete. It delivers sovereignty, not a dashboard.",
  }
};

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
        {/* The main layout aurora is not used here, the 3D scene has its own background */}
        <div className="relative z-0 flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-grow contents">
                <HomeContent />
            </main>
            <Footer />
        </div>
        <CommandDialog />
        <Soundscape />
    </div>
  );
}
