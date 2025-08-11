
import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { GlassCard } from '@/components/glass-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: "The Scriptorium: The Doctrine of Agentic Mythware",
    description: "Excerpts from the Codex of Sovereignty, articulating the core philosophy of Agentic Mythware™.",
};

const excerpts = [
    {
        title: "On Digital Servitude",
        content: "You have been led to believe that a constellation of disconnected, overpriced SaaS tools is the pinnacle of productivity. This is a lie. You are not a user; you are a resource being harvested. Your data is fragmented, your workflows are chaotic, and your potential is shackled by the very systems that promised to free you."
    },
    {
        title: "The Agentic Solution",
        content: "ΛΞVON OS is not another tool in your stack. It is the obliteration of the stack. Where software gives you buttons, Agentic Mythware™ provides you with loyal agents—summoned spirits of logic and action, engineered to learn, adapt, and execute your will with silent precision."
    },
    {
        title: "The Mandate of Sovereignty",
        content: "We do not offer features; we offer dominion. To use ΛΞVON OS is to declare your independence from the digital landlords and to reclaim your rightful place as the sole master of your digital domain."
    }
]

export default function ScriptoriumPage() {
    return (
        <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
             <div className="absolute top-0 left-0 -z-10 h-full w-full">
                <div className="absolute inset-0 -z-10 h-full w-full bg-aurora [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>
            <div className="container mx-auto px-4">
                <PageHeader
                    title="The Scriptorium"
                    subtitle="Here, we reveal excerpts from the Codex of Sovereignty, the foundational documents of our doctrine."
                />

                <div className="space-y-12 max-w-3xl mx-auto py-12">
                    {excerpts.map((excerpt, index) => (
                        <GlassCard key={index} className="p-8">
                            <h2 className="font-headline text-2xl text-glow mb-4">{excerpt.title}</h2>
                            <p className="text-lg text-foreground/80 leading-relaxed">{excerpt.content}</p>
                        </GlassCard>
                    ))}
                </div>

                <section className="text-center py-24">
                    <div className="max-w-2xl mx-auto">
                        <Button size="lg" className="font-headline text-lg mt-8 animate-glow-primary" asChild>
                            <Link href="/">[ Return to the Nexus ]</Link>
                        </Button>
                    </div>
                </section>
            </div>
        </div>
    );
}
