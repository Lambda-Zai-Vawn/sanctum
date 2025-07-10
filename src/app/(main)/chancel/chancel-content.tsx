

"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/glass-card";
import { Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { generateCommunique, type ChancelScribeOutput } from "@/ai/flows/chancel-scribe-flow";

export default function ChancelContent() {
  const [topic, setTopic] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [communique, setCommunique] = React.useState<ChancelScribeOutput | null>(null);

  const handleGenerateCommunique = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;

    setLoading(true);
    setError(null);
    setCommunique(null);

    try {
        const result = await generateCommunique({ topic });
        setCommunique(result);
    } catch (err) {
        setError("The Scribe is otherwise occupied. Contemplate your query and try again.");
        console.error(err);
    } finally {
        setLoading(false);
    }
  };


  return (
    <div className="container mx-auto px-4">
      <PageHeader
        title="The Chancel"
        subtitle="Where raw thought ignites empire. The old world offers static discourse. The Chancel offers radical visions, dissecting industrial decay and forging new paths for sovereign operators."
      />

      <section className="py-8">
        <GlassCard className="max-w-3xl mx-auto p-8">
            <div className="text-center">
                <h2 className="font-headline text-3xl font-semibold text-glow mb-4">Ignite a Communique</h2>
                <p className="text-foreground/80 mb-8">
                    Present a topic to the Chancel Scribe. From your raw thought, a new doctrine will be forged.
                </p>
            </div>
            <form onSubmit={handleGenerateCommunique} className="w-full">
                <div className="flex gap-2">
                    <Input
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., The nature of digital identity"
                        disabled={loading}
                        className="text-base"
                    />
                    <Button type="submit" disabled={loading || !topic}>
                        {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="h-4 w-4" />}
                        <span>{loading ? "Forging..." : "Ignite"}</span>
                    </Button>
                </div>
            </form>
        </GlassCard>

        {error && <Alert variant="destructive" className="mt-8 max-w-3xl mx-auto text-left"><AlertTitle>A Disturbance</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

        {communique && !loading && !error && (
            <div className="mt-12 max-w-4xl mx-auto">
                <GlassCard className="p-8 md:p-12">
                    <div className="prose prose-invert max-w-none prose-p:text-foreground/80 prose-headings:font-headline prose-h2:font-semibold prose-headings:text-glow prose-headings:text-foreground prose-a:text-accent prose-strong:text-foreground">
                        <p className="font-headline text-accent text-sm mb-1">{communique.category}</p>
                        <h2 className="!text-3xl !mb-2">{communique.title}</h2>
                        <p className="lead !text-foreground/70 !my-0"><em>{communique.excerpt}</em></p>
                        <hr className="!my-6 !border-border" />
                        <ReactMarkdown>{communique.content}</ReactMarkdown>
                    </div>
                </GlassCard>
            </div>
        )}
      </section>
    </div>
  );
}
