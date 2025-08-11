"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/glass-card";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { generateCommunique, type ChancelScribeOutput } from "@/ai/flows/chancel-scribe-flow";
import { useVoiceTranscription } from "@/hooks/use-voice-transcription";
import { MicrophoneIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

export default function ChancelContent() {
  const [topic, setTopic] = React.useState('');
  const [isForging, setIsForging] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [communique, setCommunique] = React.useState<ChancelScribeOutput | null>(null);

  const handleGenerateCommunique = async () => {
    if (!topic) return;

    setIsForging(true);
    setError(null);
    setCommunique(null);

    try {
      const result = await generateCommunique({ topic });
      setCommunique(result);
    } catch (err) {
      setError("The Scribe is otherwise occupied. Contemplate your query and try again.");
      console.error(err);
    } finally {
      setIsForging(false);
    }
  };

  const { isListening, transcript, start, stop } = useVoiceTranscription();
  
  React.useEffect(() => {
    if (transcript) {
        setTopic(transcript);
    }
  }, [transcript]);


  const isLoading = isListening || isForging;

  return (
    <div className="container mx-auto px-4">
      <PageHeader
        title="The Chancel"
        subtitle="Where raw thought ignites empire. The old world offers static discourse. The Chancel offers radical visions, dissecting industrial decay and forging new paths for sovereign operators."
      />

      <section className="py-8">
        <GlassCard className="max-w-3xl mx-auto p-8">
            <div className="text-center">
                <h2 className="font-headline text-3xl font-semibold text-glow mb-4">The Orator's Crucible</h2>
                <p className="text-foreground/80 mb-8">
                    Speak or write your raw thought. The Chancel Scribe is listening. From your will, a new doctrine will be forged.
                </p>
            </div>
            
            <div className="w-full flex flex-col items-center gap-4">
                <div className="w-full relative">
                    <Textarea 
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Speak or type your raw thought..."
                        className="w-full min-h-[120px] bg-background/50 text-lg p-4 pr-16"
                        disabled={isLoading}
                    />
                    <Button 
                        size="icon" 
                        variant="ghost"
                        className={cn("absolute top-3 right-3 h-10 w-10 rounded-full", isListening && "animate-mic-pulse text-accent")}
                        onClick={isListening ? stop : start}
                        disabled={isForging}
                        aria-label={isListening ? "Stop listening" : "Start listening"}
                    >
                        <MicrophoneIcon className="h-6 w-6" />
                    </Button>
                </div>
                 <div className="h-6 text-center text-foreground/70 italic">
                    {isListening && <p className="animate-pulse">The Scribe is listening...</p>}
                 </div>
                <Button 
                  size="lg" 
                  className="font-headline text-lg"
                  onClick={handleGenerateCommunique}
                  disabled={isLoading || !topic}
                >
                  {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Wand2 className="h-6 w-6" />}
                  <span>Forge Communique</span>
                </Button>
            </div>
        </GlassCard>

        {error && <Alert variant="destructive" className="mt-8 max-w-3xl mx-auto text-left"><AlertTitle>A Disturbance</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

        {isForging && !error && (
            <div className="mt-12 text-center text-lg italic text-foreground/80">
                <p>The Scribe contemplates your words...</p>
                <p>A new doctrine is being forged from the aether...</p>
            </div>
        )}

        {communique && !isLoading && !error && (
            <div className="mt-12 max-w-4xl mx-auto">
                <GlassCard className="p-8 md:p-12">
                    {communique.imageDataUri && (
                      <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg">
                        <Image 
                          src={communique.imageDataUri}
                          alt={`A visual sigil representing: ${communique.title}`}
                          width={1200}
                          height={675}
                          className="w-full h-full object-cover"
                          data-ai-hint="esoteric symbol"
                        />
                      </div>
                    )}
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
