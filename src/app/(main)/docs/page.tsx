
"use client"
import * as React from "react";
import { Loader2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { getDefinition } from "@/ai/flows/glossary-flow";

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
        <div className="container mx-auto px-4 py-8">
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
        </div>
    )
}
