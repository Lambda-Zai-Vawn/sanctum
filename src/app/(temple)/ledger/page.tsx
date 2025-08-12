
"use client";

import { PageHeader } from "@/components/page-header";
import { ObeliskCanvas } from "@/components/ledger/obelisk-canvas";
import { SermonScroll } from "@/components/ledger/sermon-scroll";
import { Marketplace } from "@/components/ledger/marketplace";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SovereignLedgerPage() {
  return (
    <>
      <ObeliskCanvas />
      <div className="relative z-10 container mx-auto px-4">
        <PageHeader
          title="The Sovereign's Ledger"
          subtitle="This is not a bank. It is the living stone on which the history of your Sovereignty is carved. Witness the pulse of the system, the flow of Ξ, and the laws that govern your ascent."
          animationType="dramatic"
        />

        <SermonScroll />
        
        <Marketplace />

        <section className="text-center py-24">
            <div className="max-w-2xl mx-auto">
                <Button size="lg" className="font-headline text-lg mt-8 animate-glow-primary" asChild>
                    <Link href="/">[ Return to the Nexus ]</Link>
                </Button>
            </div>
        </section>
      </div>
    </>
  );
}
