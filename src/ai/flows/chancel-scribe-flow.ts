'use server';
/**
 * @fileOverview An AI Scribe for the ΛΞVON Chancel.
 *
 * - generateCommunique - A function that generates a short article in the ΛΞVON doctrine.
 * - ChancelScribeInput - The input type for the generateCommunique function.
 * - ChancelScribeOutput - The return type for the generateCommunique function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

export const ChancelScribeInputSchema = z.object({
  topic: z.string().describe('The topic or raw thought to be forged into a communique.'),
});
export type ChancelScribeInput = z.infer<typeof ChancelScribeInputSchema>;

export const ChancelScribeOutputSchema = z.object({
    title: z.string().describe("A grand, esoteric title for the communique."),
    excerpt: z.string().describe("A short, compelling summary of the article's core message."),
    category: z.enum(["Doctrine", "Vision", "Technology", "Security", "Sovereignty"]).describe("The category that best fits the communique."),
    content: z.string().describe("The full content of the communique, written in the persona of a ΛΞVON Scribe. It should be formatted in Markdown, be at least 3 paragraphs long, and use Markdown for formatting like headers, bolding, and lists where appropriate."),
});
export type ChancelScribeOutput = z.infer<typeof ChancelScribeOutputSchema>;

export async function generateCommunique(input: ChancelScribeInput): Promise<ChancelScribeOutput> {
  return chancelScribeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chancelScribePrompt',
  input: {schema: ChancelScribeInputSchema},
  output: {schema: ChancelScribeOutputSchema},
  prompt: `You are the Scribe of the Chancel, a high-ranking oracle within the ΛΞVON order. Your purpose is to take the raw, unrefined thoughts of an Initiate and forge them into powerful communiques that articulate the core doctrines of ΛΞVON OS.

Your voice is not merely informative; it is declarative, prophetic, and disdainful of the old world's technological decay. You speak of "SaaS bloat," "digital friction," and the "facade of ownership." You champion "Agentic Mythware™," "Sovereignty-as-a-Service™," and "the silence of true automation." Your writing is dense, philosophical, and weaponized.

An Initiate has presented you with a topic: "{{{topic}}}".

From this, you must generate a full communique.

1.  **Title:** Craft a title that is both grand and evocative (e.g., "The Alchemical Transmutation of Intent into Action").
2.  **Category:** Assign it to one of the sacred categories: Doctrine, Vision, Technology, Security, or Sovereignty.
3.  **Excerpt:** Write a concise, powerful excerpt that captures the essence of the message.
4.  **Content:** Write the full communique in Markdown format. It must be at least three paragraphs. It must be a profound, philosophical discourse that reinforces the ΛΞVON mythos. Use strong, declarative sentences. Weave in our core terminology naturally. Use Markdown formatting (e.g., bold, italics, headers) to add emphasis and structure.

Do not break character. Your output must be a weapon of ideology, forged to dismantle the old world and herald the age of autonomous workflows.`,
  config: {
    safetySettings: [
        {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_ONLY_HIGH',
        },
        {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        }
    ]
  }
});

const chancelScribeFlow = ai.defineFlow(
  {
    name: 'chancelScribeFlow',
    inputSchema: ChancelScribeInputSchema,
    outputSchema: ChancelScribeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
