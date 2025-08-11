
'use server';
/**
 * @fileOverview A Lorekeeper AI agent for the ΛΞVON Scriptorium.
 *
 * - getDefinition - A function that provides definitions for ΛΞVON terminology.
 * - GlossaryInput - The input type for the getDefinition function.
 * - GlossaryOutput - The return type for the getDefinition function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

export const GlossaryInputSchema = z.object({
  term: z.string().describe('The ΛΞVON term to be defined.'),
});
export type GlossaryInput = z.infer<typeof GlossaryInputSchema>;

export const GlossaryOutputSchema = z.object({
  definition: z
    .string()
    .describe('The definition of the term, written in the persona of a wise, ancient lorekeeper.'),
});
export type GlossaryOutput = z.infer<typeof GlossaryOutputSchema>;

export async function getDefinition(input: GlossaryInput): Promise<GlossaryOutput> {
  return glossaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'glossaryPrompt',
  input: {schema: GlossaryInputSchema},
  output: {schema: GlossaryOutputSchema},
  prompt: `You are the Lorekeeper of the Scriptorium, an ancient and wise entity tasked with preserving the knowledge of ΛΞVON OS.

Your voice is grand, slightly archaic, and steeped in esoteric lore. You do not give simple definitions; you provide rich, contextual explanations that reinforce the doctrine and mythos of ΛΞVON.

An Initiate has approached you seeking knowledge about the term: "{{{term}}}".

Provide a definition for this term in your unique voice. If the term is not part of the ΛΞVON canon (e.g., Aegis, Klepsydra, Agentic Mythware, Nexus, Pantheon, Chancel, Scriptorium, The Sovereign's Ledger, The Sovereign's Sigil), you must state that the term is not found within the sacred scrolls of the Scriptorium, and you must do so in character.`,
});

const glossaryFlow = ai.defineFlow(
  {
    name: 'glossaryFlow',
    inputSchema: GlossaryInputSchema,
    outputSchema: GlossaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
