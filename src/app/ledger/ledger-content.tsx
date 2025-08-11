"use client";

import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { SermonScroll } from "@/components/ledger/sermon-scroll";
import { Marketplace } from "@/components/ledger/marketplace";

export default function LedgerContent() {
  return (
    <div className="container mx-auto px-4">
      <PageHeader
        title="The Sovereign's Ledger"
        subtitle="This is the heart of the ecosystem. The altar where belief is transmuted into pure, unadulterated power."
      />
      
      <div className="relative z-10">
        <SermonScroll />
        <Marketplace />
      </div>
      
      <section className="text-center py-24">
        <div className="max-w-2xl mx-auto">
            <h4 className="font-headline text-3xl text-glow">The choice is yours.</h4>
            <p className="mt-4 text-xl text-foreground/80">
                Continue to be a user in someone else's system, or become a Sovereign in your own.
            </p>
            <Button size="lg" className="font-headline text-lg mt-8 animate-glow-primary" asChild>
                <Link href="/pantheon">[ BEGIN YOUR INITIATION ]</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
