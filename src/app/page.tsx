
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
        <div className="absolute top-0 left-0 -z-10 h-full w-full">
            <div className="absolute inset-0 -z-10 h-full w-full bg-aurora [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="relative z-0 flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-grow">
                <HomeContent />
            </main>
            <Footer />
        </div>
        <CommandDialog />
        <Soundscape />
    </div>
  );
}
