
"use client"
import * as React from "react";
import Link from "next/link";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book, Code, Workflow, BrainCircuit, Rocket, Loader2 } from "lucide-react";
import { AegisSigilIcon, LoomSigilIcon, MicroAppsSigilIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { getDefinition } from "@/ai/flows/glossary-flow";

const docSections = [
    { id: "genesis-protocol", title: "Architect's Genesis Protocol", icon: <Code/>, subItems: ["Environment Setup", "Database Seeding", "Running Services", "App Launch"] },
    { id: "core-doctrine", title: "The Core Doctrine", icon: <Book/>, subItems: ["Agentic Mythware™", "Sovereignty-as-a-Service™", "The Silence of True Automation", "Ancient Roman Glass Aesthetic"] },
    { id: "nexus-architecture", title: "Nexus Architecture", icon: <Workflow/>, subItems: ["System Overview", "Microservices", "Tech Stack"] },
    { id: "agentic-pantheon", title: "The Agentic Pantheon", icon: <BrainCircuit/>, subItems: ["Swarm Orchestration", "Tool Registry", "Agent Profiles"] },
    { id: "loom-of-fates", title: "The Loom of Fates", icon: <LoomSigilIcon/>, subItems: ["Loom Studio", "KLEPSYDRA Engine", "ΞCredits", "Folly Instruments", "Obelisk Marketplace"] },
    { id: "aegis-protocols", title: "The Aegis Protocols", icon: <AegisSigilIcon/>, subItems: ["Threat Detection", "Agent Governance", "Data Integrity", "Zero-Trust Architecture"] },
    { id: "micro-app-canvas", title: "The Micro-App Canvas", icon: <MicroAppsSigilIcon/>, subItems: ["SDK", "Canvas UX Laws", "Mobile UX Guidelines", "Verdigris Interface Protocol™"] },
    { id: "operational-scrolls", title: "Operational Scrolls", icon: <Rocket/>, subItems: ["Deployment Runbook", "Monitoring", "Debugging", "Testing"] },
];

export default function DocsPage() {
    const [term, setTerm] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [definition, setDefinition] = React.useState<string | null>(null);

    const handleGetDefinition = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!term) return;

        setLoading(true);
        setError(null);
        setDefinition(null);

        try {
            const result = await getDefinition({ term });
            setDefinition(result.definition);
        } catch (err) {
            setError("The Lorekeeper is silent. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <h2 className="font-headline text-2xl text-glow p-2">Scriptorium</h2>
                </SidebarHeader>
                <ScrollArea className="flex-1">
                    <SidebarContent>
                        <SidebarMenu>
                            {docSections.map((section) => (
                                <SidebarMenuItem key={section.title}>
                                    <SidebarMenuButton>
                                        {section.icon}
                                        <span>{section.title}</span>
                                    </SidebarMenuButton>
                                    <SidebarMenuSub>
                                        {section.subItems?.map(sub => (
                                            <SidebarMenuSubItem key={sub}>
                                                <SidebarMenuSubButton asChild>
                                                    <Link href={`#${section.id}`}>{sub}</Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarContent>
                </ScrollArea>
            </Sidebar>
            <SidebarInset>
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-start mb-8">
                        <SidebarTrigger />
                    </div>
                    <PageHeader 
                        title="The Scriptorium" 
                        subtitle="Where arcane knowledge becomes a weapon. You struggle with opaque systems; the Scriptorium illuminates every protocol, transforming confusion into mastery. This is the source of truth."
                    >
                         <div className="mt-8 max-w-xl mx-auto">
                            <form onSubmit={handleGetDefinition} className="w-full">
                                <div className="flex gap-2">
                                    <Input
                                        value={term}
                                        onChange={(e) => setTerm(e.target.value)}
                                        placeholder="Consult the Lorekeeper... (e.g., Aegis)"
                                        disabled={loading}
                                        className="text-base"
                                    />
                                    <Button type="submit" disabled={loading || !term} className="font-headline">
                                        {loading ? <Loader2 className="animate-spin" /> : "Inquire"}
                                    </Button>
                                </div>
                            </form>
                            {error && <Alert variant="destructive" className="mt-4 text-left"><AlertTitle>An Omen</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
                            {definition && !loading && !error && (
                                <Alert className="mt-4 text-left">
                                    <AlertTitle className="font-headline text-glow">The Lorekeeper Speaks:</AlertTitle>
                                    <AlertDescription className="pt-2 text-base text-foreground/80">
                                        {definition}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    </PageHeader>
                    <div className="prose prose-invert max-w-none text-foreground/80 mx-auto mt-16 prose-headings:font-headline prose-h2:font-semibold prose-headings:text-glow prose-headings:text-foreground prose-a:text-accent prose-strong:text-foreground">
                        <h2 id="genesis-protocol">Architect's Genesis Protocol</h2>
                        <p>
                            Welcome, Architect. Your initiation begins. The Genesis Protocol is no mere setup guide; it is a ritual. Attune your environment to the resonant frequencies of the Nexus. Seed the primordial data, awaken the core microservices, and launch the application that becomes an extension of your will. Follow these steps with precision. A stable foundation is paramount.
                        </p>
                        <pre><code className="font-code">{`# 1. Configure Environment (from monorepo root)
cp .env.example .env

# 2. Seed the Database
turbo run db:seed --filter=...

# 3. Run all services in dev mode
turbo dev

# To run only the Sanctum app:
turbo dev --filter=@aevon/sanctum
`}</code></pre>

                        <h2 id="core-doctrine" className="mt-12">The Core Doctrine</h2>
                        <p>
                           To wield ΛΞVON OS is to understand its soul. The Core Doctrine collects the foundational philosophies that separate our Agentic Mythware™ from mundane software. Learn of Sovereignty-as-a-Service™, a paradigm that elevates you from user to commander. Appreciate The Silence of True Automation, where complexity is handled with unseen precision. Master the principles of the Ancient Roman Glass aesthetic, the visual language of our digital temple. This is the heart of ΛΞVON.
                        </p>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
