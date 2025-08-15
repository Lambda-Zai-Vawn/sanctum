
"use client";

import * as React from 'react';
import { useVoiceTranscription } from '@/hooks/use-voice-transcription';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/glass-card';
import { MicrophoneIcon, SkullIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { getDefinition, GlossaryOutput } from '@/ai/flows/glossary-flow';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import ReactMarkdown from 'react-markdown';
import { Skeleton } from '../ui/skeleton';

/**
 * The ScriptoriumOracle is an interactive, voice-driven component that allows users to
 * ask for definitions of terms within the ΛΞVON lore. It uses the Web Speech API for
 * voice transcription and a Genkit AI flow to generate in-character responses.
 */
export function ScriptoriumOracle() {
    const { isListening, transcript, start, stop } = useVoiceTranscription();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(false);
    const [response, setResponse] = React.useState<GlossaryOutput | null>(null);
    const [currentQuery, setCurrentQuery] = React.useState('');
    const hasFired = React.useRef(false);

    const handleMicClick = () => {
        if (isListening) {
            stop();
        } else {
            setResponse(null);
            setCurrentQuery('');
            hasFired.current = false;
            start();
        }
    };

    /**
     * This effect triggers when the user stops speaking.
     * It calls the AI flow to get the definition for the transcribed text.
     */
    React.useEffect(() => {
        if (!isListening && transcript && !hasFired.current) {
            hasFired.current = true;
            setCurrentQuery(transcript);
            setIsLoading(true);
            setResponse(null);

            getDefinition({ term: transcript })
                .then(setResponse)
                .catch(err => {
                    console.error("Error getting definition:", err);
                    toast({
                        variant: 'destructive',
                        title: 'The Lorekeeper is Silent',
                        description: 'There was an error communicating with the Scriptorium. Please try again.',
                    });
                })
                .finally(() => setIsLoading(false));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isListening, transcript]);


    return (
        <div className="max-w-3xl mx-auto py-12">
            <div className="flex flex-col items-center justify-center gap-8">
                <Button 
                    size="icon" 
                    className={cn(
                        "h-24 w-24 rounded-full transition-all duration-300",
                        isListening ? "animate-mic-pulse bg-destructive" : "bg-primary"
                    )}
                    onClick={handleMicClick}
                    aria-label={isListening ? "Stop listening" : "Start listening"}
                >
                    <MicrophoneIcon className="h-10 w-10" />
                </Button>
                
                <p className="text-sm text-center text-muted-foreground min-h-5" aria-live="polite">
                    {isListening ? `Listening... "${transcript}"` : "Press the orb to speak your query."}
                </p>

                {(isLoading || response || currentQuery) && (
                    <GlassCard className="w-full p-6" disableTilt>
                        {currentQuery && !isListening && (
                            <div className="mb-4">
                                <p className="text-sm text-muted-foreground">Your Query:</p>
                                <p className="text-lg font-headline">"{currentQuery}"</p>
                            </div>
                        )}
                        
                        <div className="border-t border-border my-4" />

                        {isLoading && (
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">The Lorekeeper is consulting the scrolls...</p>
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-5 w-[90%]" />
                            </div>
                        )}

                        {response && (
                             <div className="prose prose-invert max-w-none">
                                <ReactMarkdown>{response.definition}</ReactMarkdown>
                            </div>
                        )}

                        {!isLoading && !response && currentQuery && !isListening && (
                             <Alert variant="destructive">
                                <SkullIcon className="h-4 w-4" />
                                <AlertTitle>Query Failed</AlertTitle>
                                <AlertDescription>
                                    The Lorekeeper did not respond. The connection may have been lost in the ether.
                                </AlertDescription>
                            </Alert>
                        )}
                    </GlassCard>
                )}
            </div>
        </div>
    );
}
