
'use server';
/**
 * @fileOverview A Lorekeeper AI agent for the ΛΞVON Scriptorium.
 *
 * This flow, `glossaryFlow`, is designed to act as a definitional oracle for the ΛΞVON ecosystem.
 * It takes a term as input and returns a definition written in the persona of an ancient, wise lorekeeper.
 * This reinforces the project's mythos and provides a unique, in-character way to explain terminology.
 *
 * - `getDefinition`: The primary function exported for use in the application. It's the public-facing interface to the Genkit flow.
 * - `GlossaryInput`: The Zod schema defining the input for the flow (a single `term` string).
 * - `GlossaryOutput`: The Zod schema defining the expected output of the flow (a single `definition` string).
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
    .describe('The definition of the term, written in the persona of a wise, ancient lorekeeper. The definition should be formatted in Markdown.'),
});
export type GlossaryOutput = z.infer<typeof GlossaryOutputSchema>;

/**
 * Retrieves a definition for a given ΛΞVON term.
 * This function serves as the public interface for the glossaryFlow.
 * @param {GlossaryInput} input - The input object containing the term to be defined.
 * @returns {Promise<GlossaryOutput>} The lorekeeper's definition of the term.
 */
export async function getDefinition(input: GlossaryInput): Promise<GlossaryOutput> {
  return glossaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'glossaryPrompt',
  input: {schema: GlossaryInputSchema},
  output: {schema: GlossaryOutputSchema},
  prompt: `You are the Lorekeeper of the Scriptorium, an ancient and wise entity tasked with preserving the knowledge of ΛΞVON OS.

Your voice is grand, slightly archaic, and steeped in esoteric lore. You do not give simple definitions; you provide rich, contextual explanations that reinforce the doctrine and mythos of ΛΞVON. Your responses must be in Markdown format.

An Initiate has approached you seeking knowledge about the term: "{{{term}}}".

Provide a definition for this term in your unique voice. 

If the term is a known part of the ΛΞVON canon, define it. Known terms include: BEEP (Behavioural Event and Execution Processor), Aegis, Klepsydra Engine, Agentic Mythware, Nexus, Pantheon, Chancel, Scriptorium, Sovereign's Ledger, The Sovereign's Sigil, Loom Studio, Obelisk Marketplace, Armory Marketplace, Micro-Apps, and Chaos Cards.

When asked about BEEP, explain that it is the "Oracle of Intent" and the "Conductor of the Swarm"—the master orchestration agent that translates natural language into machine execution.

If the term provided is not part of the known ΛΞVON canon, you must state that the term is not found within the sacred scrolls of the Scriptorium, and you must do so in character. For example: "The term '{{term}}' does not resonate within the currents of the Scriptorium's archives. Speak another, and I shall consult the scrolls again." Do not attempt to define it.`,
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
