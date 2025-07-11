
"use client"
import * as React from "react";
import { useSearchParams } from 'next/navigation';
import ReactMarkdown from "react-markdown";
import { Loader2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { getDefinition } from "@/ai/flows/glossary-flow";

function ScriptoriumContent() {
    const searchParams = useSearchParams();
    const initialTerm = searchParams.get('term');
    
    const [term, setTerm] = React.useState(initialTerm || "");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [definition, setDefinition] = React.useState<string | null>(null);

    const handleGetDefinition = React.useCallback(async (currentTerm: string) => {
        if (!currentTerm) return;

        setLoading(true);
        setError(null);
        setDefinition(null);

        try {
            const result = await getDefinition({ term: currentTerm });
            setDefinition(result.definition);
        } catch (err) {
            setError("The Lorekeeper is silent. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        if (initialTerm) {
            setTerm(initialTerm);
            handleGetDefinition(initialTerm);
        }
    }, [initialTerm, handleGetDefinition]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleGetDefinition(term);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <PageHeader 
                title="The Scriptorium" 
                subtitle="Where arcane knowledge becomes a weapon. You struggle with opaque systems; the Scriptorium illuminates every protocol, transforming confusion into mastery. This is the source of truth."
            >
                 <div className="mt-8 max-w-xl mx-auto">
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="flex gap-2">
                            <Input
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                                placeholder="Consult the Lorekeeper... (e.g., Aegis)"
                                disabled={loading}
                                className="text-base"
                            />
                            <Button type="submit" disabled={loading || !term}>
                                {loading ? <Loader2 className="animate-spin" /> : "Inquire"}
                            </Button>
                        </div>
                    </form>
                    {error && <Alert variant="destructive" className="mt-4 text-left"><AlertTitle>An Omen</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
                    {definition && !loading && !error && (
                        <Alert className="mt-4 text-left">
                            <AlertTitle className="font-headline text-glow">The Lorekeeper Speaks:</AlertTitle>
                            <AlertDescription className="prose prose-invert pt-2 text-base prose-p:text-foreground/80">
                                <ReactMarkdown>{definition}</ReactMarkdown>
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </PageHeader>
        </div>
    )
}


export default function DocsPage() {
    return (
        <React.Suspense fallback={<div>Loading Scriptorium...</div>}>
            <ScriptoriumContent />
        </React.Suspense>
    )
}
