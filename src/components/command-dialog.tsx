
"use client"

import * as React from "react"
import ReactMarkdown from "react-markdown"
import {
  CommandDialog as CommandPrimitive,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { getDefinition, GlossaryOutput, GlossaryInput } from "@/ai/flows/glossary-flow"
import { Loader2 } from "lucide-react"
import { LambdaXiVONIcon } from "./icons"

export function CommandDialog() {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<GlossaryOutput | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSearch = async (term: string) => {
    if (!term) {
      setResult(null)
      setError(null)
      return
    }
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await getDefinition({ term })
      setResult(res)
    } catch (err) {
      setError("The Lorekeeper is silent. The query returned to the void.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (value: string) => {
    setSearchTerm(value)
    if (!value) {
        setResult(null)
        setError(null)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  }

  return (
    <CommandPrimitive open={open} onOpenChange={setOpen}>
      <form onSubmit={handleFormSubmit}>
        <CommandInput 
            placeholder="Consult the Lorekeeper..." 
            value={searchTerm}
            onValueChange={handleInputChange}
        />
      </form>
      <CommandList>
        {(loading || result || error) && <CommandEmpty className="py-6 px-4 text-center text-sm flex flex-col items-center justify-center">
            {loading && <div className="flex flex-col items-center gap-4"><Loader2 className="h-8 w-8 animate-spin text-primary" /><p className="text-foreground/70">The Lorekeeper consults the scrolls...</p></div>}
            {error && <p className="text-destructive">{error}</p>}
            {result && (
                <div className="text-left prose prose-invert max-w-none prose-p:text-foreground/80 prose-headings:font-headline prose-headings:text-glow prose-headings:text-foreground prose-a:text-accent prose-strong:text-foreground">
                    <ReactMarkdown>{result.definition}</ReactMarkdown>
                </div>
            )}
        </CommandEmpty>}
        {!searchTerm && !result && !error && !loading && (
          <div className="py-12 text-center">
            <LambdaXiVONIcon className="h-16 w-16 mx-auto text-foreground/20 mb-4" />
            <p className="text-sm text-foreground/60">The Scriptorium awaits your query.</p>
            <p className="text-xs text-foreground/40 mt-4">Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">⌘</kbd> <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">K</kbd> to close.</p>
          </div>
        )}
      </CommandList>
    </CommandPrimitive>
  )
}
