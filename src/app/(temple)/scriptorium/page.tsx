
import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { GlassCard } from '@/components/glass-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const metadata: Metadata = {
    title: "The Scriptorium: The Living Scroll",
    description: "The source of truth for all technical and philosophical aspects of ΛΞVON OS.",
};

const sections = [
    {
        title: "The Core Doctrine",
        content: "Detailed explanations of Agentic Mythware™, Sovereignty-as-a-Service™, Silence of True Automation, and the Ancient Roman Glass aesthetic."
    },
    {
        title: "The Nexus Architecture",
        content: "High-level interactive SVG diagrams of the system, microservice breakdowns, and a comprehensive tech stack overview."
    },
    {
        title: "The Agentic Pantheon",
        content: "In-depth documentation for BEEP's Triune Voice, Swarm Orchestration, and a searchable Tool Registry mapping commands to functions."
    },
    {
        title: "The Loom of Fates",
        content: "Comprehensive documentation for Loom Studio, the KLEPSYDRA Engine, economic dials, ΞCredits, and the Obelisk Marketplace."
    },
    {
        title: "The Aegis Protocols",
        content: "Detailed explanation of Threat Detection Protocols, Agent Governance, Data Integrity, and Zero-Trust Architecture."
    },
    {
        title: "The Micro-App Canvas",
        content: "A guide to Micro-App development, including manifest schemas, SDK, and UX Laws."
    },
    {
        title: "Operational Scrolls",
        content: "The complete Deployment Runbook, monitoring, logging, debugging, and testing strategies."
    }
]

export default function ScriptoriumPage() {
    return (
        <div className="container mx-auto px-4">
            <PageHeader
                title="The Scriptorium"
                subtitle="Here lies the Living Scroll, the source of truth for all technical and philosophical aspects of the system. This is the primary initiation point for any Architect."
            />

            <div className="max-w-3xl mx-auto py-12">
                    <GlassCard className="p-4 md:p-6">
                    <Accordion type="single" collapsible className="w-full">
                        {sections.map((section) => (
                            <AccordionItem value={section.title} key={section.title}>
                                <AccordionTrigger className="font-headline text-xl hover:text-primary transition-colors text-left">
                                    {section.title}
                                </AccordionTrigger>
                                <AccordionContent className="text-foreground/80 text-base p-4">
                                    {section.content}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                    </GlassCard>
            </div>

            <section className="text-center py-24">
                <div className="max-w-2xl mx-auto">
                    <Button size="lg" className="font-headline text-lg mt-8 animate-glow-primary" asChild>
                        <Link href="/">[ Return to the Nexus ]</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
