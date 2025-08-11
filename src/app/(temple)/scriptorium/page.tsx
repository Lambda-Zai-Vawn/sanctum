
"use client";

import { PageHeader } from '@/components/page-header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScriptoriumOracle } from '@/components/scriptorium/oracle';

export default function ScriptoriumPage() {
    return (
        <div className="container mx-auto px-4">
            <PageHeader
                title="The Scriptorium"
                subtitle="Speak a term. The Lorekeeper will answer. Here lies the Living Scroll, the source of truth for all technical and philosophical aspects of the system."
            />

            <ScriptoriumOracle />

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
