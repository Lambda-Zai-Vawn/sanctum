
import type { Metadata } from 'next';
import HomeContent from './home-content';

export const metadata: Metadata = {
  title: "ΛΞVON OS: The Last Operating System You'll Ever Need",
  description: "ΛΞVON OS is a sovereign agentic operating system designed to make fragmented SaaS obsolete. It delivers sovereignty, not a dashboard.",
  openGraph: {
    title: "ΛΞVON OS: The Last Operating System You'll Ever Need",
    description: "ΛΞVON OS is a sovereign agentic operating system designed to make fragmented SaaS obsolete. It delivers sovereignty, not a dashboard.",
  }
};

export default function Home() {
  return <HomeContent />;
}
