
"use client";

import * as React from 'react';
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { generateCommunique, ChancelScribeOutput } from '@/ai/flows/chancel-scribe-flow';
import { GlassCard } from '@/components/glass-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { Bot, Wand2 } from 'lucide-react';

const FormSchema = z.object({
  topic: z.string().min(5, {
    message: "Your thought must be at least 5 characters long.",
  }).max(100, {
      message: "The Scribe can only process thoughts up to 100 characters."
  }),
})

export default function ChancelPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [response, setResponse] = React.useState<ChancelScribeOutput | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      topic: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setResponse(null);
    try {
      const res = await generateCommunique({ topic: data.topic });
      setResponse(res);
    } catch (error) {
      console.error("Error generating communique:", error);
      toast({
        variant: "destructive",
        title: "The Scribe Has Failed",
        description: "An unexpected error occurred while forging the communique. The connection to the ether may have been lost.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4">
      <PageHeader
        title="The Chancel Scribe"
        subtitle="This is the altar of creation. Present a raw thought to the Scribe, and BEEP will transmute it into a full communique, forging it into the annals of the ΛΞVON doctrine."
      />

      <section className="max-w-2xl mx-auto py-8">
        <GlassCard className="p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-lg font-headline'>Your Thought or Topic</FormLabel>
                      <FormControl>
                        <Input 
                            placeholder="e.g., 'The nature of digital sovereignty'" 
                            {...field} 
                            className="text-base"
                            disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className='w-full font-headline' disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Bot className="mr-2 h-5 w-5 animate-spin" />
                      The Scribe is Forging...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-5 w-5" />
                      Transmute Thought
                    </>
                  )}
                </Button>
              </form>
            </Form>
        </GlassCard>
      </section>

      <section className='py-12'>
        {isLoading && <ScribeLoadingSkeleton />}
        {response && <CommuniqueDisplay response={response} />}
      </section>
    </div>
  );
}


function CommuniqueDisplay({ response }: { response: ChancelScribeOutput }) {
    return (
        <GlassCard className='overflow-hidden'>
            <div className="relative h-64 w-full">
                <Image src={response.imageDataUri} alt={`Sigil for ${response.title}`} layout='fill' objectFit='cover' />
                <div className='absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent' />
            </div>
            <div className='p-6 md:p-8'>
                <Badge variant="outline" className='mb-2'>{response.category}</Badge>
                <h2 className="font-headline text-3xl md:text-4xl text-glow mb-2">{response.title}</h2>
                <p className='text-muted-foreground text-lg mb-6'>{response.excerpt}</p>
                <div className='prose prose-invert max-w-none prose-p:text-foreground/80 prose-headings:text-glow prose-a:text-accent prose-strong:text-foreground'>
                    <ReactMarkdown>{response.content}</ReactMarkdown>
                </div>
            </div>
        </GlassCard>
    );
}

function ScribeLoadingSkeleton() {
  return (
    <GlassCard className='overflow-hidden'>
        <Skeleton className="h-64 w-full" />
        <div className='p-6 md:p-8'>
            <Skeleton className="h-6 w-24 mb-4" />
            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-8 w-full mb-6" />
            <div className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-[90%]" />
               <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-[85%]" />
            </div>
        </div>
    </GlassCard>
  )
}
